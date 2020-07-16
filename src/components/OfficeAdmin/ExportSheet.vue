<template>
  <div class="export-sheet">
    <el-form :inline="true" :model="form">
      <el-form-item class="form-item" label="年度" prop="startTime">
        <el-date-picker
          align="center"
          v-model="form.year"
          type="year"
          value-format="yyyy"
          placeholder="请选择立项年度"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="学年">
        <el-select v-model="form.schoolYear" placeholder="请选择学年">
          <el-option
            v-for="item in schoolYears"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="downloadExcel" :loading="fetchTable"
          >导出表格</el-button
        >
      </el-form-item>

      <el-form-item>
        <download-as-zip
          :zip-name="form.schoolYear + '学年'"
          @before-download="downloadFile"
          >导出文件</download-as-zip
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";
import Vue from "vue";

import DownloadAsZip from "@/components/Etc/DownloadAsZip.vue";
import { yearList } from "@/static-data/work-order";
import decodeFilename from "@/utils/decodeFilename";

import { postData } from "../../utils/fetchData";

export default Vue.extend({
  props: { api: String, fileApi: String },
  components: {
    DownloadAsZip
  },
  data() {
    return {
      schoolYears: yearList,
      form: {
        year: "",
        schoolYear: ""
      },
      fetchTable: false
    };
  },
  methods: {
    downloadExcel() {
      if (this.form.year === "" && this.form.schoolYear === "") {
        this.$message({
          message: "请先选择导出年度、学年",
          type: "warning"
        });
      } else {
        this.fetchTable = true;
        this.$http
          .post(this.api, this.form, {
            headers: {
              token: this.$store.state.userInfo.token
            },
            responseType: "blob"
          })
          .then((res: AxiosResponse) => {
            if (res.status === 200) {
              return Promise.resolve([
                decodeFilename(
                  res,
                  `${
                    this.form.year ? this.form.year : this.form.schoolYear
                  }学年工单.xlsx`
                ),
                res.data
              ]);
            } else {
              return Promise.reject(res.data.msg);
            }
          })
          .then(([filename, data]) => {
            saveAs(data, filename);
            this.fetchTable = false;
          })
          .catch((err: string) => {
            this.$message({
              message: err || "由于未知因素，无法下载用户表",
              type: "warning"
            });
          });
      }
    },
    downloadFile(canDownload: (data: JSON) => void) {
      if (this.form.year === "" && this.form.schoolYear === "") {
        this.$message({
          message: "请先选择导出年度、学年",
          type: "warning"
        });
      } else {
        postData(this.fileApi, this.form)
          .then((data: JSON) => canDownload(data))
          .catch((err: string) => {
            this.$message({
              message: err || "未知错误，导出失败",
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
