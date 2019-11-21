/*
 * @Author: Skye Young 
 * @Date: 2019-11-20 20:10:47 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-20 21:32:00
 */

<template>
  <div>
    <el-form :inline="true" :model="filterForm" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="filterForm.name"></el-input>
      </el-form-item>
      <el-form-item label="工号">
        <el-input v-model="filterForm.worknum"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData(true)">查询</el-button>
      </el-form-item>
    </el-form>
    <what-table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :pagination="pagination"
      :fetch="fetchData"
    ></what-table>
    <edit-user
      :user-data="userData"
      :is-visible="editUserIsVisible"
      @toggle-is-visible="toggleEditUser"
    ></edit-user>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WhatTable from "@/components/Etc/WhatTable.vue";
import EditUser from "./EditUser/Edit.vue";
import { AxiosResponse } from "axios";

interface UserData {
  dtpId: number;
  dptname: string;
  name: string;
  worknum: string;
  gender: string;
  birthday: string;
  enterTime: string;
  phone: string;
  techTitle: string;
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
    WhatTable,
    EditUser
  },
  data() {
    return {
      filterForm: {
        name: "",
        worknum: ""
      },
      isFilled: false,
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
          prop: "techTitle",
          label: "职称"
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
              onClick: (userData: UserData, index: number) => {
                // 箭头函数写法的 this 代表 Vue 实例
                this.$data.userData = userData;
                this.$data.editUserIsVisible = true;
              }
            },
            {
              name: "删除",
              type: "danger",
              icon: "el-icon-delete",
              disabled: false,
              onClick: (userData: UserData, index: number) => {
                // 这种写法的 this 代表 group 里的对象
                this.$confirm("删除用户后将不能直接恢复, 是否继续?", "注意", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    this.$http
                      .post(
                        "/api/online/root/deleteUser",
                        {
                          worknum: userData.worknum
                        },
                        {
                          headers: {
                            token: this.$store.state.userInfo.token
                          }
                        }
                      )
                      .then((res: AxiosResponse) => {
                        if (res.data.code === 0) {
                          this.$data.tableData.splice(index, 1);
                          this.$message({
                            message: res.data.msg || "用户信息保存成功",
                            type: "success"
                          });
                        } else {
                          this.$message({
                            message: res.data.msg || "用户信息保存失败",
                            type: "warning"
                          });
                        }
                      })
                      .catch(() => {
                        this.$message({
                          message: "由于未知因素，用户信息删除失败",
                          type: "warning"
                        });
                      });
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
    fetchData(needAlert: boolean) {
      this.isFilled =
        this.filterForm.name !== "" || this.filterForm.worknum !== "";

      if (this.isFilled) {
        this.options.loading = true;

        this.$http
          .post(
            "/api/userTableData",
            Object.assign(
              {},
              {
                pageIndex: this.pagination.pageIndex,
                pageSize: this.pagination.pageSize
              },
              this.filterForm
            ),
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
      } else {
        if (needAlert) {
          this.$message({
            message: "请至少填入一项，以进行筛选",
            type: "warning"
          });
        }
      }
    },
    toggleEditUser(isVisible: boolean) {
      if (typeof isVisible === "undefined") {
        this.editUserIsVisible = !this.editUserIsVisible;
      } else {
        this.editUserIsVisible = isVisible;
      }
    }
  }
});
</script>

<style scoped>
div >>> .el-table {
  max-height: 60vh !important;
}

div >>> .el-table__body-wrapper,
div >>> .el-table__fixed-body-wrapper {
  height: 53vh !important;
}
</style>