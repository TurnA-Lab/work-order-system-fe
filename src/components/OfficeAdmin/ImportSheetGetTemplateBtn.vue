<template>
  <el-button type="primary" @click="click" :loading="isLoading"
    ><slot></slot
  ></el-button>
</template>

<script lang="ts">
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";
import Vue from "vue";

import decodeFilename from "@/utils/decodeFilename";

export default Vue.extend({
  props: {
    api: String,
    filename: String
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    click() {
      this.isLoading = true;

      this.$http
        .get(this.api, {
          headers: {
            token: this.$store.state.userInfo.token
          },
          responseType: "blob"
        })
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            return Promise.resolve([
              decodeFilename(res, this.filename),
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
        })
        .finally(() => (this.isLoading = false));
    }
  }
});
</script>
