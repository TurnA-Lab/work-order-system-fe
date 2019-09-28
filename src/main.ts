import "./plugins/axios";
import "./plugins/element";
import "./mock.js";
import App from "./App.vue";
import router from "./router";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
