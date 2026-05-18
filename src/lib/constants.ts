import type { DurationSeconds, Energy, Manner, Voice } from "./types";

export const VOICES: { id: Voice; label: string; hint: string }[] = [
  { id: "nova", label: "Nova", hint: "Bright & upbeat" },
  { id: "onyx", label: "Onyx", hint: "Deep & commanding" },
  { id: "coral", label: "Coral", hint: "Warm & friendly" },
  { id: "echo", label: "Echo", hint: "Smooth narrator" },
  { id: "shimmer", label: "Shimmer", hint: "Crisp & energetic" },
  { id: "fable", label: "Fable", hint: "Expressive storyteller" },
  { id: "alloy", label: "Alloy", hint: "Neutral all-rounder" },
  { id: "sage", label: "Sage", hint: "Calm & measured" },
  { id: "ash", label: "Ash", hint: "Confident & direct" },
];

export const MANNERS: { id: Manner; label: string; emoji: string }[] = [
  { id: "epic", label: "Epic trailer", emoji: "🎬" },
  { id: "sports", label: "Sports announcer", emoji: "🏆" },
  { id: "joking", label: "Playful roast", emoji: "😏" },
  { id: "corporate", label: "CEO keynote", emoji: "📈" },
  { id: "serious", label: "Breaking news", emoji: "📰" },
];

export const ENERGIES: { id: Energy; label: string }[] = [
  { id: "chill", label: "Chill" },
  { id: "medium", label: "Medium" },
  { id: "max", label: "MAXIMUM" },
];

export const DURATIONS: { id: DurationSeconds; label: string }[] = [
  { id: 5, label: "~5 sec" },
  { id: 10, label: "~10 sec" },
  { id: 15, label: "~15 sec" },
];

export const EXAMPLE_INPUTS = [
  "I finally fixed the login bug.",
  "We shipped the dashboard on time.",
  "Stand-up: blocked on API keys.",
  "Merged my first PR today.",
];

export const WORD_TARGETS: Record<DurationSeconds, number> = {
  5: 12,
  10: 25,
  15: 38,
};

export const TTS_SPEED: Record<Energy, number> = {
  chill: 0.92,
  medium: 1.0,
  max: 1.12,
};
