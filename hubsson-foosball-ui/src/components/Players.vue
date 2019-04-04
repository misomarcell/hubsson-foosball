<template>
  <div id="players-card" class="ui segment" style="width: 600px; margin: auto; margin-top: 10px;">
    <div class="ui two column grid">
      <div class="row">
        <div class="column">
          <a
            class="ui large red image fluid label"
            v-on:click="score(red.striker)" >
            <img style="float:left" src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
            {{ red.striker }}
            <div class="detail" style="float:right" data-tooltip="Current rank">
              31
              <i class="arrow down icon"></i>
            </div>
          </a>
        </div>
        <div class="column">
          <a
            class="ui large blue image fluid label"
            v-on:click="score(blue.defender)"
          >
            <img style="float:left" src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
            {{ blue.defender }}
            <div class="detail" style="float:right" data-tooltip="Current rank">
              22
              <i class="arrow up icon"></i>
            </div>
          </a>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <a
            class="ui large red image fluid label"
            v-on:click="score(red.defender)">
            <img style="float:left" src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
            {{ red.defender }}
            <div class="detail" style="float:right" data-tooltip="Current rank">
              31
              <i class="arrow down icon"></i>
            </div>
          </a>
        </div>
        <div class="column">
          <a
            class="ui large blue image fluid label"
            v-on:click="score(blue.striker)">
            <img style="float:left" src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
            {{ blue.striker }}
            <div class="detail" style="float:right" data-tooltip="Current rank">
              22
              <i class="arrow up icon"></i>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment';
import { database } from '../services/database';

export default Vue.extend({
  data() {
    return {
      red: this.$store.state.match.red,
      blue: this.$store.state.match.blue,
    };
  },
  methods: {
    async score(player: string) {
      let color = null;
      if (player === this.red.striker || player === this.red.defender) {
        this.red.score++;
        color = 'red';
      } else if (player === this.blue.striker || player === this.blue.defender) {
        this.blue.score++;
        color = 'blue';
      } else {
        // console.error('Cannot determine team for ' + player);
      }

      this.history.unshift({
        playerName: player,
        dept: player,
        event: player !== 'Sanyi' ? 'Goal • 2:1' : 'Own Goal',
        isPositive: player !== 'Sanyi',
        isRed: color === 'red',
        timestamp: moment().format('HH:mm:ss'),
      });
    },
  },
});
</script>

