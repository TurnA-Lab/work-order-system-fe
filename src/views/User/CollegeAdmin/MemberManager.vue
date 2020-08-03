<template>
  <div>
    <header>
      <h2>部门成员浏览</h2>
    </header>
    <main @mousewheel.stop>
      <what-table
        :columns="columns"
        :dataSource="tableData"
        :options="options"
        :pagination="pagination"
        :fetch="fetchData"
      ></what-table>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import WhatTable from "@/components/Etc/WhatTable.vue";
import { getData } from "@/utils/fetchData";

export default Vue.extend({
  components: {
    WhatTable
  },
  data() {
    return {
      editUserIsVisible: false,
      userData: {},
      tableData: [],
      columns: [
        {
          prop: "name",
          label: "姓名",
          width: 120
        },
        {
          prop: "gender",
          label: "性别",
          width: 60
        },
        {
          prop: "worknum",
          label: "工号"
        },
        {
          prop: "phone",
          label: "联系电话"
        },
        {
          prop: "department",
          label: "部门"
        },
        {
          prop: "major",
          label: "专业"
        },
        {
          prop: "teacherTitle",
          label: "职称"
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
      // 加载中
      this.options.loading = true;

      getData("/api/college/getDptUserList", {
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
    toggleEditUser(isVisible: boolean) {
      this.editUserIsVisible =
        typeof isVisible === "undefined" ? !this.editUserIsVisible : isVisible;
    }
  }
});
</script>

<style lang="scss" scoped>
header,
main {
  margin-left: 15px;
}
</style>

<style scoped>
div >>> .el-table {
  max-height: 65vh !important;
}

div >>> .el-table__body-wrapper,
div >>> .el-table__fixed-body-wrapper {
  height: 58vh !important;
}
</style>
