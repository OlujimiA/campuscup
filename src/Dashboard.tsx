import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';

interface Match {
  id: string;
  home_team_id: { id: string; name: string; logo_url: string };
  away_team_id: { id: string; name: string; logo_url: string };
  scheduled_date: string;
  venue: string;
  state: string;
  score_home: number;
  score_away: number;
}

interface Standing {
  team_id: string;
  name: string;
  played: number;
  points: number;
  goals_for: number;
  goals_against: number;
}

function Dashboard() {
  const [liveMatch, setLiveMatch] = useState<Match | null>(null);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // Subscribe to realtime changes on matches
    const subscription = supabase
      .channel('matches')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, () => fetchData())
      .subscribe();
    return () => subscription.unsubscribe();
  }, []);

  async function fetchData() {
    setLoading(true);
    // Get live match (state = 'live' or 'halftime')
    const { data: live } = await supabase
      .from('matches')
      .select('*, home_team_id(*), away_team_id(*)')
      .in('state', ['live', 'halftime'])
      .single();
    setLiveMatch(live as Match);

    // Get upcoming fixtures (state = 'scheduled', order by date)
    const { data: upcoming } = await supabase
      .from('matches')
      .select('*, home_team_id(*), away_team_id(*)')
      .eq('state', 'scheduled')
      .order('scheduled_date', { ascending: true })
      .limit(5);
    setUpcomingMatches(upcoming || []);

    // Get standings from the view
    const { data: standingsData } = await supabase.from('standings_view').select('*').order('points', { ascending: false });
    setStandings(standingsData || []);
    setLoading(false);
  }

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="dashboard-container">
      {/* Live Match Card */}
      {liveMatch && (
        <section className="score-card w-full p-6 md:p-12 mb-8 relative">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full text-[10px] font-bold flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            <span>LIVE</span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center">
              <div className="team-logo-bg w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                {liveMatch.home_team_id.logo_url ? (
                  <img src={liveMatch.home_team_id.logo_url} alt="home" className="w-16 h-16 object-contain" />
                ) : (
                  <div className="w-16 h-16 bg-[#1a061e] rounded-full flex items-center justify-center text-white font-black text-xl">
                    {liveMatch.home_team_id.name.charAt(0)}
                  </div>
                )}
              </div>
              <h2 className="text-lg font-extrabold">{liveMatch.home_team_id.name}</h2>
            </div>
            <div className="text-6xl font-black flex items-center space-x-4">
              <span>{liveMatch.score_home}</span>
              <span className="text-gray-300">-</span>
              <span>{liveMatch.score_away}</span>
            </div>
            <div className="text-center">
              <div className="team-logo-bg w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                {liveMatch.away_team_id.logo_url ? (
                  <img src={liveMatch.away_team_id.logo_url} alt="away" className="w-16 h-16 object-contain" />
                ) : (
                  <div className="w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center text-white font-black text-xl">
                    {liveMatch.away_team_id.name.charAt(0)}
                  </div>
                )}
              </div>
              <h2 className="text-lg font-extrabold">{liveMatch.away_team_id.name}</h2>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link to={`/match/${liveMatch.id}`} className="inline-block bg-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">View Match Feed</Link>
          </div>
        </section>
      )}

      {/* Standings Table (compact) */}
      <div className="standings-card">
        <h3>League Standings</h3>
        <table className="standings-table">
          <thead>
            <tr><th>Team</th><th>PTS</th><th>GF</th><th>GA</th></tr>
          </thead>
          <tbody>
            {standings.slice(0, 4).map((team, idx) => (
              <tr key={team.team_id}>
                <td>{idx+1}. {team.name}</td>
                <td className="pts">{team.points}</td>
                <td>{team.goals_for}</td>
                <td>{team.goals_against}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/standings" className="full-table-link">Full Table →</Link>
      </div>

      {/* Upcoming Fixtures */}
      <div className="fixtures-section">
        <h3>Upcoming Fixtures</h3>
        {upcomingMatches.map(match => (
          <Link key={match.id} to={`/match/${match.id}`} className="fixture-card">
            <div className="fixture-title">{match.home_team_id.name} vs {match.away_team_id.name}</div>
            <div className="fixture-datetime">
              {new Date(match.scheduled_date).toLocaleDateString()} at {new Date(match.scheduled_date).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}, {match.venue}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;