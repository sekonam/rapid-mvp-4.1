import OpenAI from "openai";
import { NextResponse } from "next/server";
import { buildScriptPrompt } from "@/lib/prompts";
import { TTS_SPEED } from "@/lib/constants";
import type { HypeRequest, HypeResponse } from "@/lib/types";

export const maxDuration = 60;

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HypeRequest;
    const text = body.text?.trim();

    if (!text) {
      return NextResponse.json({ error: "Please enter some text to hype up." }, { status: 400 });
    }

    if (text.length > 500) {
      return NextResponse.json(
        { error: "Keep it brief—500 characters max." },
        { status: 400 },
      );
    }

    const settings = body.settings;
    if (!settings?.voice || !settings?.manner || !settings?.energy || !settings?.duration) {
      return NextResponse.json({ error: "Invalid settings." }, { status: 400 });
    }

    const openai = getOpenAI();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.9,
      max_tokens: 200,
      messages: [
        {
          role: "system",
          content:
            "You write short spoken hype scripts. Output only the words to be spoken aloud.",
        },
        { role: "user", content: buildScriptPrompt(text, settings) },
      ],
    });

    const script = completion.choices[0]?.message?.content?.trim();
    if (!script) {
      return NextResponse.json(
        { error: "Could not generate a hype script. Try again." },
        { status: 502 },
      );
    }

    const speech = await openai.audio.speech.create({
      model: "tts-1",
      voice: settings.voice,
      input: script,
      speed: TTS_SPEED[settings.energy],
      response_format: "mp3",
    });

    const buffer = Buffer.from(await speech.arrayBuffer());
    const audioBase64 = buffer.toString("base64");

    const response: HypeResponse = {
      script,
      audioBase64,
      mimeType: "audio/mpeg",
    };

    return NextResponse.json(response);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    const status = message.includes("OPENAI_API_KEY") ? 503 : 500;
    console.error("[hype]", err);
    return NextResponse.json({ error: message }, { status });
  }
}
