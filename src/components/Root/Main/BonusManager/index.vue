<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="管理">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="编辑">
            <edit></edit>
          </el-tab-pane>
          <el-tab-pane label="筛选">
            <filter-info></filter-info>
          </el-tab-pane>
          <el-tab-pane label="新增">
            <add></add>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>
    <el-tab-pane label="导出">
      <div class="tabs-body">
        <download-table
          file-name="奖励表"
          api="/api/online/root/getBonusExcel"
        ></download-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import Edit from "./EditBonus/index.vue";
import FilterInfo from "./FilterBonus.vue";
import Add from "./AddBonus.vue";
import DownloadTable from "../Etc/DownloadTable.vue";

export default Vue.extend({
  components: {
    Edit,
    FilterInfo,
    Add,
    DownloadTable
  },
  data() {
    return {
      form: { year: "" }
    };
  }
});
</script>
