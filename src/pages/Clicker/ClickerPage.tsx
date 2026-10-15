import { useState } from "react";
import PageLayout from "../../components/PageLayout/PageLayout";
import clickerImg from "../../assets/gallery/uenoshoebill1.png";
import "./ClickerPage.css";

const CASH_PER_CLICK = 1;

export default function ClickerPage() {
  const [cash, setCash] = useState(0);

  return (
    <PageLayout title="Shoebill Clicker" shadedTitle>
      <img
        className="clicker-image"
        src={clickerImg}
        alt="Click the shoebill"
        onClick={() => setCash((c) => c + CASH_PER_CLICK)}
      />
      <h2>shoe bills: {cash}</h2>
    </PageLayout>
  );
}
