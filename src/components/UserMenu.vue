<template>
  <main>
    <user-menu-option class="item" title="个人信息"></user-menu-option>
    <user-menu-option class="item" title="工单系统"></user-menu-option>
    <user-menu-option class="item" title="关于"></user-menu-option>
    <user-menu-option class="item" title="功能"></user-menu-option>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import UserMenuOption from "@/components/UserMenuOption.vue";

export default Vue.extend({
  components: {
    UserMenuOption
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.replace({ name: "login" });
    }
  }
});
</script>

<style lang="scss" scoped>
main {
  display: flex;

  height: 430px;
  padding: 0rem 8rem;

  .item {
    transition: all 0.3s;

    &:not(:last-of-type):hover {
      transform: translateY(-1rem);

      & ~ .item {
        transform: translateX(430px * 0.7 * 0.45);
      }
    }

    &:not(:first-of-type) {
      margin-left: -430px * 0.7 * 0.45;
    }
  }
}
</style>