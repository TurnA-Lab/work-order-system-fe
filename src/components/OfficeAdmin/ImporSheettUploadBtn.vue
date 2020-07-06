<template>
  <span class="upload-btn">
    <el-button type="primary" @click="showUploadDialog">
      <slot></slot>
    </el-button>
    <el-dialog
      :visible.sync="isVisible"
      :close-on-click-modal="false"
      append-to-body
    >
      <div slot="title">上传文件</div>
      <div class="upload-field">
        <upload-file ref="uploadField" :custom-api="api"></upload-file>
      </div>
    </el-dialog>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import UploadFile from "@/components/Etc/UploadFile.vue";
import { AxiosResponse } from "axios/";

export default Vue.extend({
  props: { api: String },
  components: {
    UploadFile,
  },
  data() {
    return {
      isVisible: false,
    };
  },

  methods: {
    showUploadDialog() {
      this.isVisible = !this.isVisible;
    },
  },
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
