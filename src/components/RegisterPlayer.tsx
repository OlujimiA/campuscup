import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function RegisterPlayer({ onClose }: { onClose: () => void }) {
  const [position, setPosition] = useState('');
  const [jerseyNumber, setJerseyNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    // Get current user's profile to find team (if captain)
    const { data: profile } = await supabase.from('profiles').select('team_id').eq('id', user.id).single();
    const teamId = profile?.team_id;
    if (!teamId) {
      alert('You need to join a team first. Ask a captain to add you.');
      setLoading(false);
      return;
    }
    const { error } = await supabase.from('players').insert({
      profile_id: user.id,
      team_id: teamId,
      jersey_number: parseInt(jerseyNumber),
      position,
      season_stats: { goals:0, assists:0, yellow_cards:0, red_cards:0 }
    });
    if (!error) {
      await supabase.from('profiles').update({ role: 'player' }).eq('id', user.id);
      onClose();
    } else {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-black mb-4">Register as Player</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Position (e.g., Forward)" value={position} onChange={e=>setPosition(e.target.value)} className="w-full p-3 rounded-lg bg-pink-50 mb-4" required />
          <input type="number" placeholder="Jersey Number" value={jerseyNumber} onChange={e=>setJerseyNumber(e.target.value)} className="w-full p-3 rounded-lg bg-pink-50 mb-4" required />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>
            <button type="submit" disabled={loading} className="bg-[#1a061e] text-white px-6 py-2 rounded-lg">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}