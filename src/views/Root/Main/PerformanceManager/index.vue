<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="管理">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="编辑">
            <editor></editor>
          </el-tab-pane>
          <el-tab-pane label="筛选">
            <filter></filter>
          </el-tab-pane>
          <el-tab-pane label="新增">
            <addition></addition>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>
    <el-tab-pane label="导出">
      <div class="tabs-body">
        <download-table
          file-name="业绩分表"
          api="/api/root/performance/getExcel"
        ></download-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import Editor from "./Editor.vue";
import Filter from "./Filter.vue";
import Addition from "./Addition.vue";
import DownloadTable from "@/components/Root/DownloadTable.vue";

export default Vue.extend({
  components: {
    Editor,
    Filter,
    Addition,
    DownloadTable,
  },
  data() {
    return {
      form: { year: "" },
    };
  },
});
</script>
