/*
 * @Author: Skye Young 
 * @Date: 2019-12-03 19:22:51 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-03 22:40:22
 */

<template>
  <el-button :loading="isDownLoading" type="primary" @click="download">
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
  props: ["files", "zipName"],
  data() {
    return {
      fileNeedZip: [],
      isDownLoading: false
    };
  },
  methods: {
    download() {
      const zip = new JSZip();
      let promises: Promise<void>[] = [];

      this.isDownLoading = true;

      this.fileNeedZip.forEach(
        (folder: FileNeedZip, index: number, fileNeedZip: FileNeedZip[]) => {
          const directory = zip.folder(folder.name);
          folder.files.forEach((file: FileInfo) => {
            const promise = this.$http
              .get(`${panUrl}/api/alien/preview/${file.uuid}/${file.name}`, {
                responseType: "arraybuffer"
              })
              .then((res: AxiosResponse) => {
                if (res.statusText === "OK") {
                  return Promise.resolve(res.data);
                } else {
                  return Promise.reject(res.data.msg);
                }
              })
              .catch((msg: string) => {
                this.$message({
                  message: msg || "由于未知因素，无法获得文件",
                  type: "warning"
                });
              })
              .then((data: ArrayBuffer) => {
                directory.file(file.name, data, { binary: true });
              });
            promises.push(promise);
          });
        }
      );

      Promise.all(promises).then(() => {
        zip.generateAsync({ type: "blob" }).then((content: Blob) => {
          saveAs(content, `${this.zipName || "下载的文件"}.zip`);
          this.isDownLoading = false;
        });
      });
    }
  },
  computed: {
    // zipFiles() {
    //   if (typeof this.files === "undefined" || this.files === null) {
    //   } else {
    //     // 处理输入
    //     if (typeof this.files === "string") {
    //       return JSON.parse(this.files);
    //     } else {
    //       return this.files;
    //     }
    //   }
    // }
  },
  created() {
    if (typeof this.files === "undefined" || this.files === null) {
      this.$message({
        message: "由于未知因素，无法获取文件列表",
        type: "warning"
      });
    } else {
      // 处理输入
      let fileNeedZip: FileNeedZip[];
      if (typeof this.files === "string") {
        this.fileNeedZip = JSON.parse(this.files);
      } else {
        this.fileNeedZip = this.files;
      }
    }
  }
});
</script>