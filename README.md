# Soundbite Studio — Hype-Man MVP

Turn a boring workplace update into a short, hype audio clip. Type something dull like *"I finally fixed the login bug"*, pick your vibe settings, and get a punched-up script plus ~10-second MP3 you can play right in the browser.

Built with **Next.js** (App Router), **OpenAI** (GPT-4o-mini for scripts + TTS for voice), and deploy-ready on **Vercel**.

## Quick start (local)

**Requirements:** Node.js 20+, an [OpenAI API key](https://platform.openai.com/api-keys)

```bash
npm install
cp .env.example .env.local
# Edit .env.local and set OPENAI_API_KEY=sk-...
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes | Powers script punch-up (GPT) and audio generation (TTS) |

Only one secret is needed.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add `OPENAI_API_KEY` in **Project → Settings → Environment Variables**.
4. Deploy. Vercel detects Next.js automatically.

Or use the CLI:

```bash
npx vercel
# Follow prompts, then add OPENAI_API_KEY in the Vercel dashboard
```

## How it works

1. **Input** — User enters a short, mundane update (max 500 chars).
2. **Settings** — Length (~5/10/15s), voice, manner (epic, sports, joking, corporate, serious), energy level.
3. **Script** — GPT-4o-mini rewrites the text as a spoken hype announcement tuned to those settings.
4. **Audio** — OpenAI `tts-1` synthesizes the script; playback starts automatically when ready.
5. **Output** — Inline player, script preview, MP3 download.

## Product choices

- **Single API route** (`/api/hype`) keeps the MVP simple; loading UI simulates script → audio steps for feel.
- **Energy** maps to TTS speed; **manner** and **duration** shape the LLM prompt (word targets per length).
- **Empty state** before first generation; **error state** for missing key or API failures.

## Tech stack

- Next.js 16, React 19, Tailwind CSS 4
- OpenAI SDK (`gpt-4o-mini`, `tts-1`)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |

## License

MIT — built as a rapid MVP demo.
