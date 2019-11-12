/*
 * @Author: Skye Young
 * @Date: 2019-10-28 19:48:18
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-12 20:24:33
 */

import Vue from "vue";
import router from "@/plugins/router";
import store from '@/plugins/store';
import "@/plugins/axios";
import "@/plugins/element";
import "@/plugins/easytable";
import App from "./App.vue";

// 引入 vue-awesome
Vue.component('v-icon', () => import("vue-awesome/components/Icon.vue"));

//
Vue.config.productionTip = false;

// axios 设置
declare module 'axios/' {
  interface AxiosRequestConfig {
    retry?: number;
    retryDelay?: number;
    __retryCount?: number;
  }
}

Vue.axios.defaults.retry = 1;
Vue.axios.defaults.retryDelay = 1000;

Vue.axios.interceptors.response.use(undefined, async function axiosRetryInterceptor(err) {
  const config = err.config;
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) { return Promise.reject(err); }

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }

  // Increase the retry count
  config.__retryCount += 1;

  // Create new promise to handle exponential backoff
  const backoff = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1);
  });

  // Return the promise in which recalls axios to retry the request
  await backoff;
  return Vue.axios(config);
});


new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
