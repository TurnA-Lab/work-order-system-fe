<template>
  <!-- <transition appear appear-active-class="expand-enter-active"> -->
  <el-card class="card slide-up"></el-card>
  <!-- </transition> -->
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.card {
  width: 90vw;
  height: 95vh;
  border-radius: 1rem 1rem 0rem 0rem;

  position: fixed;
  left: 5vw;
  top: 10vh;

  opacity: 0;
}

.slide-up {
  animation: slide-up 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}

@keyframes slide-up {
  0% {
    opacity: 1;
    transform: translateY(20vw);
  }

  100% {
    opacity: 1;
    transform: translateY(0vw);
  }
}

// .expand-enter-active {
//   animation: expand 0.4s ease-in forwards;
// }

// @keyframes expand {
//   0% {
//     opacity: 0;
//     transform: scale(0.2);
//   }

//   30% {
//     opacity: 1;
//   }

//   100% {
//     opacity: 1;
//     transform: scale(1);
//   }
// }
</style>