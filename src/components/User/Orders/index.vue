/*
 * @Author: Skye Young
 * @Date: 2019-10-28 19:47:14 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-19 20:39:49
 */

<template>
  <div>
    <header>
      <h2>我的工单</h2>
    </header>
    <main @mousewheel.stop>
      <el-tabs tab-position="left">
        <el-tab-pane label="建设类">
          <what-table
            :columns="constructionColumns"
            :dataSource="constructionTableData"
            :options="options"
            :pagination="pagination"
            :fetch="fetchConstructionData"
          ></what-table>
        </el-tab-pane>
        <el-tab-pane label="成果类">
          <what-table
            :columns="achievementColumns"
            :dataSource="achievementTableData"
            :options="options"
            :pagination="pagination"
            :fetch="fetchAchievementData"
          ></what-table>
        </el-tab-pane>
        <el-tab-pane label="获奖类">
          <what-table
            :columns="awardColumns"
            :dataSource="awardTableData"
            :options="options"
            :pagination="pagination"
            :fetch="fetchAwardData"
          ></what-table>
        </el-tab-pane>
      </el-tabs>
    </main>
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
      constructionColumns: [
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
      achievementColumns: [
        {
          prop: "production",
          label: "成果名称"
        },
        {
          prop: "class2",
          label: "二级类别"
        },
        {
          prop: "class3",
          label: "三级类别"
        },
        {
          prop: "level",
          label: "级别"
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
      awardColumns: [
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
          label: "级别"
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
      },
      constructionTableData: [],
      achievementTableData: [],
      awardTableData: []
    };
  },
  methods: {
    fetchData(api: string) {
      return new Promise((resolve, reject) => {
        this.$http
          .post(
            api,
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
              const statusArr = ["未通过", "审核中", "已通过"];

              list.forEach((item: { status: number | string }) => {
                item.status = statusArr[(item.status as number) + 1];
              });

              this.options.loading = false;
              resolve(list);
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
      });
    },
    fetchConstructionData() {
      this.fetchData("/api/online/user/getMyConstructions").then(
        (data: any) => {
          this.constructionTableData = data;
        }
      );
    },
    fetchAchievementData() {
      this.fetchData("/api/online/user/getMyAchievements").then((data: any) => {
        this.achievementTableData = data;
      });
    },
    fetchAwardData() {
      this.fetchData("/api/online/user/getMyAwards").then((data: any) => {
        this.awardTableData = data;
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
header,
main {
  margin-left: 15px;
}
</style>

<style scoped>
div >>> .el-table__body-wrapper,
div >>> .el-table__fixed-body-wrapper {
  height: 56vh !important;
}
</style>