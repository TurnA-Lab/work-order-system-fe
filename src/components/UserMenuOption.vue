<template>
  <el-card class="box">
    <h2>{{title}}</h2>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["title"]
});
</script>

<style lang="scss" scoped>
.box {
  height: 430px;
  width: 430px * 0.7;
  border-radius: 1rem;

  box-sizing: border-box;
  user-select: none;
}
</style>