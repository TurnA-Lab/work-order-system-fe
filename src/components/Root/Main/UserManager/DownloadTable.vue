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
            }
          }
        )
        .then((res: AxiosResponse) => {
          if (res.statusText !== "OK") {
            this.$message({
              message: res.data.msg || "由于未知因素，无法下载用户表",
              type: "warning"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "由于未知因素，无法下载用户表",
            type: "warning"
          });
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.download-page {
  min-height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>