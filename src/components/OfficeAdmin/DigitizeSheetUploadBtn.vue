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

export default Vue.extend({
  props: { api: String },
  components: {
    UploadFile: () => import("@/components/Etc/UploadFile.vue")
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

.upload-btn {
  margin-inline-start: 15px;
}

.upload-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
