/*
 * @Author: Skye Young 
 * @Date: 2019-11-08 10:18:38 
 * @Last Modified by:   Skye Young 
 * @Last Modified time: 2019-11-08 10:18:38 
 */

<template>
  <upload-file></upload-file>
</template>

<script lang="ts">
import Vue from "vue";
import UploadFile from "@/components/Etc/UploadFile.vue";
export default Vue.extend({
  components: {
    UploadFile
  }
});
</script>

<style lang="scss" scoped>
</style>