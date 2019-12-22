/*
 * @Author: Skye Young 
 * @Date: 2019-12-18 19:25:12 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-18 20:05:59
 */

<template>
  <div class="download-page">
    <el-button type="primary" @click="downloadTable">
      <i class="el-icon-download"></i>
      下载{{fileName}}
    </el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";

export default Vue.extend({
  props: ["fileName", "api"],
  methods: {
    downloadTable() {
      this.$http
        .post(
          this.api,
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
          saveAs(data, `${this.fileName}.xlsx`);
        })
        .catch((err: string) => {
          this.$message({
            message: err || `由于未知因素，无法下载${this.fileName}`,
            type: "warning"
          });
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.download-page {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
