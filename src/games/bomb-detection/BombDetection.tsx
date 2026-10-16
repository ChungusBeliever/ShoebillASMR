import type { MouseEvent } from "react";
import { BOMBS, SIZE } from "./board";
import { useBombDetection } from "./useBombDetection";
import bombImage from "./bomb.png";
import flagImage from "./flag.png";
import "./BombDetection.css";

export default function BombDetection() {
  const { cells, status, seconds, message, flags, press, dismissMessage } = useBombDetection();
  const lost = status === "lost";

  const flagCell = (event: MouseEvent, loc: number) => {
    event.preventDefault();
    press(loc, true);
  };

  return (
    <section className="bomb" aria-label="Bomb Detection Simulator 2021">
      <div className="bomb__board" style={{ gridTemplateColumns: `repeat(${SIZE}, 50px)` }}>
        {cells.map((cell, loc) => {
          const showBomb = lost && cell.bomb;
          const wrongFlag = lost && cell.flag && !cell.bomb;
          const classes = ["bomb__cell", cell.open && "is-open", (cell.exploded || wrongFlag) && "is-red"].filter(Boolean).join(" ");

          return (
            <button
              key={loc}
              type="button"
              className={classes}
              disabled={cell.open}
              onClick={() => press(loc, false)}
              onContextMenu={(event) => flagCell(event, loc)}
              aria-label={`Cell ${loc + 1}`}
            >
              {showBomb ? <img src={bombImage} alt="bomb" /> : cell.flag ? <img src={flagImage} alt="flag" /> : cell.open && cell.around > 0 ? cell.around : null}
            </button>
          );
        })}
      </div>

      <div className="bomb__status">
        <output>
          mines {flags}/{BOMBS}
        </output>
        <output>{seconds} seconds</output>
      </div>

      {message && (
        <div className="bomb__message" role="alertdialog" aria-label={message}>
          <p>{message}</p>
          <button type="button" autoFocus onClick={dismissMessage}>
            OK
          </button>
        </div>
      )}
    </section>
  );
}
