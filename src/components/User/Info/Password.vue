/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:45:05 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-10-29 12:57:45
 */

<template>
  <div>
    <header>
      <h2>
        修改密码
        <el-popover placement="bottom-start" width="200" trigger="hover" content="修改成功后，将会强制重新登录。">
          <el-button
            class="tooltip-btn"
            slot="reference"
            icon="el-icon-question"
            type="text"
            circle
          ></el-button>
        </el-popover>
      </h2>
    </header>
    <main>
      <div class="form">
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="auto">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input
              v-model="form.oldPassword"
              placeholder="请输入原密码"
              show-password
              :disabled="!isDisable"
            >
              <el-button
                slot="append"
                :icon="confirmBtnIcon"
                @click="confirmOldPassword('form')"
                :loading="isConfirming"
                :disabled="!isDisable"
              >{{confirmBtnText}}</el-button>
            </el-input>
          </el-form-item>

          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="form.newPassword"
              placeholder="请输入新密码"
              show-password
              status-icon
              :disabled="isDisable"
            ></el-input>
          </el-form-item>

          <el-form-item label="再次输入新密码" prop="newPasswordCopy">
            <el-input
              v-model="form.newPasswordCopy"
              placeholder="请确认新密码"
              show-password
              status-icon
              :disabled="isDisable"
            ></el-input>
          </el-form-item>

          <el-form-item class="btn-line">
            <el-button type="primary" @click="resetForm('form')" plain>重置</el-button>
            <el-button
              type="primary"
              @click="submitForm('form')"
              :loading="isSaving"
              :disabled="isDisable"
            >{{submitBtnText}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";

export default Vue.extend({
  data() {
    const validateOldPassword = (
      rule: object,
      value: string,
      callback: (callBack: object | void) => void
    ) => {
      if (!value) {
        this.$data.isDisable = true;
        callback(new Error("原密码不能为空"));
      } else {
        if (value.length < 5 || value.length > 32) {
          callback(new Error("密码位数应大于 5 位，小于 32 位"));
        } else {
          callback();
        }
      }
    };
    const validateNewPassword = (
      rule: object,
      value: string,
      callback: (callBack: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else {
        if (value === this.$data.form.oldPassword) {
          callback(new Error("输入的新密码不能与原密码相同"));
        } else {
          if (value.length < 5 || value.length > 32) {
            callback(new Error("密码位数应大于 5 位，小于 32 位"));
          } else {
            callback();
          }
        }
      }
    };
    const validateNewPasswordCopy = (
      rule: object,
      value: string,
      callback: (callBack: object | void) => void
    ) => {
      if (value !== this.$data.form.newPassword) {
        callback(new Error("输入的密码与新密码不符"));
      } else {
        callback();
      }
    };
    return {
      isDisable: true,
      isConfirming: false,
      isSaving: false,
      confirmBtn: "验证",
      confirmBtnIcon: "",
      submitBtn: "保存修改",
      form: {
        oldPassword: "",
        newPassword: "",
        newPasswordCopy: ""
      },
      rules: {
        oldPassword: [{ validator: validateOldPassword, trigger: "blur" }],
        newPassword: [{ validator: validateNewPassword, trigger: "blur" }],
        newPasswordCopy: [
          { validator: validateNewPasswordCopy, trigger: ["change", "blur"] }
        ]
      }
    };
  },
  computed: {
    confirmBtnText() {
      return this.$data.isConfirming
        ? ""
        : this.$data.confirmBtnIcon
        ? ""
        : "验证";
    },
    submitBtnText() {
      return this.$data.isSaving ? "请稍后..." : "保存修改";
    }
  },
  methods: {
    confirmOldPassword(formName: string) {
      (this as any).$refs[formName].validateField(
        "oldPassword",
        (errorMsg: string) => {
          if (!errorMsg) {
            this.isConfirming = true;
            this.$http
              .post(
                "/api/online/password",
                {
                  password: this.form.oldPassword
                },
                {
                  headers: {
                    token: this.$store.state.userInfo.token
                  }
                }
              )
              .then((res: AxiosResponse) => {
                this.isConfirming = false;
                if (res.data.code === 0) {
                  this.isDisable = false;
                  this.confirmBtnIcon = "el-icon-check";
                } else {
                  this.isDisable = true;
                  this.$message({
                    message: res.data.msg || "请检查密码",
                    type: "warning"
                  });
                }
              })
              .catch(() => {
                this.isConfirming = false;
                this.isDisable = true;
                this.$message({
                  message: "由于未知因素，暂时无法验证密码",
                  type: "warning"
                });
              });
          }
        }
      );
    },
    resetForm(formName: string) {
      (this as any).$refs[formName].resetFields();
      this.isDisable = true;
      this.isConfirming = false;
      this.isSaving = false;
      this.confirmBtnIcon = "";
    },
    submitForm(formName: string) {
      (this as any).$refs[formName].validate((valid: boolean) => {
        this.isSaving = true;
        if (valid) {
          this.$http
            .post(
              "/api/online/newPassword",
              {
                password: this.form.oldPassword,
                newPassword: this.form.newPassword
              },
              {
                headers: {
                  token: this.$store.state.userInfo.token
                }
              }
            )
            .then((res: AxiosResponse) => {
              this.resetForm("form");
              if (res.data.code === 0) {
                this.$message({
                  message: "修改成功，正在跳转至登录页...",
                  type: "success"
                });
                setTimeout(() => {
                  this.$store.commit("clearUserInfo");
                  sessionStorage.clear();
                  this.$router.replace({ name: "login" });
                }, 1000);
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "warning"
                });
              }
            })
            .catch(() => {
              this.$message({
                message: "出现未知错误，暂时无法修改密码",
                type: "warning"
              });
            });
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped>
header,
main {
  // font-size: 2rem;
  margin-left: 15px;
}

.tooltip-btn {
  padding: 0%;
}

.form {
  width: 30%;
}

.btn-line {
  display: flex;
  justify-content: flex-end;
}
</style>