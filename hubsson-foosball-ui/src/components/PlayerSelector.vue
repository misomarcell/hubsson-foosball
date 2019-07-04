<template>
  <div class="ui sixteen column grid segment">
    <div class="ui eight wide column">
      <div class="ui cards">
        <div class="ui fluid card">
          <div class="content">
            <div class="ui">
              <sui-dropdown placeholder="Select player to add..." selection fluid search :options='users' v-model='selectedUser'></sui-dropdown>
            </div>
          </div>
        </div>
        <div class="ui fluid card">
          <div class="content">
            <div class="ui">
              <sui-dropdown placeholder="Select player to add..." selection fluid search :options='users' v-model='selectedUser'></sui-dropdown>
            </div>
          </div>
        </div>
        <div class="ui eight wide column">
          <div class="ui fluid card">
            <div class="content">
              <div class="ui">
                <sui-dropdown placeholder="Select player to add..." selection fluid search :options='users' v-model='selectedUser'></sui-dropdown>
              </div>
            </div>
          </div>
          <div class="ui fluid card">
            <div class="content">
              <div class="ui">
                <sui-dropdown placeholder="Select player to add..." selection fluid search :options='users' v-model='selectedUser'></sui-dropdown>
              </div>
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
        { text: 'Zoli',  value: 'Zoli' },
        { text: 'Ezékiel',  value: 'Ezékiel' },
        { text: 'Gábor',  value: 'Gábor' },
        { text: 'Józsi',  value: 'Józsi' }
      ],
      selectedUser: undefined
    };
  },
  mounted() {
    // $(this.$refs['player-selector-dropdown']).dropdown({});
  }
});
</script>

