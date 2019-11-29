/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:47:24 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-30 01:41:36
 */

<template>
  <div class="root">
    <root-menu :is-collapse="menuIsCollapse" />
    <main>
      <root-header :is-collapse="menuIsCollapse" @click="toggleIsCollapse"></root-header>
      <root-main></root-main>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RootMenu from "@/components/OfficeAdmin/Menu/index.vue";
import RootHeader from "@/components/OfficeAdmin/Header/index.vue";
import RootMain from "@/components/OfficeAdmin/Main/index.vue";

export default Vue.extend({
  components: {
    RootMenu,
    RootHeader,
    RootMain
  },
  data() {
    return {
      menuIsCollapse: false
    };
  },
  methods: {
    toggleIsCollapse() {
      this.menuIsCollapse = !this.menuIsCollapse;
    }
  }
});
</script>

<style lang="scss" scoped>
.root {
  width: 100vw;
  height: 100vh;

  display: flex;

  & > main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
}
</style>