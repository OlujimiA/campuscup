import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import RegisterPlayer from './components/RegisterPlayer';

function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    setProfile(prof);
    if (prof?.team_id) {
      const { data: t } = await supabase.from('teams').select('*').eq('id', prof.team_id).single();
      setTeam(t);
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-card p-8">
        <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-8">
          <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center text-5xl font-black">
            {profile?.first_name?.[0]}{profile?.last_name?.[0]}
          </div>
          <div>
            <h2 className="text-3xl font-black">{profile?.first_name} {profile?.last_name}</h2>
            <p className="text-gray-500">{profile?.email}</p>
            <p className="text-sm capitalize mt-2">Role: {profile?.role}</p>
            {team && <p className="text-sm mt-1">Team: {team.name}</p>}
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-black mb-4">Actions</h3>
          {profile?.role === 'player' && !profile?.team_id && (
            <button onClick={() => setShowPlayerModal(true)} className="btn-primary px-6 py-2 rounded-lg">Register as Player</button>
          )}
          {profile?.role === 'captain' && (
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg">Manage Team</button>
          )}
        </div>
      </div>
      {showPlayerModal && <RegisterPlayer onClose={() => { setShowPlayerModal(false); loadProfile(); }} />}
    </div>
  );
}

export default Profile;