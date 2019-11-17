/*
 * @Author: Skye Young 
 * @Date: 2019-11-08 21:41:50 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-09 00:34:13
 */

<template>
  <span class="upload-btn">
    <el-button type="primary" plain @click="showUploadDialog">点击上传</el-button>
    <el-dialog
      custom-class="wo-dialog"
      :visible.sync="isVisible"
      :close-on-click-modal="false"
      append-to-body
    >
      <div slot="title">上传文件</div>
      <div class="upload-field">
        <upload-file ref="uploadField"></upload-file>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="finishUpload">文件上传结束</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import UploadFile from "@/components/Etc/UploadFile.vue";

export default Vue.extend({
  components: {
    UploadFile
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    showUploadDialog() {
      this.isVisible = !this.isVisible;
    },
    finishUpload() {
      this.isVisible = false;
      this.$store.commit("orderForm", {
        certificate: (this.$refs.uploadField as any).filesUuid
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.sightless {
  opacity: 0;
  pointer-events: none;
}
</style>

<style lang="scss">
.wo-dialog {
  border-radius: 1rem;
  width: 30vw;
  min-width: 450px;
}

.upload-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>