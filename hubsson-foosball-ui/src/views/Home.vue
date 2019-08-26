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
import Firebase from 'firebase';
import { Match } from '../models/Match';
import Modal from '../components/Modal.vue';
import PlayerSelectorVue from '../components/PlayerSelector.vue';
import * as Firebaseui from 'firebaseui';

const app = Firebase.initializeApp({
  apiKey: 'AIzaSyDIoCyBM3IAMrkS6tH70sz1qtr6WaxhTmo',
  authDomain: 'hubsson-foosball-eur3.firebaseapp.com',
  databaseURL: 'https://hubsson-foosball-eur3.firebaseio.com',
  projectId: 'hubsson-foosball-eur3',
  storageBucket: 'hubsson-foosball-eur3.appspot.com',
  messagingSenderId: '978313456818'
});



const ui = new Firebaseui.auth.AuthUI(Firebase.auth());
ui.start('#firebaseui-auth-container', {
  signInOptions: [
    Firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});

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
      activeMatchRef: Firebase.database().ref('activeMatch'),
      matchId: 0,
      score: 0,
      state: this.$store.state
    };
  },
  mounted() {
    this.activeMatchRef.on('value', (snapshot) => {
      const activeMatch = snapshot!.val();
      if (!activeMatch || !activeMatch.matchId) {
        this.$store.commit('setMatch', undefined);
        return;
      }

      Firebase.database()
        .ref(`matches/${activeMatch.matchId}`)
        .on('value', (match) => {
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
      const matchesRef = Firebase.database().ref('matches');
      const newMatchKey = matchesRef.push().key;
      const match = {
        id: newMatchKey,
        startTime: '2019-01-01 01:01:01',
        endTime: null,
        red: this.$store.state.newTeams.red,
        blue: this.$store.state.newTeams.blue,
        history: []
      };

      // const updates: any = {};
      // if (newMatchKey) { updates[newMatchKey] = match; }
      // matchesRef.update(updates);
      Firebase.database()
        .ref('matches/' + newMatchKey)
        .set(match);

      this.activeMatchRef.set({
        matchId: newMatchKey
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
