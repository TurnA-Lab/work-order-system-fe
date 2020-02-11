<template>
  <el-menu
    default-active="1"
    class="root-menu"
    :collapse="isCollapse"
    :router="true"
  >
    <header>{{ headerText }}</header>
    <el-menu-item index="1" :route="{ name: 'rootHome' }">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-menu-item index="2" :route="{ name: 'rootTypeManager' }">
      <i class="el-icon-menu"></i>
      <span slot="title">类型 / 级别管理</span>
    </el-menu-item>

    <el-menu-item index="3" :route="{ name: 'rootBonusManager' }">
      <i class="el-icon-setting"></i>
      <span slot="title">奖励管理</span>
    </el-menu-item>

    <el-menu-item index="4" :route="{ name: 'rootPerformanceManager' }">
      <i class="el-icon-setting"></i>
      <span slot="title">业绩分管理</span>
    </el-menu-item>

    <el-menu-item index="5" :route="{ name: 'rootUserManager' }">
      <i class="el-icon-document"></i>
      <span slot="title">用户管理</span>
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
