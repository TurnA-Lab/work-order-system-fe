<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="奖金">
      <div class="tabs-body">
        <download-btn
          api="/api/office/bonus/getTemplate"
          filename="奖金模板.xlsx"
          >下载奖金模板</download-btn
        >
        <upload-btn api="/api/office/bonus/excelImport"
          >上传奖金表格</upload-btn
        >
      </div>
    </el-tab-pane>
    <el-tab-pane label="业绩">
      <div class="tabs-body">
        <download-btn
          api="/api/office/performance/getTemplate"
          filename="业绩模板.xlsx"
          >下载业绩模板</download-btn
        >
        <upload-btn api="/api/office/performance/excelImport"
          >上传业绩表格</upload-btn
        >
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Vue from "vue";

import UploadBtn from "@/components/OfficeAdmin/ImporSheetUploadBtn.vue";
import DownloadBtn from "@/components/OfficeAdmin/ImportSheetGetTemplateBtn.vue";

export default Vue.extend({
  components: {
    UploadBtn,
    DownloadBtn
  }
});
</script>

<style lang="scss" scoped>
.tabs-body {
  height: 86vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
