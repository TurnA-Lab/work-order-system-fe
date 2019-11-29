/*
 * @Author: Skye Young 
 * @Date: 2019-10-30 20:30:04 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-01 20:10:19
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
  </main>
</template>

<script lang="ts">
import Vue from "vue";

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
main {
  // display: grid;
  .user-info {
    width: 100%;
    height: 10vh;

    h1 {
      margin: unset;
      font-size: 2rem;
      span {
        font-size: 1.6rem;
      }
    }

    h6 {
      margin: unset;
      margin-block-start: 0.4vh;
      font-size: 0.8rem;
      font-weight: 200;
    }
  }

  & > .main-body {
    display: flex;
  }
}
</style>