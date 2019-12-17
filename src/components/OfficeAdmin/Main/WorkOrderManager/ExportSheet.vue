/*
 * @Author: Skye Young
 * @Date: 2019-12-01 13:39:02
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-04 12:38:55
 */

<template>
  <div class="export-sheet">
    <el-form :inline="true" :model="form">
      <el-form-item class="form-item" label="年度" prop="startTime">
        <el-date-picker align="center" v-model="form.year" type="year" value-format="yyyy" placeholder="请选择立项年度"></el-date-picker>
      </el-form-item>

      <el-form-item label="学年">
        <el-select v-model="form.schoolYear" placeholder="请选择">
          <el-option v-for="item in schoolYears" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="downloadExcel">导出表格</el-button>
      </el-form-item>

      <el-form-item>
        <download-as-zip
          :zip-name="form.schoolYear+'学年'"
          @before-download="downloadFile"
        >导出文件</download-as-zip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DownloadAsZip from "@/components/Etc/DownloadAsZip.vue";
import { AxiosResponse } from "axios/";
import yearRange from "@/utils/returnYearRange";
import { saveAs } from "file-saver";

export default Vue.extend({
  props: ["api", "fileApi"],
  components: {
    DownloadAsZip
  },
  data() {
    return {
      schoolYears: yearRange,
      form: {
        year: "",
        schoolYear: ""
      }
    };
  },
  methods: {
    downloadExcel() {
      if (this.form.year === "" || this.form.schoolYear === "") {
        this.$message({
          message: "请先选择导出年度、学年",
          type: "warning"
        });
      } else {
        this.$http
          .post(this.api, this.form, {
            headers: {
              token: this.$store.state.userInfo.token
            },
                  responseType: "blob"
              }
          )
            .then((res: AxiosResponse) => {
                if (res.statusText === "OK"){

                    return Promise.resolve(res.data);

                }else {
                    return Promise.reject(res.data.msg);
                }
            })
            .then((data: Blob)=>{
                saveAs(data, `${this.form.schoolYear}学年工单.xlsx`);
            })
            .catch((err: string) => {
                this.$message({
                    message: err || "由于未知因素，无法下载用户表",
                    type: "warning"
                });
            });
      }
    },
    downloadFile(canDownload: Function) {
      if (this.form.year === "" || this.form.schoolYear === "") {
        this.$message({
          message: "请先选择导出年度、学年",
          type: "warning"
        });
      } else {
        this.$http
          .post(this.fileApi, this.form, {
            headers: {
              token: this.$store.state.userInfo.token
            }
          })
          .then((res: AxiosResponse) => {
            if (res.data.code === 0) {
              canDownload(res.data.data);
            } else {
              this.$message({
                message: res.data.msg || "由于未知因素，导出失败",
                type: "warning"
              });
            }
          })
          .catch(() => {
            this.$message({
              message: "未知错误，导出失败",
              type: "warning"
            });
          });
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.export-sheet {
  height: 78vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
