import { Link } from 'react-router-dom';

interface Team {
  name: string;
  points: number;
  gf: number;
  ga: number;
  played: number;
}

function StandingsPage() {
  const teams: Team[] = [
    { name: 'Software 200L', points: 24, gf: 58, ga: 24, played: 10 },
    { name: 'Cyber 100L', points: 22, gf: 45, ga: 23, played: 10 },
    { name: 'Cyber 200L', points: 21, gf: 44, ga: 25, played: 10 },
    { name: 'Mechatronics 300L', points: 20, gf: 38, ga: 22, played: 10 },
    { name: 'Theatre Art 100L', points: 18, gf: 35, ga: 30, played: 10 },
    { name: 'Civil Eng 100L', points: 16, gf: 30, ga: 28, played: 10 }
  ];

  return (
    <div className="standings-page">
      <Link to="/" className="back-link">← Back to Dashboard</Link>
      <h1>League Standings</h1>
      <table className="full-standings-table">
        <thead>
          <tr><th>Team</th><th>P</th><th>PTS</th><th>GF</th><th>GA</th></tr>
        </thead>
        <tbody>
          {teams.map((team, idx) => (
            <tr key={team.name}>
              <td>{idx+1}. {team.name}</td>
              <td>{team.played}</td>
              <td className="pts">{team.points}</td>
              <td>{team.gf}</td>
              <td>{team.ga}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StandingsPage;