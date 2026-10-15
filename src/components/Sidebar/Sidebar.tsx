import { useState } from "react";
import { Link } from "react-router-dom";
import { NAV_ITEMS } from "../../data/navItems";
import "./Sidebar.css";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const active = open ? " active" : "";

  return (
    <>
      <div
        className={`menu-button${active}`}
        role="button"
        tabIndex={0}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
      >
        ☰
      </div>
      <nav className={`sidebar${active}`}>
        {NAV_ITEMS.map((item) => (
          <Link key={item.path} to={item.path}>
            {item.title}
          </Link>
        ))}
      </nav>
    </>
  );
}
