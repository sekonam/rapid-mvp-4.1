"use client";

const STEPS = [
  { id: "script", label: "Punching up your script…", icon: "✍️" },
  { id: "audio", label: "Recording the hype…", icon: "🎙️" },
] as const;

interface LoadingStateProps {
  step: "script" | "audio";
}

export function LoadingState({ step }: LoadingStateProps) {
  const activeIndex = step === "script" ? 0 : 1;

  return (
    <div
      className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-8"
      role="status"
      aria-live="polite"
    >
      <div className="mb-6 flex justify-center">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 animate-ping rounded-full bg-amber-400/20" />
          <div className="absolute inset-2 animate-pulse rounded-full bg-amber-400/30" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-3xl shadow-lg shadow-amber-500/40">
            🔥
          </div>
        </div>
      </div>

      <p className="text-center text-lg font-semibold text-zinc-100">
        {STEPS[activeIndex].label}
      </p>
      <p className="mt-1 text-center text-sm text-zinc-500">
        This usually takes a few seconds
      </p>

      <ul className="mt-8 space-y-3">
        {STEPS.map((s, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          return (
            <li
              key={s.id}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active ? "bg-amber-400/10 text-amber-100" : done ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              <span className="text-lg">{s.icon}</span>
              <span className="flex-1">{s.label.replace("…", "")}</span>
              {done && <span className="text-emerald-400">✓</span>}
              {active && (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
