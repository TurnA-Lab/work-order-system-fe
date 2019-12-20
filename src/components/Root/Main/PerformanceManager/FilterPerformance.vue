/*
 * @Author: Skye Young
 * @Date: 2019-11-20 20:10:47
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-18 20:09:23
 */

<template>
  <div>
    <div class="filter-part">
      <el-form :inline="true" :model="filterForm">
        <el-form-item label="负责人">
          <el-input v-model="filterForm.master" placeholder="请输入负责人"></el-input>
        </el-form-item>

        <el-form-item label="年度">
          <el-date-picker
            align="center"
            v-model="filterForm.year"
            type="year"
            format="yyyy 年"
            value-format="yyyy"
            placeholder="请选择立项年度"
          ></el-date-picker>
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
    <edit :data="data" :is-visible="editIsVisible" @toggle-is-visible="toggleEdit"></edit>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WhatTable from "@/components/Etc/WhatTable.vue";
import Edit from "./EditPerformance/Edit.vue";
import { AxiosResponse } from "axios";

interface Data {
  id: string;
  department: string;
  computeoffice: string;
  type: string;
  year: string;
  project: string;
  master: string;
  points: number;
  status: number | string;
  lastTime: string;
}

export default Vue.extend({
  components: {
    WhatTable,
    Edit
  },
  data() {
    return {
      filterForm: {
        year: "",
        master: ""
      },
      isFilled: false,
      editIsVisible: false,
      data: {},
      tableData: [],
      department: [],
      columns: [
        {
          prop: "project",
          label: "项目名称",
          width: 160
        },
        {
          prop: "master",
          label: "负责人"
        },
        {
          prop: "type",
          label: "类别",
          width: 160
        },
        {
          prop: "points",
          label: "业绩分"
        },
        {
          button: true,
          label: "操作",
          width: 200,
          group: [
            {
              // you can props => type size icon disabled plain
              name: "编辑",
              type: "warning",
              icon: "el-icon-edit",
              plain: true,
              onClick: (data: Data, index: number) => {
                // 箭头函数写法的 this 代表 Vue 实例
                this.$data.data = data;
                this.$data.editIsVisible = true;
              }
            },
            {
              name: "删除",
              type: "danger",
              icon: "el-icon-delete",
              disabled: false,
              onClick: (data: Data, index: number) => {
                // 这种写法的 this 代表 group 里的对象
                this.$confirm("删除后将不能直接恢复, 是否继续?", "注意", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    this.$http
                      .post(
                        "/api/online/root/deletePerformance",
                        {
                          id: data.id
                        },
                        {
                          headers: {
                            token: this.$store.state.userInfo.token
                          }
                        }
                      )
                      .then((res: AxiosResponse) => {
                        if (res.data.code === 0) {
                          this.$data.tableData.splice(index, 1);
                          this.$message({
                            message: res.data.msg || "信息删除成功",
                            type: "success"
                          });
                        } else {
                          this.$message({
                            message: res.data.msg || "信息删除失败",
                            type: "warning"
                          });
                        }
                      })
                      .catch(() => {
                        this.$message({
                          message: "由于未知因素，用户信息删除失败",
                          type: "warning"
                        });
                      });
                  })
                  .catch(() => {
                    this.$message({
                      message: "已取消删除",
                      type: "info"
                    });
                  });
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
      this.isFilled =
        this.filterForm.master !== "" || this.filterForm.year !== "";

      if (this.isFilled) {
        this.options.loading = true;

        this.$http
          .post(
            "/api/online/root/getPerformanceInfo",

            Object.assign(
              {},
              this.filterForm
            ),
            {
                params: {
                    page: this.pagination.pageIndex,
                    size: this.pagination.pageSize
                },
              headers: {
                token: this.$store.state.userInfo.token
              }
            }
          )
          .then((res: AxiosResponse) => {
            if (res.data.code === 0) {
              const { list, total } = res.data.data;
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
      } else {
        if (needAlert) {
          this.$message({
            message: "请至少填入一项，以进行筛选",
            type: "warning"
          });
        }
      }
    },
    toggleEdit(isVisible: boolean) {
      if (typeof isVisible === "undefined") {
        this.editIsVisible = !this.editIsVisible;
      } else {
        this.editIsVisible = isVisible;
      }
    }
  }
});
</script>

<style scoped>
div >>> .el-table__body-wrapper,
div >>> .el-table__fixed-body-wrapper {
  height: 52vh !important;
}
</style>
