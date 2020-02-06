import { Match } from './match';
import { Team, TeamSelect } from './team';
import { User } from './user';

export interface AppState {
  currentUser: string | undefined;
  match?: Match;
  newTeams: TeamSelect;
  users: User[];
}
