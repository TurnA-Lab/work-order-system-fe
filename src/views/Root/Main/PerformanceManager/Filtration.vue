<template>
  <div>
    <el-form :inline="true" :model="filterForm" v-loading="isLoading">
      <el-form-item>
        <el-input
          v-model="filterForm.master"
          placeholder="负责人"
          clearable
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          align="center"
          v-model="filterForm.year"
          type="year"
          format="yyyy 年"
          value-format="yyyy"
          placeholder="年度"
          clearable
        ></el-date-picker>
      </el-form-item>

      <el-form-item class="form-item" prop="department" clearable>
        <el-select
          v-model="filterForm.department"
          placeholder="院部"
          filterable
        >
          <el-option
            v-for="item in department"
            :key="item.id"
            :label="item.dptName"
            :value="item.dptName"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form-item>
    </el-form>

    <editor ref="editor"></editor>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { PerformanceFilterForm } from "@/interface/filter-form";
import { Department } from "@/interface/list-data";
import { fetchDepartmentList } from "@/utils/fetchData";
import { oneNotNull } from "@/utils/validate";

export default Vue.extend({
  components: {
    editor: () => import("./Editor.vue")
  },
  data(): {
    isLoading: boolean;
    department: Department[];
    filterForm: PerformanceFilterForm;
  } {
    return {
      isLoading: true,
      department: [],
      filterForm: {
        year: "",
        master: "",
        department: ""
      }
    };
  },
  methods: {
    fetchData() {
      if (oneNotNull(this.filterForm)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.$refs.editor as any).fetchData(this.filterForm);
      } else {
        this.$message({
          message: "请至少填一项用于筛选",
          type: "warning"
        });
      }
    }
  },
  created() {
    this.isLoading = true;

    // 请求院部列表
    fetchDepartmentList()
      .then((data: Department[]) => ((this.department as Department[]) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取院部列表",
          type: "warning"
        });
      })
      .finally(() => (this.isLoading = false));
  }
});
</script>

<style scoped>
div >>> .el-table__body-wrapper,
div >>> .el-table__fixed-body-wrapper {
  height: 52vh !important;
}
</style>
