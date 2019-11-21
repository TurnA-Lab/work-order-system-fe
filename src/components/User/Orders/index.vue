/*
 * @Author: Skye Young
 * @Date: 2019-10-28 19:47:14 
 * @Last Modified by: Three Dreams
 * @Last Modified time: 2019-11-18 21:25:56
 */

<template>
  <div>
    <header>
      <h2>我的工单</h2>
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
import { AxiosResponse } from "axios/";
import WhatTable from "@/components/Etc/WhatTable.vue";
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
          prop: "lastTime",
          label: "最后修改时间"
        },
        {
          prop: "class1",
          label: "项目类别"
        },
        {
          prop: "class2",
          label: "具体类型"
        },
        {
          prop: "class3",
          label: "项目名称"
        },
        {
          prop: "status",
          label: "状态"
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
      const formApi = [
        "/api/online/user/getMyAwards",
        "/api/online/user/getMyAchievements",
        "/api/online/user/getMyConstructions"
      ];
      for (let i = 0; i < 3; i++) {
        this.$http
          .post(
            formApi[i],
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
              const statusArr = ["未通过", "待审核", "已通过"];

              for (let j = 0; j < total; j++) {
                const status = res.data.data.list[j].status;
                if (status === -1 || status === 0 || status === 1) {
                  res.data.data.list[j].status = statusArr[status + 1];
                } else {
                  res.data.data.list[j].status = "未知错误";
                }
              }
              this.tableData = this.tableData.concat(res.data.data.list);
              this.pagination.total += total;
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
  }
});
</script>

<style lang="scss" scoped>
header,
main {
  margin-left: 15px;
}
</style>