<template>
  <div class="root">
    <root-menu :is-collapse="menuIsCollapse" />
    <main>
      <root-header :is-collapse="menuIsCollapse" @click="toggleIsCollapse"></root-header>
      <main></main>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RootMenu from "@/components/Root/Menu/index.vue";
import RootHeader from "@/components/Root/Header/index.vue";

export default Vue.extend({
  components: {
    RootMenu,
    RootHeader
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
  width: 100%;
  height: 100%;

  display: flex;

  & > main {
    display: flex;
    flex-direction: column;
  }
}
</style>