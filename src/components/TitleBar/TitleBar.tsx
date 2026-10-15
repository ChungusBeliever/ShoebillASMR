import "./TitleBar.css";

const FAVICON = `${import.meta.env.BASE_URL}favicon.ico`;

interface TitleBarProps {
  title: string;
  /** Darker grey background behind the title. */
  shaded?: boolean;
}

export default function TitleBar({ title, shaded = false }: TitleBarProps) {
  return (
    <div className={shaded ? "title title--shaded" : "title"}>
      <img src={FAVICON} alt="" />
      <h2>{title}</h2>
      <img src={FAVICON} alt="" />
    </div>
  );
}
