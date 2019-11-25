/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:49:31 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-25 13:00:32
 */

<template>
  <a class="back" @click="clickFun">
    <span id="backIcon" class="el-icon-back"></span>
    <slot>{{text || "返回"}}</slot>
  </a>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["text"],
  methods: {
    clickFun() {
      this.$emit("click");
    }
  }
});
</script>

<style lang="scss" scoped>
.back {
  color: #95a5a6;

  cursor: pointer;
  margin-inline-start: 12px;

  &:hover > span {
    animation: arrow-move 0.6s;
  }
}

@keyframes arrow-move {
  0%,
  100% {
    transform: translateX(0px);
  }

  50% {
    transform: translateX(-0.8vw);
  }

  70% {
    transform: translateX(2px);
  }

  90% {
    transform: translateX(-0.6vw);
  }
}
</style>