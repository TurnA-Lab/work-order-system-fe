/*
 * @Author: Skye Young 
 * @Date: 2019-12-01 13:39:02 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-02 19:48:59
 */

<template>
  <div class="export-sheet">
    <el-form :inline="true" :model="form">
      <el-form-item class="form-item" label="年度" prop="startTime">
        <el-date-picker align="center" v-model="form.year" type="year" placeholder="请选择立项年度"></el-date-picker>
      </el-form-item>

      <el-form-item label="学年">
        <el-select v-model="form.schoolYear" placeholder="请选择">
          <el-option v-for="item in schoolYears" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="downloadTable()">导出表格</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios/";
import yearRange from "@/utils/returnYearRange";

export default Vue.extend({
  props: ["api"],
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
    downloadTable() {
      this.$http
        .post(this.api, this.form, {
          headers: {
            token: this.$store.state.userInfo.token
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