<template>
  <transition
    appear
    appear-active-class="slide"
    @appear="lockCard"
    @after-appear="unlockCard"
  >
    <div class="box">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
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
.box {
  height: $card-width * 1.414;
  width: $card-width;
  border-radius: 1rem;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.1);

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
