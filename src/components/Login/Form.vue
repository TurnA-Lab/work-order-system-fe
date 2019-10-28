/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:49:23 
 * @Last Modified by:   Skye Young 
 * @Last Modified time: 2019-10-28 19:49:23 
 */

<template>
  <transition appear appear-class="slide-fade-enter" appear-active-class="slide-fade-enter-active">
    <el-card class="login-card" shadow="hover" :body-style="{'padding': '20px 40px'}">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item style="text-align: center;" prop="permission">
          <el-radio-group v-model="form.permission">
            <el-radio-button label="0">普通帐户</el-radio-button>
            <el-radio-button label="1">管理员账户</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="worknum">
          <el-input v-model="form.worknum" prefix-icon="el-icon-user" placeholder="工号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            prefix-icon="el-icon-key"
            placeholder="密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('form')"
            :loading="isConfirming"
            style="width: 100%;"
          >{{submitBtnText}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";

export default Vue.extend({
  data() {
    return {
      isConfirming: false,
      form: {
        permission: "0",
        worknum: "",
        password: ""
      },
      rules: {
        worknum: [{ required: true, message: "请输入工号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  computed: {
    submitBtnText() {
      return this.$data.isConfirming ? "请稍后..." : "登录";
    }
  },
  methods: {
    submitForm(formName: string) {
      (this as any).$refs[formName].validate((valid: boolean) => {
        this.isConfirming = true;
        if (valid) {
          (this as any).$axios
            .post("/outline/login", this.form)
            .then((res: AxiosResponse) => {
              if (res.data.code === -1) {
                this.$message({
                  message: res.data.msg || "未知错误",
                  type: "warning"
                });
              } else if (res.data.code === 1) {
                this.isConfirming = false;
                this.$message({
                  message: res.data.msg || "请求超时",
                  type: "warning"
                });
              } else if (res.data.code === 0) {
                // 关闭浏览器后即删除
                sessionStorage.setItem("wo_permission", this.form.permission);
                const woUser = Object.assign({}, res.data.data, {
                  worknum: this.form.worknum
                });
                sessionStorage.setItem("wo_user", JSON.stringify(woUser));
                this.$store.commit("updateUserInfo", woUser);
                this.$router.replace({ name: "index" });
              }
              this.isConfirming = false;
            });
        }
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.login-card {
  width: 480px; //35vw
  border-radius: 1rem;
}

// slide
.slide-fade-enter {
  opacity: 0;
  transform: translateY(-10vw);
}

.slide-fade-enter-active {
  transition-property: opacity transform;
  transition-delay: 0.2s 0s;
  transition-duration: 0.6s 0.8s;
}
</style>