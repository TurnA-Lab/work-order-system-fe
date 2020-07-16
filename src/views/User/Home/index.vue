<template>
  <main class="user">
    <user-card></user-card>
    <user-menu></user-menu>
  </main>
</template>

<script lang="ts">
import Vue from "vue";

import UserCard from "./Card.vue";
import UserMenu from "./Menu.vue";

export default Vue.extend({
  name: "userIndex",
  components: {
    UserCard,
    UserMenu
  }
});
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 90vh;
  width: calc(var(--card-width) * 4);
}
</style>
