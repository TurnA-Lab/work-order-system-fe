/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:47:05 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-19 17:34:00
 */

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
          <el-button class="tooltipBtn" slot="reference" icon="el-icon-question" type="text" circle></el-button>
        </el-popover>
      </h2>
    </header>
    <div class="body" :class="{off: isOff}">
      <div class="off-info">当前无法提交工单</div>
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

import process1 from "@/components/User/NewOrder/Process/1.vue";
import process2 from "@/components/User/NewOrder/Process/2.vue";
import process3 from "@/components/User/NewOrder/Process/3.vue";

export default Vue.extend({
  components: {
    process1,
    process2,
    process3
  },
  data() {
    return {
      isOff: true,
      isLoading: true,
      getStatus: () => {
        this.$http
          .post(
            "/api/online/user/getEntrancePermission",
            {},
            {
              headers: {
                token: this.$store.state.userInfo.token
              }
            }
          )
          .then((res: AxiosResponse) => {
            this.$data.isLoading = false;
            this.$data.isOff = !(res.data.code === 0);
          })
          .catch(() => {
            this.$data.isOff = true;
            this.$data.isLoading = false;
            setTimeout(() => {
              this.$message({
                message: `由于未知因素，无法获取工单提交入口状态`,
                type: "warning"
              });
            }, Math.random());
          });
      }
    };
  },
  computed: {
    process() {
      return "process" + this.$store.state.order.active;
    }
  },
  mounted() {
    this.getStatus();
  },
  destroyed() {
    this.$store.commit("clearOrder");
  }
});
</script>

<style lang="scss" scoped>
@import "@/stylesheet/default.scss";

.off {
  & > aside,
  & > main {
    filter: blur(10px);
  }

  &::before {
    cursor: not-allowed !important;
    pointer-events: auto !important;
  }

  & > .off-info {
    opacity: 1 !important;
    filter: blur(0px) !important;
  }
}

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
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      pointer-events: none;
    }

    & > .off-info {
      position: absolute;
      opacity: 0;
      text-align: center;
      width: 86vw;
      z-index: 999;
      pointer-events: none;

      line-height: 70vh;
      font-size: 2.4vw;
      font-family: "FZCuJinLJW";
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
</style>