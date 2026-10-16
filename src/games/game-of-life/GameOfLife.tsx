import { memo, useState, type MouseEvent } from "react";
import { SIZE } from "./grid";
import { LEXICONS } from "./lexicon";
import { useGameOfLife } from "./useGameOfLife";
import "./GameOfLife.css";

/** memo keeps a click from re-rendering all 6400 cells. */
const Cell = memo(function Cell({ index, alive }: { index: number; alive: boolean }) {
  return <div className={alive ? "life__cell is-alive" : "life__cell"} data-index={index} />;
});

export default function GameOfLife() {
  const { grid, running, toggle, reset, toggleRunning, addGlider, chooseLexicon } = useGameOfLife();
  const [lexiconOpen, setLexiconOpen] = useState(false);
  const [lexiconChoice, setLexiconChoice] = useState<number | null>(null);

  const handleGridClick = (event: MouseEvent<HTMLDivElement>) => {
    const index = (event.target as HTMLElement).dataset.index;
    if (index !== undefined) toggle(Number(index));
  };

  const openLexicons = () => {
    setLexiconChoice(null);
    setLexiconOpen(true);
  };

  const addChosenLexicon = () => {
    if (lexiconChoice === null) return;
    chooseLexicon(lexiconChoice);
    setLexiconOpen(false);
  };

  return (
    <section className="life" aria-label="Game of Life">
      <div className="life__grid" style={{ gridTemplateColumns: `repeat(${SIZE}, 10px)` }} onClick={handleGridClick}>
        {Array.from(grid, (alive, index) => (
          <Cell key={index} index={index} alive={alive === 1} />
        ))}
      </div>

      <div className="life__controls">
        <button type="button" onClick={reset}>
          reset.
        </button>
        <button type="button" className="life__run" aria-pressed={running} onClick={toggleRunning}>
          {running ? "stop." : "run."}
        </button>
        <button type="button" onClick={openLexicons}>
          lexicon.
        </button>
        <button type="button" onClick={addGlider}>
          glider.
        </button>
      </div>

      {lexiconOpen && (
        <div className="life__dialog" role="dialog" aria-label="Lexicons">
          <p className="life__dialog-title">top 8 scariest lexicons (number 4 will shock you)</p>
          <ul className="life__lexicons" role="listbox" aria-label="Lexicons">
            {LEXICONS.map((lexicon, index) => (
              <li
                key={lexicon.name}
                role="option"
                aria-selected={lexiconChoice === index}
                className={lexiconChoice === index ? "is-selected" : undefined}
                onClick={() => setLexiconChoice(index)}
              >
                {lexicon.name}
              </li>
            ))}
          </ul>
          <button type="button" className="life__dialog-add" onClick={addChosenLexicon}>
            add.
          </button>
        </div>
      )}
    </section>
  );
}
