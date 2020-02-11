// TODO 是否不加参数输出所有？

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
      style="margin-inline-start: 15px"
      type="primary"
      @click="downloadTable"
    >
      <i class="el-icon-download"></i>
      下载{{ fileName }}
    </el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";

export default Vue.extend({
  props: ["fileName", "api"],
  data() {
    return {
      year: ""
    };
  },
  methods: {
    downloadTable() {
      this.$http
        .post(
          this.api,
          {},
          {
            params: {
              year: this.year
            },
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
