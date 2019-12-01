/*
 * @Author: Skye Young 
 * @Date: 2019-11-26 21:13:44 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-01 13:53:33
 */

<template>
  <div>
    <header>
      <h2>部门成员管理</h2>
    </header>
    <main>
      <div>
        <el-button type="primary" @click="downloadPerformanceTable" :disabled="!performance">
          <i class="el-icon-download"></i>
          导出业绩表
        </el-button>
        <el-button type="primary" @click="downloadBonusTable" :disabled="!bonus">
          <i class="el-icon-download"></i>
          导出奖金表
        </el-button>
      </div>
    </main>
    <el-dialog :visible.sync="isVisible" :close-on-click-modal="false" append-to-body>
      <div slot="title">导出</div>

      <div style="text-align: center;">
        <el-date-picker align="center" v-model="selectYear" type="year" placeholder="选择导出年度"></el-date-picker>
      </div>

      <div slot="footer">
        <el-button @click="close" type="primary" plain>取消导出</el-button>
        <el-button :loading="isDisable" @click="exportSheets" type="primary">{{btnText}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { MessageBoxData } from "element-ui/types/message-box";
import { AxiosResponse } from "axios/";
export default Vue.extend({
  data() {
    return {
      performance: false,
      bonus: false,
      sheetApi: "",
      selectYear: "",
      isVisible: false,
      isDisable: false
    };
  },
  created() {
    this.$http
      .post(
        "/api/online/collegeAdmin/getAdminEnterPermission",
        {},
        {
          headers: {
            token: this.$store.state.userInfo.token
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.performance = res.data.data.performance;
          this.bonus = res.data.data.bonus;
        } else {
          this.$message({
            message: res.data.msg || "由于未知因素，无法输出表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法输出表",
          type: "warning"
        });
      });
  },
  methods: {
    downloadPerformanceTable() {
      this.sheetApi = "/api/online/collegeAdmin/getConfirmPerformanceExcel";
      this.isVisible = true;
    },
    downloadBonusTable() {
      this.sheetApi = "/api/online/collegeAdmin/getConfirmBonusExcel";
      this.isVisible = true;
    },
    exportSheets() {
      this.isDisable = true;

      if (this.selectYear) {
        this.$http
          .post(
            this.sheetApi,
            {
              year: this.selectYear
            },
            {
              headers: {
                token: this.$store.state.userInfo.token
              }
            }
          )
          .then((res: AxiosResponse) => {
            this.isVisible = false;
            this.isDisable = false;
            if (res.statusText !== "OK") {
              this.$message({
                message: res.data.msg || "由于未知因素，无法下载用户表",
                type: "warning"
              });
            }
          })
          .catch(() => {
            this.isDisable = true;
            this.isVisible = false;
            this.$message({
              message: "由于未知因素，无法下载用户表",
              type: "warning"
            });
          });
      } else {
        this.isDisable = false;
        this.$message({
          message: "请先选择导出年度",
          type: "warning"
        });
      }
    },
    close() {
      this.isVisible = false;
    }
  },
  computed: {
    btnText() {
      return this.$data.isDisable ? "准备导出中..." : "导出";
    }
  }
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
.el-dialog {
  width: 36vw;
}
</style>