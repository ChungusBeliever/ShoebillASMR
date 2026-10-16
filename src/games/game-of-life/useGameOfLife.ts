import { useEffect, useState } from "react";
import { emptyGrid, nextGeneration, toggleCell, withCells, type Grid } from "./grid";
import { GLIDER, LEXICONS } from "./lexicon";

const STEP_MS = 200;

/** Owns the board and the run/pause timer; the component only renders and forwards clicks. */
export function useGameOfLife() {
  const [grid, setGrid] = useState<Grid>(emptyGrid);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setGrid(nextGeneration), STEP_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const toggle = (index: number) => setGrid((prev) => toggleCell(prev, index));

  const reset = () => {
    setRunning(false);
    setGrid(emptyGrid());
  };

  const toggleRunning = () => {
    if (!running) setGrid(nextGeneration); // prime the board so it moves on the first tick
    setRunning((prev) => !prev);
  };

  // The glider shortcut only works while paused, like the original button.
  const addGlider = () => {
    if (!running) setGrid(withCells(LEXICONS[GLIDER].cells));
  };

  const chooseLexicon = (index: number) => {
    setRunning(false);
    setGrid(withCells(LEXICONS[index].cells));
  };

  return { grid, running, toggle, reset, toggleRunning, addGlider, chooseLexicon };
}
