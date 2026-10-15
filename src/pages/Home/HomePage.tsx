import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";
import shoebillImg from "../../assets/shoebill.png";
import "./HomePage.css";

export default function HomePage() {
  return (
    <PageLayout title="The Shoebill" shadedTitle>
      <img src={shoebillImg} className="home-image" alt="A shoebill staring from the shadows" />
      <h1>Quick start</h1>
      <Link to="/asmr">Shoebill ASMR</Link>
      <Link to="/gallery">Gallery</Link>
      <h1>About</h1>
      <p>The shoebill!!!</p>
      <hr className="home-divider" />
      <h1>The future</h1>
      <p>More soon!!!</p>
    </PageLayout>
  );
}
