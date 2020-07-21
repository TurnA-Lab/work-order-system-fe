<template>
  <div class="login">
    <transition
      appear
      appear-class="fade-enter"
      appear-active-class="fade-enter-active"
    >
      <login-form></login-form>
    </transition>
    <background-ani></background-ani>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import BackgroundAni from "@/components/Etc/BackgroundAni.vue";

import LoginForm from "./Form.vue";

export default Vue.extend({
  components: {
    LoginForm,
    BackgroundAni
  }
});
</script>

<style lang="scss" scoped>
.login {
  header {
    text-align: center;
    font-size: 48px;
    font-weight: 800;
    color: $main;
    margin-block-end: 0.5vw;
  }
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.8s;
}
</style>
