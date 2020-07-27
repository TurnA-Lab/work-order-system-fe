<template>
  <el-menu
    class="root-menu"
    :default-active="active[$route.name]"
    :collapse="isCollapse"
    :router="true"
  >
    <header>{{ headerText }}</header>
    <el-menu-item index="1" :route="{ name: 'rootHome' }">
      <i class="el-icon-s-home"></i>
      <span slot="title">主页</span>
    </el-menu-item>

    <el-menu-item index="2" :route="{ name: 'rootTypeManager' }">
      <i class="el-icon-cold-drink"></i>
      <span slot="title">类型 / 级别管理</span>
    </el-menu-item>

    <el-menu-item index="3" :route="{ name: 'rootBonusManager' }">
      <i class="el-icon-lollipop"></i>
      <span slot="title">奖金管理</span>
    </el-menu-item>

    <el-menu-item index="4" :route="{ name: 'rootPerformanceManager' }">
      <i class="el-icon-ice-cream"></i>
      <span slot="title">业绩管理</span>
    </el-menu-item>

    <el-menu-item index="5" :route="{ name: 'rootUserManager' }">
      <i class="el-icon-notebook-1"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="6" :disabled="true" class="file-manager">
      <div @click="redirect2FileManager">
        <i class="el-icon-files"></i>
        <span slot="title">文件管理</span>
      </div>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: { isCollapse: Boolean },
  data() {
    return {
      active: {
        rootHome: "1",
        rootTypeManager: "2",
        rootBonusManager: "3",
        rootPerformanceManager: "4",
        rootUserManager: "5"
      }
    };
  },
  computed: {
    headerText() {
      return this.$store.getters.siteName(this.isCollapse);
    }
  },
  methods: {
    redirect2FileManager() {
      this.$confirm("即将跳转至“文件管理”页面，是否继续？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.open("http://10.3.4.18:8998", "JUST WO FileSystem");
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消" });
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.root-menu {
  height: 100%;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2);

  &:not(.el-menu--collapse) {
    width: 300px;
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

.file-manager {
  cursor: pointer;
  opacity: 1;
  background: unset;
}
</style>
