import { User } from './user';

export interface Team {
  defender: User;
  striker: User;
}

export interface TeamSelect {
  red: {
    strikerId?: string
    defenderId?: string
  };
  blue: {
    strikerId?: string
    defenderId?: string
  };
}
