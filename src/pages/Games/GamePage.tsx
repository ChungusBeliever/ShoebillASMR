import { Link, useParams } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";
import { findGame } from "../../games/registry";
import "./GamePage.css";

export default function GamePage() {
  const { slug } = useParams();
  const game = findGame(slug);

  if (!game) {
    return (
      <PageLayout title="Games" shadedTitle>
        <p>That game doesn't exist.</p>
        <Link to="/games">Back to games</Link>
      </PageLayout>
    );
  }

  const Game = game.Component;
  return (
    <PageLayout title={game.title} shadedTitle>
      <div className="game-stage">
        <Game />
      </div>
      <Link to="/games">Back to games</Link>
    </PageLayout>
  );
}
