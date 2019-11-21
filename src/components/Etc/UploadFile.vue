/*
 * @Author: Skye Young 
 * @Date: 2019-11-08 10:17:34 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-19 13:08:35
 */

/* 
 * 须配合蓝眼云盘食用
 * https://tank-doc.eyeblue.cn/
 */

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
    @init="handleFilePondInit"
  />
</template>

<script lang="ts">
import Vue from "vue";
import vueFilePond from "vue-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { AxiosResponse, AxiosRequestConfig } from "axios";

interface AxiosError extends Error {
  config: AxiosRequestConfig;
  code: string;
  request: any;
  response: AxiosResponse;
}

// 蓝眼网盘 url
// http://10.3.4.18:8998
const panUrl = "http://test.iskye.cn";

const FilePond = vueFilePond(
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType
);

export default Vue.extend({
  components: {
    FilePond
  },
  data() {
    const stateToken = this.$store.state.userInfo.token;

    return {
      filesUuid: [],
      acceptTypes: [
        "image/*",
        "text/*",
        "application/msword",
        "application/vnd.ms-excel",
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
          metadata: any,
          load: any,
          error: any,
          progress: any,
          abort: any,
          transfer: any,
          options: any
        ) => {
          const cancelToken = this.$http.CancelToken;
          const source = cancelToken.source();

          // 请求上传 token
          // /api/online/getPanToken
          this.$http
            .post(
              "/local/getUploadToken",
              {
                name: file.name,
                size: file.size
              },
              {
                headers: {
                  token: stateToken
                },
                cancelToken: source.token,
                timeout: 2500
              }
            )
            .then((res: AxiosResponse) => {
              // if (res.data.code === 0) {
              if (res.statusText === "OK") {
                // 上传文件
                const uploadData = new FormData();
                uploadData.append("uploadTokenUuid", res.data.uuid);
                uploadData.append("file", file);

                this.$http
                  .post(`${panUrl}/api/alien/upload`, uploadData, {
                    cancelToken: source.token
                  })
                  .then((response: AxiosResponse) => {
                    if (response.data.code === "OK") {
                      // 验证上传
                      // /api/online/confirmUploaded
                      this.$http
                        .post(
                          `/local/confirmUploaded`,
                          {
                            name: file.name,
                            uuid: response.data.data.uuid
                          },
                          {
                            headers: {
                              token: stateToken
                            },
                            cancelToken: source.token
                          }
                        )
                        .then((confirmRes: AxiosResponse) => {
                          // if (res.data.code === 0) {
                          if (res.statusText === "OK") {
                            // 存入
                            (this.$data.filesUuid as string[]).push(
                              res.data.uuid
                            );
                            load(res.data.uuid);
                          } else {
                            this.$message({
                              message: "由于未知因素，暂时无法上传",
                              type: "warning"
                            });
                            error("暂时无法上传");
                          }
                        })
                        .catch((err: AxiosError) => {
                          if (!this.$http.isCancel(err)) {
                            this.$message({
                              message: "由于未知因素，暂时无法上传",
                              type: "warning"
                            });
                            error("暂时无法上传");
                          }
                        });
                    } else {
                      this.$message({
                        message: "由于未知因素，暂时无法上传",
                        type: "warning"
                      });
                      error("暂时无法上传");
                    }
                  })
                  .catch((err: AxiosError) => {
                    if (!this.$http.isCancel(err)) {
                      this.$message({
                        message: err.response.data.msg,
                        type: "warning"
                      });
                      error("暂时无法上传");
                    }
                  });
              } else {
                error("暂时无法上传");
              }
            })
            .catch((err: AxiosError) => {
              if (!this.$http.isCancel(err)) {
                this.$message({
                  message: "由于未知因素，暂时无法上传",
                  type: "warning"
                });
                error("暂时无法上传");
              }
            });

          return {
            abort: () => {
              source.cancel();
              abort();
            }
          };
        }
      }
    };
  },
  methods: {
    handleFilePondInit() {
      console.log("FilePond has initialized");
    }
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
  box-shadow: 0px 0.125rem #ccc, 0px -0.56rem #ccc inset;
}

.filepond-label-upload {
  display: inline-block;
  width: 26px;
  height: 26px;
  background-image: url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z' fill='currentColor' fill-rule='evenodd'/%3E%3C/svg%3E");
  vertical-align: middle;
}
</style>