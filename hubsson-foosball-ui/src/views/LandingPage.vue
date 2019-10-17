<template>
  <div class="login-container">
    <button class="ui huge primary button" @click="login()">
      <i class="google icon"></i>
      Login
    </button>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Firebase from 'firebase';

export default Vue.extend({
  components: {},
  data() {
    return {};
  },
  methods: {
    login() {
      Firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          const provider = new Firebase.auth.GoogleAuthProvider();
          Firebase.auth().signInWithPopup(provider);
        }

        Firebase.auth().signOut;
      });
    }
  }
});
</script>
<style scoped>
.login-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
