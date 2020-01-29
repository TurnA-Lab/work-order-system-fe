/*
 * @Author: Skye Young
 * @Date: 2019-11-30 16:12:54
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-30 19:01:38
 */

<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="奖励">
      <div class="tabs-body">
        <el-button type="primary" @click="downloadBonusTemplate">下载奖励模板</el-button>
        <upload-btn api="/api/online/officeAdmin/excelImportBonus">上传奖励表格</upload-btn>
      </div>
    </el-tab-pane>
    <el-tab-pane label="业绩分">
      <div class="tabs-body">
        <el-button type="primary" @click="downloadPerformanceTemplate">下载业绩分模板</el-button>
        <upload-btn api="/api/online/officeAdmin/excelImportPerformance">上传业绩分表格</upload-btn>
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
  background-color: #ffffff;
  margin: 0px 1vw 1vw 1vw;
  padding: 1vh 2vw;
  border-radius: 1rem 2px 2px 1rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 80vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
