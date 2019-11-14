<template>
  <div class="ui middle aligned center aligned grid">
    <div class="six wide column">
      <h2 class="ui huge header">
        <div class="content">Log-in to your account</div>
      </h2>
      <div class="ui large form">
        <div class="ui segment">
          <button class="ui huge primary button" @click="login('github')">
            <i class="github icon"></i>
            Login with Github
          </button>
          <button class="ui huge primary button" @click="login('google')">
            <i class="google icon"></i>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import firebaseService from '../services/firebase.service';

export default Vue.extend({
  components: {},
  data() {
    return {};
  },
  methods: {
    login(providerName) {
      firebaseService.login(providerName);
    }
  }
});
</script>
<style scoped>
html,
body,
body > .grid {
  height: 100%;
}
</style>
