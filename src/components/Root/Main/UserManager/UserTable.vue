/*
 * @Author: Skye Young 
 * @Date: 2019-11-12 21:48:02 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-17 18:29:14
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WhatTable from "@/components/Etc/WhatTable.vue";
import { AxiosResponse } from "axios/";

interface Row {
  dtpId: number;
  dptname: string;
  name: string;
  worknum: string;
  gender: string;
  birthday: string;
  enterTime: string;
  phone: string;
  techTittle: string;
  eduBgd: string;
  degree: string;
  school: string;
  major: string;
  doubleTeacher: number;
  background: number;
  tutor: number;
  permission: number;
}

export default Vue.extend({
  components: {
    WhatTable
  },
  data() {
    return {
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
          label: "手机号"
        },
        {
          prop: "techTittle",
          label: "职称"
        },
        {
          button: true,
          fixed: "right",
          label: "操作",
          width: 200,
          group: [
            {
              // you can props => type size icon disabled plain
              name: "编辑",
              type: "warning",
              icon: "el-icon-edit",
              plain: true,
              onClick: (row: Row, index: number) => {
                // 箭头函数写法的 this 代表 Vue 实例
                console.log(row, index);
              }
            },
            {
              name: "删除",
              type: "danger",
              icon: "el-icon-delete",
              disabled: false,
              onClick(row: Row) {
                // 这种写法的 this 代表 group 里的对象
                this.disabled = true;
                console.log(this);
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
      },
      tableData: []
    };
  },
  methods: {
    fetchData() {
      this.options.loading = true;

      this.$http
        .post(
          "/api/userTableData",
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
    }
  }
});
</script>

<style lang="scss" scoped>
// .table {
//   height: 60vh !important;
// }
</style>