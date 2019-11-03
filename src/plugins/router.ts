/*
 * @Author: Skye Young
 * @Date: 2019-10-28 19:48:30
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-10-30 16:13:47
 */

import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import UserIndex from "@/views/User/index.vue";
import UserInfo from "@/views/User/Info.vue";
import UserWorkOrder from "@/views/User/WorkOrder.vue";
import RootIndex from "@/views/Root/index.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "index",
      redirect: () => {
        if (sessionStorage.getItem("wo_permission") === "0") {
          return "/user";
        } else if (sessionStorage.getItem("wo_permission") === "1") {
          return "/root";
        } else {
          return "/login";
        }
      }
    },
    {
      path: "/user",
      name: "user",
      component: UserIndex
    },
    {
      path: "/user/info",
      name: "userInfo",
      component: UserInfo,
      redirect: { name: "userInfoProfile" },
      children: [
        {
          path: "profile",
          name: "userInfoProfile",
          component: () => import("@/components/User/Info/Profile.vue")
        },
        {
          path: "password",
          name: "userInfoPassword",
          component: () => import("@/components/User/Info/Password.vue")
        }
      ]
    },
    {
      path: "/user/work_order",
      name: "userWorkOrder",
      component: UserWorkOrder,
      redirect: { name: "userOrders" },
      children: [
        {
          path: "orders",
          name: "userOrders",
          component: () => import("@/components/User/Orders/index.vue")
        },
        {
          path: "new_order",
          name: "userNewOrder",
          component: () => import("@/components/User/NewOrder/index.vue"),
        }
      ]
    },
    {
      path: "/root",
      name: "root",
      component: RootIndex,
      redirect: { name: "rootHome" },
      children: [
        {
          path: "home",
          name: "rootHome",
          component: () => import("@/components/Root/Main/Index/index.vue")
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name === "login") {
    if (sessionStorage.getItem("wo_permission")) {
      next({ name: "index" });
    } else {
      next();
    }
  } else {
    if (!sessionStorage.getItem("wo_permission")) {
      next({ name: "login" });
    }
    next();
  }
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location: string) {
  return (originalPush.call(this, location) as any).catch((err: string) => err);
};

export default router;
