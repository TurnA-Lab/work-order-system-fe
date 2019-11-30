/*
 * @Author: Skye Young 
 * @Date: 2019-10-30 20:30:04 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-30 16:56:59
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
        fetch-api="/api/online/user/getEntrancePermission"
        amend-api="/api/online/root/manageUserEntrance"
      ></status-card>
      <status-card
        title="下属管理员获取入口"
        icon="clipboard-list"
        fetch-api="/api/online/collegeAdmin/getAdminEnterPermission"
        amend-api="/api/online/root/manageAdminEntrance"
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
  .user-info {
    width: 100%;

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