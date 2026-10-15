import { Link } from "react-router-dom";
import PageLayout from "../../components/PageLayout/PageLayout";
import { GAMES } from "../../games/registry";
import "./GamesPage.css";

export default function GamesPage() {
  return (
    <PageLayout title="Games" shadedTitle>
      {GAMES.length === 0 ? (
        <p>No games yet!!!</p>
      ) : (
        <div className="games-list">
          {GAMES.map((game) => (
            <Link key={game.slug} to={`/games/${game.slug}`}>
              {game.title}
            </Link>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
