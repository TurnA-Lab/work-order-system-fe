/*
 * @Author: Skye Young 
 * @Date: 2019-10-30 20:30:14 
 * @Last Modified by:   Skye Young 
 * @Last Modified time: 2019-10-30 20:30:14 
 */

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