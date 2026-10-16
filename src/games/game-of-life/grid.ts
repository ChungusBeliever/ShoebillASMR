export const SIZE = 80;
const CELLS = SIZE * SIZE;

/** One byte per cell: 0 = dead, 1 = alive. Row-major, so index = row * SIZE + column. */
export type Grid = Uint8Array;

export const emptyGrid = (): Grid => new Uint8Array(CELLS);

/** A grid with exactly the given cells alive. */
export function withCells(cells: number[]): Grid {
  const grid = emptyGrid();
  cells.forEach((index) => (grid[index] = 1));
  return grid;
}

export function toggleCell(grid: Grid, index: number): Grid {
  const next = grid.slice();
  next[index] = next[index] === 1 ? 0 : 1;
  return next;
}

/** Conway's rules, applied to every cell at once. Cells outside the grid count as dead. */
export function nextGeneration(current: Grid): Grid {
  const next = emptyGrid();
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const index = y * SIZE + x;
      const neighbours = liveNeighbours(current, x, y);
      const alive = current[index] === 1;
      const lives = alive ? neighbours === 2 || neighbours === 3 : neighbours === 3;
      next[index] = lives ? 1 : 0;
    }
  }
  return next;
}

function liveNeighbours(grid: Grid, x: number, y: number): number {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if ((dx === 0 && dy === 0) || nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) continue;
      count += grid[ny * SIZE + nx];
    }
  }
  return count;
}
