<template>
  <div id="app">
    <scoreBoard></scoreBoard>
    <players></players>
    <history></history>
    <button id="startButton" @click="startGame" :disabled="hasActiveMatch">Start game</button>
    <button id="endButton" @click="endGame" :disabled="!hasActiveMatch">End game</button>
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
      hasActiveMatch: false,
      matchId: 0,
      score: 0
    };
  },
  mounted() {
    database.ref("/activeMatch/").on("value", snapshot => {
      this.hasActiveMatch = !!snapshot!.val().matchId;

      database
        .ref("/matches/" + snapshot!.val().matchId)
        .once("value")
        .then(match => {
          console.log(match.val());
          console.log("Blue score: " + (match as any).val().teams.blue.score);
          console.log("Red score: " + (match as any).val().teams.red.score);
        });
    });
  },
  methods: {
    async startGame() {
      var newMatchKey = database.ref("/matches/").push().key;
      database.ref("/activeMatch").set({
        matchId: newMatchKey
      });
      this.hasActiveMatch = true;

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
    },

    async endGame() {
      database.ref("/activeMatch").set({
        matchId: ""
      });
      this.hasActiveMatch = false;
    }
  }
});
</script>
