<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="奖金">
      <div class="tabs-body">
        <el-button
          type="primary"
          @click="download('/api/office/bonus/getTemplate', '奖金模板.xlsx')"
          >下载奖金模板</el-button
        >
        <upload-btn api="/api/office/bonus/excelImport"
          >上传奖金表格</upload-btn
        >
      </div>
    </el-tab-pane>
    <el-tab-pane label="业绩">
      <div class="tabs-body">
        <el-button
          type="primary"
          @click="
            download('/api/office/performance/getTemplate', '业绩模板.xlsx')
          "
          >下载业绩模板</el-button
        >
        <upload-btn api="/api/office/performance/excelImport"
          >上传业绩表格</upload-btn
        >
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";
import Vue from "vue";

import UploadBtn from "@/components/OfficeAdmin/ImporSheetUploadBtn.vue";
import decodeFilename from "@/utils/decodeFilename";

export default Vue.extend({
  components: {
    UploadBtn
  },
  methods: {
    download(api: string, fallbackFilename: string) {
      this.$http
        .post(
          api,
          {},
          {
            headers: {
              token: this.$store.state.userInfo.token
            },
            responseType: "blob"
          }
        )
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            return Promise.resolve([
              decodeFilename(res, fallbackFilename),
              res.data
            ]);
          } else {
            return Promise.reject(res.data.msg);
          }
        })
        .then(([filename, data]) => {
          saveAs(data, filename);
        })
        .catch((err: string) => {
          this.$message({
            message: err || "由于未知因素，无法下载表格",
            type: "warning"
          });
        });
    }
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
