<template>
  <div id="players-card" class="ui segment">
    <div class="ui two column grid">
      <div class="row">
        <div class="ui cards">
          <player-card></player-card>
          <player-card></player-card>
        </div>
      </div>

      <div class="row">
        <div class="ui cards">
          <player-card></player-card>
          <player-card></player-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import { database } from "../services/database";
import Firebase from "firebase";
import { Event } from "../models/event";
import PlayerCard from "../components/PlayerCard";

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
    async score(player: string) {
      let color = "";
      if (
        player === this.match.red.striker ||
        player === this.match.red.defender
      ) {
        color = "red";
      } else if (
        player === this.match.blue.striker ||
        player === this.match.blue.defender
      ) {
        color = "blue";
      } else {
        console.error("Cannot determine team for " + player);
      }

      const update = {} as any;
      const newEvent: Event = {
        player,
        time: new Date(),
        type: "goal"
      };

      update["/history"] = this.match.history
        ? [newEvent, ...this.match.history]
        : [newEvent];

      Firebase.database()
        .ref("matches/" + this.match.id)
        .update(update);
    }
  }
});
</script>

