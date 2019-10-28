/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:45:55 
 * @Last Modified by:   Skye Young 
 * @Last Modified time: 2019-10-28 19:45:55 
 */

<template>
  <span class="submit-btn">
    <el-button type="primary" plain @click="nextActive">确认提交</el-button>
    <el-dialog
      custom-class="wo-dialog"
      title="确认提交"
      :visible.sync="isVisible"
      :close-on-click-modal="false"
      append-to-body
    >
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
        <el-input class="item" v-model.trim="input" :disabled="inputIsDisable"></el-input>
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

export default Vue.extend({
  data() {
    return {
      isVisible: false,
      inputIsDisable: false,
      submitIsDisable: true,
      isConfirming: false,
      submitBtn: "我已检查，进行提交",
      input: ""
    };
  },
  methods: {
    nextActive() {
      this.isVisible = !this.isVisible;
      this.$emit("click");
    },
    submit() {
      const state = this.$store.state;
      this.isConfirming = true;
      (this as any).$axios
        .post(
          "/principalWorknum",
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
          if (res.data.code === 1) {
            (this as any).$axios
              .post(
                `/newForm${state.order.class}`,
                {
                  form: state.order.form
                },
                {
                  headers: {
                    token: state.userInfo.token
                  }
                }
              )
              .then((response: AxiosResponse) => {
                if (response.data.code === 1) {
                  this.isConfirming = false;
                  this.$store.commit("nextActive");
                  this.isVisible = false;
                } else {
                  this.isConfirming = true;
                }
              });
          } else {
            this.$message({
              message: "项目负责人必须与当前登录用户相同",
              type: "warning"
            });
            this.isConfirming = false;
          }
        });
    }
  },
  watch: {
    input(newData: string, oldData: string) {
      this.submitIsDisable = newData ? false : true;
    },
    isConfirming(newData: boolean, oldData: boolean) {
      this.inputIsDisable = !this.inputIsDisable;
      this.submitBtn = newData ? "请稍后……" : "我已检查，进行提交";
    }
  }
});
</script>


<style>
.wo-dialog {
  border-radius: 1rem;
  width: 430px;

  user-select: none;
}
</style>

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