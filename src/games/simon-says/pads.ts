import redFlash from "./sounds/redflash.mp3";
import greenFlash from "./sounds/greenflash.mp3";
import blueFlash from "./sounds/blueflash.mp3";
import yellowFlash from "./sounds/yellowflash.mp3";

export interface Pad {
  /** Also used for the CSS class (simon__pad--red) and the button's accessible name. */
  name: "red" | "green" | "blue" | "yellow";
  sound: string;
}

// Order matters: it's the order of the pads on the board (top-left, top-right, bottom-left, bottom-right).
export const PADS: Pad[] = [
  { name: "red", sound: redFlash },
  { name: "green", sound: greenFlash },
  { name: "blue", sound: blueFlash },
  { name: "yellow", sound: yellowFlash },
];

export const randomPad = (): number => Math.floor(Math.random() * PADS.length);
