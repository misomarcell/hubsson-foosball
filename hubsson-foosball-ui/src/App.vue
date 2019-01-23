<template>
  <div id="app">
    <div class="ui secondary menu" style="width: 600px; margin: auto; margin-top: 10px;">
      <a class="active item">
        Game
      </a>
      <a class="item">
        Statistics
      </a>
      <a class="item">
        Reservations
        <a class="ui red circular label">2</a>
      </a>
      <div class="right menu">
        <a class="ui red item">
          Logout
        </a>
      </div>
    </div>
  <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Pusher from 'pusher-js';

@Component
export default class HelloWorld extends Vue {
  @Prop()
  private msg!: string;

  public created() {
    Pusher.logToConsole = true;

    const pusher = new Pusher('ba07e9ae8cac25d7175b', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('my-channel');
    // console.log('Subscribed');

    channel.bind('my-event', (data: any) => {
      this.$store.commit('setScores', data.message);
    });
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
