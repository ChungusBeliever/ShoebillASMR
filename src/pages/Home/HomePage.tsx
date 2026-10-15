import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";

export default function HomePage() {
  return (
    <PageLayout title="The Shoebill" shadedTitle>
      <h1>Quick start</h1>
      <Link to="/asmr">Shoebill ASMR</Link>
      <Link to="/gallery">Gallery</Link>
      <h1>About</h1>
      <p>The shoebill!!!</p>
      <h1>The future</h1>
      <p>More soon!!!</p>
    </PageLayout>
  );
}
