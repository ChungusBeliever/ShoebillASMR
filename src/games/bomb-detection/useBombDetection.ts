import { useEffect, useState } from "react";
import { isSolved, newBoard, reveal, type Cell, type Status } from "./board";

/** Owns the board, the clock and the "you won/lost" message. */
export function useBombDetection() {
  const [cells, setCells] = useState<Cell[]>(newBoard);
  const [status, setStatus] = useState<Status>("ready");
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "playing") return;
    const id = window.setInterval(() => setSeconds((elapsed) => elapsed + 1), 1000);
    return () => window.clearInterval(id);
  }, [status]);

  const flags = cells.filter((cell) => cell.flag).length;
  const over = status === "won" || status === "lost";

  /** Left-click opens a cell, right-click plants or removes a flag. */
  const press = (loc: number, plantFlag: boolean) => {
    if (over) return;
    if (status === "ready") setStatus("playing");

    const cell = cells[loc];
    if (plantFlag) {
      if (cell.open) return;
      setCells(cells.map((c, index) => (index === loc ? { ...c, flag: !c.flag } : c)));
      return;
    }

    if (cell.open || cell.flag) return;
    if (cell.bomb) {
      setCells(cells.map((c, index) => (index === loc ? { ...c, exploded: true } : c)));
      setStatus("lost");
      setMessage(`get exploded. you lost in ${seconds} seconds`);
      return;
    }

    const next = reveal(cells, loc);
    setCells(next);
    if (isSolved(next)) {
      setStatus("won");
      setMessage(`you won in ${seconds} seconds`);
    }
  };

  return { cells, status, seconds, message, flags, press, dismissMessage: () => setMessage(null) };
}
