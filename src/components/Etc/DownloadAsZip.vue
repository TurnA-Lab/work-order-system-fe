/*
 * @Author: Skye Young
 * @Date: 2019-12-03 19:22:51
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-19 13:05:50
 */

<template>
  <el-button :loading="isDownLoading" type="primary" @click="downloadSteps">
    <slot>下载文件</slot>
  </el-button>
</template>

<script lang="ts">
import Vue from "vue";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { panUrl } from "@/config";
import { AxiosResponse } from "axios/";

interface FileInfo {
  name: string;
  uuid: string;
  type: string;
}

interface FileNeedZip {
  name: string;
  files: FileInfo[];
}

export default Vue.extend({
  props: ["zipName"],
  data() {
    return {
      isDownLoading: false
    };
  },
  methods: {
    downloadSteps() {
      // 在下载前执行的函数
      this.$emit("before-download", (fileNeedZip: FileNeedZip[]) => {
        if (fileNeedZip.length > 0) {
          this.downloadAction(fileNeedZip);
        } else {
          this.$message({
            message: "没有文件可供下载",
            type: "warning"
          });
        }
      });
    },
    downloadAction(fileNeedZip: FileNeedZip[]) {
      this.isDownLoading = true;
      new Promise((resolve: (fileNeedZip: FileNeedZip[]) => void, reject) => {
        if (typeof fileNeedZip === "undefined" || fileNeedZip === null) {
          reject("由于未知因素，无法获取文件列表");
        } else {
          if (typeof fileNeedZip === "string") {
            resolve(JSON.parse(fileNeedZip));
          } else {
            resolve(fileNeedZip);
          }
        }
      })
        .then(() => {
          const zip = new JSZip();
          const promises: any = [];

          fileNeedZip.forEach((folder: FileNeedZip) => {
            const directory = zip.folder(folder.name);
            folder.files.forEach((file: FileInfo) => {
              const promise = this.$http
                .get(`${panUrl}/api/alien/preview/${file.uuid}/${file.name}`, {
                  responseType: "arraybuffer"
                })
                .then((res: AxiosResponse) => {
                  if (res.status === 200) {
                    return Promise.resolve(res.data);
                  } else {
                    return Promise.reject(res.data.msg);
                  }
                })
                .then((data: ArrayBuffer) => {
                  directory.file(file.name, data, { binary: true });
                })
                .catch((msg: string) => {
                  this.$message({
                    message: msg || "由于未知因素，无法获得文件",
                    type: "warning"
                  });
                });
              promises.push(promise);
            });
          });

          Promise.all(promises).then(() => {
            zip.generateAsync({ type: "blob" }).then((content: Blob) => {
              saveAs(content, `${this.zipName || "下载的文件"}.zip`);
              this.isDownLoading = false;
            });
          });
        })
        .catch((msg: string) => {
          this.$message({
            message: msg || "由于未知因素，无法获得文件列表",
            type: "warning"
          });
        });
    }
  }
});
</script>
