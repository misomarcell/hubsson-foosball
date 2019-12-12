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
import Vue from "vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
import Players from "@/components/Players.vue";
import PlayerSelector from "@/components/PlayerSelector.vue";
import History from "@/components/History.vue";
import { Match } from "../models/Match";
import Modal from "../components/Modal.vue";
import PlayerSelectorVue from "../components/PlayerSelector.vue";
import activeMatchService from "../services/active-match.service";
import matchService from "../services/match.service";
import firebaseService from "../services/firebase.service";

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
      matchId: 0,
      score: 0,
      state: this.$store.state
    };
  },
  mounted() {
    // TODO: Change this
    
    activeMatchService.subsrcibeOnValue(snapshot => {
      const activeMatch = snapshot!.val();
      if (!activeMatch || !activeMatch.matchId) {
        this.$store.commit("setMatch", undefined);
        return;
      }

      matchService.subsrcibeOnMatchValue(activeMatch.matchId, match => {
        this.$store.commit("setMatch", match!.val() as Match);
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
      console.log("qwert");
      await firebaseService.database.ref("activeMatch").set(null);
      (this.$refs.modal as any).toggle();
    },
    startGame() {
      const matchesRef = firebaseService.database.ref("matches");
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
      firebaseService.database.ref("matches/" + newMatchKey).set(match);

      firebaseService.database.ref("activeMatch").set({
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
