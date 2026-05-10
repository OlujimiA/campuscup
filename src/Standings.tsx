import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function Standings() {
  const [standings, setStandings] = useState<any[]>([]);

  useEffect(() => {
    fetchStandings();
  }, []);

  async function fetchStandings() {
    const { data } = await supabase.from('standings_view').select('*').order('points', { ascending: false });
    setStandings(data || []);
  }

  return (
    <div className="standings-page">
      <h1>League Standings</h1>
      <table className="full-standings-table">
        <thead>
          <tr><th>Pos</th><th>Team</th><th>P</th><th>PTS</th><th>GF</th><th>GA</th></tr>
        </thead>
        <tbody>
          {standings.map((team, idx) => (
            <tr key={team.team_id}>
              <td>{idx+1}</td>
              <td>{team.name}</td>
              <td>{team.played}</td>
              <td className="pts">{team.points}</td>
              <td>{team.goals_for}</td>
              <td>{team.goals_against}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Standings;