import type { GameDefinition } from "./types";

// Every game lives in src/games/<name>/ and default-exports a GameDefinition
// from its index.ts. Adding a folder is all it takes to add a game.
const modules = import.meta.glob<{ default: GameDefinition }>("./*/index.ts", { eager: true });

export const GAMES: GameDefinition[] = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => a.title.localeCompare(b.title));

export function findGame(slug: string | undefined): GameDefinition | undefined {
  return GAMES.find((game) => game.slug === slug);
}
