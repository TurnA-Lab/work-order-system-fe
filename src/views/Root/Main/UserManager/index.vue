<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="管理">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="编辑">
            <editor></editor>
          </el-tab-pane>
          <el-tab-pane label="筛选">
            <filtration></filtration>
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
          file-name="用户表"
          api="/api/root/user/getExcel"
        ></download-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Vue from "vue";

import DownloadTable from "@/components/Root/DownloadUserTable.vue";

import Addition from "./Addition.vue";
import Editor from "./Editor.vue";
import Filtration from "./Filtration.vue";

export default Vue.extend({
  components: {
    Editor,
    Filtration,
    Addition,
    DownloadTable
  }
});
</script>
