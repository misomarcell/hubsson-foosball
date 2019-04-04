<template>
  <div id="app">
    <div v-if="$store.state.match">
      <scoreBoard></scoreBoard>
      <players></players>
      <history></history>
    </div>

    <div v-else>Start new match</div>
    <button id="startButton" @click="startGame" :disabled="hasActiveMatch">Start game</button>
    <button id="endButton" @click="endGame" :disabled="!hasActiveMatch">End game</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
import Players from "@/components/Players.vue";
import History from "@/components/History.vue";
import Firebase from "firebase";
import { Match } from "../models/Match";

const app = Firebase.initializeApp({
  apiKey: "AIzaSyDIoCyBM3IAMrkS6tH70sz1qtr6WaxhTmo",
  authDomain: "hubsson-foosball-eur3.firebaseapp.com",
  databaseURL: "https://hubsson-foosball-eur3.firebaseio.com",
  projectId: "hubsson-foosball-eur3",
  storageBucket: "hubsson-foosball-eur3.appspot.com",
  messagingSenderId: "978313456818"
});

export default Vue.extend({
  components: {
    scoreBoard: ScoreBoard,
    players: Players,
    history: History
  },
  data() {
    return {
      activeMatchRef: Firebase.database().ref("activeMatch"),
      matchId: 0,
      score: 0,
      state: this.$store.state
    };
  },
  mounted() {
    this.activeMatchRef.on("value", snapshot => {
      const activeMatch = snapshot!.val();
      if (!activeMatch || !activeMatch.matchId) {
        this.$store.commit("setMatch", undefined);
        return;
      }

      Firebase.database()
        .ref(`matches/${activeMatch.matchId}`)
        .on("value", match => {
          this.$store.commit("setMatch", match!.val() as Match);
        });
    });
  },
  computed: {
    hasActiveMatch: function(): boolean {
      return !!this.state.match;
    }
  },
  methods: {
    endGame() {
      this.activeMatchRef.set(null);
    },
    startGame() {
      const matchesRef = Firebase.database().ref("matches");
      const newMatchKey = matchesRef.push().key;
      const match = {
        id: newMatchKey,
        startTime: '2019-01-01 01:01:01',
        endTime: null,
        red: {
          striker: 'Józsi',
          defender: 'Gábor',
          score: 0
        },
        blue: {
          striker: 'Zoli',
          defender: 'Ezékiel',
          score: 0
        },
        history: [
          {
            eventType: 'Goal',
            player: 'Zoli',
            eventTime: '2019-01-01 01:01:01'
          }
        ]
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
  },
});
</script>
