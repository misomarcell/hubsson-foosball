<template>
  <div v-if="match">
    <div>{{ $route.params.matchId }}</div>
    <div>{{ match.startTime }}</div>
    <div>{{ match.endTime }}</div>
    <div>{{ match.isActive }}</div>
    <div>{{ match.history }}</div>
    <div v-if="match.red">{{ match.red.striker }}</div>
    <div v-if="match.blue">{{ match.blue.striker }}</div>
    <div v-if="match.blue">{{ match.blue.defender }}</div>
    <div v-if="match.red">{{ match.red.defender }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import firebaseService from "../services/firebase.service";
import { Match } from '@/models/match';
import matchService from "../services/match.service";
import { tap } from 'rxjs/operators';

export default Vue.extend({
  data() {
    return {
      msg: '',
      match: {} as Match
    };
  },
  methods: {

  },
  mounted() {
    matchService
      .getMatch$(this.$route.params.matchId).pipe(
        tap((m: Match | undefined) => this.match = m))
      .subscribe();
  },
});

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
