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
      let response = await fetch(
        "https://hubsson-foosball-functions.azurewebsites.net/api/startGame?name=foos",
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors",
          headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*"
          }
          // TODO: Post
        }
      );

      console.log(response);
    }
  }
});
</script>
