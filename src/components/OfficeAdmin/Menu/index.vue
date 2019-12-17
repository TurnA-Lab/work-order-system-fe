/*
 * @Author: Skye Young
 * @Date: 2019-10-28 19:49:07
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-30 19:22:26
 */

<template>
  <el-menu
    default-active="1"
    class="root-menu"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    :router="true"
  >
    <header>{{headerText}}</header>

    <el-menu-item index="1" :route="{name: 'rootHome'}">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-menu-item v-if="this.$store.state.userInfo.department === '质量建设与评估办公室'" index="2" :route="{name: 'officeAdminWorkOrderManager'}">
      <i class="el-icon-menu"></i>
      <span slot="title">工单管理</span>
    </el-menu-item>

    <el-menu-item index="3" :route="{name: 'officeAdminDigitizeSheet'}">
      <i class="el-icon-menu"></i>
      <span slot="title">奖金 / 业绩表格录入</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["isCollapse"],
  computed: {
    headerText() {
      return this.isCollapse ? "J." : "JUST WO";
    }
  },
  methods: {
    handleOpen(key: string[], keyPath: string[]) {
      console.log(key, keyPath);
    },
    handleClose(key: string[], keyPath: string[]) {
      console.log(key, keyPath);
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/stylesheet/default.scss";

.root-menu {
  height: 100%;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2);

  &:not(.el-menu--collapse) {
    width: 300px;
    // min-height: 400px;
  }

  header {
    height: 72px;
    text-align: center;
    font-size: 24px;
    font-weight: 800;
    line-height: 72px;
    color: $main;
    overflow: hidden;
  }
}
</style>
