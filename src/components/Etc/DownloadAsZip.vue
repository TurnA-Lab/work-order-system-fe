<template>
  <el-button :loading="isDownLoading" type="primary" @click="downloadSteps">
    <slot>下载文件</slot>
  </el-button>
</template>

<script lang="ts">
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import Vue from "vue";

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
  props: {
    zipName: String
  },
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
      // 下载中
      this.isDownLoading = true;

      new Promise((resolve: (fileNeedZip: FileNeedZip[]) => void, reject) =>
        typeof fileNeedZip in { undefined: 0, null: 1 }
          ? reject("由于未知因素，无法获取文件列表")
          : resolve(
              typeof fileNeedZip === "string"
                ? JSON.parse(fileNeedZip)
                : fileNeedZip
            )
      )
        .then(() => {
          const zip = new JSZip();
          // Promise 队列
          const promises: Array<Promise<void>> = [];

          fileNeedZip.forEach((folder: FileNeedZip) => {
            // 文件夹
            const directory = zip.folder(folder.name) as JSZip;
            // 文件列表
            const files: FileInfo[] =
              typeof folder.files === "string"
                ? JSON.parse(folder.files)
                : folder.files;

            // 加入下载队列
            for (
              let index = 0, length = files.length;
              index < length;
              index++
            ) {
              const file = files[index];
              promises.push(
                this.$http
                  .get(`/api/alien/preview/${file.uuid}/${file.name}`, {
                    responseType: "arraybuffer"
                  })
                  .then((res: AxiosResponse) =>
                    res.status === 200 ? res.data : Promise.reject(res.data.msg)
                  )
                  .then((data: ArrayBuffer) => {
                    directory.file(file.name, data, { binary: true });
                  })
                  .catch((msg: string) => {
                    this.$message({
                      message: msg || "由于未知因素，无法获得文件",
                      type: "warning"
                    });
                  })
              );
            }
          });

          // 生成 zip 文件
          Promise.all(promises).then(() => {
            zip.generateAsync({ type: "blob" }).then((content: Blob) => {
              saveAs(content, `${this.zipName || "下载的文件"}.zip`);
            });
          });
        })
        .catch((msg: string) => {
          this.$message({
            message: msg || "由于未知因素，无法获得文件列表",
            type: "warning"
          });
        })
        .finally(() => (this.isDownLoading = false));
    }
  }
});
</script>
