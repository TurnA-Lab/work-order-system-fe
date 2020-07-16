<template>
  <el-card
    class="card slide-up"
    :class="{ fullscreen: wheel }"
    @mousewheel.native="mouseWheel"
  >
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      wheel: false
    };
  },
  methods: {
    mouseWheel() {
      if ((event as MouseWheelEvent).deltaY > 20) {
        this.wheel = true;
      } else if ((event as MouseWheelEvent).deltaY < -20) {
        this.wheel = false;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.card {
  align-self: flex-end;

  width: 90vw;
  height: 95vh;
  border-radius: 1rem 1rem 0rem 0rem;

  opacity: 0;
  transition: all 0.4s;
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

.fullscreen {
  width: 100vw;
  height: 100vh;
  border-radius: 0%;
}
</style>
