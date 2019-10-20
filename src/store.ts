import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    userInfo: {},
    order: {
      active: 1,
      class: 0,
      form: {}
    }
  },
  mutations: {
    updateUserInfo(state, newUserInfo: object) {
      state.userInfo = Object.assign({}, newUserInfo);
    },
    clearUserInfo(state) {
      state.userInfo = {};
    },
    nextActive(state) {
      state.order.active++;
    },
    repealActive(state) {
      state.order.active--;
    },
    orderClass(state, num: number) {
      state.order.class = num;
      state.order.active = 2;
    },
    orderForm(state, ...forms) {
      state.order.form = Object.assign({}, state.order.form, ...forms);
    },
    clearOrder(state) {
      state.order = Object.assign({}, {
        active: 1,
        class: 0,
        form: {}
      });
    }
  },
  actions: {
  }
});
