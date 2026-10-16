import { useCallback, useEffect, useMemo, useRef } from "react";

/** Plays one sound at a time: starting a new sound stops the previous one. */
export function useSound() {
  const audio = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    audio.current?.pause();
    audio.current = null;
  }, []);

  const play = useCallback(
    (src: string) => {
      stop();
      const element = new Audio(src);
      audio.current = element;
      element.play().catch((err) => console.error("Audio playback failed:", err));
    },
    [stop],
  );

  useEffect(() => stop, [stop]); // silence everything when the game is closed

  return useMemo(() => ({ play, stop }), [play, stop]);
}
