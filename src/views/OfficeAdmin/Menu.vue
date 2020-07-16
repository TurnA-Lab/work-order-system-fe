<template>
  <el-menu
    :default-active="active[$route.name]"
    class="root-menu"
    :collapse="isCollapse"
    :router="true"
  >
    <header>{{ headerText }}</header>

    <el-menu-item index="1" :route="{ name: 'officeAdminHome' }">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>

    <el-menu-item
      v-if="this.$store.state.userInfo.department === '质量建设与评估办公室'"
      index="2"
      :route="{ name: 'officeAdminWorkOrderManager' }"
    >
      <i class="el-icon-menu"></i>
      <span slot="title">工单管理</span>
    </el-menu-item>

    <el-menu-item index="3" :route="{ name: 'officeAdminImportSheet' }">
      <i class="el-icon-menu"></i>
      <span slot="title">奖励 / 业绩分表格录入</span>
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
        officeAdminHome: "1",
        officeAdminWorkOrderManager: "2",
        officeAdminImportSheet: "3"
      }
    };
  },
  computed: {
    headerText() {
      return this.isCollapse ? "J." : "JUST WO";
    }
  }
});
</script>

<style lang="scss" scoped>
.root-menu {
  height: 100%;
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;

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
