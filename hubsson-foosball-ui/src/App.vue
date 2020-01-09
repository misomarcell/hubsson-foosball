<template>
  <router-view />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import { User } from './models/user';

Vue.filter("date", value => {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
});

Vue.filter("displayName", (value: User) => {
  return value.displayName || value.email;
});

Vue.filter("avatar", (value: User) => {
  return value.photoURL || 'https://semantic-ui.com/images/avatar/small/elliot.jpg';
});

export default Vue.extend({
  data() {
    return {};
  }
});
</script>
