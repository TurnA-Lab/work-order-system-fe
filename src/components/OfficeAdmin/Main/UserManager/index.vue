/*
 * @Author: Skye Young 
 * @Date: 2019-11-12 20:18:38 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-20 19:41:51
 */

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
    <el-tab-pane label="下载">
      <div class="tabs-body">
        <download-table></download-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import EditUser from "./EditUser/index.vue";
import FilterUser from "./FilterUser.vue";
import AddUser from "./AddUser.vue";
import DownloadTable from "./DownloadTable.vue";

export default Vue.extend({
  components: {
    EditUser,
    FilterUser,
    AddUser,
    DownloadTable
  }
});
</script>

<style lang="scss" scoped>
.tabs-body {
  background-color: #ffffff;
  margin: 0px 1vw 1vw 1vw;
  padding: 1vh 2vw;
  border-radius: 1rem 2px 2px 1rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>