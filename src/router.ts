import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import UserIndex from "./views/UserIndex.vue";
import UserInfo from "./views/UserInfo.vue";
import UserWorkOrder from "./views/UserWorkOrder.vue";

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
          // TODO:
          return "/about";
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
          component: () => import("./components/UserInfoProfile.vue")
        },
        {
          path: "password",
          name: "userInfoPassword",
          component: () => import("./components/UserInfoPassword.vue")
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
          component: () => import("./components/UserOrders.vue")
        },
        {
          path: "new_order",
          name: "userNewOrder",
          component: () => import("./components/UserNewOrder.vue"),
          // redirect: { name: "userNewOrderProcess1" },
          // children: [
          //   {
          //     path: "process/1",
          //     name: "userNewOrderProcess1",
          //     component: () => import("./components/UserNewOrderProcess1.vue")
          //   }
          // ]
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
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

export default router;
