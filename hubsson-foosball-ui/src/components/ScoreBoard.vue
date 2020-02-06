<template>
  <div id="score-card" class="ui clearing red fluid segment">
    <h3 class="ui right floated blue header">
      Blue Team
      <div class="sub header">{{ blueTeam }}</div>
    </h3>
    <h3 class="ui left floated red header">
      Red Team
      <div class="sub header">{{ redTeam }}</div>
    </h3>
    <div class="ui center aligned header huge">{{ redScore }} : {{ blueScore }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      state: this.$store.state
    };
  },
  computed: {
    redTeam(): string {
      return `${this.$options.filters.displayName(this.state.match.red.striker)} & ${
        this.$options.filters.displayName(this.state.match.red.defender)
      }`;
    },
    redScore(): number {
      return this.$store.getters.redScore;
    },
    blueTeam(): string {
      return `${this.$options.filters.displayName(this.$store.getters.blueStriker)} & ${
        this.$options.filters.displayName(this.$store.getters.blueDefender)
      }`;
    },
    blueScore(): number {
      return this.$store.getters.blueScore;
    }
  }
});
</script>

<style>
</style>
