import { Match } from './match';
import { Team } from './team';

export interface AppState {
  currentUser: string | undefined;
  match?: Match;
  newTeams: {
    red: Partial<Team>;
    blue: Partial<Team>;
  };
}
