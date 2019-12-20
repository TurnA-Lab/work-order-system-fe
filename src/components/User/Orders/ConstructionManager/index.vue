<template>
  <div>
    <what-table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :pagination="pagination"
      :fetch="fetchData"
    ></what-table>
    <manager :data="data" :is-visible="managerIsVisible" @toggle-is-visible="toggleManager"></manager>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios/";
import WhatTable from "@/components/Etc/WhatTable.vue";
import Manager from "./Manager.vue";

export default Vue.extend({
  components: {
    WhatTable,
    Manager
  },
  data() {
    return {
      managerIsVisible: false,
      data: {},
      tableData: [],
      columns: [
        {
          prop: "project",
          label: "项目名称"
        },
        {
          prop: "class3",
          label: "具体类别"
        },
        {
          prop: "level",
          label: "项目级别"
        },
        {
          prop: "status",
          label: "状态"
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
              onClick: (data: any, index: number) => {
                // 箭头函数写法的 this 代表 Vue 实例
                console.log(data, index);
                this.$data.data = data;
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
      this.$http
        .post(
          "/api/online/user/getMyConstructions",
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
            const statusArr = ["未通过", "审核中", "已通过"];

            list.forEach((item: { status: number | string }) => {
              item.status = statusArr[(item.status as number) + 1];
            });

            this.options.loading = false;
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
    },
    toggleManager(isVisible: boolean) {
      if (typeof isVisible === "undefined") {
        this.managerIsVisible = !this.managerIsVisible;
      } else {
        this.managerIsVisible = isVisible;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
</style>