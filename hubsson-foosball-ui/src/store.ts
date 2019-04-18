import Vue from 'vue';
import Vuex from 'vuex';
import { AppState } from './models/app-state';
import { Match } from './models/match';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    match: undefined,
  } as AppState,
  getters: {
    match(state, getters) {
      return state.match;
    },
    redScore(state, getters) {
      return getters.match.red.score;
    },
    blueScore(state, getters) {
      return getters.match.blue.score;
    },
    blueStriker(state, getters) {
      return getters.match.blue.striker;
    },
    blueDefender(state, getters) {
      return getters.match.blue.defender;
    },
  },
  mutations: {
    setScores(
      state: AppState,
      {
        scoringTeam,
        player,
      }: { scoringTeam: keyof Pick<Match, 'blue' | 'red'>; player: string },
    ) {
      state.match![scoringTeam].score++;
    },
    setMatch(state: AppState, match: Match | undefined) {
      state.match = match;
      if (state.match && !state.match.history) {
        state.match.history = [];
      }
    },
  },
  actions: {},
});
