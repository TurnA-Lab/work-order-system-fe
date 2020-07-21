<template>
  <main>
    <h1>工单已成功提交。</h1>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend();
</script>

<style lang="scss" scoped>
main {
  height: 60vh;

  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-family: "FZCuJinLJW";
  font-size: 3em;
  color: #999;
}

.post-another-order {
  position: absolute;
  right: 6em;
}
</style>
