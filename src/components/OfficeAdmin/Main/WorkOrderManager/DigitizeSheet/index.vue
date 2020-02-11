<template>
  <div>
    <el-button type="primary" @click="$emit('click')">下载模板</el-button>
    <upload-btn :api="api">上传表格</upload-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import UploadBtn from "./UploadBtn.vue";

export default Vue.extend({
  props: ["api"],
  components: {
    UploadBtn
  }
});
</script>

<style lang="scss" scoped>
div {
  height: 78vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
