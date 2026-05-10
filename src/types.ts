export interface Team {
  id: string;
  name: string;
  logoUrl?: string;
  captainId?: string; // user ID
  playerIds: string[];
  tournamentId?: string;
  season: string;
  stats: { wins: number; draws: number; losses: number; goalsFor: number; goalsAgainst: number };
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  teamId?: string;
  position?: string;
  jerseyNumber?: number;
  isSuspended: boolean;
  seasonStats: Record<string, { goals: number; assists: number; yellowCards: number; redCards: number }>;
}

export interface Match {
  id: string;
  tournamentId: string;
  homeTeamId: string;
  awayTeamId: string;
  scheduledDate: string;
  venue: string;
  state: 'scheduled' | 'live' | 'halftime' | 'finished' | 'under_review' | 'cancelled';
  scoreHome: number;
  scoreAway: number;
  events: MatchEvent[];
  refereeId?: string;
  walkover?: boolean;
}

export interface MatchEvent {
  id: string;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'halftime_start' | 'halftime_end' | 'match_end';
  minute: number;
  playerId?: string;
  teamId: string;
  description: string;
}

export interface Tournament {
  id: string;
  name: string;
  season: string;
  type: 'round_robin' | 'knockout';
  teams: string[];
  matches: string[];
  standings: Record<string, { points: number; played: number; wins: number; draws: number; losses: number; gf: number; ga: number }>;
  scoringRules: { winPoints: number; drawPoints: number; lossPoints: number; bonusPoints?: number };
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'referee' | 'captain' | 'player' | 'spectator';
  teamId?: string;
  profile: { firstName: string; lastName: string };
}