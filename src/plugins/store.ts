/*
 * @Author: Skye Young
 * @Date: 2019-10-28 19:48:38
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-17 22:07:13
 */

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
    },
    rootPages: {
      editUserIsVisible: false
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
    },
    toggleEditUser(state, isVisible: boolean) {
      if (typeof (isVisible) === "undefined") {
        state.rootPages.editUserIsVisible = !state.rootPages.editUserIsVisible;
      } else {
        state.rootPages.editUserIsVisible = isVisible;
      }
    }
  },
  actions: {
  }
});
