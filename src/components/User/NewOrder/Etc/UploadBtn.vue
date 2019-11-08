/*
 * @Author: Skye Young 
 * @Date: 2019-11-08 21:41:50 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-08 22:15:53
 */

<template>
  <span class="upload-btn">
    <el-button type="primary" plain @click="showUploadDialog">点击上传</el-button>
    <upload-file :class="{sightless: isSightless}"></upload-file>
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
      isSightless: true
    };
  },
  methods: {
    showUploadDialog() {
      this.isSightless = !this.isSightless;
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