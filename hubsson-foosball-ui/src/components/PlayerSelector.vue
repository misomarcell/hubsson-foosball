<template>
  <div class="ui two column grid segment">
    <div class="ui eight wide column">
      <div class="ui cards">
        <div class="ui fluid red card">
          <div class="content">
            <div class="ui">
              <label>Red Defender</label>
              <sui-dropdown
                placeholder="Select player to add..."
                selection
                fluid
                search
                :options="users"
                v-model="$store.state.newTeams.red.defender"
              ></sui-dropdown>
            </div>
          </div>
        </div>
        <div class="ui fluid red card">
          <div class="content">
            <div class="ui">
              <label>Red Striker</label>
              <sui-dropdown
                placeholder="Select player to add..."
                selection
                fluid
                search
                :options="users"
                v-model="$store.state.newTeams.red.striker"
              ></sui-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ui eight wide column">
      <div class="ui cards">
        <div class="ui fluid blue card">
          <div class="content">
            <div class="ui">
              <label>Blue Defender</label>
              <sui-dropdown
                placeholder="Select player to add..."
                selection
                fluid
                search
                :options="users"
                v-model="$store.state.newTeams.blue.defender"
              ></sui-dropdown>
            </div>
          </div>
        </div>
        <div class="ui fluid blue card">
          <div class="content">
            <div class="ui">
              <label>Blue Striker</label>
              <sui-dropdown
                placeholder="Select player to add..."
                selection
                fluid
                search
                :options="users"
                v-model="$store.state.newTeams.blue.striker"
              ></sui-dropdown>
            </div>
          </div>
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
import PlayerCard from '../components/PlayerCard.vue';

export default Vue.extend({
  data() {
    return {
      users: [
        { text: 'Zoli', value: 'Zoli' },
        { text: 'Ezékiel', value: 'Ezékiel' },
        { text: 'Gábor', value: 'Gábor' },
        { text: 'Józsi', value: 'Józsi' }
      ]
    };
  }
});
</script>

