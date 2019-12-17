<template>
  <div class="download-page">
    <el-button type="primary" @click="downloadTable">
      <i class="el-icon-download"></i>
      下载用户表
    </el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";

export default Vue.extend({
  methods: {
    downloadTable() {
      this.$http
        .post(
          "/api/online/root/getUserExcel",
          {},
          {
            headers: {
              token: this.$store.state.userInfo.token
            },
            responseType: "blob"
          }
        )
        .then((res: AxiosResponse) => {
          if (res.statusText === "OK"){
            return Promise.resolve(res.data);
          }else {
            return Promise.reject(res.data.msg);
          }
        })
        .then((data: Blob)=>{
          saveAs(data, "用户表.xlsx");
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
.download-page {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
