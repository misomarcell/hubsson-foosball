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
      matchId: 0,
      score: 0
    };
  },
  mounted() {
    var dbRef = Firebase.database().ref("matches/active/");
    dbRef.on("value", function(snapshot) {
      console.log("snapshot:");
      console.log(snapshot.val());
    });

    dbRef.once("value").then(function(snapshot) {
      console.log("Snapshot: " + snapshot.val());
    });
  },
  methods: {
    async startGame() {
      this.matchId = Date.now();
      this.score += 1;
      Firebase.database()
        .ref("matches/active")
        .set({
          matchId: this.matchId,
          scores: this.score
        });
    }
  }
});
</script>
