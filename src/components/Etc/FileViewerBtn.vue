/*
 * @Author: Skye Young 
 * @Date: 2019-12-03 15:32:47 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-19 19:37:35
 */

<template>
  <span>
    <el-button type="primary" plain @click="showDialog">
      <slot></slot>
    </el-button>
    <el-dialog :visible.sync="isVisible" :close-on-click-modal="false" append-to-body>
      <div slot="title">浏览文件</div>
      <div class="preview-field">
        <file-preview :files="files"></file-preview>
      </div>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import FilePreview from "./FilePreview.vue";

export default Vue.extend({
  props: ["files"],
  components: {
    FilePreview
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    showDialog() {
      this.isVisible = !this.isVisible;
    }
  }
});
</script>

<style lang="scss" scoped>
.preview-field {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<style lang="scss">
.el-dialog {
  width: 30vw;
}
</style>