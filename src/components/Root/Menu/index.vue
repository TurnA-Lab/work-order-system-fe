/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:49:07 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-20 22:17:26
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

    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template slot="title">分组一</template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="分组2">
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-menu-item-group>
      <el-submenu index="1-4">
        <template slot="title">选项4</template>
        <el-menu-item index="1-4-1">选项1</el-menu-item>
      </el-submenu>
    </el-submenu>

    <el-menu-item index="3" :route="{name: 'rootTypeManager'}">
      <i class="el-icon-menu"></i>
      <span slot="title">类型 / 级别管理</span>
    </el-menu-item>

    <el-menu-item index="5" :route="{name: 'rootAbout'}">
      <i class="el-icon-setting"></i>
      <span slot="title">奖金 / 业绩管理</span>
    </el-menu-item>

    <el-menu-item index="4" :route="{name: 'rootUserManager'}">
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