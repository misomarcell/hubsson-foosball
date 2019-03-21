<template>
    <div id="score-card" class="ui clearing red segment" style="width: 600px; margin: auto; margin-top: 30px;">
        <h3 class="ui right floated blue header">
            Blue Team
            <div class="sub header">{{ blue.striker == null ? '?' : blue.striker.name }} & {{ blue.defense == null
                ? '?' : blue.defense.name }}</div>
        </h3>
        <h3 class="ui left floated red header">
            Red Team
            <div class="sub header">{{ red.striker == null ? '?' : red.striker.name }} & {{ red.defense == null ?
                '?' : red.defense.name }}</div>
        </h3>
        <h3 class="ui center aligned header">
            {{ red.score }} : {{ blue.score }}
        </h3>
    </div>    
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return this.$store.state.match;
  },
});
</script>

<style>
</style>
