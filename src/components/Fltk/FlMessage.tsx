import "./Fltk.css";

interface FlMessageProps {
  message: string | null;
  onClose: () => void;
}

/** Stand-in for fl_message(): a small dialog laid over the window. */
export default function FlMessage({ message, onClose }: FlMessageProps) {
  if (message === null) return null;
  return (
    <div className="fl-overlay" role="alertdialog" aria-label={message}>
      <div className="fl-message">
        <p>{message}</p>
        <button className="fl-button fl-static" autoFocus onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
