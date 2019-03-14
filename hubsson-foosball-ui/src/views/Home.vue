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
import { Match } from "../models/match";

export default Vue.extend({
  components: {
    scoreBoard: ScoreBoard,
    players: Players,
    history: History
  },
  data() {
    return {
      hasActiveMatch: false,
      matchId: null,
      score: 0
    };
  },
  mounted() {
    database.ref("/activeMatch/").on("value", snapshot => {
      this.hasActiveMatch = !!snapshot!.val();

      if (!this.hasActiveMatch) {
        return;
      }

      database
        .ref("/matches/" + snapshot!.val().matchId)
        .once("value")
        .then(snapshot => {
          const match = snapshot.val() as Match;

          if (!match) {
            return;
          }

          console.log("Blue score: " + match.blue.score);
          console.log("Red score: " + match.red.score);
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
        red: {
          striker: "Józsi",
          defender: "Gábor",
          score: 0
        },
        blue: {
          striker: "Zoli",
          defender: "Ezékiel",
          score: 0
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
      database.ref("/activeMatch").remove();
      this.hasActiveMatch = false;
    }
  }
});
</script>
