import "./plugins/axios";
import "./plugins/element";

import App from "./App.vue";
import router from "./router";
import store from './store';
import Vue from "vue";

if (process.env.NODE_ENV === 'development') {
  // tslint:disable-next-line: no-var-requires
  require("./mock.js");
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
