<template>
  <div>
    <header>
      <h2>我的工单</h2>
    </header>
    <keep-alive @mousewheel.stop>
      <el-tabs tab-position="left">
        <el-tab-pane label="建设类">
          <construction-manager></construction-manager>
        </el-tab-pane>
        <el-tab-pane label="成果类">
          <achievement-manager></achievement-manager>
        </el-tab-pane>
        <el-tab-pane label="获奖类">
          <award-manager></award-manager>
        </el-tab-pane>
      </el-tabs>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import AchievementManager from "./AchievementManager.vue";
import AwardManager from "./AwardManager.vue";
import ConstructionManager from "./ConstructionManager.vue";

export default Vue.extend({
  components: {
    ConstructionManager,
    AchievementManager,
    AwardManager
  }
});
</script>

<style lang="scss" scoped>
header,
main {
  margin-left: 15px;
}
</style>

<style scoped>
div >>> .el-table__body-wrapper,
div >>> .el-table__fixed-body-wrapper {
  height: 56vh !important;
}
</style>
