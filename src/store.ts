import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    userInfo: {},
    order: {
      active: 1,
      class: 0
    }
  },
  mutations: {
    updateUserInfo(state, newUserInfo: object) {
      state.userInfo = Object.assign({}, newUserInfo);
    },
    clearUserInfo(state) {
      state.userInfo = {};
    },
    repealActive(state) {
      state.order.active--;
    },
    orderClass(state, num: number) {
      state.order.class = num;
      state.order.active = 2;
    },
    clearOrder(state) {
      state.order = Object.assign({}, {
        active: 1,
        class: 0
      });
    }
  },
  actions: {
  }
});
