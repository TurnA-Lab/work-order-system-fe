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
@import "@/stylesheet/default.scss";

.user {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 90vh;
  width: 85vw;
}

@include screen($larger) {
  .user {
    width: $static-card-width * 4;
  }
}
</style>
