<template>
  <file-pond
    class="upload-area"
    name="test"
    ref="pond"
    label-idle="<span class='filepond-label'>点击浏览选择</span> 或 拖拽文件至此"
    imageCropAspectRatio="16:10"
    maxFileSize="30MB"
    labelMaxFileSizeExceeded="文件太大了"
    labelMaxFileSize="最大允许上传大小为 {filesize} "
    :allow-multiple="true"
    :files="myFiles"
    @init="handleFilePondInit"
  />
</template>

<script lang="ts">
import Vue from "vue";
import vueFilePond from "vue-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { AxiosResponse } from "axios";

const FilePond = vueFilePond(
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginFileValidateSize
);

export default Vue.extend({
  components: {
    FilePond
  },
  data() {
    FilePond.setOptions({
      server: {
        process: (
          fieldName: string,
          file: File,
          metadata: any,
          load: any,
          error: any,
          progress: any,
          abort: any,
          transfer: any,
          options: any
        ) => {
          console.log(file);

          this.$http
            .post(
              "/api/online/getPanToken",
              {
                filename: file.name,
                size: file.size
              },
              {
                headers: {
                  token: this.$store.state.userInfo.token
                }
              }
            )
            .then((res: AxiosResponse) => {
              if (res.data.code === 0) {
                const uploadData = new FormData();
                uploadData.append("uploadTokenUuid", res.data.uuid);
                this.$http.post("", {}, {});
              } else {
              }
            });
        }
      }
    });
    return {
      myFiles: []
    };
  },
  methods: {
    handleFilePondInit: function() {
      console.log("FilePond has initialized");
    }
  }
});
</script>

<style lang="scss" scoped>
.upload-area {
  width: 20vw;
}
</style>

<style lang="scss">
.filepond-label {
  box-shadow: 0px 0.125rem #ccc, 0px -0.56rem #ccc inset;
}
</style>