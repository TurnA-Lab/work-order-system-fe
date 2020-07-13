// TODO 是否需要不加参数输出所有？

<template>
  <div class="download-page">
    <el-date-picker
      align="center"
      v-model="year"
      type="year"
      value-format="yyyy"
      placeholder="请选择立项年度"
    ></el-date-picker>
    <el-button
      class="download-btn"
      type="primary"
      icon="el-icon-download"
      :loading="isLoading"
      @click="downloadTable"
    >
      {{ isLoading ? "下载中" : `下载${fileName}` }}
    </el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";
import decodeFilename from "@/utils/decodeFilename";

export default Vue.extend({
  props: { fileName: String, api: String },
  data() {
    return {
      year: "",
      isLoading: false,
    };
  },
  methods: {
    downloadTable() {
      this.isLoading = true;

      this.$http
        .get(this.api, {
          params: {
            year: this.year,
          },
          headers: {
            token: this.$store.state.userInfo.token,
          },
          responseType: "blob",
        })
        .then((res: AxiosResponse) =>
          res.status === 200
            ? Promise.resolve([
                res.data,
                decodeFilename(res, `${this.fileName}.xlsx`),
              ])
            : Promise.reject(res.data.msg)
        )
        .then(([data, filename]) => {
          saveAs(data, filename);
        })
        .catch((err: string) => {
          this.$message({
            message: err || `由于未知因素，无法下载${this.fileName}`,
            type: "warning",
          });
        })
        .finally(() => (this.isLoading = false));
    },
  },
});
</script>

<style lang="scss" scoped>
.download-page {
  height: 86vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.download-btn {
  margin-inline-start: 15px;
}
</style>
