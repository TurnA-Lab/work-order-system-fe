import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
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
  if (to.name === "index") {
    if (!localStorage.getItem("_at")) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else if (to.name === "login") {
    if (localStorage.getItem("_at")) {
      next({ path: "/" });
    } else {
      next();
    }
  }
  next();
});

export default router;
