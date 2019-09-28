import "./plugins/axios";
import "./plugins/element";
import "./mock.js";
import App from "./App.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import router from './router'
// import VueRouter from ""

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
