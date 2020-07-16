<template>
  <div>
    <div class="filter-part">
      <el-form
        class="filter-form"
        :inline="true"
        :model="filterForm"
        size="mini"
      >
        <el-form-item>
          <el-input
            v-model="filterForm.production"
            placeholder="成果名称"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="filterForm.name"
            placeholder="第一作者"
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-select
            v-model="filterForm.department"
            placeholder="院部"
            filterable
          >
            <el-option
              :key="item.value"
              v-for="item in filter.department"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-cascader
            v-model="filterForm.sort"
            placeholder="项目类型"
            :options="filter.sort"
            :props="{ expandTrigger: 'hover' }"
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
          <el-button type="primary" @click="fetchData(true)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <what-table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :pagination="pagination"
      :fetch="fetchData"
    ></what-table>
    <audit
      :data="data"
      :is-visible="auditIsVisible"
      @toggle-is-visible="toggleAudit"
      @refresh="fetchData"
    ></audit>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import Vue from "vue";

import WhatTable from "@/components/Etc/WhatTable.vue";
import { yearList } from "@/static-data/work-order";

import Audit from "./Audit.vue";

interface Data {
  aid: number;
  department: string;
  worknum: string;
  name: string;
  teammate: string;
  production: string;
  class1: string;
  class2: string;
  class3: string;
  level: string;
  unit: string;
  publishTime: string;
  patent: number;
  certificate: string;
  schoolYear: string;
  year: string;
  status: number | string;
  reason: string;
  lastTime: string;
}

const statusText = ["未通过", "审核中", "已通过"];

export default Vue.extend({
  components: {
    WhatTable,
    Audit
  },
  data() {
    return {
      filterForm: {
        production: null,
        name: null,
        department: null,
        level: null,
        sort: null,
        year: null,
        schoolYear: null
      },
      filter: {
        department: [],
        sort: []
      },
      schoolYears: yearList,
      isFilled: false,
      auditIsVisible: false,
      data: {},
      index: -1,
      tableData: [],
      department: [],
      columns: [
        {
          prop: "production",
          label: "成果名称",
          width: 160
        },
        {
          prop: "name",
          label: "第一作者"
        },
        {
          prop: "class3",
          label: "类别",
          width: 160
        },
        {
          prop: "status",
          label: "审核状态"
        },
        {
          button: true,
          label: "操作",
          width: 160,
          group: [
            {
              // you can props => type size icon disabled plain
              name: "审核",
              type: "warning",
              icon: "el-icon-edit",
              plain: true,
              onClick: (data: Data, index: number) => {
                // 箭头函数写法的 this 代表 Vue 实例
                this.$data.data = data;
                this.$data.index = index;
                this.$data.auditIsVisible = true;
              }
            }
          ]
        }
      ],
      options: {
        mutiSelect: false,
        mutiSelectFixed: false,
        index: true, // 显示序号
        indexFixed: false,
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      },
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 20
      }
    };
  },
  methods: {
    fetchData(needAlert: boolean) {
      // 只要有一个填充就设置 isFilled 为真
      // for (const key in this.filterForm) {
      //   if (this.filterForm.hasOwnProperty(key)) {
      //     const element = (this.filterForm as any)[key];
      //     if (element !== null) {
      //       this.isFilled = true;
      //       break;
      //     }
      //   }
      // }

      if (this.isFilled) {
        this.options.loading = true;

        this.$http
          .post("/api/online/officeAdmin/getUserAchievement", this.filterForm, {
            params: {
              page: this.pagination.pageIndex,
              size: this.pagination.pageSize
            },
            headers: {
              token: this.$store.state.userInfo.token
            }
          })
          .then((res: AxiosResponse) => {
            this.options.loading = false;
            if (res.data.code === 0) {
              const { list, total } = res.data.data;

              list.forEach((item: Data) => {
                item.status = statusText[(item.status as number) + 1];
              });

              this.tableData = list;
              this.pagination.total = total;
            } else {
              return Promise.reject(res.data.msg);
            }
          })
          .catch((err: string) => {
            this.$message({
              message: err || "由于未知因素，无法获取表格",
              type: "warning"
            });
            this.options.loading = false;
          });
      } else {
        if (needAlert) {
          this.$message({
            message: "请至少填入一项，以进行筛选",
            type: "warning"
          });
        }
      }
    },
    toggleAudit(isVisible: boolean) {
      if (typeof isVisible === "undefined") {
        this.auditIsVisible = !this.auditIsVisible;
      } else {
        this.auditIsVisible = isVisible;
      }
    }
  },
  created() {
    const stateToken = this.$store.state.userInfo.token;

    // 请求院部列表
    this.$http
      .post(
        "/api/online/getDepartmentList",
        {},
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.filter.department = res.data.data;
        } else {
          return Promise.reject(res.data.msg);
        }
      })
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取院部列表",
          type: "warning"
        });
      });

    // 请求成果类型列表
    this.$http
      .post(
        "/api/online/getTypeList",
        {
          class1: "成果类"
        },
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.filter.sort = res.data.data;
        } else {
          return Promise.reject(res.data.msg);
        }
      })
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取成果类型列表",
          type: "warning"
        });
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
