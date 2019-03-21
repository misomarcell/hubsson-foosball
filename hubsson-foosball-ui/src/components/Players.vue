<template>
  <div id="players-card" class="ui segment" style="width: 600px; margin: auto; margin-top: 10px;">
    <div class="ui two column grid">
      <div
        v-if="blue.striker == null || blue.defense == null || red.striker == null || red.defense == null"
        class="row"
      >
        <div class="column">
          <div v-if="red.striker == null || red.defense == null" class="ui compact fluid menu">
            <div class="ui simple dropdown fluid item">
              <i class="red plus icon"></i>
              Enter Game
              <div class="menu">
                <div
                  class="item"
                  v-if="red.striker == null"
                  v-on:click="setPlayer('red', 'striker')"
                >Striker</div>
                <div
                  class="item"
                  v-if="red.defense == null"
                  v-on:click="setPlayer('red', 'defense')"
                >Defense</div>
              </div>
            </div>
          </div>
        </div>
        <div class="right aligned column">
          <div v-if="blue.striker == null || blue.defense == null" class="ui compact fluid menu">
            <div class="ui simple dropdown fluid blue item">
              <i class="blue plus icon"></i>
              Enter Game
              <div class="menu">
                <div
                  class="item"
                  v-if="blue.striker == null"
                  v-on:click="setPlayer('blue', 'striker')"
                >Striker</div>
                <div
                  class="item"
                  v-if="blue.defense == null"
                  v-on:click="setPlayer('blue', 'defense')"
                >Defense</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="column">
          <a
            v-if="red.striker != null"
            class="ui large red image fluid label"
            v-on:click="score(red.striker)"
          >
            <img style="float:left" src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
            {{ red.striker.name }}
            <div class="detail" style="float:right" data-tooltip="Current rank">
              31
              <i class="arrow down icon"></i>
            </div>
          </a>
        </div>
        <div class="column">
          <a
            v-if="blue.defense != null"
            class="ui large blue image fluid label"
            v-on:click="score(blue.defense)"
          >
            <img style="float:left" src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
            {{ blue.defense.name }}
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
            v-if="red.defense != null"
            class="ui large red image fluid label"
            v-on:click="score(red.defense)"
          >
            <img style="float:left" src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
            {{ red.defense.name }}
            <div class="detail" style="float:right" data-tooltip="Current rank">
              31
              <i class="arrow down icon"></i>
            </div>
          </a>
        </div>
        <div class="column">
          <a
            v-if="blue.striker != null"
            class="ui large blue image fluid label"
            v-on:click="score(blue.striker)"
          >
            <img style="float:left" src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
            {{ blue.striker.name }}
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
import Vue from "vue";
import moment from "moment";
import { database } from "../services/database";

export default Vue.extend({
  data() {
    return this.$store.state.match;
  },
  methods: {
    async score(player: string) {
      let color = null;
      if (player === this.red.striker || player === this.red.defense) {
        this.red.score++;
        color = "red";
      } else if (player === this.blue.striker || player === this.blue.defense) {
        this.blue.score++;
        color = "blue";
      } else {
        // console.error('Cannot determine team for ' + player);
      }

      this.history.unshift({
        playerName: player,
        dept: player,
        event: player !== "Sanyi" ? "Goal • 2:1" : 'Own Goal',
        isPositive: player !== 'Sanyi',
        isRed: color === 'red',
        timestamp: moment().format('HH:mm:ss')
      });
    }
  },
});
</script>

