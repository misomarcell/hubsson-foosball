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
                :options="users | excludeSelected(selectedUsers)"
                v-model="$store.state.newTeams.red.defender"
                test-id="player-select-red-defender"
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
                test-id="player-select-red-striker"
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
                test-id="player-select-blue-defender"
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
                test-id="player-select-blue-striker"
              ></sui-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import { Event } from "../models/event";
import PlayerCard from "../components/PlayerCard.vue";
import userService from "../services/user.service";
import { User } from '../models/user';

export default Vue.extend({
  data() {
    let users: { text: string, value: User }[] = [];
    let selectedUsers: { text: string, value: User }[] = [];
    userService.getAllUser().then(u => {
      users.push(...u.map(x => {
        return {
          text: x.displayName || x.email ,
          value: x
        }
      }))
    });
    
    return {
      users: users,
      selectedUsers: selectedUsers
    };
  },
  watch: {
    '$store.state.newTeams.red.defender': function(user) {
      this.selectedUsers[0] = user;
    },
    '$store.state.newTeams.red.striker': function(user) {
      this.selectedUsers[1] = user;
    },
    '$store.state.newTeams.blue.defender': function(user) {
      this.selectedUsers[2] = user;
    },
    '$store.state.newTeams.blue.striker': function(user) {
      this.selectedUsers[3] = user;
    }
  }
});
</script>

