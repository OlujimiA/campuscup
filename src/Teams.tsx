import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import RegisterTeam from './components/RegisterTeam';

function Teams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetchTeams();
    getUser();
  }, []);

  async function getUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setCurrentUser(profile);
    }
  }

  async function fetchTeams() {
    const { data } = await supabase.from('teams').select('*, captain_id(*)');
    setTeams(data || []);
  }

  const isCaptain = currentUser?.role === 'captain';

  return (
    <div className="teams-page">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-black">LEAGUE TEAMS</h1>
        {isCaptain && (
          <button onClick={() => setShowRegisterModal(true)} className="bg-[#be185d] text-white px-4 py-2 rounded-full text-sm font-bold">
            + Register Team
          </button>
        )}
      </div>
      <p className="teams-subtitle">Explore the current roster of teams competing in the Campus Cup premier league.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {teams.map(team => (
          <div key={team.id} className="team-card-v2 relative">
            {currentUser?.team_id === team.id && <div className="my-team-tag">My Team</div>}
            <div className="h-[100px] bg-gradient-to-b from-[#1a061e] to-[#f472b6]"></div>
            <div className="team-logo-overlay">
              {team.logo_url ? (
                <img src={team.logo_url} alt="logo" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="w-full h-full bg-[#1a061e] rounded-full flex items-center justify-center text-white font-black text-xs">
                  {team.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="px-6 pt-12 pb-6">
              <h3 className="text-xl font-black">{team.name}</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Captain: {team.captain_id?.first_name} {team.captain_id?.last_name}</p>
              <div className="stats-grid-bg p-4 flex justify-between text-center mt-4">
                <div><p className="text-[9px] font-bold uppercase">PTS</p><p className="text-lg font-black">{team.stats?.points || 0}</p></div>
                <div><p className="text-[9px] font-bold uppercase">GF</p><p className="text-lg font-black">{team.stats?.goals_for || 0}</p></div>
                <div><p className="text-[9px] font-bold uppercase">GA</p><p className="text-lg font-black">{team.stats?.goals_against || 0}</p></div>
              </div>
              <Link to={`/team/${team.id}`} className="block text-center mt-4 text-pink-500 text-xs font-bold">View Details →</Link>
            </div>
          </div>
        ))}
      </div>

      {showRegisterModal && <RegisterTeam onClose={() => { setShowRegisterModal(false); fetchTeams(); }} />}
    </div>
  );
}

export default Teams;