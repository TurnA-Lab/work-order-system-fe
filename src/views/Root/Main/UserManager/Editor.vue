<template>
  <div>
    <what-table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :pagination="pagination"
      :fetch="fetchData"
    ></what-table>
    <editor-dialog
      :data="data"
      :data-index="index"
      :is-visible="editUserIsVisible"
      @toggle-is-visible="toggleEditUser"
      @update-table-data="updateTableData"
    ></editor-dialog>
    <el-dialog
      title="修改权限"
      :visible.sync="dialogVisible"
      width="40%"
      append-to-body
      v-loading="permissionIsLoading"
    >
      <el-transfer
        v-model="permission"
        :data="permissionOptions"
        :props="{ key: 'value' }"
        :titles="['未拥有', '已拥有']"
      ></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveRoles">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import WhatTable from "@/components/Etc/WhatTable.vue";
import EditorDialog from "@/components/Root/UserEditorDialog.vue";
import { UserFilterForm } from "@/interface/filter-form";
import { UserInfo } from "@/interface/user";
import { rolesListForUserManager } from "@/static-data/roles";
import { getData, postData } from "@/utils/fetchData";

export default Vue.extend({
  components: {
    WhatTable,
    EditorDialog
  },
  data() {
    return {
      editUserIsVisible: false,
      dialogVisible: false,
      permissionIsLoading: true,
      permissionOptions: rolesListForUserManager,
      permission: [],
      permissionOrigin: [],
      userWorknum: -1,
      index: -1,
      data: {},
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
          prop: "teacherTitle",
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
              tooltip: true,
              tooltipContent: "编辑信息",
              onClick: (userData: UserInfo, index: number) => {
                // 箭头函数写法的 this 代表 Vue 实例
                this.$data.data = userData;
                this.$data.index = index;
                this.$data.editUserIsVisible = true;
              }
            },
            {
              // name: "删除",
              type: "danger",
              icon: "el-icon-delete",
              disabled: false,
              circle: true,
              tooltip: true,
              tooltipContent: "删除账户",
              onClick: (userData: UserInfo, index: number) => {
                // 这种写法的 this 代表 group 里的对象
                this.$confirm("删除用户后将不能直接恢复, 是否继续?", "注意", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    getData("/api/root/user/delete", {
                      params: {
                        worknum: userData.worknum
                      }
                    })
                      .then(() => {
                        this.$data.tableData.splice(index, 1);
                        this.$message({
                          message: "用户信息删除成功",
                          type: "success"
                        });
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
                      message: "已取消删除账户",
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
              tooltip: true,
              tooltipContent: "修改权限",
              onClick: (userData: UserInfo) => {
                getData("/api/root/user/getRoles", {
                  params: {
                    worknum: userData.worknum
                  }
                })
                  .then(rolesArr => {
                    this.$data.permissionOrigin = rolesArr.slice();
                    this.$data.permission = rolesArr.slice();
                    this.$data.userWorknum = userData.worknum;
                    this.$data.dialogVisible = true;
                  })
                  .catch((err: string) => {
                    this.$message({
                      message: err || "出现未知错误，暂时无法修改权限",
                      type: "warning"
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
              tooltip: true,
              tooltipContent: "修改密码",
              onClick: (userData: UserInfo) => {
                this.$prompt("请输入新密码", "修改密码", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  inputPattern: /.{6,32}/,
                  inputErrorMessage: "密码必须大于 5 位，小于 32 位",
                  inputType: "text"
                })
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  .then(({ value }: any) => {
                    this.$confirm(`您输入的密码是 ${value}`, "提示", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消"
                    }).then(() => {
                      postData("/api/root/user/updatePassword", {
                        worknum: userData.worknum,
                        password: value
                      })
                        .then(() => {
                          this.$message({
                            message: "修改成功",
                            type: "success"
                          });
                        })
                        .catch((err: string) => {
                          this.$message({
                            message: err || "出现未知错误，暂时无法修改密码",
                            type: "warning"
                          });
                        });
                    });
                  })
                  .catch(() => {
                    this.$message({
                      message: "已取消修改密码",
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
    fetchData(filterForm: UserFilterForm) {
      this.options.loading = true;

      postData("/api/root/user/getUserList", filterForm || {}, {
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
    },
    saveRoles() {
      const permission = new Set(this.permission);
      const permissionOrigin = new Set(this.permissionOrigin);
      const userWorknum = this.userWorknum;
      const removeArr = [
        ...new Set(this.permissionOrigin.filter(x => !permission.has(x)))
      ];
      const addArr = [
        ...new Set(this.permission.filter(x => !permissionOrigin.has(x)))
      ];
      const promises = [];

      for (let index = 0, length = removeArr.length; index < length; index++) {
        const role = removeArr[index];
        promises.push(
          getData("/api/root/user/removeRole", {
            params: {
              role: role,
              worknum: userWorknum
            }
          })
        );
      }

      for (let index = 0, length = addArr.length; index < length; index++) {
        const role = addArr[index];
        promises.push(
          getData("/api/root/user/addRole", {
            params: {
              role: role,
              worknum: userWorknum
            }
          })
        );
      }

      Promise.all(promises)
        .then(() => {
          this.$message({
            message: `修改用户 ${userWorknum} 权限成功`,
            type: "success"
          });
        })
        .catch((err: string) => {
          this.$message({
            message:
              err || `出现未知错误，暂时无法修改用户 ${userWorknum} 权限`,
            type: "warning"
          });
        })
        .finally(() => {
          this.dialogVisible = false;
        });
    },
    updateTableData(index: number, data: UserInfo) {
      this.$set(this.tableData, index, data);
    }
  }
});
</script>

<style scoped>
div >>> .el-table__body-wrapper {
  max-height: 62vh !important;
}
</style>

<style lang="scss">
.el-transfer {
  display: flex;
  height: 200px;

  .el-transfer__buttons {
    display: inline-flex;
    flex-flow: column;
    justify-content: center;

    .el-button + .el-button {
      margin-left: 0px;
    }
  }
}
</style>
