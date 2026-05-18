"use client";

import { DURATIONS, ENERGIES, MANNERS, VOICES } from "@/lib/constants";
import type { HypeSettings } from "@/lib/types";

interface SettingsPanelProps {
  settings: HypeSettings;
  onChange: (settings: HypeSettings) => void;
  disabled?: boolean;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
      {children}
    </p>
  );
}

function Chip<T extends string | number>({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg border px-3 py-2 text-sm transition-all ${
        active
          ? "border-amber-400/60 bg-amber-400/15 text-amber-100 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
          : "border-zinc-700/80 bg-zinc-900/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
}

export function SettingsPanel({ settings, onChange, disabled }: SettingsPanelProps) {
  const patch = (partial: Partial<HypeSettings>) =>
    onChange({ ...settings, ...partial });

  return (
    <aside className="space-y-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-sm">
      <div>
        <SectionLabel>Length</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {DURATIONS.map((d) => (
            <Chip
              key={d.id}
              active={settings.duration === d.id}
              disabled={disabled}
              onClick={() => patch({ duration: d.id })}
            >
              {d.label}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Voice</SectionLabel>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {VOICES.map((v) => (
            <Chip
              key={v.id}
              active={settings.voice === v.id}
              disabled={disabled}
              onClick={() => patch({ voice: v.id })}
            >
              <span className="font-medium">{v.label}</span>
              <span className="mt-0.5 block text-[10px] font-normal opacity-60">
                {v.hint}
              </span>
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Manner</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {MANNERS.map((m) => (
            <Chip
              key={m.id}
              active={settings.manner === m.id}
              disabled={disabled}
              onClick={() => patch({ manner: m.id })}
            >
              <span className="mr-1">{m.emoji}</span>
              {m.label}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Energy</SectionLabel>
        <div className="flex gap-2">
          {ENERGIES.map((e) => (
            <Chip
              key={e.id}
              active={settings.energy === e.id}
              disabled={disabled}
              onClick={() => patch({ energy: e.id })}
            >
              {e.label}
            </Chip>
          ))}
        </div>
      </div>
    </aside>
  );
}
