<template>
  <div>
    <div v-if="hasActiveMatch">
      <scoreBoard></scoreBoard>
      <players></players>
      <history></history>
    </div>
    <div v-else>
      <player-selector></player-selector>
    </div>

    <button
      id="startButton"
      class="ui icon button massive positive"
      @click="startGame"
      v-if="!hasActiveMatch"
    >Start game</button>
    <button
      id="endButton"
      class="circular ui icon button massive negative"
      v-if="hasActiveMatch"
      @click="endGame"
    >
      <i class="close icon"></i>
    </button>
    <modal
      :message="'Do you want to end this game?'"
      :negativeOption="'No'"
      :positiveOption="'Yes'"
      :title="'End game'"
      @positive="endGaneConfirm()"
      ref="modal"
    />

    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import ScoreBoard from '@/components/ScoreBoard.vue';
import Players from '@/components/Players.vue';
import PlayerSelector from '@/components/PlayerSelector.vue';
import History from '@/components/History.vue';
import { Match } from '../models/Match';
import Modal from '../components/Modal.vue';
import PlayerSelectorVue from '../components/PlayerSelector.vue';
import { database } from '../services/database';

export default Vue.extend({
  components: {
    scoreBoard: ScoreBoard,
    players: Players,
    playerSelector: PlayerSelector,
    history: History,
    modal: Modal
  },
  data() {
    return {
      activeMatchRef: database.ref('activeMatch'),
      matchId: 0,
      score: 0,
      state: this.$store.state
    };
  },
  mounted() {
    // TODO: Change this

    this.activeMatchRef.on('value', snapshot => {
      const activeMatch = snapshot!.val();
      if (!activeMatch || !activeMatch.matchId) {
        this.$store.commit('setMatch', undefined);
        return;
      }

      database
        .ref(`matches/${activeMatch.matchId}`)
        .on('value', match => {
          this.$store.commit('setMatch', match!.val() as Match);
        });
    });
  },
  computed: {
    hasActiveMatch(): boolean {
      return !!this.state.match;
    }
  },
  methods: {
    endGame() {
      (this.$refs.modal as any).toggle();
    },
    async endGaneConfirm() {
      await this.activeMatchRef.set(null);
      (this.$refs.modal as any).toggle();
    },
    startGame() {
      const matchesRef = database.ref('matches');
      const newMatchKey = matchesRef.push().key;
      const match = {
        id: newMatchKey,
        startTime: new Date().toISOString(),
        endTime: null,
        red: this.$store.state.newTeams.red,
        blue: this.$store.state.newTeams.blue,
        history: []
      };

      // const updates: any = {};
      // if (newMatchKey) { updates[newMatchKey] = match; }
      // matchesRef.update(updates);
      database
        .ref('matches/' + newMatchKey)
        .set(match);

      this.activeMatchRef.set({
        matchId: newMatchKey,
        red: this.$store.state.newTeams.red,
        blue: this.$store.state.newTeams.blue
      });
    }
  }
});
</script>
<style scoped>
#endButton {
  position: fixed;
  right: 10px;
  bottom: 10px;
}
</style>
