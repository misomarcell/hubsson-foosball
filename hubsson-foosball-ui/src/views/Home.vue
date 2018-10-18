<template>
    <div id="app">
      <scoreBoard></scoreBoard>
      <players></players>
      <history></history>
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
  }
});
</script>
