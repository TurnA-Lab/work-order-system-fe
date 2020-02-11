<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="奖励">
      <div class="tabs-body">
        <el-button type="primary" @click="downloadBonusTemplate"
          >下载奖励模板</el-button
        >
        <upload-btn api="/api/online/officeAdmin/excelImportBonus"
          >上传奖励表格</upload-btn
        >
      </div>
    </el-tab-pane>
    <el-tab-pane label="业绩分">
      <div class="tabs-body">
        <el-button type="primary" @click="downloadPerformanceTemplate"
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
import Vue from "vue";
import UploadBtn from "./UploadBtn.vue";
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";

export default Vue.extend({
  components: {
    UploadBtn
  },
  methods: {
    downloadBonusTemplate() {
      this.$http
        .post(
          "/api/online/officeAdmin/getBonusTemplate",
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
            return Promise.resolve(res.data);
          } else {
            return Promise.reject(res.data.msg);
          }
        })
        .then((data: Blob) => {
          saveAs(data, `奖励模板.xlsx`);
        })
        .catch((err: string) => {
          this.$message({
            message: err || "由于未知因素，无法下载用户表",
            type: "warning"
          });
        });
    },
    downloadPerformanceTemplate() {
      this.$http
        .post(
          "/api/online/officeAdmin/getPerformanceTemplate",
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
            return Promise.resolve(res.data);
          } else {
            return Promise.reject(res.data.msg);
          }
        })
        .then((data: Blob) => {
          saveAs(data, `业绩分模板.xlsx`);
        })
        .catch((err: string) => {
          this.$message({
            message: err || "由于未知因素，无法下载用户表",
            type: "warning"
          });
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.tabs-body {
  height: 80vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
