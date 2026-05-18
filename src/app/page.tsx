import { HypeApp } from "@/components/HypeApp";

export default function Home() {
  return (
    <main className="relative min-h-full flex-1 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-orange-500/5 blur-3xl" />
      </div>
      <HypeApp />
      <footer className="pb-8 text-center text-xs text-zinc-600">
        Powered by OpenAI · Built for Vercel
      </footer>
    </main>
  );
}
