import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import ScheduleMatch from './components/ScheduleMatch';

function Admin() {
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [newTournament, setNewTournament] = useState({ name: '', type: 'round_robin', season: '' });
  const [teams, setTeams] = useState<any[]>([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    fetchTournaments();
    fetchTeams();
  }, []);

  async function fetchTournaments() {
    const { data } = await supabase.from('tournaments').select('*');
    setTournaments(data || []);
  }
  async function fetchTeams() {
    const { data } = await supabase.from('teams').select('*');
    setTeams(data || []);
  }

  const createTournament = async () => {
    const { error } = await supabase.from('tournaments').insert(newTournament);
    if (!error) fetchTournaments();
    else alert(error.message);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-black mb-8">Admin Portal</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Tournament */}
        <div className="config-card">
          <h2 className="text-xl font-black mb-4">Create Tournament</h2>
          <input type="text" placeholder="Name" value={newTournament.name} onChange={e=>setNewTournament({...newTournament, name:e.target.value})} className="input-box w-full mb-3" />
          <select value={newTournament.type} onChange={e=>setNewTournament({...newTournament, type:e.target.value})} className="input-box w-full mb-3">
            <option value="round_robin">Round Robin</option>
            <option value="knockout">Knockout</option>
          </select>
          <input type="text" placeholder="Season (e.g., 2026)" value={newTournament.season} onChange={e=>setNewTournament({...newTournament, season:e.target.value})} className="input-box w-full mb-3" />
          <button onClick={createTournament} className="btn-primary px-6 py-2 rounded-lg">Create</button>
        </div>

        {/* Schedule Match */}
        <div className="config-card">
          <h2 className="text-xl font-black mb-4">Schedule Match</h2>
          <button onClick={() => setShowScheduleModal(true)} className="bg-[#1a061e] text-white px-6 py-2 rounded-lg">Schedule New Match</button>
        </div>

        {/* List Tournaments */}
        <div className="config-card col-span-2">
          <h2 className="text-xl font-black mb-4">Tournaments</h2>
          <ul>
            {tournaments.map(t => <li key={t.id} className="border-b py-2">{t.name} ({t.type})</li>)}
          </ul>
        </div>
      </div>
      {showScheduleModal && <ScheduleMatch onClose={()=>setShowScheduleModal(false)} teams={teams} />}
    </div>
  );
}

export default Admin;