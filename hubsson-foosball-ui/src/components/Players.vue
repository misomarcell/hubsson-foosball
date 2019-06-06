<template>
  <div id="players-card" class="ui segment">
    <div class="ui two column grid">
      <div class="row">
        <div class="column">
          <a
            class="ui large red image fluid label"
            v-on:click="score(match.red.striker)" >
            <img style="float:left" src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
            {{ match.red.striker }}
            <div class="detail" style="float:right" data-tooltip="Current rank">
              31
              <i class="arrow down icon"></i>
            </div>
          </a>
        </div>
        <div class="column">
          <a
            class="ui large blue image fluid label"
            v-on:click="score(match.blue.defender)"
          >
            <img style="float:left" src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
            {{ match.blue.defender }}
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
            v-on:click="score(match.red.defender)">
            <img style="float:left" src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
            {{ match.red.defender }}
            <div class="detail" style="float:right" data-tooltip="Current rank">
              31
              <i class="arrow down icon"></i>
            </div>
          </a>
        </div>
        <div class="column">
          <a
            class="ui large blue image fluid label"
            v-on:click="score(match.blue.striker)">
            <img style="float:left" src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
            {{ match.blue.striker }}
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
import Firebase from 'firebase';
import { Event } from '../models/event';

export default Vue.extend({
  data() {
    return {
      state: this.$store.state,
    };
  },
  computed: {
      match(): any {
        return this.state.match;
      },
  },
  methods: {
    async score(player: string) {
      let color = '';
      if (player === this.match.red.striker || player === this.match.red.defender) {
        color = 'red';
      } else if (player === this.match.blue.striker || player === this.match.blue.defender) {
        color = 'blue';
      } else {
        console.error('Cannot determine team for ' + player);
      }

      const update = {} as any;
      const newEvent: Event = {
        player,
        time: new Date(),
        type: 'goal',
      };
      
      update['/history'] = this.match.history ? [ newEvent, ...this.match.history ] : [newEvent];

      Firebase.database()
        .ref('matches/' + this.match.id)
        .update(update);
    },
  },
});
</script>

