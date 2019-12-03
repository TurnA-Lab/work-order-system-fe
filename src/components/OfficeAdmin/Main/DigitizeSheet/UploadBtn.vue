/*
 * @Author: Skye Young 
 * @Date: 2019-11-30 18:19:10 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-03 19:18:52
 */


<template>
  <span class="upload-btn">
    <el-button type="primary" @click="showUploadDialog">
      <slot></slot>
    </el-button>
    <el-dialog :visible.sync="isVisible" :close-on-click-modal="false" append-to-body>
      <div slot="title">上传文件</div>
      <div class="upload-field">
        <upload-file ref="uploadField"></upload-file>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="finishUpload"
          :loading="isDisable"
          :disabled="isDisable"
        >文件上传结束</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import UploadFile from "@/components/Etc/UploadFile.vue";
import { AxiosResponse } from "axios/";

export default Vue.extend({
  props: ["api"],
  components: {
    UploadFile
  },
  data() {
    return {
      isDisable: false,
      isVisible: false
    };
  },
  computed: {
    btnText() {
      if (this.isDisable) {
        return "文件上传结束";
      } else {
        return "文件上传中...";
      }
    }
  },
  methods: {
    showUploadDialog() {
      this.isVisible = !this.isVisible;
    },
    finishUpload() {
      this.isDisable = true;
      this.$http
        .post(
          this.api,
          {
            file: (this.$refs.uploadField as any).files
          },
          {
            headers: {
              token: this.$store.state.userInfo.token
            }
          }
        )
        .then((res: AxiosResponse) => {
          if (res.data.code === 0) {
            this.isVisible = false;
            this.isDisable = false;
          } else {
            this.isVisible = false;
            this.isDisable = false;
            this.$message({
              message: res.data.msg || "由于未知因素，无法上传文件",
              type: "warning"
            });
          }
        })
        .catch(() => {
          this.isVisible = false;
          this.isDisable = false;
          this.$message({
            message: "由于未知因素，无法上传文件",
            type: "warning"
          });
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.upload-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.upload-btn {
  margin-inline-start: 15px;
}
</style>

<style lang="scss">
.el-dialog {
  width: 30vw;
}
</style>