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
import { database } from "../services/database";

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
    database.ref("/matches/").on("value", function(snapshot) {
      console.log("snapshot:");
      console.log(snapshot.val());
    });

    database
      .ref("/matches/")
      .once("value")
      .then(function(snapshot) {
        console.log("Snapshot: " + snapshot.val());
      });
  },
  methods: {
    async startGame() {
      var newMatchKey = database.ref("/matches/").push().key;
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

      return database.ref("/matches/").update(updates);
    }
  }
});
</script>
