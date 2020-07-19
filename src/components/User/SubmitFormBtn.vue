<template>
  <span class="submit-btn">
    <el-button type="primary" plain @click="nextActive">确认提交</el-button>
    <el-dialog
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
        <div>
          输入用户 <span class="username">{{ name }}</span> 的工号以确认
        </div>
      </main>
      <footer>
        <el-input
          class="item"
          v-model.trim="input"
          :disabled="isConfirming"
        ></el-input>
        <el-button
          class="item"
          type="danger"
          plain
          :disabled="submitIsDisable"
          :loading="isConfirming"
          @click="submit"
          >{{ submitBtnText }}</el-button
        >
      </footer>
    </el-dialog>
  </span>
</template>

<script lang="ts">
import Vue from "vue";

import { postData } from "@/utils/fetchData";
import { allNotNull } from "@/utils/validate";

const formApi = ["construction", "achievement", "award"];

export default Vue.extend({
  data() {
    return {
      name: "",
      isVisible: false,
      isConfirming: false,
      input: ""
    };
  },
  methods: {
    nextActive() {
      new Promise(resolve => {
        resolve(this.$emit("next"));
      }).then(() => {
        if (allNotNull(this.$store.state.order.form)) {
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

      // 验证中
      this.isConfirming = true;
      // 验证工号
      new Promise((resolve, reject) =>
        state.userInfo.worknum === this.input
          ? resolve()
          : reject(`工号必须与 ${this.name} 工号相同`)
      )
        .then(() =>
          postData(
            `/api/user/${formApi[state.order.class - 1]}/add`,
            state.order.form
          )
        )
        .then(() => {
          this.$store.commit("nextActive");
          this.isVisible = false;
        })
        .catch((err: string) => {
          this.$message({
            message: err || "由于未知因素，暂时无法进行提交",
            type: "warning"
          });
        })
        .finally(() => (this.isConfirming = false));
    }
  },
  computed: {
    submitIsDisable() {
      return !this.$data.input;
    },
    submitBtnText() {
      return this.$data.isConfirming ? "请稍后..." : "我已检查，进行提交";
    }
  },
  created() {
    // 获取个人信息
    const userInfo = this.$store.state.userInfo;
    // 默认负责人是自己
    this.name = userInfo.name;
  }
});
</script>

<style lang="scss" scoped>
span.submit-btn {
  margin-inline-start: 10px;
}

ul {
  font-size: 1rem;
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

<style lang="scss">
@import "@/assets/stylesheet/base.scss";

.el-dialog {
  border-radius: 1rem;
  width: 430px;
}

.username {
  color: $main;
}
</style>
