import Vue from "vue";
import Vuex from "vuex";
import {
  Department,
  Level,
  Kind,
  Prize,
  Achievement
} from "@/interface/list-data";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    userInfo: {
      token: "",
      permission: [] as string[]
    },
    order: {
      active: 1,
      class: 0,
      form: {}
    },
    option: {
      construction: [] as Kind[],
      achievement: [] as Kind[],
      award: [] as Kind[],
      department: [] as Department[],
      level: [] as Level[],
      prize: [] as Prize[]
    }
  },
  getters: {
    siteName: state => (isShort: boolean = false) => {
      return isShort ? "J." : "JUST WO";
    },
    token: state => state.userInfo.token,
    permission: state => state.userInfo.permission,
    construction: state => state.option.construction,
    achievement: state => state.option.achievement,
    award: state => state.option.award,
    department: state => state.option.department,
    level: state => state.option.level,
    prize: state => state.option.prize
  },
  mutations: {
    updateUserInfo(state, newUserInfo: object) {
      state.userInfo = Object.assign(state.userInfo, newUserInfo);
    },
    clearUserInfo(state) {
      state.userInfo = { token: "", permission: [] };
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
      state.order = {
        active: 1,
        class: 0,
        form: {}
      };
    },
    setOption(
      state,
      option: {
        name:
          | "construction"
          | "achievement"
          | "award"
          | "department"
          | "level"
          | "prize";
        data: any;
      }
    ) {
      return (state.option[option.name] = option.data);
    }
  },
  actions: {}
});
