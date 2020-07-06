<template>
  <div>
    <header>
      <h2>确认表导出</h2>
    </header>
    <main>
      <div>
        <el-button
          type="primary"
          @click="downloadPerformanceTable"
          :disabled="!performance"
        >
          <i class="el-icon-download"></i>
          导出业绩分表
        </el-button>
        <el-button
          type="primary"
          @click="downloadBonusTable"
          :disabled="!bonus"
        >
          <i class="el-icon-download"></i>
          导出奖励表
        </el-button>
      </div>
    </main>
    <el-dialog
      custom-class="custom-dialog"
      :visible.sync="isVisible"
      :close-on-click-modal="false"
      append-to-body
    >
      <div slot="title">导出</div>

      <div style="text-align: center;">
        <el-date-picker
          align="center"
          v-model="selectYear"
          type="year"
          value-format="yyyy"
          placeholder="选择导出年度"
        ></el-date-picker>
      </div>

      <div slot="footer">
        <el-button @click="close" type="primary" plain>取消导出</el-button>
        <el-button :loading="isDisable" @click="exportSheets" type="primary">{{
          btnText
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";
import decodeFilename from "@/utils/decodeFilename";

export default Vue.extend({
  data() {
    return {
      performance: false,
      bonus: false,
      sheetApi: "",
      selectYear: "",
      isVisible: false,
      isDisable: false,
      fileName: "",
    };
  },
  created() {
    this.$http
      .post(
        "/api/online/collegeAdmin/getAdminEnterPermission",
        {},
        {
          headers: {
            token: this.$store.state.userInfo.token,
          },
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.performance = res.data.data.performance;
          this.bonus = res.data.data.bonus;
        } else {
          return Promise.reject(res.data.msg);
        }
      })
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法输出表",
          type: "warning",
        });
      });
  },
  methods: {
    downloadPerformanceTable() {
      this.sheetApi = "/api/online/collegeAdmin/getConfirmPerformanceExcel";
      this.isVisible = true;
      this.fileName = "业绩分表";
    },
    downloadBonusTable() {
      this.sheetApi = "/api/online/collegeAdmin/getConfirmBonusExcel";
      this.isVisible = true;
      this.fileName = "奖励表";
    },
    exportSheets() {
      this.isDisable = true;

      if (this.selectYear) {
        this.$http
          .post(
            `${this.sheetApi}?year=${this.selectYear}`,
            {},
            {
              headers: {
                token: this.$store.state.userInfo.token,
              },
              responseType: "blob",
            }
          )
          .then((res: AxiosResponse) => {
            this.isVisible = false;
            this.isDisable = false;

            if (res.status === 200) {
              return Promise.resolve([
                decodeFilename(res, `${this.selectYear}-${this.fileName}.xlsx`),
                res.data,
              ]);
            } else {
              return Promise.reject(res.data.msg);
            }
          })
          .then(([filename, data]) => {
            saveAs(data, filename);
          })
          .catch((err: string) => {
            this.$message({
              message: err || "由于未知因素，无法下载用户表",
              type: "warning",
            });
          });
      } else {
        this.isDisable = false;
        this.$message({
          message: "请先选择导出年度",
          type: "warning",
        });
      }
    },
    close() {
      this.isVisible = false;
    },
  },
  computed: {
    btnText() {
      return this.$data.isDisable ? "准备导出中..." : "导出";
    },
  },
});
</script>

<style lang="scss" scoped>
header {
  margin-left: 15px;
}

main {
  height: 50vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style lang="scss">
.custom-dialog {
  width: 36vw;
}
</style>
