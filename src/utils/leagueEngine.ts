import { Match, Tournament, Team, Player } from '../types';

export function calculateStandings(matches: Match[], teams: Team[], tournament: Tournament): Tournament['standings'] {
  const standings: any = {};
  teams.forEach(team => { standings[team.id] = { points: 0, played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0 }; });
  matches.forEach(match => {
    if (match.state !== 'finished') return;
    const home = standings[match.homeTeamId];
    const away = standings[match.awayTeamId];
    home.gf += match.scoreHome; home.ga += match.scoreAway;
    away.gf += match.scoreAway; away.ga += match.scoreHome;
    home.played++; away.played++;
    if (match.scoreHome > match.scoreAway) { home.wins++; away.losses++; home.points += tournament.scoringRules.winPoints; away.points += tournament.scoringRules.lossPoints; }
    else if (match.scoreHome < match.scoreAway) { home.losses++; away.wins++; home.points += tournament.scoringRules.lossPoints; away.points += tournament.scoringRules.winPoints; }
    else { home.draws++; away.draws++; home.points += tournament.scoringRules.drawPoints; away.points += tournament.scoringRules.drawPoints; }
  });
  return standings;
}

export function checkPlayerEligibility(player: Player, match: Match, rosterLock: boolean): boolean {
  if (player.isSuspended) return false;
  if (rosterLock && !player.teamId) return false;
  // additional checks (already in another team, etc.)
  return true;
}

export function generateRoundRobinFixtures(teamIds: string[], tournamentId: string): Match[] {
  const matches: Match[] = [];
  for (let i = 0; i < teamIds.length; i++) {
    for (let j = i+1; j < teamIds.length; j++) {
      matches.push({
        id: crypto.randomUUID(),
        tournamentId,
        homeTeamId: teamIds[i],
        awayTeamId: teamIds[j],
        scheduledDate: new Date().toISOString(),
        venue: 'TBD',
        state: 'scheduled',
        scoreHome: 0,
        scoreAway: 0,
        events: [],
      });
    }
  }
  return matches;
}