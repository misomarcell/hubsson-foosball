<template>
  <div class="ui fluid card">
    <div class="content">
      <img
        class="mini ui left floated image"
        src="https://semantic-ui.com/images/avatar2/large/molly.png"
      />
      <div class="ui">
        <span class="ui left floated">
          <h4 v-bind:class="['ui', 'header', getColorByPlayer()]">{{ player }}</h4>
        </span>
        <a class="ui right floated label">
          <i class="futbol icon"></i> 23
        </a>
      </div>
    </div>
    <div class="extra content">
      <button
        style="width: 44%"
        class="ui left floated inverted red button"
        @click="$emit('goal', { 'time': new Date(), 'type': 'owngoal', 'player': player })"
      >Own-Goal</button>
      <button
        style="width: 44%"
        class="ui right floated positive button"
        @click="$emit('goal', { 'time': new Date(), 'type': 'goal', 'player': player })"
      >GOAL</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getColorByPlayer } from '../store';
export default Vue.extend({
  props: {
    player: {
      type: String,
      required: true
    }
  },
  methods: {
    getColorByPlayer() {
      return getColorByPlayer(this.player, this.$store.state.match);
    }
  },
  output: {}
});
</script>

<style>
</style>
