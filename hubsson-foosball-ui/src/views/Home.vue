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
      :disabled="!canStartMatch"
    >Start game</button>
    <button id="endButton" class="circular ui icon button massive negative" @click="endGame">
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

    <div class="ui container segment">
      <div class="ui cards">
        <div class="ui fluid card" v-for="match in matches" :key="match.id">
          <div class="content">
            <div class="description">Started: {{ match.startTime.toDate() | formatDate }}</div>
            <div class="extra left aligned content">
              <img class="ui huge avatar image" :src="match.red.striker | avatar" />
              <img class="ui huge avatar image" :src="match.red.defender | avatar" />
              <img class="ui huge avatar image" :src="match.blue.striker | avatar" />
              <img class="ui huge avatar image" :src="match.blue.defender | avatar" />
              <div class="ui right floated buttons">
                <div class="ui basic green button" @click="joinGame(match.id)">Join</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
import Players from "@/components/Players.vue";
import PlayerSelector from "@/components/PlayerSelector.vue";
import History from "@/components/History.vue";
import { Match } from "../models/match";
import Modal from "../components/Modal.vue";
import PlayerSelectorVue from "../components/PlayerSelector.vue";
import matchService from "../services/match.service";
import firebaseService from "../services/firebase.service";
import { tap, filter, switchMap } from "rxjs/operators";
import firebase from "firebase";

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
      state: this.$store.state,
      matches: [] as Match[]
    };
  },
  mounted() {
    matchService
      .getMatches$()
      .pipe(tap(m => (this.matches = m)))
      .subscribe();
  },
  computed: {
    canStartMatch(): boolean {
      return (
        this.$store.state.newTeams.red.strikerId &&
        this.$store.state.newTeams.red.defenderId &&
        this.$store.state.newTeams.blue.strikerId &&
        this.$store.state.newTeams.blue.defenderId
      );
    }
  },
  methods: {
    endGame() {
      (this.$refs.modal as any).toggle();
    },
    async endGaneConfirm() {
      await firebaseService.database.ref("activeMatch").set(null);
      (this.$refs.modal as any).toggle();
    },
    startGame() {
      const matchesRef = firebaseService.firestore.collection("matches");
      const newMatch = matchesRef.doc();

      const red = {
        defender: this.$store.state.users.find(
          u => u.uid === this.$store.state.newTeams.red.defenderId
        ),
        striker: this.$store.state.users.find(
          u => u.uid === this.$store.state.newTeams.red.strikerId
        )
      };

      const blue = {
        defender: this.$store.state.users.find(
          u => u.uid === this.$store.state.newTeams.blue.defenderId
        ),
        striker: this.$store.state.users.find(
          u => u.uid === this.$store.state.newTeams.blue.strikerId
        )
      };

      const match = {
        startTime: firebase.firestore.FieldValue.serverTimestamp(),
        endTime: null,
        isActive: true,
        red,
        blue,
        history: []
      };

      newMatch.set(match);

      firebaseService.firestore.collection("activeMatch").doc();
    },
    joinGame(matchId: string)
    {
      this.$router.push({ path:`/match/${matchId}` });
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
