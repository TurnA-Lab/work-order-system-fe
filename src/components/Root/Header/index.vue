<template>
  <div class="header">
    <el-button :icon="btnIcon" @click="clickFun" circle></el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["isCollapse"],
  methods: {
    clickFun() {
      this.$emit("click");
    }
  },
  computed: {
    btnIcon() {
      return this.isCollapse ? "el-icon-s-unfold" : "el-icon-s-fold";
    }
  }
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 0.5vw 1vw;
}
</style>