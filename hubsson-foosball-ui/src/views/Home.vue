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
let db = Firebase.firestore();

export default Vue.extend({
  components: {
    scoreBoard: ScoreBoard,
    players: Players,
    history: History
  },
  methods: {
    async startGame() {
      var starCountRef = Firebase.database().ref(
        "/foosball/wJ39i8cANmbyahbQXt1M"
      );
      starCountRef.on("value", function(snapshot) {
        console.log("snapshot:");
        console.log(snapshot);
      });

      db.collection("foosball")
        .add({
          blueScore: 2,
          redScore: 3
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });

      // // console.log("%cGAME STARTED", "color: red; font-size: 16em");
      // const body = {
      //   redScore: 0,
      //   blueScore: 0,
      //   redPlayers: {
      //     striker: 'Marci',
      //     defence: 'Zoli'
      //   },
      //   bluePlayers:  {
      //     striker: 'Szilárd',
      //     defence: 'Laci'
      //   },
      // };
      // const response = await fetch(
      //   `${this.$store.getters.functionsHost}/api/startGame`,
      //   {
      //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //     mode: 'cors',
      //     body: JSON.stringify(body),
      //   },
      // );
      // console.log(response)
    }
  }
});
</script>
