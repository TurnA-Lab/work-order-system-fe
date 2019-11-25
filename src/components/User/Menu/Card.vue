/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:45:37 
 * @Last Modified by:   Skye Young 
 * @Last Modified time: 2019-10-28 19:45:37 
 */

<template>
  <transition appear appear-active-class="slide" @appear="lockCard" @after-appear="unlockCard">
    <el-card class="box">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot name="main"></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </el-card>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },
  methods: {
    lockCard(el: HTMLElement) {
      el.classList.add("lock-card");
    },
    unlockCard(el: HTMLElement) {
      setTimeout(() => {
        el.classList.remove("lock-card");
      }, 500);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/stylesheet/default.scss";

.box {
  height: $card-width * 1.414;
  width: $card-width;
  border-radius: 1rem;
  text-align: center;

  box-sizing: border-box;

  display: flex;
  justify-content: center;
}

@include screen($larger) {
  .box {
    height: $static-card-width * 1.414;
    width: $static-card-width;
  }
}

.slide {
  animation: slide 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}

@keyframes slide {
  from {
    opacity: 0;
    transform: translateX(5vw);
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 1;
    transform: translateX(0vw);
  }
}
.lock-card {
  pointer-events: none;
}
</style>