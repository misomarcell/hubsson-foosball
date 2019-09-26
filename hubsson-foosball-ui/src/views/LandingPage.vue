<template>
  <div class="login-container">
    <button class="ui huge primary button">
      <i class="google icon"></i>
	  Login 
    </button>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
// import ScoreBoard from "@/components/ScoreBoard.vue";
// import Players from "@/components/Players.vue";
// import PlayerSelector from "@/components/PlayerSelector.vue";
// import History from "@/components/History.vue";
// import Firebase from "firebase";
// import { Match } from "../models/Match";
// import Modal from "../components/Modal.vue";
// import PlayerSelectorVue from "../components/PlayerSelector.vue";

// const app = Firebase.initializeApp({
//   apiKey: "AIzaSyDIoCyBM3IAMrkS6tH70sz1qtr6WaxhTmo",
//   authDomain: "hubsson-foosball-eur3.firebaseapp.com",
//   databaseURL: "https://hubsson-foosball-eur3.firebaseio.com",
//   projectId: "hubsson-foosball-eur3",
//   storageBucket: "hubsson-foosball-eur3.appspot.com",
//   messagingSenderId: "978313456818"
// });

export default Vue.extend({
  components: {
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
  },
  methods: {
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
