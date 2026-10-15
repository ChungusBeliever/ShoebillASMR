import { useCallback, useEffect, useRef } from "react";

/** Preloads an audio file and returns a function that plays it. */
export function useAudio(src: string): () => void {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  return useCallback(() => {
    audioRef.current?.play().catch((err) => console.error("Audio playback failed:", err));
  }, []);
}
