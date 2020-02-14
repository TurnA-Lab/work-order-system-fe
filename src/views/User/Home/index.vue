<template>
  <main class="user">
    <user-card />
    <user-menu />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import UserCard from "./UserCard.vue";
import UserMenu from "./menu.vue";

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
