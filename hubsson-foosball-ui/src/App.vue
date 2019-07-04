<template>
  <div class="ui one column fluid center aligned grid" id="app">
    <div class="ui ten wide column">
      <div class="ui secondary menu">
        <a class="active item">Game</a>
        <a class="item">Statistics</a>
        <a class="item">
          Reservations
          <a class="ui red circular label">2</a>
        </a>
        <div class="right menu">
          <a class="ui red item">Logout</a>
        </div>
      </div>
      <main>
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

export default Vue.extend({
  data() {
    return {
      msg: ''
    };
  }
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
