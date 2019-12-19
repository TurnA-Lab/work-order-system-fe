/*
 * @Author: Skye Young
 * @Date: 2019-12-01 17:02:51
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-19 18:36:45
 */


<template>
  <div>
    <what-table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :pagination="pagination"
      :fetch="fetchData"
    ></what-table>
    <audit :data="data" :is-visible="auditIsVisible" @toggle-is-visible="toggleAudit"></audit>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WhatTable from "@/components/Etc/WhatTable.vue";
import Audit from "./Audit.vue";
import { AxiosResponse } from "axios";

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
      auditIsVisible: false,
      data: {},
      index: -1,
      tableData: [],
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
    fetchData() {
      this.options.loading = true;

      this.$http
        .post(
          "/api/online/officeAdmin/getUserAchievement",
          {
            pageIndex: this.pagination.pageIndex,
            pageSize: this.pagination.pageSize
          },
          {
            headers: {
              token: this.$store.state.userInfo.token
            }
          }
        )
        .then((res: AxiosResponse) => {
          if (res.data.code === 0) {
            const { list, total } = res.data.data;

            list.forEach((item: Data) => {
              item.status = statusText[(item.status as number) + 1];
            });

            this.tableData = list;
            this.pagination.total = total;
          } else {
            this.$message({
              message: res.data.msg || "由于未知因素，无法获取表格",
              type: "warning"
            });
          }
          this.options.loading = false;
        })
        .catch(() => {
          this.$message({
            message: "由于未知因素，无法获取表格",
            type: "warning"
          });
          this.options.loading = false;
        });
    },
    toggleAudit(isVisible: boolean) {
      if (typeof isVisible === "undefined") {
        this.auditIsVisible = !this.auditIsVisible;
      } else {
        this.auditIsVisible = isVisible;
      }
    }
  }
});
</script>

<style scoped>
div >>> .el-table__body-wrapper {
  max-height: 62vh !important;
}
</style>
