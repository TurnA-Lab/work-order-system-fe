/*
 * @Author: Skye Young 
 * @Date: 2019-11-26 21:10:26 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-30 01:52:36
 */

<template>
  <main-card>
    <template v-slot:header>
      <back-link @click="goBack"></back-link>
      <vertical-divider isTransparent="true"></vertical-divider>
      <el-button type="text" @click="loadMemberManager" :disabled="btnIsDisabled">部门成员管理</el-button>
      <vertical-divider></vertical-divider>
      <el-button type="text" @click="loadSheetExport" :disabled="!btnIsDisabled">确认表导出</el-button>
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
  computed: {
    btnIsDisabled() {
      if (this.$route.name === "collegeAdminMemberManager") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    goBack() {
      this.$router.push({ name: "index" });
    },
    loadMemberManager() {
      this.$router.push({ name: "collegeAdminMemberManager" });
    },
    loadSheetExport() {
      this.$router.push({ name: "collegeAdminSheetExport" });
    }
  }
});
</script>

<style lang="scss" scoped>
</style>