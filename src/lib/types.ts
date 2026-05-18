export type Voice =
  | "alloy"
  | "ash"
  | "coral"
  | "echo"
  | "fable"
  | "nova"
  | "onyx"
  | "sage"
  | "shimmer";

export type Manner =
  | "epic"
  | "joking"
  | "serious"
  | "corporate"
  | "sports";

export type Energy = "chill" | "medium" | "max";

export type DurationSeconds = 5 | 10 | 15;

export interface HypeSettings {
  duration: DurationSeconds;
  voice: Voice;
  manner: Manner;
  energy: Energy;
}

export interface HypeRequest {
  text: string;
  settings: HypeSettings;
}

export interface HypeResponse {
  script: string;
  audioBase64: string;
  mimeType: string;
}
