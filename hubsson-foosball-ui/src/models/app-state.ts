import { Match } from "./match";
import { Team } from "./team";

export interface AppState {
  match?: Match;
  newTeams: {
    red: Partial<Team>;
    blue: Partial<Team>;
  };
}
