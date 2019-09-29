import "./plugins/axios.js";
import "./plugins/element";
import "./plugins/trend.js";
import "./mock.js";
import App from "./App.vue";
import router from "./router";
import Vue from "vue";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
