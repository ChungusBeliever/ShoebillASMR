import { useEffect, useReducer } from "react";
import errorSound from "./sounds/errorsound.mp3";
import { PADS, randomPad } from "./pads";
import { initialState, simonReducer } from "./simonReducer";
import { useSound } from "./useSound";

const FIRST_FLASH_MS = 1000; // pause before Simon starts showing the sequence
const FLASH_INTERVAL_MS = 1000; // time between the start of one flash and the next
const FLASH_DURATION_MS = 500;

export function useSimonSays() {
  const [state, dispatch] = useReducer(simonReducer, initialState);
  const sound = useSound();

  // Simon's turn: flash every pad in the sequence, then hand over to the player.
  useEffect(() => {
    if (state.phase !== "showing") return;

    const timers: number[] = [];
    const at = (ms: number, callback: () => void) => timers.push(window.setTimeout(callback, ms));

    state.sequence.forEach((pad, i) => {
      const flashAt = FIRST_FLASH_MS + i * FLASH_INTERVAL_MS;
      at(flashAt, () => {
        dispatch({ type: "light", pad });
        sound.play(PADS[pad].sound);
      });
      at(flashAt + FLASH_DURATION_MS, () => {
        dispatch({ type: "unlight" });
        sound.stop();
      });
    });
    at(FIRST_FLASH_MS + (state.sequence.length - 1) * FLASH_INTERVAL_MS + FLASH_DURATION_MS, () => dispatch({ type: "showingDone" }));

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [state.phase, state.sequence, sound]);

  // Player's turn: one second per tick. Every correct press changes `position`,
  // which restarts this timer and gives the player a fresh set of seconds.
  useEffect(() => {
    if (state.phase !== "playing") return;
    const id = window.setTimeout(() => dispatch({ type: "tick" }), 1000);
    return () => window.clearTimeout(id);
  }, [state.phase, state.position, state.secondsLeft]);

  useEffect(() => {
    if (state.lostMessage) sound.play(errorSound);
  }, [state.lostMessage, sound]);

  const start = () => {
    sound.stop();
    dispatch({ type: "start", firstPad: randomPad() });
  };

  const press = (pad: number) => {
    if (state.phase !== "playing") return;
    if (state.sequence[state.position] === pad) sound.play(PADS[pad].sound);
    dispatch({ type: "press", pad, nextPad: randomPad() });
  };

  const dismissMessage = () => dispatch({ type: "dismissMessage" });

  return { state, start, press, dismissMessage };
}
