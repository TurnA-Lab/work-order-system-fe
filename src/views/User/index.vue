<template>
  <main class="user">
    <user-card />
    <user-menu />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import UserCard from "@/components/User/Etc/UserCard.vue";
import UserMenu from "@/components/User/Menu/index.vue";

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

  height: 90vh;
  padding: 0rem 3rem;
}
</style>