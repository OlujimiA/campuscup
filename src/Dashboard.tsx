import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

const client = generateClient<Schema>();

type Team = {
  id: string;
  name: string;
  logoUrl?: string | null;
};

type Match = {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  scheduledDate: string;
  venue?: string | null;
  state?: string | null;
  scoreHome?: number | null;
  scoreAway?: number | null;
};

function Dashboard() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const [teamsRes, matchesRes] = await Promise.all([
      client.models.Team.list(),
      client.models.Match.list(),
    ]);

    setTeams(teamsRes.data || []);
    setMatches(matchesRes.data || []);

    setLoading(false);
  }

  function getTeam(teamId: string) {
    return teams.find((t) => t.id === teamId);
  }

  const liveMatch = matches.find(
    (m) => m.state === "live" || m.state === "halftime"
  );

  const upcomingMatches = matches
    .filter((m) => m.state === "scheduled")
    .sort(
      (a, b) =>
        new Date(a.scheduledDate).getTime() -
        new Date(b.scheduledDate).getTime()
    )
    .slice(0, 5);

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-container">

      {/* LIVE MATCH */}
      {liveMatch && (
        <section className="score-card w-full p-6 md:p-12 mb-8 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            <div className="text-center">
              <h2 className="text-lg font-extrabold">
                {getTeam(liveMatch.homeTeamId)?.name ?? "Home"}
              </h2>
            </div>

            <div className="text-6xl font-black flex items-center space-x-4">
              <span>{liveMatch.scoreHome ?? 0}</span>
              <span className="text-gray-300">-</span>
              <span>{liveMatch.scoreAway ?? 0}</span>
            </div>

            <div className="text-center">
              <h2 className="text-lg font-extrabold">
                {getTeam(liveMatch.awayTeamId)?.name ?? "Away"}
              </h2>
            </div>

          </div>

          <div className="text-center mt-6">
            <Link
              to={`/match/${liveMatch.id}`}
              className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold"
            >
              View Match Feed
            </Link>
          </div>
        </section>
      )}

      {/* UPCOMING MATCHES */}
      <div className="fixtures-section">
        <h3>Upcoming Fixtures</h3>

        {upcomingMatches.map((match) => {
          const home = getTeam(match.homeTeamId);
          const away = getTeam(match.awayTeamId);

          return (
            <Link
              key={match.id}
              to={`/match/${match.id}`}
              className="fixture-card"
            >
              <div className="fixture-title">
                {home?.name ?? "Home"} vs {away?.name ?? "Away"}
              </div>

              <div className="fixture-datetime">
                {new Date(match.scheduledDate).toLocaleDateString()} at{" "}
                {new Date(match.scheduledDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                {match.venue ? `, ${match.venue}` : ""}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;