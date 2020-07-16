<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="奖励">
      <div class="tabs-body">
        <el-button
          type="primary"
          @click="
            download(
              '/api/online/officeAdmin/getBonusTemplate',
              '奖励模板.xlsx'
            )
          "
          >下载奖励模板</el-button
        >
        <upload-btn api="/api/online/officeAdmin/excelImportBonus"
          >上传奖励表格</upload-btn
        >
      </div>
    </el-tab-pane>
    <el-tab-pane label="业绩分">
      <div class="tabs-body">
        <el-button
          type="primary"
          @click="
            download(
              '/api/online/officeAdmin/getPerformanceTemplate',
              '业绩分模板.xlsx'
            )
          "
          >下载业绩分模板</el-button
        >
        <upload-btn api="/api/online/officeAdmin/excelImportPerformance"
          >上传业绩分表格</upload-btn
        >
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";
import Vue from "vue";

import UploadBtn from "@/components/OfficeAdmin/ImporSheettUploadBtn.vue";
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
