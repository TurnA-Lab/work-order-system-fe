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
        <el-tab-pane label="建设类" style="width: 100%; height: 100%">
          <construction-manager></construction-manager>
        </el-tab-pane>
        <el-tab-pane label="成果类">
          <achievement-manager></achievement-manager>
        </el-tab-pane>
        <el-tab-pane label="获奖类">
          <award-manager></award-manager>
        </el-tab-pane>
      </el-tabs>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ConstructionManager from "./ConstructionManager/index.vue";
import AchievementManager from "./AchievementManager/index.vue";
import AwardManager from "./AwardManager/index.vue";

export default Vue.extend({
  components: {
    ConstructionManager,
    AchievementManager,
    AwardManager
  },
  data() {
    return {
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
