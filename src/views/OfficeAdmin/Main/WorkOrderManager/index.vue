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
              api="/api/office/construction/getExcel"
              fileApi="/api/office/construction/getFileKeys"
            ></export-sheet>
          </el-tab-pane>
          <el-tab-pane label="录入">
            <digitize-sheet
              @click="
                downloadTemplate(
                  '建设类模板.xlsx',
                  '/api/office/construction/getTemplate'
                )
              "
              api="/api/office/construction/excelImport"
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
              api="/api/office/achievement/getExcel"
              fileApi="/api/office/achievement/getFileKeys"
            ></export-sheet>
          </el-tab-pane>
          <el-tab-pane label="录入">
            <digitize-sheet
              @click="
                downloadTemplate(
                  '成果类模板.xlsx',
                  '/api/office/achievement/getTemplate'
                )
              "
              api="/api/office/achievement/excelImport"
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
              api="/api/office/award/getExcel"
              fileApi="/api/office/award/getFileKeys"
            ></export-sheet>
          </el-tab-pane>
          <el-tab-pane label="录入">
            <digitize-sheet
              @click="
                downloadTemplate(
                  '获奖类模板.xlsx',
                  '/api/office/award/getTemplate'
                )
              "
              api="/api/office/award/excelImport"
            ></digitize-sheet>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { AxiosResponse } from "axios/";
import { saveAs } from "file-saver";
import Vue from "vue";

import decodeFilename from "@/utils/decodeFilename";

export default Vue.extend({
  components: {
    AuditConstruction: () => import("./Construction/index.vue"),
    AuditAchievement: () => import("./Achievement/index.vue"),
    AuditAward: () => import("./Award/index.vue"),
    FilterConstruction: () => import("./Construction/Filter.vue"),
    FilterAchievement: () => import("./Achievement/Filter.vue"),
    FilterAward: () => import("./Award/Filter.vue"),
    DigitizeSheet: () => import("@/components/OfficeAdmin/DigitizeSheet.vue"),
    ExportSheet: () => import("@/components/OfficeAdmin/ExportSheet.vue")
  },
  methods: {
    downloadTemplate(fallbackFilename: string, api: string) {
      this.$http
        .get(api, {
          headers: {
            token: this.$store.state.userInfo.token
          },
          responseType: "blob"
        })
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
