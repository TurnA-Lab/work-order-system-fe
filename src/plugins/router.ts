/*
 * @Author: Skye Young
 * @Date: 2019-10-28 19:48:30
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-29 21:59:22
 */

import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
import UserIndex from "@/views/User/index.vue";
import UserInfo from "@/views/User/Info.vue";
import UserWorkOrder from "@/views/User/WorkOrder.vue";
import UserCollegeAdmin from "@/views/User/CollegeAdmin.vue";
import RootIndex from "@/views/Root/index.vue";
import OfficeAdminIndex from "@/views/OfficeAdmin/index.vue";
import Page404 from "@/views/404.vue";

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
        const permission = sessionStorage.getItem("wo_permission");
        if (permission === "0" || permission === "1") {
          return "/user";
        } else if (permission === "2") {
          return "/office_admin";
        } else if (permission === "3") {
          return "/root";
        } else {
          return "/login";
        }
      }
    },
    {
      path: "/user",
      name: "user",
      component: UserIndex,
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
          component: () => import("@/components/User/NewOrder/index.vue")
        }
      ]
    },
    {
      path: "/college_admin",
      name: "userCollegeAdmin",
      component: UserCollegeAdmin,
      redirect: { name: "userCollegeAdminMemberManager" },
      children: [
        {
          path: "member_manager",
          name: "userCollegeAdminMemberManager",
          component: () => import("@/components/User/CollegeAdmin/MemberManager/index.vue")
        },
        {
          path: "sheet_export",
          name: "userCollegeAdminSheetExport",
          component: () => import("@/components/User/CollegeAdmin/SheetExport.vue")
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
        },
        {
          path: "type_manager",
          name: "rootTypeManager",
          component: () => import("@/components/Root/Main/TypeManager/index.vue")
        },
        {
          path: "user_manager",
          name: "rootUserManager",
          component: () => import("@/components/Root/Main/UserManager/index.vue")
        },
        {
          path: "about",
          name: "rootAbout",
          component: () => import("@/components/Etc/UploadFile.vue")
        }
      ]
    },
    {
      path: "/office_admin",
      name: "officeAdmin",
      component: OfficeAdminIndex,
      redirect: { name: "rootHome" },
      children: [
        {
          path: "home",
          name: "rootHome",
          component: () => import("@/components/Root/Main/Index/index.vue")
        },
        {
          path: "type_manager",
          name: "rootTypeManager",
          component: () => import("@/components/Root/Main/TypeManager/index.vue")
        },
        {
          path: "user_manager",
          name: "rootUserManager",
          component: () => import("@/components/Root/Main/UserManager/index.vue")
        },
        {
          path: "about",
          name: "rootAbout",
          component: () => import("@/components/Etc/UploadFile.vue")
        }
      ]
    },
    {
      path: "*",
      name: "page404",
      component: Page404
    }
  ],

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
