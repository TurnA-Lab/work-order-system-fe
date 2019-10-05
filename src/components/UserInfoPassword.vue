<template>
  <div>
    <header>
      <h2>修改密码</h2>
    </header>
    <main>
      <div class="form">
        <el-form
          :model="form"
          ref="form"
          :rules="rules"
          label-position="left"
          label-width="auto"
          status-icon
        >
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="form.oldPassword" placeholder="请输入原密码" show-password>
              <el-button slot="append">验证</el-button>
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
              v-model="newPasswordCopy"
              placeholder="请确认新密码"
              show-password
              status-icon
              :disabled="isDisable"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="submitBtn"
              type="primary"
              @click="submitForm('form')"
              :loading="isConfirming"
            >{{submitBtn}}</el-button>
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
  created() {
    if (!this.$store.state.userInfoPage.passwordBtnIsDisabled) {
      this.$store.dispatch("toggleTwoBtn");
    }
  },
  data() {
    const validateOldPassword = (
      rule: object,
      value: string,
      callback: Function
    ) => {
      if (!value) {
        this.$data.isDisable = true;
        callback(new Error("原密码不能为空"));
      } else {
      }
    };
    return {
      isDisable: true,
      newPasswordCopy: "",
      isConfirming: false,
      submitBtn: "保存修改",
      form: {
        oldPassword: "",
        newPassword: ""
      },
      rules: {
        // oldPassword: [{ validator: validateOldPassword, trigger: "blur" }],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        newPasswordCopy: [
          { required: true, message: "请再次输入新密码", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    isConfirming() {
      this.submitBtn = this.isConfirming ? "请稍后..." : "保存修改";

      (this as any).$axios
        .post("/password", {
          password: this.$data.form.oldPassword,
          token: this.$store.state.userInfo.token
        })
        .then((res: AxiosResponse) => {
          if (res.data.code === -1) {
            // callback(new Error("请检查原密码"));
          } else {
            this.$data.isDisable = false;
            // callback();
          }
        });
    }
  },
  methods: {
    // confirmOldPassword(formName: string) {
    //   (this as any).$refs[formName].validateField((props: Array<string>|string,callback: Function)=>{
    //   }
    // },
    submitForm(formName: string) {
      (this as any).$refs[formName].validate((valid: boolean) => {
        this.isConfirming = true;
        if (valid) {
          (this as any).$axios
            .post("/change/password", this.form)
            .then((res: AxiosResponse) => {
              this.isConfirming = false;
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

.form {
  width: 30%;
}

.submitBtn {
  float: right;
}
</style>