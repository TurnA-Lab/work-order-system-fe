/*
 * @Author: Skye Young
 * @Date: 2019-11-12 21:48:02
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-18 18:58:12
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
    <edit :data="data" :is-visible="editIsVisible" @toggle-is-visible="toggleEdit"
      @refresh="fetchData"
    ></edit>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WhatTable from "@/components/Etc/WhatTable.vue";
import Edit from "./Edit.vue";
import { AxiosResponse } from "axios";

interface Data {
  id: number;
  department: string;
  computeoffice: string;
  type: string;
  year: string;
  project: string;
  master: string;
  bonus: number;
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
      editIsVisible: false,
      data: {},
      tableData: [],
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
          prop: "bonus",
          label: "奖励"
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
                        "/api/online/root/deleteBonus",
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
    fetchData() {
      this.options.loading = true;

      this.$http
        .post(
          "/api/online/root/getBonusInfo",
          {},
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
div >>> .el-table__body-wrapper {
  max-height: 62vh !important;
}
</style>
