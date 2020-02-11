<template>
  <span>
    <el-button type="primary" plain @click="showUploadDialog"
      >点击上传</el-button
    >
    <el-dialog
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
  props: ["files"],
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
        [this.files]: JSON.stringify((this.$refs.uploadField as any).files)
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
.el-dialog {
  width: 30vw;
}

.upload-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
