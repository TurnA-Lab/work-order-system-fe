/*
 * @Author: Skye Young
 * @Date: 2019-11-30 19:13:19
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-19 19:35:59
 */

<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="建设类">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="核审">
            <audit-construction></audit-construction>
          </el-tab-pane>
          <el-tab-pane label="导出">
            <export-sheet
              api="/api/online/officeAdmin/getConstructionExcel"
              fileApi="/api/online/officeAdmin/getConstructionFileKey"
            ></export-sheet>
          </el-tab-pane>
          <el-tab-pane label="录入">
            <digitize-sheet
              @click="downloadTemplate('建设类模板', '/api/online/officeAdmin/getConstructionTemplate')"
              api="/api/online/officeAdmin/excelImportConstruction"
            ></digitize-sheet>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>

    <el-tab-pane label="成果类">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="核审">
            <audit-achievement></audit-achievement>
          </el-tab-pane>
          <el-tab-pane label="导出">
            <export-sheet
              api="/api/online/officeAdmin/getAchievementExcel"
              fileApi="/api/online/officeAdmin/getAchievementFileKey"
            ></export-sheet>
          </el-tab-pane>
          <el-tab-pane label="录入">
            <digitize-sheet
              @click="downloadTemplate('成果类模板', '/api/online/officeAdmin/getAchievementTemplate')"
              api="/api/online/officeAdmin/excelImportAchievement"
            ></digitize-sheet>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>

    <el-tab-pane label="获奖类">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="核审">
            <audit-award></audit-award>
          </el-tab-pane>
          <el-tab-pane label="导出">
            <export-sheet
              api="/api/online/officeAdmin/getAwardExcel"
              fileApi="/api/online/officeAdmin/getAwardFileKey"
            ></export-sheet>
          </el-tab-pane>
          <el-tab-pane label="录入">
            <digitize-sheet
              @click="downloadTemplate('获奖类模板', '/api/online/officeAdmin/getAwardTemplate')"
              api="/api/online/officeAdmin/excelImportAward"
            ></digitize-sheet>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import AuditConstruction from "./AuditConstruction/index.vue";
import AuditAchievement from "./AuditAchievement/index.vue";
import AuditAward from "./AuditAward/index.vue";
import DigitizeSheet from "./DigitizeSheet/index.vue";
import ExportSheet from "./ExportSheet.vue";
import { saveAs } from "file-saver";
import { AxiosResponse } from "axios/";

export default Vue.extend({
  components: {
    AuditConstruction,
    AuditAchievement,
    AuditAward,
    DigitizeSheet,
    ExportSheet
  },
  methods: {
    downloadTemplate(fileName: string, api: string) {
      this.$http
        .post(
          api,
          {},
          {
            headers: {
              token: this.$store.state.userInfo.token
            },
            responseType: "blob"
          }
        )
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            return Promise.resolve(res.data);
          } else {
            return Promise.reject(res.data.msg);
          }
        })
        .then((data: Blob) => {
          saveAs(data, `${fileName}.xlsx`);
        })
        .catch((err: string) => {
          this.$message({
            message: err || "由于未知因素，无法下载用户表",
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
