<template>
  <div id="app">
    <scoreBoard></scoreBoard>
    <players></players>
    <history></history>
    <button id="dummy-button" @click="startGame">Start game</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ScoreBoard from "@/components/ScoreBoard.vue";
import Players from "@/components/Players.vue";
import History from "@/components/History.vue";
import Firebase from "firebase";

let app = Firebase.initializeApp({
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
      matchesRef: Firebase.database().ref("matches/"),
      matchId: 0,
      score: 0
    };
  },
  mounted() {
    this.matchesRef.on("value", function(snapshot) {
      console.log("snapshot:");
      console.log(snapshot.val());
    });

    this.matchesRef.once("value").then(function(snapshot) {
      console.log("Snapshot: " + snapshot.val());
    });
  },
  methods: {
    async startGame() {
      var newMatchKey = this.matchesRef.push().key;
      const match = {
        id: newMatchKey,
        startTime: "2019-01-01 01:01:01",
        endTime: null,
        teams: {
          red: {
            striker: "Józsi",
            defender: "Gábor",
            score: 0
          },
          blue: {
            striker: "Zoli",
            defender: "Ezékiel",
            score: 0
          }
        },
        history: [
          {
            eventType: "Goal",
            player: "Zoli",
            eventTime: "2019-01-01 01:01:01"
          }
        ]
      };

      var updates: any = {};
      if (newMatchKey) updates[newMatchKey] = match;

      return this.matchesRef.update(updates);
    }
  }
});
</script>
