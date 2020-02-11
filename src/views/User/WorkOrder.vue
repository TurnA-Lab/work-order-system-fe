<template>
  <main-card>
    <template v-slot:header>
      <back-link @click="$router.push({ name: 'index' })"></back-link>
      <vertical-divider isTransparent="true"></vertical-divider>
      <el-button
        type="text"
        :disabled="btnIsDisabled"
        @click="$router.push({ name: 'userOrders' })"
        >我的工单</el-button
      >
      <vertical-divider></vertical-divider>
      <el-button
        type="text"
        :disabled="!btnIsDisabled"
        @click="$router.push({ name: 'userNewOrder' })"
        >提交工单</el-button
      >
    </template>
    <router-view></router-view>
  </main-card>
</template>

<script lang="ts">
import Vue from "vue";
import MainCard from "@/components/User/Etc/MainCard.vue";
import BackLink from "@/components/Etc/BackLink.vue";
import VerticalDivider from "@/components/Etc/VerticalDivider.vue";

export default Vue.extend({
  components: {
    MainCard,
    BackLink,
    VerticalDivider
  },
  data() {
    return {};
  },
  computed: {
    btnIsDisabled() {
      if (this.$route.name === "userOrders") {
        return true;
      } else {
        return false;
      }
    }
  }
});
</script>
