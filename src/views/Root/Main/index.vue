<template>
  <main>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped>
main {
  flex-grow: 1;
  padding: 0.5vw 1vw;
}
</style>
