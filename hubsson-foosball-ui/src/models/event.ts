export interface Event {
  time: string;
  type: 'goal' | 'owngoal' | 'swap';
  player: string;
}
