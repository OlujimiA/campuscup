import { Link } from 'react-router-dom';

function ProfilePage() {
  const player = {
    name: 'Mohammed Taofiq',
    role: 'Attacking Midfielder',
    department: 'Software 200L',
    goals: 32,
    assists: 10,
    dob: 'Oct 12, 2008 (18)',
    nationality: 'Nigeria',
    height: '1.82m',
    weight: '76kg',
    foot: 'Right'
  };

  return (
    <div className="profile-page">
      <Link to="/" className="back-link">← Back</Link>
      <div className="profile-avatar">👤</div>
      <h2>{player.name}</h2>
      <p className="player-role">{player.role} • {player.department}</p>

      <div className="stats-card">
        <h3>Career Stats</h3>
        <div className="stats-row">
          <div><span className="stat-number">{player.goals}</span><br />GOALS</div>
          <div><span className="stat-number">{player.assists}</span><br />ASSISTS</div>
        </div>
      </div>

      <div className="info-card">
        <h3>Personal Details</h3>
        <p>Date of Birth: {player.dob}</p>
        <p>Nationality: {player.nationality}</p>
        <p>Height / Weight: {player.height} / {player.weight}</p>
        <p>Preferred Foot: {player.foot}</p>
      </div>

      <div className="info-card">
        <h3>Career Timeline</h3>
        <p><strong>2018-2019</strong> – Software 100L: Breakout season. Scored 45 goals.</p>
        <p><strong>2020-2022</strong> – London City FC: Captain, back-to-back titles.</p>
      </div>

      <button className="delete-button">Delete My Account (Anonymize)</button>
    </div>
  );
}

export default ProfilePage;