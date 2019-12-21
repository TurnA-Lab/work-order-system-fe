/*
 * @Author: Skye Young
 * @Date: 2019-10-28 19:45:55
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-12 20:29:10
 */

<template>
  <span class="submit-btn">
    <el-button type="primary" plain @click="nextActive">确认提交</el-button>
    <el-dialog title="确认提交" :visible.sync="isVisible" :close-on-click-modal="false" append-to-body>
      <main>
        <el-alert title="注意事项" type="warning" :closable="false"></el-alert>
        <ul>
          <li>请保持网络状况良好。</li>
          <li>请在提交前，确认工单信息是否有误。</li>
          <li>请注意，在此时刷新，系统将不会保存任何数据。</li>
        </ul>
        <el-divider></el-divider>
        <span>输入负责人工号以进行确认</span>
      </main>
      <footer>
        <el-input class="item" v-model.trim="input" :disabled="isConfirming"></el-input>
        <el-button
          class="item"
          type="danger"
          plain
          :disabled="submitIsDisable"
          :loading="isConfirming"
          @click="submit"
        >{{submitBtn}}</el-button>
      </footer>
    </el-dialog>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";
import validate from "@/utils/validate";

const formApi = ["addConstruction", "addAchievement", "addAward"];

export default Vue.extend({
  data() {
    return {
      isVisible: false,
      isConfirming: false,
      input: ""
    };
  },
  methods: {
    nextActive() {
      new Promise((resolve, reject) => {
        resolve(this.$emit("next"));
      }).then(() => {
        if (validate(this.$store.state.order.form)) {
          this.isVisible = !this.isVisible;
        } else {
          this.$message({
            message: "工单填写尚不完整，请补全后提交",
            type: "warning"
          });
        }
      });
    },
    submit() {
      const state = this.$store.state;

      this.isConfirming = true;
      new Promise((resolve, reject) => {
        this.$http
          .post(
            "/api/online/validate",
            {
              worknum: this.input
            },
            {
              headers: {
                token: state.userInfo.token
              }
            }
          )
          .then((res: AxiosResponse) => {
            if (res.data.code === 0) {
              return res.data.data;
            } else {
              reject(res.data.msg || "项目负责人必须与当前登录用户相同");
            }
          })
          .then(() => {
            this.$http
              .post(
                `/api/online/user/${formApi[state.order.class - 1]}`,
                state.order.form,
                {
                  headers: {
                    token: state.userInfo.token
                  }
                }
              )
              .then((response: AxiosResponse) => {
                if (response.data.code === 0) {
                  this.isConfirming = false;
                  this.$store.commit("nextActive");
                  this.isVisible = false;
                } else {
                  reject(response.data.msg || "由于未知因素，暂时无法提交表单");
                }
              });
          });
      }).catch((err: string) => {
        this.isConfirming = false;
        this.$message({
          message: err || "由于未知因素，暂时无法验证身份",
          type: "warning"
        });
      });
    }
  },
  computed: {
    submitIsDisable() {
      return this.$data.input ? false : true;
    },
    submitBtn() {
      return this.$data.isConfirming ? "请稍后……" : "我已检查，进行提交";
    }
  }
});
</script>

<style lang="scss" scoped>
span.submit-btn {
  margin-inline-start: 10px;
}

ul {
  font-size: 1rem;
  // margin: 0%;
  padding-inline-start: 30px;
}
li {
  list-style: circle;
}

footer {
  text-align: center;

  .item {
    width: 100%;

    &:last-of-type {
      margin-block-start: 10px;
    }
  }
}
</style>


<style>
.el-dialog {
  border-radius: 1rem;
  width: 430px;
}
</style>
