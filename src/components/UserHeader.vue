<template>
  <!-- <el-menu class="show-at-end" :default-active="activeIndex" mode="horizontal">
    <span class="logo">JUST WO</span>
    <el-menu-item>
      <span class="el-icon-full-screen"></span>
      全屏
    </el-menu-item>
    <el-menu-item index="1" disabled>消息</el-menu-item>
    <el-submenu index="2">
      <template slot="title">您好，{{userName}}</template>
      <el-menu-item>首页</el-menu-item>
      <el-menu-item>退出</el-menu-item>
    </el-submenu>
  </el-menu>-->
  <header>
    <el-dropdown>
      <span>
        {{userName}}
        <span class="el-icon-arrow-down el-icon--right"></span>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-divider></el-divider>
  </header>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      activeIndex: "",
      userName: sessionStorage.getItem("wo_name")
    };
  }
});
</script>

<style lang="scss" scoped>
// .show-at-end {
//   display: flex;
//   justify-content: flex-end;
// }

// header {
//   height: 60px;
//   line-height: 60px;
// }
</style>