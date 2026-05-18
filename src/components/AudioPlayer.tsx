"use client";

import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
  script: string;
  onRegenerate?: () => void;
}

export function AudioPlayer({ src, script, onRegenerate }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };
    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onLoaded = () => setDuration(audio.duration);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);

    void audio.play().catch(() => {});

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
    };
  }, [src]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else void audio.play();
  };

  const format = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const current = audioRef.current?.currentTime ?? 0;

  const download = () => {
    const a = document.createElement("a");
    a.href = src;
    a.download = "hype-soundbite.mp3";
    a.click();
  };

  return (
    <div className="space-y-5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-zinc-900/80 to-violet-600/10 p-6 shadow-[0_0_60px_rgba(251,191,36,0.08)]">
      <audio ref={audioRef} src={src} preload="auto" />

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-amber-400 text-zinc-950 shadow-lg shadow-amber-400/30 transition-transform hover:scale-105 active:scale-95"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="h-7 w-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-amber-200">Your hype is ready</p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            {format(current)} / {duration ? format(duration) : "—"}
          </p>
        </div>
      </div>

      <blockquote className="rounded-xl border border-zinc-700/50 bg-zinc-950/50 px-4 py-3 text-sm leading-relaxed text-zinc-300 italic">
        &ldquo;{script}&rdquo;
      </blockquote>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={download}
          className="rounded-lg border border-zinc-600 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
        >
          Download MP3
        </button>
        {onRegenerate && (
          <button
            type="button"
            onClick={onRegenerate}
            className="rounded-lg border border-zinc-600 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
          >
            Try another vibe
          </button>
        )}
      </div>
    </div>
  );
}
