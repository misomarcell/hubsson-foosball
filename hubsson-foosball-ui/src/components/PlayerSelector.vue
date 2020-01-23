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
                :options="usersSelectList | excludeSelected(selectedUsers.red.defenderId, selectedUsers)"
                v-model="selectedUsers.red.defenderId"
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
                :options="usersSelectList | excludeSelected(selectedUsers.red.strikerId, selectedUsers)"
                v-model="selectedUsers.red.strikerId"
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
                :options="usersSelectList | excludeSelected(selectedUsers.blue.defenderId, selectedUsers)"
                v-model="selectedUsers.blue.defenderId"
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
                :options="usersSelectList | excludeSelected(selectedUsers.blue.strikerId, selectedUsers)"
                v-model="selectedUsers.blue.strikerId"
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
import { Team, TeamSelect } from "../models/team";

export default Vue.extend({
  data() {
    let users: User[] = [];
    let usersSelectList: { text: string, value: string }[] = [];
    let selectedUsers: TeamSelect = { red: {}, blue: {}};
    userService.getAllUser().then(u => {
      users = u;
      usersSelectList.push(...users.map(x => {
        return {
          text: x.displayName || x.email ,
          value: x.uid
        }
      }));
    });
    
    return {
      users,
      usersSelectList,
      selectedUsers
    };
  }
});
</script>

