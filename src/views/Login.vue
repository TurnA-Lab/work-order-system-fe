<template>
  <login-form></login-form>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import LoginForm from "../components/LoginForm";

export default {
  name: "home",
  components: {
    // HelloWorld
    LoginForm
  }
};
</script>
