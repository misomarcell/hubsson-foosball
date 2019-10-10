<template>
  <router-view />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Firebase from "firebase";
import moment from "moment";

Vue.filter("date", value => {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
});

export default Vue.extend({
  data() {
    return {};
  }
});
</script>
