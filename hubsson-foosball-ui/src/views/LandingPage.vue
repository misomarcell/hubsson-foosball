<template>
  <div class="login-container">
    <button class="ui huge primary button" @click="googleLogin()">
      <i class="google icon"></i>
      Login with Google
    </button>

    <button class="ui huge primary button" @click="githubLogin()">
      <i class="github icon"></i>
      Login with Github
    </button>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import Firebase from "firebase";

export default Vue.extend({
  components: {},
  data() {
    return {};
  },
  methods: {
    googleLogin() {
      Firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          const provider = new Firebase.auth.GoogleAuthProvider();
          //Firebase.auth().signInWithPopup(provider);
          Firebase.auth()
            .signInWithPopup(provider)
            .then(result => {
              console.log(result);
            });
        }

        //Firebase.auth().signOut;
      });
    },

    githubLogin() {
      Firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          const provider = new Firebase.auth.GithubAuthProvider();
          //Firebase.auth().signInWithPopup(provider);
          Firebase.auth()
            .signInWithPopup(provider)
            .then(result => {
              console.log(result);
            });
        }

        //Firebase.auth().signOut;
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
