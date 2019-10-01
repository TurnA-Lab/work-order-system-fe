import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import UserIndex from "./views/UserIndex.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "index",
      redirect: () => {
        if (sessionStorage.getItem("wo_permission") === "0") {
          return "/user";
        } else {
          // TODO:
          return "/about";
        }
      }
    },
    {
      path: "/user",
      name: "user",
      component: UserIndex
    },
    {
      path: "/login",
      name: "login",
      component: Login
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
