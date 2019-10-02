<template>
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
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.box {
  height: 430px;
  width: 430px * 0.7;
  border-radius: 1rem;
  text-align: center;

  box-sizing: border-box;
  user-select: none;

  display: flex;
  justify-content: center;
}
</style>