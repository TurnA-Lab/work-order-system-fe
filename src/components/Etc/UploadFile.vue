<template>
  <file-pond
    class="upload-area"
    name="test"
    ref="pond"
    label-idle="<span class='filepond-label'>点击浏览选择</span> 或 拖拽文件至此后，<br>单击右侧<span class='filepond-label-upload'></span>按钮上传"
    imageCropAspectRatio="16:10"
    maxFileSize="30MB"
    labelMaxFileSizeExceeded="文件太大了"
    labelMaxFileSize="最大允许上传大小为 {filesize} "
    labelFileProcessing="上传中..."
    labelFileProcessingComplete="上传成功"
    labelFileProcessingAborted="上传已被取消"
    labelFileProcessingError="上传失败"
    labelTapToCancel="单击右侧按钮以取消"
    labelTapToRetry="单击右侧按钮以重试"
    labelFileTypeNotAllowed="不被允许的文件类型"
    fileValidateTypeLabelExpectedTypes="仅允许图片、文本、PDF、XLS 类型"
    :acceptedFileTypes="acceptTypes"
    :allowRevert="false"
    :instantUpload="false"
    :allow-multiple="true"
    :files="myFiles"
    :server="myServer"
  />
</template>

<script lang="ts">
/*
 * 须配合蓝眼云盘食用
 * https://tank-doc.eyeblue.cn/
 */

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { AxiosResponse } from "axios";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import Vue from "vue";
import vueFilePond from "vue-filepond";

import { postData } from "../../utils/fetchData";

interface FileInfo {
  name: string;
  uuid: string;
  type: string;
}

const FilePond = vueFilePond(
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

export default Vue.extend({
  props: {
    customApi: String
  },
  components: {
    FilePond
  },
  data() {
    return {
      files: [],
      acceptTypes: [
        "image/*",
        "text/*",
        "application/msword",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/pdf"
      ],
      myFiles: [],
      myServer: {
        fetch: null,
        revert: null,
        restore: null,
        process: (
          fieldName: string,
          file: File,
          metadata: string,
          load: (arg?: string) => string,
          error: (arg?: string) => string,
          progress: VoidFunction,
          abort: VoidFunction
        ) => {
          const cancelToken = this.$http.CancelToken;
          const source = cancelToken.source();

          // 自己设计的文件处理系统
          if (this.customApi) {
            const uploadData = new FormData();
            uploadData.append("file", file);
            postData(this.customApi, uploadData, {
              cancelToken: source.token,
              timeout: 2500
            })
              .then(load)
              .catch((err: string) => {
                error(err || "暂时无法上传");
              });
          } else {
            // 请求上传 token
            postData(
              "/api/common/file/getPanToken",
              {
                filename: file.name,
                size: file.size
              },
              {
                cancelToken: source.token,
                timeout: 2500
              }
            )
              .then(data => JSON.parse(data.body).data.uuid)
              // 进行上传
              .then(uuid => {
                const uploadData = new FormData();
                uploadData.append("uploadTokenUuid", uuid);
                uploadData.append("file", file);

                return this.$http.post("/api/alien/upload", uploadData, {
                  cancelToken: source.token
                });
              })
              .then((res: AxiosResponse) =>
                res.data.code === "OK"
                  ? res.data.data.uuid
                  : Promise.reject(res.data.msg)
              )
              // 验证上传结果
              .then((uuid: string) =>
                postData(
                  "/api/common/file/confirmUploaded",
                  { uuid },
                  { cancelToken: source.token }
                ).then(() => uuid)
              )
              .then((uuid: string) => {
                (this.$data.files as FileInfo[]).push({
                  uuid,
                  name: file.name,
                  type: file.type
                });
                load(uuid);
              })
              .catch((err: string) => {
                if (!this.$http.isCancel(err)) {
                  this.$message({
                    message: (err as string) || "由于未知因素，暂时无法上传",
                    type: "warning"
                  });
                  error("暂时无法上传");
                }
              });
          }

          return {
            abort: () => {
              source.cancel();
              abort();
            }
          };
        }
      }
    };
  }
});
</script>

<style lang="scss" scoped>
.upload-area {
  width: 400px;
}
</style>

<style lang="scss">
.filepond--root {
  max-height: 50vh;
}

.filepond-label {
  box-shadow: 0px 0.1rem #ddd, 0px -0.56rem #ddd inset;
}

.filepond-label-upload {
  display: inline-block;
  width: 26px;
  height: 26px;
  background-image: url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z' fill='currentColor' fill-rule='evenodd'/%3E%3C/svg%3E");
  vertical-align: middle;
}
</style>
