export const SIZE = 10;
export const BOMBS = 10;
const CELLS = SIZE * SIZE;

export interface Cell {
  bomb: boolean;
  /** Bombs in the eight neighbouring cells. */
  around: number;
  open: boolean;
  flag: boolean;
  exploded: boolean;
}

export type Status = "ready" | "playing" | "won" | "lost";

/** A fresh board with BOMBS mines, and every cell's neighbour count filled in. */
export function newBoard(): Cell[] {
  const cells: Cell[] = Array.from({ length: CELLS }, () => ({ bomb: false, around: 0, open: false, flag: false, exploded: false }));

  const free = cells.map((_, index) => index);
  for (let placed = 0; placed < BOMBS; placed++) {
    const pick = Math.floor(Math.random() * free.length);
    cells[free[pick]].bomb = true;
    free.splice(pick, 1);
  }

  cells.forEach((cell, loc) => {
    if (cell.bomb) neighbours(loc).forEach((neighbour) => (cells[neighbour].around += 1));
  });
  return cells;
}

/** Opens a cell; an empty cell spreads outwards until it reaches numbers or bombs. */
export function reveal(cells: Cell[], start: number): Cell[] {
  const next = cells.map((cell) => ({ ...cell }));
  const stack = [start];

  while (stack.length > 0) {
    const loc = stack.pop()!;
    const cell = next[loc];
    if (cell.open || cell.flag || cell.bomb) continue;
    cell.open = true;
    if (cell.around === 0) stack.push(...neighbours(loc));
  }
  return next;
}

/** True once every cell that is not a bomb has been opened. */
export const isSolved = (cells: Cell[]): boolean => cells.filter((cell) => cell.open).length === CELLS - BOMBS;

/** Indexes of the (up to eight) cells touching the one at loc. */
function neighbours(loc: number): number[] {
  const x = loc % SIZE;
  const y = Math.floor(loc / SIZE);
  const result: number[] = [];
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if ((dx === 0 && dy === 0) || nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) continue;
      result.push(ny * SIZE + nx);
    }
  }
  return result;
}
