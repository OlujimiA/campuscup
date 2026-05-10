import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function RegisterTeam({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from('teams').insert({
      name,
      captain_id: user.id,
      season: new Date().getFullYear().toString(),
      stats: { wins:0, draws:0, losses:0, goals_for:0, goals_against:0, points:0 }
    });
    if (!error) {
      // Update the user's profile to set role = captain and team_id
      await supabase.from('profiles').update({ role: 'captain', team_id: (await supabase.from('teams').select('id').eq('name', name).single()).data?.id }).eq('id', user.id);
      onClose();
    } else {
      alert('Error creating team: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-black mb-4">Register New Team</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Team Name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-3 rounded-lg bg-pink-50 dark:bg-[#2a2a4a] mb-4" required />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>
            <button type="submit" disabled={loading} className="bg-[#1a061e] text-white px-6 py-2 rounded-lg">Create Team</button>
          </div>
        </form>
      </div>
    </div>
  );
}