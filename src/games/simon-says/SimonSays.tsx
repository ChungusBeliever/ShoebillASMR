import { PADS } from "./pads";
import { useSimonSays } from "./useSimonSays";
import "./SimonSays.css";

export default function SimonSays() {
  const { state, start, press, dismissMessage } = useSimonSays();
  const levelText = state.phase === "idle" ? "Click start to play" : `Level: ${state.level}`;

  return (
    <section className="simon" aria-label="Simon Says">
      <header className="simon__header">
        <output className="simon__readout">{state.secondsLeft} seconds left</output>
        <p className="simon__title">simon says!!!</p>
      </header>

      <div className="simon__board">
        {PADS.map((pad, i) => (
          <button
            key={pad.name}
            type="button"
            className={`simon__pad simon__pad--${pad.name}${state.litPad === i ? " is-lit" : ""}`}
            aria-label={pad.name}
            onClick={() => press(i)}
          />
        ))}
        <button type="button" className="simon__start" onClick={start}>
          start
        </button>
      </div>

      <output className="simon__readout simon__level">{levelText}</output>

      {state.lostMessage && (
        <div className="simon__message" role="alertdialog" aria-label={state.lostMessage}>
          <p>{state.lostMessage}</p>
          <button type="button" autoFocus onClick={dismissMessage}>
            OK
          </button>
        </div>
      )}
    </section>
  );
}
