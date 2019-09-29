<template>
  <transition appear appear-class="slide-enter" appear-active-class="slide-enter-active">
    <el-card class="login-card" shadow="hover" :body-style="{'padding': '20px 40px'}">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item style="text-align: center;">
          <el-radio-group v-model="form.mode">
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
            style="width: 100%"
          >{{loginSubmitBtn}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AxiosResponse } from "axios";

export default Vue.extend({
  methods: {
    submitForm(formName: string) {
      (this as any).$refs[formName].validate((valid: boolean) => {
        this.isConfirming = true;
        this.loginSubmitBtn = "请稍候...";
        if (valid) {
          (this as any).$axios
            .post("/login", this.form)
            .then((res: AxiosResponse) => {
              if (res.data.code === "-1") {
                this.$message({
                  message: "帐号或密码出错",
                  type: "warning"
                });
              } else {
                localStorage.setItem("_at", res.data.data.token);
                this.$router.replace("/");
              }
              this.isConfirming = false;
              this.loginSubmitBtn = "登录";
            });
        }
      });
    }
  },
  data() {
    return {
      isConfirming: false,
      loginSubmitBtn: "登录",
      form: {
        mode: "0",
        worknum: "",
        password: ""
      },
      rules: {
        worknum: [{ required: true, message: "请输入工号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  }
});
</script>

<style lang="scss" scoped>
.login-card {
  width: 480px; //35vw
}

// slide
.slide-enter {
  transform: translateY(-3vw);
}

.slide-enter-active {
  transition: transform 0.4s ease;
}
</style>