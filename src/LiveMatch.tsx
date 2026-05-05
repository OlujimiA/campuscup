import { useParams, useNavigate } from 'react-router-dom';

interface MatchEvent {
  id: number;
  type: 'goal' | 'yellow' | 'substitution';
  player?: string;
  minute: number;
  desc: string;
}

interface MatchData {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  events: MatchEvent[];
}

function LiveMatch() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const matches: Record<string, MatchData> = {
    '1': {
      homeTeam: 'Lions',
      awayTeam: 'Eagles',
      homeScore: 2,
      awayScore: 1,
      events: [
        { id: 1, type: 'goal', player: 'Chibueke', minute: 23, desc: 'Stunning curling effort from outside the box. Assist by J. Davis.' },
        { id: 2, type: 'substitution', minute: 56, desc: 'SUBSTITUTION - Theatre Art 200L. In: T. Harris, Out: R. Madueke' },
        { id: 3, type: 'yellow', player: 'D. Ebuka', minute: 72, desc: 'Booked for a late challenge in midfield.' },
        { id: 4, type: 'goal', player: 'Monjaro', minute: 84, desc: 'Close-range finish following a corner kick.' }
      ]
    },
    '2': {
      homeTeam: 'Software 200L',
      awayTeam: 'Cyber 200L',
      homeScore: 0,
      awayScore: 0,
      events: []
    }
  };

  const match = matches[id || '1'];

  const getEventIcon = (type: string) => {
    switch(type) {
      case 'goal': return '⚽ GOAL';
      case 'yellow': return '🟨 YELLOW';
      case 'substitution': return '🔄 SUB';
      default: return '📢';
    }
  };

  return (
    <div className="live-match-container">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <div className="score-card">
        <div className="teams">
          <span>{match.homeTeam}</span>
          <span className="score">{match.homeScore} - {match.awayScore}</span>
          <span>{match.awayTeam}</span>
        </div>
        <div className="live-badge">LIVE • MATCH FEED</div>
      </div>
      <div className="events-feed">
        {match.events.map(event => (
          <div key={event.id} className={`event-card ${event.type}`}>
            <div className="event-header">
              <span className="event-type">{getEventIcon(event.type)}</span>
              <span className="event-minute">{event.minute}'</span>
              {event.player && <span className="event-player">{event.player}</span>}
            </div>
            <div className="event-desc">{event.desc}</div>
          </div>
        ))}
      </div>
      <button className="commentary-button">💬 Join the Commentary</button>
    </div>
  );
}

export default LiveMatch;