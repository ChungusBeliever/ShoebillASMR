import { useReducer } from "react";
import { NAMES, imageFor } from "./cards";
import { createGame, memoryReducer } from "./memoryReducer";
import "./MemoryGame.css";

/** A card face: the picture when it is turned up, otherwise the card back. */
function Face({ name }: { name: string | null }) {
  const src = imageFor(name ?? "questionmark");
  const label = name ?? "?";
  return src ? <img src={src} alt={label} /> : <span>{label}</span>;
}

export default function MemoryGame() {
  const [state, dispatch] = useReducer(memoryReducer, undefined, createGame);
  const faceUp = new Set(state.faceUp);
  const won = state.matched.length === state.deck.length;

  return (
    <section className="memory" aria-label="Memory Game">
      <div className="memory__board">
        {state.deck.map((picture, index) => {
          const up = faceUp.has(index);
          const name = NAMES[picture];
          return (
            <button
              key={index}
              type="button"
              className={up ? "memory__card is-up" : "memory__card"}
              disabled={up}
              onClick={() => dispatch({ type: "flip", index })}
              aria-label={up ? name : "Face-down card"}
            >
              <Face name={up ? name : null} />
            </button>
          );
        })}
      </div>

      <output className="memory__flips">{state.flips} clicks</output>

      {won && (
        <div className="memory__message" role="alertdialog" aria-label="You won">
          <p>you won in {state.flips} clicks</p>
          <button type="button" autoFocus onClick={() => dispatch({ type: "reset" })}>
            play again
          </button>
        </div>
      )}
    </section>
  );
}
