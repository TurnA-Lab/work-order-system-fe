<template>
  <div class="login">
    <transition appear appear-class="fade-enter" appear-active-class="fade-enter-active">
      <header>JUST WO</header>
    </transition>
    <login-form></login-form>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginForm from "@/components/Login/Form";
import Vue from "vue";

export default Vue.extend({
  name: "login",
  components: {
    LoginForm
  }
});
</script>

<style lang="scss" scoped>
@import "@/stylesheet/default.scss";

.login {
  header {
    text-align: center;
    font-size: 48px;
    font-weight: 800;
    color: $main;
    margin-block-end: 1vw;

    user-select: none;
  }
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.8s;
}
</style>
