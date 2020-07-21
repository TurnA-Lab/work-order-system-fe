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
          ></el-cascader>
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
          <el-select v-model="filterForm.schoolYear" placeholder="学年">
            <el-option
              v-for="item in schoolYears"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="filterForm.status" placeholder="状态">
            <el-option
              v-for="item in Status"
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

    <editor ref="editor" :init-table="false"></editor>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { AchievementFilterForm } from "@/interface/filter-form";
import { Achievement, Department } from "@/interface/list-data";
import { yearList } from "@/static-data/work-order";
import { fetchDepartmentList, fetchKindList } from "@/utils/fetchData";

import { oneNotNull } from "../../../../utils/validate";

export default Vue.extend({
  components: {
    Editor: () => import("./AchievementEditor.vue")
  },
  data(): {
    isLoading: boolean;
    kind: string[];
    schoolYears: string[];
    filterForm: AchievementFilterForm;
    options: {
      department: Department[];
      kind: Achievement[];
    };
  } {
    return {
      isLoading: true,
      kind: [],
      schoolYears: yearList,
      filterForm: {
        department: "",
        class3: "",
        year: "",
        schoolYear: "",
        status: 0
      },
      options: {
        department: [],
        kind: []
      }
    };
  },
  methods: {
    fetchData() {
      if (Array.isArray(this.kind) && this.kind.length === 2) {
        this.filterForm.class3 = this.kind[1];
      }

      if (oneNotNull(this.filterForm)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.$refs.editor as any).fetchData(this.filterForm);
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

    // 请求成果类型列表
    const kind = fetchKindList({
      params: {
        class1: "成果类"
      }
    })
      .then(
        (data: Achievement[]) => ((this.options.kind as Achievement[]) = data)
      )
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取成果类型列表",
          type: "warning"
        });
      });

    Promise.all([department, kind]).then(() => {
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
