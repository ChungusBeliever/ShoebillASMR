import { useEffect, useRef, useState } from "react";
import { releaseSongs, toSongs, type Song } from "./playlist";

/**
 * The player's state and behaviour. Each song plays through its own throwaway
 * <audio> element, so starting any song always stops the previous one.
 */
export function useMp3Player() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [nowPlaying, setNowPlaying] = useState("");

  const playingIndex = useRef(-1); // index of the song that was played last
  const audio = useRef<HTMLAudioElement | null>(null);

  // Object URLs live as long as the player is on screen.
  const songsRef = useRef(songs);
  songsRef.current = songs;
  useEffect(() => () => releaseSongs(songsRef.current), []);

  const stop = () => {
    audio.current?.pause();
    audio.current = null;
    setNowPlaying("");
  };

  const playIndex = (index: number) => {
    const song = songs[index];
    if (!song) return;
    stop();
    playingIndex.current = index;
    setSelected(index);
    setNowPlaying(song.name);
    const element = new Audio(song.url);
    audio.current = element;
    element.play().catch((err) => console.error("Audio playback failed:", err));
  };

  const play = () => {
    if (selected !== null) playIndex(selected);
  };

  const next = () => {
    if (playingIndex.current + 1 < songs.length) playIndex(playingIndex.current + 1);
  };

  const previous = () => {
    if (playingIndex.current > 0) playIndex(playingIndex.current - 1);
  };

  const remove = () => {
    if (selected === null) return;
    if (selected === playingIndex.current) {
      stop();
      playingIndex.current = selected - 1;
    } else if (selected < playingIndex.current) {
      playingIndex.current -= 1;
    }
    URL.revokeObjectURL(songs[selected].url);
    const rest = songs.filter((_, index) => index !== selected);
    setSongs(rest);
    setSelected(rest.length === 0 ? null : Math.min(selected, rest.length - 1));
  };

  const clear = () => {
    stop();
    releaseSongs(songs);
    setSongs([]);
    setSelected(null);
    playingIndex.current = -1;
  };

  const add = (files: File[]) => setSongs((prev) => [...prev, ...toSongs(files)]);

  // The "Go" menu just moves the highlight; playing is a separate step.
  const selectPlaying = () => {
    if (playingIndex.current >= 0) setSelected(playingIndex.current);
  };
  const selectRandom = () => {
    if (songs.length > 0) setSelected(Math.floor(Math.random() * songs.length));
  };
  const selectFirst = () => {
    if (songs.length > 0) setSelected(0);
  };
  const selectLast = () => {
    if (songs.length > 0) setSelected(songs.length - 1);
  };

  return {
    songs,
    selected,
    nowPlaying,
    select: setSelected,
    add,
    clear,
    play,
    stop,
    next,
    previous,
    remove,
    selectPlaying,
    selectRandom,
    selectFirst,
    selectLast,
  };
}
