<template>
  <div>{{ $route.params.matchId }}</div>
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
      msg: ""
    };
  },
  methods: {

  },
  mounted() {
    matchService
      .getMatch$(this.$route.params.matchId)
      .pipe(tap(m => console.log()))
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
