import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ScheduleMatch({ onClose, teams }: { onClose: () => void; teams: any[] }) {
  const [homeTeamId, setHomeTeamId] = useState('');
  const [awayTeamId, setAwayTeamId] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [venue, setVenue] = useState('');
  const [tournamentId, setTournamentId] = useState('');
  const [tournaments, setTournaments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.from('tournaments').select('*').then(res => setTournaments(res.data || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('matches').insert({
      tournament_id: tournamentId,
      home_team_id: homeTeamId,
      away_team_id: awayTeamId,
      scheduled_date: new Date(scheduledDate).toISOString(),
      venue,
      state: 'scheduled'
    });
    if (!error) onClose();
    else alert(error.message);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-black mb-4">Schedule Match</h2>
        <form onSubmit={handleSubmit}>
          <select required value={tournamentId} onChange={e=>setTournamentId(e.target.value)} className="w-full p-3 rounded-lg bg-pink-50 mb-3">
            <option value="">Select Tournament</option>
            {tournaments.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <select required value={homeTeamId} onChange={e=>setHomeTeamId(e.target.value)} className="w-full p-3 rounded-lg bg-pink-50 mb-3">
            <option value="">Home Team</option>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <select required value={awayTeamId} onChange={e=>setAwayTeamId(e.target.value)} className="w-full p-3 rounded-lg bg-pink-50 mb-3">
            <option value="">Away Team</option>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <input type="datetime-local" required value={scheduledDate} onChange={e=>setScheduledDate(e.target.value)} className="w-full p-3 rounded-lg bg-pink-50 mb-3" />
          <input type="text" placeholder="Venue" required value={venue} onChange={e=>setVenue(e.target.value)} className="w-full p-3 rounded-lg bg-pink-50 mb-3" />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>
            <button type="submit" disabled={loading} className="bg-[#1a061e] text-white px-6 py-2 rounded-lg">Schedule</button>
          </div>
        </form>
      </div>
    </div>
  );
}