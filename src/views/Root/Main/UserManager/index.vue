<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="管理">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="编辑">
            <edit-user></edit-user>
          </el-tab-pane>
          <el-tab-pane label="筛选">
            <filter-user></filter-user>
          </el-tab-pane>
          <el-tab-pane label="新增">
            <add-user></add-user>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>
    <el-tab-pane label="导出">
      <div class="tabs-body">
        <download-table
          file-name="用户表"
          api="/api/online/root/getUserExcel"
        ></download-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import EditUser from "./EditUser/index.vue";
import FilterUser from "./FilterUser.vue";
import AddUser from "./AddUser.vue";
import DownloadTable from "@/components/Root/DownloadTable.vue";

export default Vue.extend({
  components: {
    EditUser,
    FilterUser,
    AddUser,
    DownloadTable
  }
});
</script>
