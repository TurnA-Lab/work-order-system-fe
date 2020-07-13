import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    userInfo: {
      token: null,
      permission: null,
    },
    order: {
      active: 1,
      class: 0,
      form: {},
    },
  },
  getters: {
    permission: (state) => state.userInfo.permission,
    siteName: () => "JUST WO",
    siteShortName: () => "J.",
  },
  mutations: {
    updateUserInfo(state, newUserInfo: object) {
      state.userInfo = Object.assign(state.userInfo, newUserInfo);
    },
    clearUserInfo(state) {
      state.userInfo = { token: null, permission: null };
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
      state.order = Object.assign(
        {},
        {
          active: 1,
          class: 0,
          form: {},
        }
      );
    },
  },
  actions: {},
});
