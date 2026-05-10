import { Link } from 'react-router-dom';

function Dashboard() {
  // Mock data – no state setters needed for static display
  const standings = [
    { name: 'Software 100L', points: 24, gf: 58, ga: 24 },
    { name: 'Mechatronics 200L', points: 22, gf: 45, ga: 23 },
    { name: 'Cyber 100L', points: 21, gf: 44, ga: 25 },
  ];

  const fixtures = [
    { id: 1, home: 'Lions', away: 'Eagles', date: 'SAT, OCT 14', time: '4:00 PM', venue: 'Main Field' },
    { id: 2, home: 'Software 100L', away: 'Cyber 200L', date: 'WED, OCT 18', time: '3:00 PM', venue: 'Court 2' },
  ];

  return (
    <div className="dashboard-container">
      <h1>Welcome Back</h1>
      <div className="standings-card">
        <h3>League Standings</h3>
        <table className="standings-table">
          <thead>
            <tr><th>Team</th><th>PTS</th><th>GF</th><th>GA</th></tr>
          </thead>
          <tbody>
            {standings.map((team, idx) => (
              <tr key={idx}>
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
    </div>
  );
}

export default Dashboard;