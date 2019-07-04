<template>
  <div id="players-card" class="ui sixteen column grid segment">
    <div class="ui eight wide column">
      <div class="ui cards">
        <player-card :player="match.red.defender" @goal="score"></player-card>
        <player-card :player="match.blue.defender" @goal="score"></player-card>
      </div>
    </div>
    <div class="ui eight wide column">
      <div class="ui cards">
        <player-card :player="match.red.striker" @goal="score"></player-card>
        <player-card :player="match.blue.striker" @goal="score"></player-card>
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
import PlayerCard from '../components/PlayerCard.vue';

export default Vue.extend({
  data() {
    return {
      state: this.$store.state
    };
  },
  components: {
    PlayerCard
  },
  computed: {
    match(): any {
      return this.state.match;
    }
  },
  methods: {
    async score(event: Event) {
      let color = '';
      if (
        event.player === this.match.red.striker ||
        event.player === this.match.red.defender
      ) {
        color = 'red';
      } else if (
        event.player === this.match.blue.striker ||
        event.player === this.match.blue.defender
      ) {
        color = 'blue';
      } else {
        alert('Cannot determine team for ' + event.player);
      }

      const update = {} as any;

      update['/history'] = this.match.history
        ? [event, ...this.match.history]
        : [event];

      Firebase.database()
        .ref('matches/' + this.match.id)
        .update(update);
    }
  }
});
</script>

