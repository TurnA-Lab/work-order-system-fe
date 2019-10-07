<template>
  <a class="back" @click="clickFun">
    <span id="backIcon" class="el-icon-back"></span> 返回
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    clickFun() {
      this.$emit("click");
    }
  }
})
</script>

<style lang="scss" scoped>
.back {
  color: #95a5a6;

  cursor: pointer;
  user-select: none;
  margin-inline-start: 12px;

  &:hover > span {
    animation: arrow-move 0.8s;
  }
}

@keyframes arrow-move {
  0%,
  50%,
  100% {
    transform: translateX(0px);
  }

  25%,
  75% {
    transform: translateX(-0.8vw);
  }
}
</style>