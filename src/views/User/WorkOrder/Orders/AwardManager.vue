<template>
  <div>
    <what-table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :pagination="pagination"
      :fetch="fetchData"
    ></what-table>
    <manager-dialog
      :data="data"
      :data-index="index"
      :is-visible="managerIsVisible"
      @toggle-is-visible="toggleManager"
      @refresh="fetchData"
    ></manager-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import WhatTable from "@/components/Etc/WhatTable.vue";
import { Award } from "@/interface/list-data";
import { Status } from "@/static-data/work-order";
import { postData } from "@/utils/fetchData";

export default Vue.extend({
  components: {
    WhatTable,
    ManagerDialog: () => import("./AwardManagerDialog.vue")
  },
  data() {
    return {
      managerIsVisible: false,
      data: {},
      index: -1,
      tableData: [],
      columns: [
        {
          prop: "content",
          label: "获奖名称"
        },
        {
          prop: "class3",
          label: "具体类别"
        },
        {
          prop: "prize",
          label: "奖项"
        },
        {
          prop: "level",
          label: "级别",
          width: 100
        },
        {
          prop: "status",
          label: "状态",
          width: 100,
          content: "reason",
          show: "status",
          showRule: "未通过"
        },
        {
          button: true,
          label: "操作",
          width: 200,
          group: [
            {
              // you can props => type size icon disabled plain
              name: "管理",
              type: "warning",
              icon: "el-icon-s-grid",
              plain: true,
              onClick: (data: Award, index: number) => {
                // 箭头函数写法的 this 代表 Vue 实例
                this.$data.data = data;
                this.$data.index = index;
                this.$data.managerIsVisible = true;
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
        loading: true // 表格动画
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
      postData(
        "/api/user/award/list",
        {},
        {
          params: {
            page: this.pagination.pageIndex,
            size: this.pagination.pageSize
          }
        }
      )
        .then(({ list, total }: { list: Award[]; total: number }) => {
          for (let index = 0, length = list.length; index < length; index++) {
            const element = list[index];
            element.status = Status[(element.status as number) + 1];
          }
          (this.tableData as Award[]) = list;
          this.pagination.total = total;
        })
        .catch((err: string) => {
          this.$message({
            message: err || "由于未知因素，无法获取建设类信息",
            type: "warning"
          });
        })
        .finally(() => (this.options.loading = false));
    },
    toggleManager(isVisible: boolean) {
      this.managerIsVisible =
        typeof isVisible === "undefined" ? !this.managerIsVisible : isVisible;
    }
  }
});
</script>

<style lang="scss" scoped></style>
