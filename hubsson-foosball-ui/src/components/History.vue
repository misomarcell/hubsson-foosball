<template>
  <div id="events-card" class="ui segment">
    <table class="ui very basic celled table">
      <thead>
        <tr>
          <th>Player</th>
          <th>Event</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="item.time" v-for="item in history" :class="{ negative: item.type == 'owngoal' }">
          <td>
            <h4 class="ui image header" v-bind:class="[ getPlayerColor(item.player) ]">
              <img
                :src="item.player | avatar"
                class="ui mini rounded image"
              />
              <div class="content">{{ item.player | displayName }}</div>
            </h4>
          </td>
          <td class="event">
            {{ item.type }}
            <br />
            <small>{{ item.time | date }}</small>
          </td>
          <td class="collapsing">
            <button class="ui icon green button" data-tooltip="It was me">
              <i class="icon hand paper"></i>
            </button>
            <button class="ui icon blue button" data-tooltip="Change to own-goal">
              <i class="icon exchange"></i>
            </button>
            <button class="ui icon red button" @click="remove(item.key)" data-tooltip="Remove">
              <i class="icon trash alternate"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import firebaseService from "../services/firebase.service";
import { Event } from "../models/event";
import moment from "moment";
import { User } from "../models/user";

export default Vue.extend({
  data() {
    return {
      state: this.$store.state
    };
  },
  computed: {
    history(): any {
      return Object.entries(this.state.match.history as History)
        .map(([key, value]) => ({ ...value, key }))
        .sort((a, b) => moment(b.time).diff(moment(a.time)));
    }
  },
  methods: {
    getPlayerColor(user: User): string {
      return this.state.match.red.striker.uid === user.uid ||
        this.state.match.red.defender.uid === user.uid
        ? "red"
        : "blue";
    },
    remove(key: string) {
      firebaseService.database
        .ref(`matches/${this.state.match.id}/history/${key}`)
        .remove();
    }
  }
});
</script>
<style scoped>
.event {
  text-transform: capitalize;
}
</style>

