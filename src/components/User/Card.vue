<template>
  <transition
    appear
    appear-active-class="slide"
    @appear="lockCard"
    @after-appear="unlockCard"
  >
    <div class="menu-card" @click="$emit('click')">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
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
.menu-card {
  height: var(--card-height);
  width: var(--card-width);
  border-radius: 1rem;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 2px 18px 0px rgba(0, 0, 0, 0.1);

  box-sizing: border-box;

  display: flex;
  justify-content: center;
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
