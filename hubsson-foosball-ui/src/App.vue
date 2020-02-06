<template>
  <router-view />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import { User } from './models/user';
import { Team, TeamSelect } from "./models/team";

Vue.filter("date", value => {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
});

Vue.filter("displayName", (value: User) => {
  return value.displayName || value.email;
});

Vue.filter("avatar", (value: User) => {
  return value.photoURL || 'https://semantic-ui.com/images/avatar/small/elliot.jpg';
});

Vue.filter("excludeSelected", (value: {text: string, value: string}[], userId: string, selectedUsers: TeamSelect) => {
 const selectedUserIds = [
   selectedUsers.red.strikerId,
   selectedUsers.red.defenderId,
   selectedUsers.blue.strikerId,
   selectedUsers.blue.defenderId,
 ].filter(id => !!id && id !== userId);

  return value.filter(v => !selectedUserIds.includes(v.value))
});

export default Vue.extend({
  data() {
    return {};
  }
});
</script>
