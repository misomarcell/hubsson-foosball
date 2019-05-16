export interface Event {
  time: Date;
  type: 'goal' | 'owngoal' | 'swap';
  player: string;
}
