import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function RegisterTeam({ onClose }: { onClose: () => void }) {
  const [teams, setTeams] = useLocalStorage('teams', []);
  const [name, setName] = useState('');
  const handleSubmit = () => {
    const newTeam = { id: crypto.randomUUID(), name, playerIds: [], stats: { wins:0, draws:0, losses:0, goalsFor:0, goalsAgainst:0 } };
    setTeams([...teams, newTeam]);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-black text-[#1a061e] dark:text-white mb-4">Register New Team</h2>
        <input type="text" placeholder="Team Name" value={name} onChange={e=>setName(e.target.value)} className="input-field w-full p-3 rounded-lg mb-4" />
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>
          <button onClick={handleSubmit} className="btn-primary px-6 py-2 rounded-lg">Create Team</button>
        </div>
      </div>
    </div>
  );
}