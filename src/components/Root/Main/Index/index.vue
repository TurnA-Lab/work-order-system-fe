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
    <div class="main-body">
      <status-card
        title="信息录入入口"
        icon="pen-alt"
        fetch-api="/api/online/postOrderStatus"
        amend-api="/api/online/postOrderStatus"
      ></status-card>
      <status-card
        title="下属管理员获取入口"
        icon="clipboard-list"
        fetch-api="/api/online/fetchOrdersStatus"
        amend-api="/api/online/fetchOrdersStatus"
      ></status-card>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import "vue-awesome/icons/pen-alt";
import "vue-awesome/icons/clipboard-list";
import StatusCard from "./StatusCard.vue";

export default Vue.extend({
  components: {
    StatusCard
  },
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

  & > .main-body {
    display: flex;
  }
}
</style>