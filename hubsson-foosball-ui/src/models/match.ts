import { Team } from './team';
import { Event } from './event';

export interface Match {
  id: string;
  startTime: Date;
  red: Team;
  blue: Team;
  history?: {
    [key: string]: Event;
  };
}
