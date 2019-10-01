<template>
  <!-- <transition appear appear-class="slide-fade-enter" appear-active-class="slide-fade-enter-active"> -->
  <main class="user">
    <user-info></user-info>
    <user-menu></user-menu>
  </main>
  <!-- </transition> -->
</template>

<script lang="ts">
import Vue from "vue";
// import UserHeader from "@/components/UserHeader.vue";
import UserInfo from "@/components/UserInfo.vue";
import UserMenu from "@/components/UserMenu.vue";

export default Vue.extend({
  name: "userIndex",
  components: {
    UserInfo,
    UserMenu
    // UserHeader
  }
});
</script>

<style lang="scss" scoped>
.user {
  position: fixed;
  top: 5vh;
  left: 5vw;

  display: flex;
  align-items: center;

  // width: 95vw;
  height: 90vh;
  padding: 0rem 3rem;
}

// .slide-fade-enter {
//   opacity: 0;
//   transform: translateY(30vw);
// }

// .slide-enter-active {
//   transition-property: opacity transform;
//   transition-duration: 0.2s 1.2s;
// }
</style>