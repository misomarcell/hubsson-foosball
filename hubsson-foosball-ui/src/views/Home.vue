<template>
  <div id="app">
    <scoreBoard></scoreBoard>
    <players></players>
    <history></history>
    <button id="dummy-button" @click="startGame">Start game</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ScoreBoard from '@/components/ScoreBoard.vue';
import Players from '@/components/Players.vue';
import History from '@/components/History.vue';
export default Vue.extend({
  components: {
    scoreBoard: ScoreBoard,
    players: Players,
    history: History,
  },
  methods: {
    async startGame() {
      // console.log("%cGAME STARTED", "color: red; font-size: 16em");
      const body = {
        redScore: 0,
        blueScore: 0,
        redPlayers: 'p1, p2',
        bluePlayers: 'p3, p4',
      };
      const response = await fetch(
        `${this.$store.getters.functionsHost}/api/startGame`,
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors',
          body: JSON.stringify(body),
        },
      );
    },
  },
});
</script>
