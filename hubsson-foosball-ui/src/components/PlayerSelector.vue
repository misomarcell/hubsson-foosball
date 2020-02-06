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
                :options="usersSelectList | excludeSelected($store.state.newTeams.red.defenderId, $store.state.newTeams)"
                v-model="$store.state.newTeams.red.defenderId"
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
                :options="usersSelectList | excludeSelected($store.state.newTeams.red.strikerId, $store.state.newTeams)"
                v-model="$store.state.newTeams.red.strikerId"
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
                :options="usersSelectList | excludeSelected($store.state.newTeams.blue.defenderId, $store.state.newTeams)"
                v-model="$store.state.newTeams.blue.defenderId"
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
                :options="usersSelectList | excludeSelected($store.state.newTeams.blue.strikerId, $store.state.newTeams)"
                v-model="$store.state.newTeams.blue.strikerId"
                test-id="player-select-blue-striker"
              >
               
               </sui-dropdown>
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
    userService.getAllUser().then(u => {
      this.$store.state.users = u;
      users = u;
      usersSelectList.push(...users.map(x => {
        return {
          text: x.displayName || x.email ,
          value: x.uid,
          image: { avatar: true, src: x.photoURL }
        }
      }));
    });
    
    return {
      users,
      usersSelectList
    };
  }
});
</script>

