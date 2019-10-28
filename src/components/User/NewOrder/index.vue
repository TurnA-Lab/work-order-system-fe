/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:47:05 
 * @Last Modified by:   Skye Young 
 * @Last Modified time: 2019-10-28 19:47:05 
 */

<template>
  <div class="flex-box">
    <header>
      <h2>
        提交工单
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
    <div class="body">
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
import process1 from "@/components/User/NewOrder/Process/1.vue";
import process2 from "@/components/User/NewOrder/Process/2.vue";
import process3 from "@/components/User/NewOrder/Process/3.vue";

export default Vue.extend({
  components: {
    process1,
    process2,
    process3
  },
  destroyed() {
    this.$store.commit("clearOrder");
  },
  data() {
    return {};
  },
  computed: {
    process() {
      return "process" + this.$store.state.order.active;
    }
  }
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

    & > aside {
      flex-basis: 7vw;
      height: 70vh;
    }

    & > main {
      flex-grow: 1;
      padding: 0vw 3vw;
      height: 70vh;
    }
  }
}
</style>