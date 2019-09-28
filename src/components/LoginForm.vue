<template>
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
        <el-input v-model="form.password" prefix-icon="el-icon-key" placeholder="密码" show-password></el-input>
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
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface loginData {
  code: string;
  msg: string;
  data: {
    name: string;
    department: string;
    permission: number;
    token: string;
  };
}

export default Vue.extend({
  methods: {
    submitForm(formName: string) {
      this.isConfirming = true;
      this.loginSubmitBtn = "请稍候...";
      (this as any).$refs[formName].validate((valid: boolean) => {
        if (valid) {
          (this as any).$axios
            .post("/login", this.form)
            .then((res: loginData) => {
              window.console.log(res.data);
            });
          this.isConfirming = false;
          this.loginSubmitBtn = "登录";
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
  width: 480px;
}
</style>