<template>
  <div>
    <div class="filter-part">
      <el-form
        class="filter-form"
        :inline="true"
        :model="filterForm"
        size="mini"
        v-loading="isLoading"
      >
        <el-form-item>
          <el-select
            v-model="filterForm.department"
            placeholder="院部"
            filterable
            clearable
          >
            <el-option
              :key="item.id"
              v-for="item in options.department"
              :label="item.dptName"
              :value="item.dptName"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-cascader
            v-model="kind"
            placeholder="类型"
            :options="options.kind"
            :props="{ expandTrigger: 'hover', value: 'label' }"
            :show-all-levels="false"
            filterable
            clearable
          ></el-cascader>
        </el-form-item>

        <el-form-item>
          <el-select
            v-model="filterForm.level"
            placeholder="级别"
            filterable
            clearable
          >
            <el-option
              v-for="item in options.level"
              :key="item.id"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            align="center"
            v-model="filterForm.year"
            type="year"
            placeholder="年度"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-select
            v-model="filterForm.schoolYear"
            placeholder="学年"
            clearable
          >
            <el-option
              v-for="item in options.schoolYears"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="filterForm.status" placeholder="状态" clearable>
            <el-option
              v-for="item in options.status"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <editor ref="editor"></editor>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { AwardFilterForm } from "@/interface/filter-form";
import { Department, Kind, Level } from "@/interface/list-data";
import { statusList, yearList } from "@/static-data/work-order";
import { LabelList } from "@/utils/enum2List";
import {
  fetchDepartmentList,
  fetchKindList,
  fetchLevelList
} from "@/utils/fetchData";
import { oneNotNull } from "@/utils/validate";

export default Vue.extend({
  components: {
    Editor: () => import("./AwardEditor.vue")
  },
  data(): {
    isLoading: boolean;
    kind: string[];
    filterForm: AwardFilterForm;
    options: {
      department: Department[];
      kind: Kind[];
      level: Level[];
      status: LabelList[];
      schoolYears: string[];
    };
  } {
    return {
      isLoading: true,
      kind: [],
      filterForm: {
        department: "",
        class3: "",
        year: "",
        level: "",
        schoolYear: "",
        status: null
      },
      options: {
        department: [],
        kind: [],
        level: [],
        status: statusList,
        schoolYears: yearList
      }
    };
  },
  methods: {
    fetchData() {
      if (oneNotNull(this.filterForm)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.$refs.editor as any).fetchData(
          Object.assign({}, this.filterForm, {
            class3:
              Array.isArray(this.kind) && this.kind.length === 2
                ? this.kind[2]
                : "",
            status:
              typeof this.filterForm.status === "number" &&
              Number.isInteger(this.filterForm.status)
                ? this.filterForm.status
                : ""
          })
        );
      } else {
        this.$message({
          message: "请至少填一项",
          type: "warning"
        });
      }
    }
  },
  created() {
    // 加载中
    this.isLoading = true;

    // 请求院部列表
    const department = fetchDepartmentList()
      .then(
        (data: Department[]) =>
          ((this.options.department as Department[]) = data)
      )
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取院部列表",
          type: "warning"
        });
      });

    // 请求级别列表
    const level = fetchLevelList()
      .then((data: Level[]) => ((this.options.level as Level[]) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取获奖级别列表",
          type: "warning"
        });
      });

    // 请求获奖类型列表
    const kind = fetchKindList({
      params: {
        class1: "获奖类"
      }
    })
      .then((data: Kind[]) => ((this.options.kind as Kind[]) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取获奖类型列表",
          type: "warning"
        });
      });

    Promise.all([department, kind, level]).then(() => {
      this.isLoading = false;
    });
  }
});
</script>

<style scoped>
div >>> .el-table__body-wrapper,
div >>> .el-table__fixed-body-wrapper {
  height: 52vh !important;
}
</style>

<style lang="scss" scoped>
.filter-form {
  display: inline-flex;

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: auto;
  }

  & > {
    width: 25%;
  }
}
</style>
