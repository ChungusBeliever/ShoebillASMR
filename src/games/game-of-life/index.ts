import type { GameDefinition } from "../types";
import GameOfLife from "./GameOfLife";

const game: GameDefinition = { slug: "game-of-life", title: "Game of Life", Component: GameOfLife };
export default game;
