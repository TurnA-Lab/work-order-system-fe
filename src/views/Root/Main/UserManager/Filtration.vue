<template>
  <div>
    <el-form :inline="true" :model="filterForm">
      <el-form-item>
        <el-input v-model="filterForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="filterForm.worknum" placeholder="工号"></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="department">
        <el-select v-model="filterForm.dptName" placeholder="院部" filterable>
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
    <what-table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :pagination="pagination"
      :fetch="fetchData"
    ></what-table>
    <editor-dialog
      :user-data="userData"
      :is-visible="editUserIsVisible"
      @toggle-is-visible="toggleEditUser"
      @refresh="fetchData"
    ></editor-dialog>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import Vue from "vue";

import WhatTable from "@/components/Etc/WhatTable.vue";
import EditorDialog from "@/components/Root/UserEditorDialog.vue";
import { Department } from "@/interface/list-data";
import { fetchDepartmentList } from "@/utils/fetchData";
import { oneNotNull } from "@/utils/validate";

interface UserData {
  dtpId: number;
  dptName: string;
  name: string;
  worknum: string;
  gender: string;
  birthday: string;
  enterTime: string;
  phone: string;
  teacherTittle: string;
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
    EditorDialog
  },
  data() {
    return {
      filterForm: {
        name: "",
        worknum: "",
        dptName: ""
      },
      isFilled: false,
      editUserIsVisible: false,
      userData: {},
      tableData: [],
      department: [],
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
          prop: "teacherTittle",
          label: "职称"
        },
        {
          button: true,
          label: "操作",
          width: 200,
          group: [
            {
              // name: "编辑",
              type: "info",
              icon: "el-icon-edit",
              plain: true,
              circle: true,
              onClick: (userData: UserData) => {
                // 箭头函数写法的 this 代表 Vue 实例
                this.$data.userData = userData;
                this.$data.editUserIsVisible = true;
              }
            },
            {
              // name: "删除",
              type: "danger",
              icon: "el-icon-delete",
              disabled: false,
              circle: true,
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
                        "/api/root/user/delete",
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
                            message: res.data.msg || "用户信息删除成功",
                            type: "success"
                          });
                        } else {
                          return Promise.reject(res.data.msg);
                        }
                      })
                      .catch((err: string) => {
                        this.$message({
                          message: err || "由于未知因素，用户信息删除失败",
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
            },
            {
              // name: "权限",
              type: "warning",
              icon: "el-icon-coordinate",
              plain: true,
              circle: true,
              onClick: (userData: UserData) => {
                this.$prompt("请输入新密码", "修改密码", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  inputPattern: /.{6,32}/,
                  inputErrorMessage: "密码必须大于 5 位，小于 32 位",
                  inputType: "text"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }).then(({ value }: any) => {
                  this.$confirm(`您输入的密码是 ${value}`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                  })
                    .then(() => {
                      this.$http
                        .post(
                          "/api/root/user/updatePassword",
                          {
                            worknum: userData.worknum,
                            password: value
                          },
                          {
                            headers: {
                              token: this.$store.state.userInfo.token
                            }
                          }
                        )
                        .then((res: AxiosResponse) => {
                          if (res.data.code === 0) {
                            this.$message({
                              message: "修改成功",
                              type: "success"
                            });
                          } else {
                            return Promise.reject(res.data.msg);
                          }
                        })
                        .catch((err: string) => {
                          this.$message({
                            message: err || "出现未知错误，暂时无法修改密码",
                            type: "warning"
                          });
                        });
                    })
                    .catch(() => {
                      // element 要求占位
                    });
                });
              }
            },
            {
              // name: "改密",
              type: "warning",
              icon: "el-icon-key",
              plain: true,
              circle: true,
              onClick: (userData: UserData) => {
                this.$prompt("请输入新密码", "修改密码", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  inputPattern: /.{6,32}/,
                  inputErrorMessage: "密码必须大于 5 位，小于 32 位",
                  inputType: "text"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }).then(({ value }: any) => {
                  this.$confirm(`您输入的密码是 ${value}`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消"
                  })
                    .then(() => {
                      this.$http
                        .post(
                          "/api/root/user/updatePassword",
                          {
                            worknum: userData.worknum,
                            password: value
                          },
                          {
                            headers: {
                              token: this.$store.state.userInfo.token
                            }
                          }
                        )
                        .then((res: AxiosResponse) => {
                          if (res.data.code === 0) {
                            this.$message({
                              message: "修改成功",
                              type: "success"
                            });
                          } else {
                            return Promise.reject(res.data.msg);
                          }
                        })
                        .catch((err: string) => {
                          this.$message({
                            message: err || "出现未知错误，暂时无法修改密码",
                            type: "warning"
                          });
                        });
                    })
                    .catch(() => {
                      // element 要求占位
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
        initTable: false // 是否一挂载就加载数据
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
      if (oneNotNull(this.filterForm)) {
        this.options.loading = true;

        this.$http
          .post(
            "/api/root/user/getUserList",

            Object.assign({}, this.filterForm),
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
            this.options.loading = false;
            if (res.data.code === 0) {
              const { list, total } = res.data.data;
              this.tableData = list;
              this.pagination.total = total;
            } else {
              return Promise.reject(res.data.msg || "用户信息保存失败");
            }
          })
          .catch((err: string) => {
            this.$message({
              message: err || "由于未知因素，无法获取表格",
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
      this.editUserIsVisible =
        typeof isVisible === "undefined" ? !this.editUserIsVisible : isVisible;
    }
  },
  created() {
    // 请求院部列表
    fetchDepartmentList()
      .then((data: Department[]) => ((this.department as Department[]) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取院部列表",
          type: "warning"
        });
      });
  }
});
</script>

<style scoped>
div >>> .el-table__body-wrapper,
div >>> .el-table__fixed-body-wrapper {
  height: 52vh !important;
}
</style>
