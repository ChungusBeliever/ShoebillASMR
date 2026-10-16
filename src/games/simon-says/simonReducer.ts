// All of the game's rules live here as a pure state machine, so they're easy to read and test.
// Timers, sound and randomness are handled in useSimonSays.ts and passed in through actions.

export const SECONDS_PER_MOVE = 5;

export type Phase = "idle" | "showing" | "playing";

export interface SimonState {
  phase: Phase;
  /** The pads Simon has picked so far (indexes into PADS). */
  sequence: number[];
  /** How many pads of the sequence the player has repeated this level. */
  position: number;
  level: number;
  /** The pad that is currently flashing, if any. */
  litPad: number | null;
  secondsLeft: number;
  lostMessage: string | null;
}

export type SimonAction =
  | { type: "start"; firstPad: number }
  | { type: "light"; pad: number }
  | { type: "unlight" }
  | { type: "showingDone" }
  | { type: "press"; pad: number; nextPad: number }
  | { type: "tick" }
  | { type: "dismissMessage" };

export const initialState: SimonState = {
  phase: "idle",
  sequence: [],
  position: 0,
  level: 1,
  litPad: null,
  secondsLeft: 0,
  lostMessage: null,
};

function lose(state: SimonState): SimonState {
  return { ...initialState, lostMessage: `You lose! You beat up to level ${state.level - 1}` };
}

export function simonReducer(state: SimonState, action: SimonAction): SimonState {
  switch (action.type) {
    case "start":
      return { ...initialState, phase: "showing", sequence: [action.firstPad] };

    case "light":
      return { ...state, litPad: action.pad };

    case "unlight":
      return { ...state, litPad: null };

    case "showingDone":
      return { ...state, phase: "playing", position: 0, litPad: null, secondsLeft: SECONDS_PER_MOVE };

    case "press": {
      if (state.phase !== "playing") return state;
      if (state.sequence[state.position] !== action.pad) return lose(state);

      const position = state.position + 1;
      if (position < state.sequence.length) {
        return { ...state, position, secondsLeft: SECONDS_PER_MOVE };
      }
      // Whole sequence repeated: next level, Simon adds one more pad.
      return { ...state, phase: "showing", position: 0, level: state.level + 1, sequence: [...state.sequence, action.nextPad] };
    }

    case "tick": {
      if (state.phase !== "playing") return state;
      const secondsLeft = state.secondsLeft - 1;
      return secondsLeft > 0 ? { ...state, secondsLeft } : lose(state);
    }

    case "dismissMessage":
      return { ...state, lostMessage: null };
  }
}
