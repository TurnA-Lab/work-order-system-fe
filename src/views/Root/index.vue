<template>
  <div class="root">
    <root-menu :is-collapse="menuIsCollapse" />
    <main>
      <root-header
        :is-collapse="menuIsCollapse"
        @click="toggleIsCollapse"
      ></root-header>
      <root-main></root-main>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import RootHeader from "./Header.vue";
import RootMain from "./Main/index.vue";
import RootMenu from "./Menu.vue";

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
