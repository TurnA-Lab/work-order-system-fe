/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:47:31 
 * @Last Modified by:   Skye Young 
 * @Last Modified time: 2019-10-28 19:47:31 
 */

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
  justify-content: space-between;

  height: 90vh;
  width: 85vw;
}
</style>