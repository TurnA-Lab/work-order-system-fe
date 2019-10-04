<template>
  <div>
    <header>
      <h2>修改密码</h2>
    </header>
    <main>
      <div class="form">
        <el-form :model="form" ref="form" :rules="rules" label-position="left" label-width="auto">
          <el-form-item label="旧密码">
            <el-input v-model="form.oldPassword" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.newPassword" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="再次输入新密码">
            <el-input v-model="newPasswordCopy" placeholder="请确认新密码"></el-input>
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
export default Vue.extend({
  created() {
    if (!this.$store.state.userInfoPage.passwordBtnIsDisabled) {
      this.$store.commit("disableProfileBtn");
      this.$store.commit("disablePasswordBtn");
    }
  },
  data() {
    return {
      newPasswordCopy: "",
      isConfirming: false,
      submitBtn: "保存修改",
      form: {
        oldPassword: "",
        newPassword: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        newPasswordCopy: [
          { required: true, message: "请再次输入新密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName: string) {
      (this as any).$refs[formName].validate((valid: boolean) => {
        this.isConfirming = true;
        this.submitBtn = "请稍候...";
        if (valid) {
          (this as any).$axios
            .post("/change/password", this.form)
            .then((res: AxiosResponse) => {
              if (res.data.code === "-1") {
                this.$message({
                  message: res.data.msg || "未知错误",
                  type: "warning"
                });
              } else {
                // 关闭浏览器后即删除
                sessionStorage.setItem(
                  "wo_permission",
                  res.data.data.permission
                );
                sessionStorage.setItem(
                  "wo_user",
                  JSON.stringify(
                    Object.assign({}, res.data.data, {
                      worknum: this.form.worknum
                    })
                  )
                );
                this.$store.commit(
                  "updateUserInfo",
                  JSON.parse(sessionStorage.getItem("wo_user") as string)
                );
                this.$router.replace({ name: "index" });
              }
              this.isConfirming = false;
              this.submitBtn = "保存修改";
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