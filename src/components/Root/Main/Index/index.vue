/*
 * @Author: Skye Young 
 * @Date: 2019-10-30 20:30:04 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-10-30 22:24:15
 */

<template>
  <main>
    <div class="user-info">
      <h1>
        你好，
        <span>{{name}}！</span>
      </h1>
      <h6>欢迎您回到江苏科技大学工单系统后台。</h6>
    </div>
    <el-card class="status-card">
      <figure class="status-icon">
        <v-icon name="pen-alt" scale="2"></v-icon>
      </figure>
    </el-card>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import "vue-awesome/icons/pen-alt";

export default Vue.extend({
  data() {
    const userInfo = this.$store.state.userInfo;
    return {
      name: userInfo.name
    };
  }
});
</script>

<style lang="scss" scoped>
@import "@/stylesheet/default.scss";

main {
  flex-grow: 1;
  padding: 0.5vw 1vw;
  user-select: none;

  // display: grid;

  .user-info {
    width: 100%;
    height: 10vh;

    h1 {
      margin: unset;
      font-size: 2vw;
      span {
        font-size: 1.6vw;
      }
    }

    h6 {
      margin: unset;
      margin-block-start: 0.4vh;
      font-size: 0.9vw;
      font-weight: 200;
    }
  }

  .status-card {
    width: 16vw;
    display: flex;
    justify-content: center;

    .status-icon {
      width: 8vw;
      height: 8vw;
      border-radius: 50%;
      background-color: rgb(53, 73, 94);
      color: $main;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>