<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="建设类">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="核审">
            <audit-construction></audit-construction>
          </el-tab-pane>
          <el-tab-pane label="筛选">
            <filter-construction></filter-construction>
          </el-tab-pane>
          <el-tab-pane label="导出">
            <export-sheet
              api="/api/online/officeAdmin/getConstructionExcel"
              fileApi="/api/online/officeAdmin/getConstructionFileKey"
            ></export-sheet>
          </el-tab-pane>
          <el-tab-pane label="录入">
            <digitize-sheet
              @click="
                downloadTemplate(
                  '建设类模板.xlsx',
                  '/api/online/officeAdmin/getConstructionTemplate'
                )
              "
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
          <el-tab-pane label="筛选">
            <filter-achievement></filter-achievement>
          </el-tab-pane>
          <el-tab-pane label="导出">
            <export-sheet
              api="/api/online/officeAdmin/getAchievementExcel"
              fileApi="/api/online/officeAdmin/getAchievementFileKey"
            ></export-sheet>
          </el-tab-pane>
          <el-tab-pane label="录入">
            <digitize-sheet
              @click="
                downloadTemplate(
                  '成果类模板.xlsx',
                  '/api/online/officeAdmin/getAchievementTemplate'
                )
              "
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
          <el-tab-pane label="筛选">
            <filter-award></filter-award>
          </el-tab-pane>
          <el-tab-pane label="导出">
            <export-sheet
              api="/api/online/officeAdmin/getAwardExcel"
              fileApi="/api/online/officeAdmin/getAwardFileKey"
            ></export-sheet>
          </el-tab-pane>
          <el-tab-pane label="录入">
            <digitize-sheet
              @click="
                downloadTemplate(
                  '获奖类模板.xlsx',
                  '/api/online/officeAdmin/getAwardTemplate'
                )
              "
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
import AuditConstruction from "./Construction/index.vue";
import AuditAchievement from "./Achievement/index.vue";
import AuditAward from "./Award/index.vue";
import FilterConstruction from "./Construction/Filter.vue";
import FilterAchievement from "./Achievement/Filter.vue";
import FilterAward from "./Award/Filter.vue";
import DigitizeSheet from "@/components/OfficeAdmin/DigitizeSheet/index.vue";
import ExportSheet from "@/components/OfficeAdmin/ExportSheet.vue";
import { saveAs } from "file-saver";
import { AxiosResponse } from "axios/";
import decodeFilename from "@/utils/decodeFilename";

export default Vue.extend({
  components: {
    AuditConstruction,
    AuditAchievement,
    AuditAward,
    FilterConstruction,
    FilterAchievement,
    FilterAward,
    DigitizeSheet,
    ExportSheet
  },
  methods: {
    downloadTemplate(fallbackFilename: string, api: string) {
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
            return Promise.resolve([
              decodeFilename(res, fallbackFilename),
              res.data
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
            type: "warning"
          });
        });
    }
  }
});
</script>
