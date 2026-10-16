import { shuffledDeck } from "./cards";

// The memory game's rules as a pure state machine, so the component only has to
// render the deck and forward clicks.

export interface MemoryState {
  /** The picture on each card, as an index into NAMES. */
  deck: number[];
  /** Layout indexes of the cards that are face-up; a matched card stays up. */
  faceUp: number[];
  /** The cards of the attempt in progress: none, one waiting, or two to compare. */
  attempt: number[];
  /** Layout indexes of the cards that have found their partner. */
  matched: number[];
  /** How many times the player has flipped a card. */
  flips: number;
}

export type MemoryAction = { type: "flip"; index: number } | { type: "reset" };

export const createGame = (): MemoryState => ({ deck: shuffledDeck(), faceUp: [], attempt: [], matched: [], flips: 0 });

export function memoryReducer(state: MemoryState, action: MemoryAction): MemoryState {
  switch (action.type) {
    case "flip":
      return flip(state, action.index);
    case "reset":
      return createGame();
  }
}

function flip(state: MemoryState, index: number): MemoryState {
  // While a pair of cards is showing, turning over a third one sends them back
  // down and starts a fresh attempt with this card.
  const faceUp = state.attempt.length === 2 ? state.faceUp.filter((up) => !state.attempt.includes(up)) : state.faceUp;
  const flips = state.flips + 1;
  const base = { ...state, faceUp: [...faceUp, index], flips };

  if (base.attempt.length === 2) return { ...base, attempt: [index] };

  const attempt = [...state.attempt, index];
  if (attempt.length < 2) return { ...base, attempt };

  const [first, second] = attempt;
  if (state.deck[first] !== state.deck[second]) return { ...base, attempt };

  // A pair: both cards stay face-up for the rest of the game.
  return { ...base, attempt: [], matched: [...state.matched, first, second] };
}
