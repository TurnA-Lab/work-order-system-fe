<template>
  <a class="back" @click="clickFun">
    <span class="el-icon-back"></span>
    <slot>{{ text || "&nbsp;返回" }}</slot>
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

  & > span {
    transition: transform 0.4s;
  }

  &:hover > span {
    transform: translateX(-0.6rem);
  }
}
</style>
