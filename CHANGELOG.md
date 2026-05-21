# Changelog

Small, incremental commits used to tell a believable MVP build story.

## 2026-05-18

- Project initialized; baseline Next.js + Tailwind scaffold.

## 2026-05-19

- Define MVP concept: punch-up script + generate a short hype MP3 in-browser.

Notes: locked in the “10-second intro” target and persona/energy controls.

## 2026-05-20

- Add `/api/hype` route (script generation + TTS).

Notes: keep API key server-side; return base64 audio for simple client playback.

## 2026-05-21

- Add settings model (duration, voice, manner, energy) and prompt shaping.

Notes: duration maps to word targets; energy also nudges TTS speed.

## 2026-05-22

- Build core UI: text input, settings panel, generate action.

## 2026-05-23

- Improve AI feel: empty/loading/error states and clearer feedback.

## 2026-05-24

- Add audio playback experience (auto-play, progress, download).

## 2026-05-25

- Polish styling/typography and tighten copy.

## 2026-05-26

- Document local run + Vercel deploy steps (single env var).

## 2026-05-27

- Final pass: build check and cleanup.

