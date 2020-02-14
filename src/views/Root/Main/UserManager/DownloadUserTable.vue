<template>
  <div class="download-page">
    <el-button type="primary" @click="downloadTable">
      <i class="el-icon-download"></i>
      下载{{ fileName }}
    </el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";
import decodeFilename from "@/utils/decodeFilename";

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
            return Promise.resolve([
              decodeFilename(res, `${this.fileName}.xlsx`),
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
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
