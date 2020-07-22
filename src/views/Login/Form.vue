<template>
  <transition
    appear
    appear-class="slide-fade-enter"
    appear-active-class="slide-fade-enter-active"
  >
    <el-card
      class="login-card"
      shadow="always"
      :body-style="{ padding: '20px 40px' }"
      @keyup.enter.native="submitForm('form')"
    >
      <header>Login</header>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item
          style="text-align: center;margin-bottom: 10px;"
          prop="permission"
        >
          <el-radio-group v-model="form.permission" size="mini">
            <el-radio-button label="0">普通帐户</el-radio-button>
            <el-radio-button label="1">管理员账户</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="worknum">
          <el-input
            v-model="form.worknum"
            prefix-icon="el-icon-user"
            placeholder="工号"
          ></el-input>
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
            style="width: 100%;"
            type="primary"
            @click="submitForm('form')"
            :loading="isConfirming"
            >{{ submitBtnText }}</el-button
          >
        </el-form-item>
      </el-form>
      <footer>Completed by Skye Young & Just Geeker</footer>
    </el-card>
  </transition>
</template>

<script lang="ts">
import { ElForm } from "element-ui/types/form";
import Vue from "vue";

import { LoginData } from "@/interface/login";
import { Roles } from "@/static-data/login";
import { postData } from "@/utils/fetchData";

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
      // 设置验证状态
      this.isConfirming = true;

      ((this.$refs[formName] as ElForm).validate() as Promise<boolean>)
        .then((valid: boolean) => valid || Promise.reject("请检查工号、密码"))
        .then(() =>
          postData("/api/login", this.form)
            .then((data: LoginData) => {
              // 将权限数组转化为权限数字
              let permission = 0;
              data.roles.forEach(value => {
                permission =
                  permission < parseInt(Roles[value], 10)
                    ? parseInt(Roles[value], 10)
                    : permission;
              });

              // 合并到 woUser
              const woUser = Object.assign(data, { permission });

              // 删除 data
              delete data.roles;
              // 设置 sessionStorage
              sessionStorage.setItem(
                "wo_permission",
                this.form.permission === "0" ? "0" : permission.toString()
              );

              sessionStorage.setItem("wo_user", JSON.stringify(woUser));
              // 设置到 vuex
              this.$store.commit("updateUserInfo", woUser);
              // 切换到主页
              this.$router.replace({ name: "index" });
            })
            .catch((err: string) => Promise.reject(err))
        )
        .catch((err: string) => {
          this.$message({
            message: err || "未知错误",
            type: "warning"
          });
        })
        .finally(() => {
          this.isConfirming = false;
        });
    }
  }
});
</script>

<style lang="scss" scoped>
.login-card {
  width: 350px; //35vw
  border-radius: 1rem;
}

header {
  font-variant: all-petite-caps;
  font-size: 4em;
  text-align: center;
  color: #888;
  word-spacing: 10px;
  margin-inline-end: -8px;
  letter-spacing: 8px;
  user-select: none;
}

footer {
  text-align: right;
  color: #888;
  font-size: 0.6em;
  font-variant: small-caps;
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
