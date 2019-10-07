<template>
  <main-card>
    <template v-slot:header>
      <back-link @click="goBack"></back-link>
      <vertical-divider isTransparent="true"></vertical-divider>
      <el-button type="text">工单系统</el-button>
    </template>
    <template v-slot:main>
      <router-view></router-view>
    </template>
  </main-card>
</template>

<script lang="ts">
import Vue from "vue";
import MainCard from "@/components/MainCard.vue";
import BackLink from "@/components/BackLink.vue";
import VerticalDivider from "@/components/VerticalDivider.vue";

export default Vue.extend({
  components: {
    MainCard,
    BackLink,
    VerticalDivider
  },
  data() {
    return {
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "index" });
    }
  }
});
</script>

<style lang="scss" scoped>
</style>