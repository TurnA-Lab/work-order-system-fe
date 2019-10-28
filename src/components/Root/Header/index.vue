/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:49:00 
 * @Last Modified by:   Skye Young 
 * @Last Modified time: 2019-10-28 19:49:00 
 */

<template>
  <div class="header">
    <div class="menu-part">
      <el-tooltip :content="foldText" placement="bottom">
        <el-button :icon="btnIcon" @click="clickFun" circle></el-button>
      </el-tooltip>
      <vertical-divider isTransparent="true"></vertical-divider>
      <span class="tittle">后台管理</span>
    </div>
    <div class="menu-part">
      <el-tooltip content="全屏模式" placement="bottom">
        <el-button @click="toggleFullScreen" icon="el-icon-full-screen" type="text" circle plain></el-button>
      </el-tooltip>
      <vertical-divider isTransparent="true"></vertical-divider>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VerticalDivider from "@/components/Etc/VerticalDivider.vue";

export default Vue.extend({
  props: ["isCollapse"],
  components: {
    VerticalDivider
  },
  methods: {
    clickFun() {
      this.$emit("click");
    },
    toggleFullScreen() {
      if (document.fullscreen) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  },
  computed: {
    btnIcon() {
      return this.isCollapse ? "el-icon-s-unfold" : "el-icon-s-fold";
    },
    foldText() {
      return this.isCollapse ? "展开菜单" : "折叠菜单";
    }
  }
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0.5vw 1vw;
  height: 3vw;
  user-select: none;

  & > .menu-part {
    & > .tittle {
      font-weight: 800;
    }
  }
}
</style>