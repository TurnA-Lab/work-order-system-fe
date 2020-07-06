<template>
  <div>
    <div class="filter-part">
      <el-form :inline="true" :model="filterForm">
        <el-form-item>
          <el-input v-model="filterForm.master" placeholder="负责人"></el-input>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            align="center"
            v-model="filterForm.year"
            type="year"
            format="yyyy 年"
            value-format="yyyy"
            placeholder="年度"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" prop="department">
          <el-select
            v-model="filterForm.department"
            placeholder="院部"
            filterable
          >
            <el-option
              v-for="item in department"
              :key="item.id"
              :label="item.dptName"
              :value="item.dptName"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="fetchData(true)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <what-table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :pagination="pagination"
      :fetch="fetchData"
    ></what-table>
    <edit
      :data="data"
      :is-visible="editIsVisible"
      @toggle-is-visible="toggleEdit"
      @refresh="fetchData"
    ></edit>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WhatTable from "@/components/Etc/WhatTable.vue";
import EditorDialog from "@/components/Root/BonusEditorDialog.vue";
import { AxiosResponse } from "axios";
import { fetchDepartmentList } from "@/utils/fetchList";
import { Department } from "@/interface/list-data";
import { oneNotNull } from "@/utils/validate";

interface Data {
  id: string;
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
    EditorDialog,
  },
  data() {
    return {
      filterForm: {
        year: "",
        master: "",
        department: "",
      },
      isFilled: false,
      editIsVisible: false,
      data: {},
      tableData: [],
      department: [],
      columns: [
        {
          prop: "project",
          label: "项目名称",
          width: 160,
        },
        {
          prop: "master",
          label: "负责人",
        },
        {
          prop: "type",
          label: "类别",
          width: 160,
        },
        {
          prop: "bonus",
          label: "奖励",
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
              },
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
                  type: "warning",
                }).then(() =>
                  this.$http
                    .post(
                      "/api/root/bonus/delete",
                      {
                        id: data.id,
                      },
                      {
                        headers: {
                          token: this.$store.state.userInfo.token,
                        },
                      }
                    )
                    .then((res: AxiosResponse) => {
                      if (res.data.code === 0) {
                        this.$data.tableData.splice(index, 1);
                        this.$message({
                          message: res.data.msg || "信息删除成功",
                          type: "success",
                        });
                      } else {
                        return Promise.reject(res.data.msg);
                      }
                    })
                    .catch((err: string) => {
                      this.$message({
                        message: err || "由于未知因素，用户信息删除失败",
                        type: "warning",
                      });
                    })
                );
              },
            },
          ],
        },
      ],
      options: {
        mutiSelect: false,
        mutiSelectFixed: false,
        index: true, // 显示序号
        indexFixed: false,
        loading: false, // 表格动画
        initTable: true, // 是否一挂载就加载数据
      },
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 20,
      },
    };
  },
  methods: {
    fetchData(needAlert: boolean) {
      if (oneNotNull(this.filterForm)) {
        this.options.loading = true;

        this.$http
          .post("/api/root/bonus/getBonuses", this.filterForm, {
            params: {
              page: this.pagination.pageIndex,
              size: this.pagination.pageSize,
            },
            headers: {
              token: this.$store.state.userInfo.token,
            },
          })
          .then((res: AxiosResponse) => {
            this.options.loading = false;
            if (res.data.code === 0) {
              const { list, total } = res.data.data;
              this.tableData = list;
              this.pagination.total = total;
            } else {
              return Promise.reject(res.data.msg);
            }
          })
          .catch((err: string) => {
            this.$message({
              message: err || "由于未知因素，无法获取表格",
              type: "warning",
            });
            this.options.loading = false;
          });
      } else {
        if (needAlert) {
          this.$message({
            message: "请至少填入一项，以进行筛选",
            type: "warning",
          });
        }
      }
    },
    toggleEdit(isVisible: boolean) {
      this.editIsVisible =
        typeof isVisible === "undefined" ? !this.editIsVisible : isVisible;
    },
  },
  created() {
    // 请求院部列表
    fetchDepartmentList()
      .then((data: Department[]) => (this.department = data as any))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取院部列表",
          type: "warning",
        });
      });
  },
});
</script>

<style scoped>
div >>> .el-table__body-wrapper,
div >>> .el-table__fixed-body-wrapper {
  height: 52vh !important;
}
</style>
