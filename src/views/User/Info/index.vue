<template>
  <main-card>
    <template v-slot:header>
      <back-link @click="$router.push({ name: 'index' })"></back-link>
      <vertical-divider :isTransparent="true"></vertical-divider>
      <el-button
        type="text"
        @click="$router.push({ name: 'userInfoProfile' })"
        :disabled="btnIsDisabled"
        >个人资料</el-button
      >
      <vertical-divider></vertical-divider>
      <el-button
        type="text"
        @click="$router.push({ name: 'userInfoPassword' })"
        :disabled="!btnIsDisabled"
        >修改密码</el-button
      >
    </template>
    <router-view></router-view>
  </main-card>
</template>

<script lang="ts">
import Vue from "vue";

import BackLink from "@/components/Etc/BackLink.vue";
import VerticalDivider from "@/components/Etc/VerticalDivider.vue";
import MainCard from "@/components/User/MainCard.vue";

export default Vue.extend({
  components: {
    MainCard,
    BackLink,
    VerticalDivider
  },
  computed: {
    btnIsDisabled() {
      return this.$route.name === "userInfoProfile";
    }
  }
});
</script>
