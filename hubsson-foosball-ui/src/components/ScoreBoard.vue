<template>
  <div
    id="score-card"
    class="ui clearing red segment"
    style="width: 600px; margin: auto; margin-top: 30px;"
  >
    <h3 class="ui right floated blue header">
      Blue Team
      <div class="sub header">{{ blueTeam }}</div>
    </h3>
    <h3 class="ui left floated red header">
      Red Team
      <div class="sub header">{{ redTeam }}</div>
    </h3>
    <h3 class="ui center aligned header">{{ redScore }} : {{ blueScore }}</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      match: this.$store.state.match,
    };
  },
  computed: {
    redTeam(): string {
      return `${this.match.red.striker} & ${this.match.red.defender}`;
    },
    redScore(): number {
      return this.match.red.score;
    },
    blueTeam(): string {
      return `${this.match.blue.striker} & ${this.match.blue.defender}`;
    },
    blueScore(): number {
      return this.match.blue.score;
    },
  },
});
</script>

<style>
</style>
