<template>
  <div class="flex-box" v-loading="isLoading">
    <header>
      <h2>
        创建工单
        <el-popover
          placement="bottom-start"
          width="400"
          trigger="hover"
          content="在成功提交工单前，所有步骤都不会被系统保存下来，所以请确保操作时网络状况良好。"
        >
          <el-button
            class="tooltipBtn"
            slot="reference"
            icon="el-icon-question"
            type="text"
            circle
          ></el-button>
        </el-popover>
      </h2>
    </header>
    <div class="body" :class="{ off: isOff }">
      <aside>
        <el-steps direction="vertical" :active="$store.state.order.active">
          <el-step title="选择类别"></el-step>
          <el-step title="填写工单"></el-step>
          <el-step title="确认工单"></el-step>
        </el-steps>
      </aside>
      <main>
        <keep-alive>
          <component :is="process"></component>
        </keep-alive>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";

import Process1 from "./Process1.vue";
import Process2 from "./Process2/index.vue";
import Process3 from "./Process3.vue";

export default Vue.extend({
  components: {
    Process1,
    Process2,
    Process3,
  },
  data() {
    return {
      isOff: true,
      isLoading: true,
    };
  },
  methods: {
    getStatus() {
      this.$http
        .post(
          "/api/online/user/getEntrancePermission",
          {},
          {
            headers: {
              token: this.$store.state.userInfo.token,
            },
          }
        )
        .then((res: AxiosResponse) => {
          this.$data.isLoading = false;
          this.$data.isOff = !res.data.data[Object.keys(res.data.data)[0]];
        })
        .catch(() => {
          this.isOff = true;
          this.isLoading = true;
          // 随机延时，以减少消息弹窗类型的错误
          setTimeout(() => {
            this.$message({
              message: `由于未知因素，无法获取工单提交入口状态`,
              type: "warning",
            });
          }, Math.random());
        });
    },
  },
  computed: {
    process() {
      return "Process" + this.$store.state.order.active;
    },
  },
  mounted() {
    this.getStatus();
  },
  destroyed() {
    this.$store.commit("clearOrder");
  },
});
</script>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  flex-direction: column;

  & > header,
  & > .body {
    margin-left: 15px;
  }

  & > header {
    .tooltipBtn {
      padding: 0%;
    }
  }

  & > .body {
    display: flex;
    pointer-events: all;

    &::before {
      content: "当前无法提交工单。";

      position: absolute;
      width: 100%;
      height: 100%;
      margin-inline-start: -2.9%;
      color: #95a5a6;
      font-size: 2.4vw;
      font-family: "FZCuJinLJW";
      text-align: center;
      line-height: 50vh;

      z-index: 999;
      opacity: 0;
      pointer-events: none;
    }

    & > aside {
      flex-basis: 7vw;
      height: 70vh;
      width: 10vw;
      min-width: 100px;
    }

    & > main {
      flex-grow: 1;
      padding: 0vw 3vw;
      height: 70vh;
    }
  }
}

.off {
  cursor: not-allowed;

  & > aside,
  & > main {
    filter: blur(10px);
  }

  &::before {
    opacity: 1 !important;
    pointer-events: auto !important;
  }
}
</style>
