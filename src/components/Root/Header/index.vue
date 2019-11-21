/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:49:00 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-12 20:34:36
 */

<template>
  <header>
    <div class="before-part">
      <el-tooltip :content="foldText" placement="bottom">
        <el-button :icon="btnIcon" @click="clickFun" circle></el-button>
      </el-tooltip>
      <vertical-divider isTransparent="true"></vertical-divider>
      <span class="title">管理后台</span>
    </div>
    <div class="after-part">
      <el-tooltip content="全屏模式" placement="bottom">
        <el-button @click="toggleFullScreen" icon="el-icon-full-screen" type="text" circle plain></el-button>
      </el-tooltip>
      <vertical-divider isTransparent="true"></vertical-divider>
      <el-tooltip content="进入用户界面" placement="bottom">
        <el-button @click="turnToUserPage" icon="el-icon-s-flag" type="text" circle plain></el-button>
      </el-tooltip>
      <vertical-divider isTransparent="true"></vertical-divider>
      <el-dropdown trigger="click" @command="menuCommand">
        <el-button icon="el-icon-s-custom" circle></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
          <el-dropdown-item command="logout" icon="el-icon-switch-button">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
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
    },
    turnToUserPage() {
      this.$confirm(
        "切换到用户界面后，回到管理页面将要求再次登录, 是否继续?",
        "注意",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        sessionStorage.setItem("wo_permission", "0");
        this.$router.replace({ name: "index" });
        this.$message({
          type: "success",
          message: "切换成功!"
        });
      });
    },
    menuCommand(command: string) {
      switch (command) {
        case "logout": {
          this.$store.commit("clearUserInfo");
          sessionStorage.clear();
          this.$message({
            type: "success",
            message: "退出登录成功!"
          });
          this.$router.replace({ name: "login" });
          break;
        }
        default: {
          this.$message({
            type: "info",
            message: "未知操作"
          });
          break;
        }
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
header {
  display: flex;
  justify-content: space-between;

  & > .before-part {
    padding-block-start: 1vh;
    padding-inline-start: 1vw;

    & > .title {
      font-weight: 800;
    }
  }

  & > .after-part {
    padding-block-start: 1vh;
    padding-block-end: 1vh;
    padding-inline-end: 1vw;
  }
}
</style>