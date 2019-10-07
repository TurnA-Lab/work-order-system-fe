<template>
  <main-card>
    <template v-slot:header>
      <back-link @click="goBack"></back-link>
      <vertical-divider isTransparent="true"></vertical-divider>
      <el-button type="text" :disabled="btnIsDisabled" @click="loadOrders">我的工单</el-button>
      <vertical-divider></vertical-divider>
      <el-button type="text" :disabled="!btnIsDisabled" @click="loadNewOrder">提交工单</el-button>
    </template>
    <template v-slot:main>
      <router-view></router-view>
    </template>
  </main-card>
</template>

<script lang="ts">
import Vue from "vue";
import MainCard from "@/components/MainCard.vue";
import BackLink from "@/components/BackLink.vue";
import VerticalDivider from "@/components/VerticalDivider.vue";

export default Vue.extend({
  components: {
    MainCard,
    BackLink,
    VerticalDivider
  },
  data() {
    return {
      btnIsDisabled: true
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "index" });
    },
    loadOrders() {
      this.$router.push({ name: "userOrders" });
      if (!this.btnIsDisabled) {
        this.btnIsDisabled = !this.btnIsDisabled;
      }
    },
    loadNewOrder() {
      this.$router.push({ name: "userNewOrder" });
      if (this.btnIsDisabled) {
        this.btnIsDisabled = !this.btnIsDisabled;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
</style>