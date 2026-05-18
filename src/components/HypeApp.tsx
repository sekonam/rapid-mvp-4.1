"use client";

import { useCallback, useState } from "react";
import { EXAMPLE_INPUTS } from "@/lib/constants";
import type { HypeResponse, HypeSettings } from "@/lib/types";
import { AudioPlayer } from "./AudioPlayer";
import { LoadingState } from "./LoadingState";
import { SettingsPanel } from "./SettingsPanel";

const DEFAULT_SETTINGS: HypeSettings = {
  duration: 10,
  voice: "nova",
  manner: "epic",
  energy: "max",
};

type Phase = "idle" | "loading" | "ready" | "error";

export function HypeApp() {
  const [text, setText] = useState("");
  const [settings, setSettings] = useState<HypeSettings>(DEFAULT_SETTINGS);
  const [phase, setPhase] = useState<Phase>("idle");
  const [loadingStep, setLoadingStep] = useState<"script" | "audio">("script");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HypeResponse | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const revokeAudio = useCallback((url: string | null) => {
    if (url) URL.revokeObjectURL(url);
  }, []);

  const generate = async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Type something boring first—we'll make it legendary.");
      return;
    }

    setError(null);
    setPhase("loading");
    setLoadingStep("script");
    setResult(null);
    revokeAudio(audioUrl);
    setAudioUrl(null);

    const audioStepTimer = window.setTimeout(() => setLoadingStep("audio"), 1800);

    try {
      const res = await fetch("/api/hype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed, settings }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Generation failed");
      }

      const hype = data as HypeResponse;
      const bytes = Uint8Array.from(atob(hype.audioBase64), (c) => c.charCodeAt(0));
      const blob = new Blob([bytes], { type: hype.mimeType });
      const url = URL.createObjectURL(blob);

      setResult(hype);
      setAudioUrl(url);
      setPhase("ready");
    } catch (e) {
      setPhase("error");
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      window.clearTimeout(audioStepTimer);
    }
  };

  const reset = () => {
    setPhase("idle");
    setResult(null);
    revokeAudio(audioUrl);
    setAudioUrl(null);
    setError(null);
  };

  const busy = phase === "loading";

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-10 text-center">
        <p className="mb-2 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-amber-300">
          Rapid MVP · Hype-Man
        </p>
        <h1 className="bg-gradient-to-r from-amber-200 via-orange-300 to-violet-300 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          Soundbite Studio
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-zinc-400">
          Drop in a dull update. Walk out with a short, hype audio clip—script
          punched up and voiced for maximum energy.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:grid-rows-1">
        <main className="space-y-6">
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm">
            <label htmlFor="input" className="mb-2 block text-sm font-medium text-zinc-300">
              Your boring update
            </label>
            <textarea
              id="input"
              rows={4}
              value={text}
              disabled={busy}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. I finally fixed the login bug."
              className="w-full resize-none rounded-xl border border-zinc-700 bg-zinc-950/80 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/20 disabled:opacity-60"
              maxLength={500}
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-zinc-600">{text.length}/500</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_INPUTS.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    disabled={busy}
                    onClick={() => setText(ex)}
                    className="rounded-md border border-zinc-800 px-2 py-1 text-xs text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-300 disabled:opacity-50"
                  >
                    {ex.slice(0, 28)}
                    {ex.length > 28 ? "…" : ""}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {phase === "idle" && (
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 px-6 py-12 text-center">
              <p className="text-4xl mb-3">🎧</p>
              <p className="text-zinc-400 text-sm">
                Your hype clip will appear here. Tune settings, hit generate, and
                listen.
              </p>
            </div>
          )}

          {phase === "loading" && <LoadingState step={loadingStep} />}

          {phase === "ready" && audioUrl && result && (
            <AudioPlayer
              src={audioUrl}
              script={result.script}
              onRegenerate={() => {
                setPhase("idle");
                void generate();
              }}
            />
          )}

          {phase === "error" && error && (
            <div
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              role="alert"
            >
              {error}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={busy || !text.trim()}
              onClick={() => void generate()}
              className="flex-1 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 text-base font-semibold text-zinc-950 shadow-lg shadow-amber-500/25 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-10"
            >
              {busy ? "Generating…" : phase === "ready" ? "Generate again" : "Generate hype"}
            </button>
            {(phase === "ready" || phase === "error") && (
              <button
                type="button"
                onClick={reset}
                className="rounded-xl border border-zinc-700 px-5 py-3.5 text-sm text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              >
                Start over
              </button>
            )}
          </div>
        </main>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <p className="mb-3 text-sm font-medium text-zinc-400 lg:hidden">Settings</p>
          <SettingsPanel
            settings={settings}
            onChange={setSettings}
            disabled={busy}
          />
        </div>
      </div>
    </div>
  );
}
