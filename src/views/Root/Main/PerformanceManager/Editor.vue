<template>
  <div>
    <what-table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :pagination="pagination"
      :fetch="fetchData"
    ></what-table>
    <editor-dialog
      :data="data"
      :data-index="index"
      :is-visible="editIsVisible"
      @toggle-is-visible="toggleEdit"
      @update-table-data="updateTableData"
    ></editor-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import WhatTable from "@/components/Etc/WhatTable.vue";
import EditorDialog from "@/components/Root/PerformanceEditorDialog.vue";
import { PerformanceFilterForm } from "@/interface/filter-form";
import { Performance } from "@/interface/list-data";
import { postData } from "@/utils/fetchData";

export default Vue.extend({
  components: {
    WhatTable,
    EditorDialog
  },
  data() {
    return {
      editIsVisible: false,
      index: -1,
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
          prop: "points",
          label: "业绩"
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
              onClick: (data: Performance, index: number) => {
                // 箭头函数写法的 this 代表 Vue 实例
                this.$data.data = data;
                this.$data.index = index;
                this.$data.editIsVisible = true;
              }
            },
            {
              name: "删除",
              type: "danger",
              icon: "el-icon-delete",
              disabled: false,
              onClick: (data: Performance, index: number) => {
                // 这种写法的 this 代表 group 里的对象
                this.$confirm("删除后将不能直接恢复, 是否继续?", "注意", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    postData(
                      "/api/root/performance/delete",
                      {},
                      {
                        params: {
                          id: data.id
                        }
                      }
                    )
                      .then(() => {
                        this.$data.tableData.splice(index, 1);
                        this.$message({
                          message: "业绩信息删除成功",
                          type: "success"
                        });
                      })
                      .catch((err: string) =>
                        this.$message({
                          message: err || "由于未知因素，用户信息删除失败",
                          type: "warning"
                        })
                      );
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
    fetchData(filterForm: PerformanceFilterForm) {
      this.options.loading = true;

      postData("/api/root/performance/getPerformances", filterForm || {}, {
        params: {
          page: this.pagination.pageIndex,
          size: this.pagination.pageSize
        }
      })
        .then(({ list, total }) => {
          this.tableData = list;
          this.pagination.total = total;
        })
        .catch((err: string) => {
          this.$message({
            message: err || "由于未知因素，无法获取表格",
            type: "warning"
          });
        })
        .finally(() => (this.options.loading = false));
    },
    toggleEdit(isVisible: boolean) {
      this.editIsVisible =
        typeof isVisible === "undefined" ? !this.editIsVisible : isVisible;
    },
    updateTableData(index: number, data: Performance) {
      this.$set(this.tableData, index, data);
    }
  }
});
</script>

<style scoped>
div >>> .el-table__body-wrapper {
  max-height: 62vh !important;
}
</style>
