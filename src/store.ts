import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    userInfo: {},
    userInfoPage: {
      btnIsDisabled: true,
    }
  },
  mutations: {
    updateUserInfo(state, newUserInfo: object) {
      state.userInfo = Object.assign({}, newUserInfo);
    },
    clearUserInfo(state) {
      state.userInfo = {};
    },
    toggleUserInfoBtn(state) {
      state.userInfoPage.btnIsDisabled = !state.userInfoPage.btnIsDisabled;
    }
  },
  actions: {
  }
});
