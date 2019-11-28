/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:47:31 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-28 21:26:24
 */

<template>
  <main class="user">
    <user-card />
    <user-menu />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import UserCard from "@/components/User/Menu/UserCard.vue";
import UserMenu from "@/components/User/Menu/index.vue";

export default Vue.extend({
  name: "userIndex",
  components: {
    UserCard,
    UserMenu
  },
  created() {
    // if (!localStorage.getItem("collageAdminAlertCount")) {
    this.$notify({
      title: "注意",
      dangerouslyUseHTMLString: true,
      message:
        "基于功能考虑，学院管理员被合并到用户页面，当前版本可通过<span style='color: #f39c12'>第三张卡片</span>进行访问。",
      type: "warning",
      duration: 6000
    });
    localStorage.setItem("collageAdminAlertCount", "1");
    // }
  }
});
</script>

<style lang="scss" scoped>
@import "@/stylesheet/default.scss";

.user {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 90vh;
  width: 85vw;
}

@include screen($larger) {
  .user {
    width: $static-card-width * 4;
  }
}
</style>