<template>
  <div id="players-card" class="ui sixteen column grid segment">
    <div class="ui eight wide column">
      <div class="ui cards">
        <player-card :player="match.red.defender" @goal="score"></player-card>
        <player-card :player="match.red.striker" @goal="score"></player-card>
      </div>
    </div>
    <div class="ui eight wide column">
      <div class="ui cards">
        <player-card :player="match.blue.defender" @goal="score"></player-card>
        <player-card :player="match.blue.striker" @goal="score"></player-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import firebaseService from "../services/firebase.service";
import { Event } from "../models/event";
import PlayerCard from "../components/PlayerCard.vue";

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
    score(event: Event) {
      console.log(event);
      firebaseService.database
        .ref(`matches/${this.state.match.id}/history`)
        .push(event);
    }
  }
});
</script>

