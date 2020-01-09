import { User } from './user';

export interface Event {
  time: string;
  type: 'goal' | 'owngoal' | 'swap';
  player: User;
}
