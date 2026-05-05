import { Link } from 'react-router-dom';

interface Fixture {
  id: number;
  home: string;
  away: string;
  date: string;
  time: string;
  venue: string;
}

interface Standing {
  name: string;
  points: number;
  gf: number;
  ga: number;
}

function Dashboard() {
  const fixtures: Fixture[] = [
    { id: 1, home: 'Lions', away: 'Eagles', date: 'SAT, OCT 14', time: '4:00 PM', venue: 'Main Field' },
    { id: 2, home: 'Software 200L', away: 'Cyber 200L', date: 'WED, OCT 18', time: '3:00 PM', venue: 'Court 2' }
  ];

  const standings: Standing[] = [
    { name: 'Software 200L', points: 24, gf: 58, ga: 24 },
    { name: 'Cyber 100L', points: 22, gf: 45, ga: 23 },
    { name: 'Cyber 200L', points: 21, gf: 44, ga: 25 },
    { name: 'Mechatronics 300L', points: 20, gf: 38, ga: 22 }
  ];

  return (
    <div className="dashboard-container">
      <h1>Welcome Back, Mohammed</h1>
      <p className="subtitle">Here's your matchday overview.</p>

      <div className="standings-card">
        <h3>League Standings</h3>
        <table className="standings-table">
          <thead>
            <tr><th>Team</th><th>PTS</th><th>GF</th><th>GA</th></tr>
          </thead>
          <tbody>
            {standings.map(team => (
              <tr key={team.name}>
                <td>{team.name}</td>
                <td className="pts">{team.points}</td>
                <td>{team.gf}</td>
                <td>{team.ga}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/standings" className="full-table-link">Full Table →</Link>
      </div>

      <div className="fixtures-section">
        <h3>Upcoming Fixtures</h3>
        {fixtures.map(fixture => (
          <Link key={fixture.id} to={`/match/${fixture.id}`} className="fixture-card">
            <div className="fixture-title">{fixture.home} vs {fixture.away}</div>
            <div className="fixture-datetime">{fixture.date} at {fixture.time}, {fixture.venue}</div>
          </Link>
        ))}
      </div>

      <div className="bottom-nav">
        <Link to="/">Home</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/standings">Standings</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <div className="nav-spacer"></div>
    </div>
  );
}

export default Dashboard;