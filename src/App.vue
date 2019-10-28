/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:48:06 
 * @Last Modified by:   Skye Young 
 * @Last Modified time: 2019-10-28 19:48:06 
 */

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  created() {
    if (sessionStorage.getItem("wo_user")) {
      this.$store.commit(
        "updateUserInfo",
        JSON.parse(sessionStorage.getItem("wo_user") as string)
      );
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: #f8f9fa;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>