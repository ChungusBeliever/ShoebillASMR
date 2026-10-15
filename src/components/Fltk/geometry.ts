import type { CSSProperties } from "react";

/** Same argument order as FLTK's Fl_Button(x, y, w, h): absolute position inside a window. */
export function rect(x: number, y: number, w: number, h: number): CSSProperties {
  return { position: "absolute", left: x, top: y, width: w, height: h };
}
