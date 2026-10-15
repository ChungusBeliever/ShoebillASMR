import type { CSSProperties, ReactNode } from "react";
import "./Fltk.css";

interface FlWindowProps {
  title: string;
  width: number;
  height: number;
  children: ReactNode;
  style?: CSSProperties;
  onClose?: () => void;
}

/** A fixed-size, FLTK-looking window. Children are positioned with rect(x, y, w, h). */
export default function FlWindow({ title, width, height, children, style, onClose }: FlWindowProps) {
  return (
    <div className="fl-window" style={{ width, ...style }}>
      <div className="fl-titlebar">
        <span>{title}</span>
        {onClose && (
          <button className="fl-close" aria-label="Close window" onClick={onClose}>
            ×
          </button>
        )}
      </div>
      <div className="fl-body" style={{ width, height }}>
        {children}
      </div>
    </div>
  );
}
