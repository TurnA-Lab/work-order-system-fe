<template>
  <div class="login">
    <header>JUST WO</header>
    <login-form />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import LoginForm from "@/components/LoginForm";

export default {
  name: "home",
  components: {
    // HelloWorld
    LoginForm
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: #f8f9fa;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0%;

  header {
    text-align: center;
    font-size: 3vw;
    font-weight: 800;
    color: teal;
    margin-block-end: 1vw;

    user-select: none;
  }
}
</style>
