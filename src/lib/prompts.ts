import { WORD_TARGETS } from "./constants";
import type { HypeSettings } from "./types";

const MANNER_GUIDE: Record<HypeSettings["manner"], string> = {
  epic: "cinematic movie-trailer voice: dramatic pauses, heroic stakes, 'In a world where…' energy",
  sports: "live sports broadcaster: play-by-play urgency, crowd hype, championship stakes",
  joking: "witty hype with light sarcasm and punchlines—fun, never mean",
  corporate: "polished executive keynote: confident, visionary, boardroom-ready",
  serious: "breaking-news anchor: gravitas, urgency, matter-of-fact authority",
};

const ENERGY_GUIDE: Record<HypeSettings["energy"], string> = {
  chill: "measured pace, understated confidence",
  medium: "enthusiastic but controlled",
  max: "peak hype—exclamation energy, bold declarations, zero chill",
};

export function buildScriptPrompt(input: string, settings: HypeSettings): string {
  const wordTarget = WORD_TARGETS[settings.duration];

  return `You are a hype scriptwriter. Transform mundane workplace updates into spoken audio announcements.

INPUT (boring update):
"${input}"

STYLE:
- Manner: ${MANNER_GUIDE[settings.manner]}
- Energy: ${ENERGY_GUIDE[settings.energy]}

RULES:
- Output ONLY the spoken script—no titles, quotes, stage directions, or markdown.
- Target ~${wordTarget} words so it reads aloud in ~${settings.duration} seconds.
- One tight paragraph. Punchy sentences. Strong opening hook.
- Stay faithful to the facts in the input; embellish delivery, not truth.
- Write for the ear: contractions, rhythm, natural speech.`;
}
