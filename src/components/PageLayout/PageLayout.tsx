import type { ReactNode } from "react";
import TitleBar from "../TitleBar/TitleBar";
import Sidebar from "../Sidebar/Sidebar";
import "./PageLayout.css";

interface PageLayoutProps {
  title: string;
  shadedTitle?: boolean;
  children: ReactNode;
}

/** Title bar + centered content + sidebar, shared by every page. */
export default function PageLayout({ title, shadedTitle = false, children }: PageLayoutProps) {
  return (
    <>
      <TitleBar title={title} shaded={shadedTitle} />
      <div className="content">{children}</div>
      <Sidebar />
    </>
  );
}
