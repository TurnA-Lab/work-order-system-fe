/*
 * @Author: Skye Young
 * @Date: 2019-10-28 19:47:14 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-18 22:02:15
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
          ></what-table>
        </el-tab-pane>
        <el-tab-pane label="成果类">
          <what-table
            :columns="achievementColumns"
            :dataSource="achievementTableData"
            :options="options"
            :pagination="pagination"
          ></what-table>
        </el-tab-pane>
        <el-tab-pane label="获奖类">
          <what-table
            :columns="awardColumns"
            :dataSource="awardTableData"
            :options="options"
            :pagination="pagination"
          ></what-table>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios/";
import WhatTable from "@/components/Etc/WhatTable.vue";

export default Vue.extend({
  components: {
    WhatTable
  },
  data() {
    const action = {
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
          onClick: (row: any, index: number) => {
            // 箭头函数写法的 this 代表 Vue 实例
            console.log(row, index);
          }
        },
        {
          name: "删除",
          type: "danger",
          icon: "el-icon-delete",
          disabled: false,
          onClick(row: any) {
            // 这种写法的 this 代表 group 里的对象
            this.disabled = true;
            console.log(this);
          }
        }
      ]
    };

    return {
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
        action
      ],
      achievementColumns: [
        {
          prop: "content",
          label: "成果名称"
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
        action
      ],
      awardColumns: [
        {
          prop: "production",
          label: "成果名称"
        },
        {
          prop: "class3",
          label: "具体类别"
        },

        {
          prop: "status",
          label: "状态"
        },
        action
      ],
      options: {
        mutiSelect: false,
        mutiSelectFixed: false,
        index: true, // 显示序号
        indexFixed: false,
        loading: false, // 表格动画
        initTable: false // 是否一挂载就加载数据
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
      this.options.loading = true;

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
            const statusArr = ["未通过", "待审核", "已通过"];

            (res.data.data.list as any[]).forEach(
              (item: { status: number | string }) => {
                item.status = statusArr[(item.status as number) + 1];
              }
            );

            if ("/api/online/user/getMyConstructions" === api) {
              res.data.data.list = this.constructionTableData;
              this.options.loading = false;
            } else if ("/api/online/user/getMyAchievements" === api) {
              res.data.data.list = this.achievementTableData;
              this.options.loading = false;
            } else if ("/api/online/user/getMyAwards" === api) {
              res.data.data.list = this.awardTableData;
              this.options.loading = false;
            }
          } else {
            this.$message({
              message: res.data.msg || "由于未知因素，无法获取表格",
              type: "warning"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "由于未知因素，无法获取表格",
            type: "warning"
          });
          this.options.loading = false;
        });
    }
  },

  created() {
    this.fetchData("/api/online/user/getMyConstructions");
    this.fetchData("/api/online/user/getMyAchievements");
    this.fetchData("/api/online/user/getMyAwards");
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