export const SIZE = 14;
export const MAX_CLICKS = 500;

/** Green, red and blue, then three colour-cube shades, matching the original palette. */
export const COLOURS = ["rgb(0, 255, 0)", "rgb(255, 0, 0)", "rgb(0, 0, 255)", "rgb(0, 255, 255)", "rgb(0, 109, 255)", "rgb(255, 0, 255)"];

/** One colour index per cell, row-major. */
export type Grid = number[];

export const randomGrid = (): Grid => Array.from({ length: SIZE * SIZE }, () => Math.floor(Math.random() * COLOURS.length));

/** Repaints every cell connected to the top-left cell and sharing its colour, and returns the new grid. */
export function flood(grid: Grid, colour: number): Grid {
  const next = grid.slice();
  floodedCells(grid).forEach((loc) => (next[loc] = colour));
  return next;
}

/** True once the whole board shows the same colour. */
export const isFlooded = (grid: Grid): boolean => grid.every((colour) => colour === grid[0]);

/** Every cell connected to the top-left cell that shares its colour. */
function floodedCells(grid: Grid): number[] {
  const colour = grid[0];
  const seen = new Set<number>([0]);
  const stack = [0];

  while (stack.length > 0) {
    const loc = stack.pop()!;
    for (const neighbour of neighbours(loc)) {
      if (!seen.has(neighbour) && grid[neighbour] === colour) {
        seen.add(neighbour);
        stack.push(neighbour);
      }
    }
  }
  return [...seen];
}

function neighbours(loc: number): number[] {
  const x = loc % SIZE;
  const result: number[] = [];
  if (loc >= SIZE) result.push(loc - SIZE); // above
  if (loc < SIZE * (SIZE - 1)) result.push(loc + SIZE); // below
  if (x !== 0) result.push(loc - 1); // left
  if (x !== SIZE - 1) result.push(loc + 1); // right
  return result;
}
