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
export default Vue.extend({
  components: {
    scoreBoard: ScoreBoard,
    players: Players,
    history: History
  },
  methods: {
    async startGame() {
      //console.log("%cGAME STARTED", "color: red; font-size: 16em");
      let body = {
        name: "Tomi"
      };
      let response = await fetch(
        "https://hubsson-foosball-functions.azurewebsites.net/api/startGame",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors",
          body: JSON.stringify(body)
        }
      );

      console.log(response);
    }
  }
});
</script>
