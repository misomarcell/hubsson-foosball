import Vue from 'vue';
import Vuex from 'vuex';
import { AppState } from './models/app-state';
import { Match } from './models/match';
import { Team } from './models/team';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: undefined,
    match: undefined,
    newTeams: {
      blue: {
        striker: undefined,
        defender: undefined
      },
      red: {
        striker: undefined,
        defender: undefined
      }
    }
  } as AppState,
  getters: {
    currentUser(state) {
      return state.currentUser;
    },
    match(state, getters) {
      return state.match;
    },
    redScore(state, getters): number {
      return state.match!.history!.filter(
        (h) =>
          (h.type === 'goal' &&
            getColorByPlayer(h.player, state.match!) === 'red') ||
          (h.type === 'owngoal' &&
            getColorByPlayer(h.player, state.match!) === 'blue')
      ).length;
    },
    blueScore(state, getters): number {
      return state.match!.history!.filter(
        (h) =>
          (h.type === 'goal' &&
            getColorByPlayer(h.player, state.match!) === 'blue') ||
          (h.type === 'owngoal' &&
            getColorByPlayer(h.player, state.match!) === 'red')
      ).length;
    },
    blueStriker(state, getters) {
      return getters.match.blue.striker;
    },
    blueDefender(state, getters) {
      return getters.match.blue.defender;
    }
  },
  mutations: {
    setUser(state: AppState, user: string) {
      state.currentUser = user;
    },
    setMatch(state: AppState, match: Match | undefined) {
      state.match = match;
      if (state.match && !state.match.history) {
        state.match.history = [];
      }
    }
  },
  actions: {}
});

export function getColorByPlayer(player: string, match: Match): string {
  return match.red.striker === player || match.red.defender === player
    ? 'red'
    : 'blue';
}
