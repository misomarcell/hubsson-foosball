<template>
  <div class="ui sixteen column grid segment">
    <div class="ui eight wide column">
      <div class="ui cards">
        <div class="ui fluid card">
          <div class="content">
            <div class="ui">
              <sui-dropdown placeholder="Select player to add..." selection fluid search></sui-dropdown>
            </div>
          </div>
          <div class="extra content">
            <div class="ui basic fluid green button">Add</div>
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
import PlayerCard from '../components/PlayerCard';

export default Vue.extend({
  mounted() {
    $(this.$refs['player-selector-dropdown']).dropdown({});
  }
});
</script>

