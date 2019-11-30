/*
 * @Author: Skye Young 
 * @Date: 2019-11-30 19:13:19 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-01 00:59:21
 */

<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="建设类">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="核审">
            <audit-construction></audit-construction>
          </el-tab-pane>
          <el-tab-pane label="导出"></el-tab-pane>
          <el-tab-pane label="录入">
            <digitize-sheet
              @click="downloadConstruction"
              api="/online/officeAdmin/excelImportConstruction"
            ></digitize-sheet>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>
    <el-tab-pane label="成果类">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="核审">
            <audit-construction></audit-construction>
          </el-tab-pane>
          <el-tab-pane label="导出"></el-tab-pane>
          <el-tab-pane label="录入">
            <digitize-sheet
              @click="downloadAchievement"
              api="/api/online/officeAdmin/excelImportPerformance"
            ></digitize-sheet>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>
    <el-tab-pane label="获奖类">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="核审">
            <audit-construction></audit-construction>
          </el-tab-pane>
          <el-tab-pane label="导出"></el-tab-pane>
          <el-tab-pane label="录入">
            <digitize-sheet @click="downloadAward" api="/api/online/officeAdmin/excelImportAward"></digitize-sheet>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import AuditConstruction from "./AuditConstruction/index.vue";
import DigitizeSheet from "./DigitizeSheet/index.vue";

export default Vue.extend({
  components: {
    AuditConstruction,
    DigitizeSheet
  },
  methods: {
    downloadConstruction() {
      this.$http
        .post(
          "/api/online/officeAdmin/getConstructionTemplate",
          {},
          {
            headers: {
              token: this.$store.state.userInfo.token
            }
          }
        )
        .catch(() => {
          this.$message({
            message: "由于未知因素，无法获取文件",
            type: "warning"
          });
        });
    },
    downloadAchievement() {
      this.$http
        .post(
          "/api/online/officeAdmin/getAchievementTemplate",
          {},
          {
            headers: {
              token: this.$store.state.userInfo.token
            }
          }
        )
        .catch(() => {
          this.$message({
            message: "由于未知因素，无法获取文件",
            type: "warning"
          });
        });
    },
    downloadAward() {
      this.$http
        .post(
          "/api/online/officeAdmin/getAwardTemplate",
          {},
          {
            headers: {
              token: this.$store.state.userInfo.token
            }
          }
        )
        .catch(() => {
          this.$message({
            message: "由于未知因素，无法获取文件",
            type: "warning"
          });
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.tabs-body {
  background-color: #ffffff;
  margin: 0px 1vw 1vw 1vw;
  padding: 1vh 2vw;
  border-radius: 1rem 2px 2px 1rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>