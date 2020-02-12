<template>
  <main-card>
    <template v-slot:header>
      <back-link @click="$router.push({ name: 'index' })"></back-link>
      <vertical-divider isTransparent="true"></vertical-divider>
      <el-button
        type="text"
        @click="$router.push({ name: 'collegeAdminMemberManager' })"
        :disabled="btnIsDisabled"
        >部门成员管理</el-button
      >
      <vertical-divider></vertical-divider>
      <el-button
        type="text"
        @click="$router.push({ name: 'collegeAdminExportSheet' })"
        :disabled="!btnIsDisabled"
        >确认表导出</el-button
      >
    </template>
    <router-view></router-view>
  </main-card>
</template>

<script lang="ts">
import Vue from "vue";
import MainCard from "@/components/User/MainCard.vue";
import BackLink from "@/components/Etc/BackLink.vue";
import VerticalDivider from "@/components/Etc/VerticalDivider.vue";

export default Vue.extend({
  components: {
    MainCard,
    BackLink,
    VerticalDivider
  },
  computed: {
    btnIsDisabled() {
      if (this.$route.name === "collegeAdminMemberManager") {
        return true;
      } else {
        return false;
      }
    }
  }
});
</script>

<style lang="scss" scoped></style>
