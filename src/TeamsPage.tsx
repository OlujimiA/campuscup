import { Link } from 'react-router-dom';

interface TeamInfo {
  name: string;
  rank: number;
  division: string;
  record: string;
  pts: number;
  gf: number;
  ga: number;
}

function TeamsPage() {
  const teams: TeamInfo[] = [
    { name: 'Civil Engineering 100L', rank: 2, division: 'Western', record: '14-3-1', pts: 43, gf: 41, ga: 20 },
    { name: 'Mechatronics 200L', rank: 1, division: 'Northern', record: '15-2-1', pts: 46, gf: 52, ga: 18 },
    { name: 'Software 100L', rank: 3, division: 'Eastern', record: '12-4-2', pts: 38, gf: 45, ga: 22 }
  ];

  return (
    <div className="teams-page">
      <Link to="/" className="back-link">← Back</Link>
      <h1>League Teams</h1>
      <p className="teams-subtitle">Explore the current roster of teams</p>
      {teams.map(team => (
        <div key={team.name} className="team-card">
          <div className="team-header">
            <h3>{team.name}</h3>
            <span className="rank">Rank #{team.rank}</span>
          </div>
          <div className="team-details">
            <span>{team.division} Division</span>
            <span>Record: {team.record}</span>
          </div>
          <div className="team-stats">
            <span>PTS: {team.pts}</span>
            <span>GF: {team.gf}</span>
            <span>GA: {team.ga}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeamsPage;