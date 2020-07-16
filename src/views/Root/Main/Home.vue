<template>
  <main>
    <div class="user-info">
      <h1>
        您好，
        <span>{{ name }}！</span>
      </h1>
      <h6>欢迎回到江苏科技大学工单系统后台。</h6>
    </div>
    <div class="main-body">
      <status-card
        title="用户信息录入入口"
        icon="pen-alt"
        fetch-api="/api/common/entrance/getUserEntrancePermission"
        amend-api="/api/common/entrance/manageUser"
      ></status-card>
      <status-card
        title="管理员获取入口"
        icon="clipboard-list"
        fetch-api="/api/common/entrance/getAdminEntrancePermission"
        amend-api="/api/common/entrance/manageAdmin"
      ></status-card>
    </div>
  </main>
</template>

<script lang="ts">
import "vue-awesome/icons/pen-alt";
import "vue-awesome/icons/clipboard-list";

import Vue from "vue";

import StatusCard from "@/components/Root/StatusCard.vue";

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
    margin-block-start: 20px;
    margin-inline-start: -2px;
  }
}
</style>
