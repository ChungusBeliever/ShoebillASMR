import { useState } from "react";
import { COLOURS, MAX_CLICKS, SIZE, flood, isFlooded, randomGrid, type Grid } from "./flood";
import "./FloodSimulator.css";

export default function FloodSimulator() {
  const [grid, setGrid] = useState<Grid>(randomGrid);
  const [clicks, setClicks] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const outOfClicks = clicks >= MAX_CLICKS;

  const chooseColour = (colour: number) => {
    const used = clicks + 1;
    const next = flood(grid, colour);
    setClicks(used);
    setGrid(next);

    if (isFlooded(next)) {
      setMessage("you win");
    } else if (used === MAX_CLICKS) {
      setMessage("you lose");
    }
  };

  return (
    <section className="flood" aria-label="Hurricane Simulator 2021">
      <div className="flood__controls">
        {COLOURS.map((colour, index) => (
          <button
            key={colour}
            type="button"
            className="flood__colour"
            style={{ backgroundColor: colour }}
            aria-label={`Flood with colour ${index + 1}`}
            disabled={outOfClicks}
            onClick={() => chooseColour(index)}
          />
        ))}
        <output className="flood__clicks">
          {clicks}/{MAX_CLICKS}
        </output>
      </div>

      <div
        className="flood__board"
        style={{ gridTemplateColumns: `repeat(${SIZE}, 30px)` }}
        role="img"
        aria-label={`Flood board, ${clicks} clicks used`}
      >
        {grid.map((colour, loc) => (
          <div key={loc} className="flood__cell" style={{ backgroundColor: COLOURS[colour] }} />
        ))}
      </div>

      {message && (
        <div className="flood__message" role="alertdialog" aria-label={message}>
          <p>{message}</p>
          <button type="button" autoFocus onClick={() => setMessage(null)}>
            OK
          </button>
        </div>
      )}
    </section>
  );
}
