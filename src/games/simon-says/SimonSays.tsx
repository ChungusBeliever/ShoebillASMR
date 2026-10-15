import { useEffect, useRef, useState, type CSSProperties } from "react";
import FlWindow from "../../components/Fltk/FlWindow";
import FlMessage from "../../components/Fltk/FlMessage";
import { rect } from "../../components/Fltk/geometry";
import redFlash from "./sounds/redflash.mp3";
import greenFlash from "./sounds/greenflash.mp3";
import blueFlash from "./sounds/blueflash.mp3";
import yellowFlash from "./sounds/yellowflash.mp3";
import errorSound from "./sounds/errorsound.mp3";
import "./SimonSays.css";

const PADS = [
  { x: 70, y: 50, dark: "rgb(125, 0, 0)", bright: "rgb(255, 0, 0)", sound: redFlash },
  { x: 245, y: 50, dark: "rgb(0, 125, 0)", bright: "rgb(0, 255, 0)", sound: greenFlash },
  { x: 70, y: 225, dark: "rgb(0, 0, 100)", bright: "rgb(0, 0, 255)", sound: blueFlash },
  { x: 245, y: 225, dark: "rgb(150, 150, 0)", bright: "rgb(255, 255, 0)", sound: yellowFlash },
];

const SECONDS_PER_MOVE = 5;

interface GameState {
  order: number[]; // the sequence of pad indexes Simon has chosen
  position: number; // how far through the sequence the player is
  level: number;
  timer: number; // seconds used on the current move
  playing: boolean; // player is allowed to click pads
  flashing: boolean; // Simon is showing the sequence
}

export default function SimonSays() {
  const [levelText, setLevelText] = useState("Click start to play");
  const [timeText, setTimeText] = useState("0 seconds left");
  const [lit, setLit] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const game = useRef<GameState>({ order: [], position: 0, level: 1, timer: 0, playing: false, flashing: false });
  const timeouts = useRef(new Set<number>());
  const audio = useRef<HTMLAudioElement | null>(null);

  const later = (callback: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timeouts.current.delete(id);
      callback();
    }, ms);
    timeouts.current.add(id);
  };

  const clearTimers = () => {
    timeouts.current.forEach((id) => window.clearTimeout(id));
    timeouts.current.clear();
  };

  const stopSound = () => {
    audio.current?.pause();
    audio.current = null;
  };

  const playSound = (src: string) => {
    stopSound();
    const sound = new Audio(src);
    audio.current = sound;
    sound.play().catch((err) => console.error("Audio playback failed:", err));
  };

  useEffect(
    () => () => {
      clearTimers();
      stopSound();
    },
    [],
  );

  const countdown = () => {
    const g = game.current;
    if (g.flashing) return;
    if (g.timer !== SECONDS_PER_MOVE) {
      setTimeText(`${SECONDS_PER_MOVE - g.timer} seconds left`);
      g.timer += 1;
      later(countdown, 1000);
    } else {
      setTimeText("0 seconds left");
      lose();
    }
  };

  // Adds one more colour to the sequence, then flashes the whole thing.
  const giveOrder = () => {
    const g = game.current;
    g.order.push(Math.floor(Math.random() * 4));
    g.playing = false;
    g.flashing = true;
    g.order.forEach((pad, i) => {
      later(() => {
        setLit(pad);
        playSound(PADS[pad].sound);
      }, 1000 * i + 1000);
      later(() => {
        setLit(null);
        stopSound();
        if (i === g.order.length - 1) {
          g.playing = true;
          g.flashing = false;
          g.timer = 0;
          countdown();
        }
      }, 1000 * i + 1500);
    });
  };

  const lose = () => {
    const g = game.current;
    clearTimers();
    setLit(null);
    g.playing = false;
    g.flashing = false;
    const beaten = g.level - 1;
    g.order = [];
    g.position = 0;
    g.timer = 0;
    g.level = 1;
    playSound(errorSound);
    setMessage(`You lose! You beat up to level ${beaten}`);
    setLevelText("Click start to play");
  };

  const start = () => {
    const g = game.current;
    clearTimers();
    stopSound();
    setLit(null);
    g.order = [];
    g.position = 0;
    g.level = 1;
    g.timer = 0;
    setLevelText("Level: 1");
    giveOrder();
  };

  const pressPad = (index: number) => {
    const g = game.current;
    if (!g.playing) return;
    stopSound();
    if (g.order[g.position] !== index) {
      lose();
      return;
    }
    playSound(PADS[index].sound);
    g.timer = 0;
    setTimeText(`${SECONDS_PER_MOVE} seconds left`);
    g.position += 1;
    if (g.position === g.order.length) {
      g.position = 0;
      g.level += 1;
      setLevelText(`Level: ${g.level}`);
      giveOrder();
    }
  };

  return (
    <FlWindow title="Simon Says" width={400} height={400}>
      <div className="fl-box" style={rect(155, 0, 100, 50)}>
        simon says!!!
      </div>
      <output className="fl-output" style={rect(130, 350, 155, 50)}>
        {levelText}
      </output>
      <output className="fl-output" style={rect(0, 0, 120, 50)}>
        {timeText}
      </output>
      <button className="fl-button" style={rect(170, 150, 75, 75)} onClick={start}>
        start
      </button>
      {PADS.map((pad, i) => (
        <button
          key={i}
          className={`fl-button simon-pad${lit === i ? " lit" : ""}`}
          style={{ ...rect(pad.x, pad.y, 100, 100), "--dark": pad.dark, "--bright": pad.bright } as CSSProperties}
          aria-label={["Red", "Green", "Blue", "Yellow"][i]}
          onClick={() => pressPad(i)}
        />
      ))}
      <FlMessage message={message} onClose={() => setMessage(null)} />
    </FlWindow>
  );
}
