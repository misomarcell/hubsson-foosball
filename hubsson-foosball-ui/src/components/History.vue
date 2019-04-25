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
                    <tr :key="item.time"
                        v-for="item in history">
                        <td>
                            <h4 class="ui image header" v-bind:class="{red: item.isRed, blue: !item.isRed}">
                                <img src="https://semantic-ui.com/images/avatar/small/elliot.jpg" class="ui mini rounded image">
                                <div class="content">
                                    {{ item.player }}
                                </div>
                            </h4>
                        </td>
                        <td>
                            {{ item.player }}
                            <br />
                            <small>{{ item.time }}</small>
                        </td>
                        <td class="collapsing">
                            <button class="ui icon green button" data-tooltip="It was me">
                                <i class="icon hand paper"></i>
                            </button>
                            <button class="ui icon blue button" data-tooltip="Change to own-goal">
                                <i class="icon exchange"></i>
                            </button>
                            <button class="ui icon red button" data-tooltip="Remove">
                                <i class="icon trash alternate"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
        state: this.$store.state,
    };
  },
  computed: {
      history(): any {
        return this.state.match.history;
      },
  },
});
</script>

