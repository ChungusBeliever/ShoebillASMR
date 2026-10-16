import { useEffect, useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useMp3Player } from "./useMp3Player";
import "./Mp3Player.css";

interface MenuEntry {
  label: string;
  shortcut: string;
  action: () => void;
}

interface Menu {
  label: string;
  /** Present on menus that open a dropdown instead of acting immediately. */
  items?: MenuEntry[];
  action?: () => void;
}

export default function Mp3Player() {
  const player = useMp3Player();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const folderInput = useRef<HTMLInputElement>(null);
  const filesInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Turns the first input into a directory chooser, like the original one.
    folderInput.current?.setAttribute("webkitdirectory", "");
  }, []);

  const pickFolder = () => folderInput.current?.click();
  const pickFiles = () => filesInput.current?.click();

  const addPicked = (event: ChangeEvent<HTMLInputElement>) => {
    player.add(Array.from(event.target.files ?? []));
    event.target.value = ""; // so picking the same files twice still counts as a change
  };

  const menus: Menu[] = [
    {
      label: "File",
      items: [
        { label: "Add folder", shortcut: "F5", action: pickFolder },
        { label: "Add files", shortcut: "F6", action: pickFiles },
      ],
    },
    { label: "Clear", action: player.clear },
    {
      label: "Go",
      items: [
        { label: "Playing", shortcut: "p", action: player.selectPlaying },
        { label: "Random", shortcut: "r", action: player.selectRandom },
        { label: "First", shortcut: "f", action: player.selectFirst },
        { label: "Last", shortcut: "l", action: player.selectLast },
      ],
    },
  ];

  const shortcuts: Record<string, () => void> = {
    F5: pickFolder,
    F6: pickFiles,
    c: player.clear,
    p: player.selectPlaying,
    r: player.selectRandom,
    f: player.selectFirst,
    l: player.selectLast,
    Enter: player.play,
    " ": player.stop,
    Backspace: player.remove,
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const action = shortcuts[event.key];
    if (!action) return;
    event.preventDefault();
    action();
  };

  return (
    <section className="mp3" aria-label="MP3 Player" tabIndex={0} onKeyDown={handleKeyDown}>
      <div className="mp3__menubar" onMouseLeave={() => setOpenMenu(null)}>
        {menus.map((menu) => (
          <div className="mp3__menu" key={menu.label}>
            <button
              type="button"
              onClick={() => {
                if (!menu.items) {
                  menu.action?.();
                  setOpenMenu(null);
                  return;
                }
                setOpenMenu(openMenu === menu.label ? null : menu.label);
              }}
            >
              {menu.label}
            </button>

            {menu.items && openMenu === menu.label && (
              <ul className="mp3__dropdown">
                {menu.items.map((item) => (
                  <li key={item.label}>
                    <button type="button" onClick={item.action}>
                      <span>{item.label}</span>
                      <kbd>{item.shortcut}</kbd>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <output className="mp3__now-playing">{player.nowPlaying}</output>

      <ul className="mp3__songs" role="listbox" aria-label="Songs">
        {player.songs.map((song, index) => (
          <li
            key={song.url}
            role="option"
            aria-selected={player.selected === index}
            className={player.selected === index ? "is-selected" : undefined}
            onClick={() => player.select(index)}
          >
            {song.name}
          </li>
        ))}
      </ul>

      <div className="mp3__controls">
        <button type="button" title="Previous" aria-label="Previous" onClick={player.previous}>
          ◀◀
        </button>
        <button type="button" title="Play / Enter" aria-label="Play" onClick={player.play}>
          ▶
        </button>
        <button type="button" title="Stop / Spacebar" aria-label="Stop" onClick={player.stop}>
          ■
        </button>
        <button type="button" title="Next" aria-label="Next" onClick={player.next}>
          ▶▶
        </button>
        <button type="button" title="Remove / Backspace" aria-label="Remove" onClick={player.remove}>
          ↶
        </button>
      </div>

      <input ref={folderInput} type="file" multiple accept=".mp3,audio/mpeg" hidden onChange={addPicked} />
      <input ref={filesInput} type="file" multiple accept=".mp3,audio/mpeg" hidden onChange={addPicked} />
    </section>
  );
}
