/*
 * @Author: Skye Young
 * @Date: 2019-10-28 19:48:30
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-30 19:21:52
 */

import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login.vue";
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
      component: () => import("@/views/User/index.vue"),
    },
    {
      path: "/user/info",
      name: "userInfo",
      component: () => import("@/views/User/Info.vue"),
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
      component: () => import("@/views/User/WorkOrder.vue"),
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
      name: "collegeAdmin",
      component: () => import("@/views/User/CollegeAdmin.vue"),
      redirect: { name: "collegeAdminMemberManager" },
      children: [
        {
          path: "member_manager",
          name: "collegeAdminMemberManager",
          component: () => import("@/components/User/CollegeAdmin/MemberManager/index.vue")
        },
        {
          path: "sheet_export",
          name: "collegeAdminSheetExport",
          component: () => import("@/components/User/CollegeAdmin/SheetExport.vue")
        }
      ]
    },
    {
      path: "/root",
      name: "root",
      component: () => import("@/views/Root/index.vue"),
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
      ]
    },
    {
      path: "/office_admin",
      name: "officeAdmin",
      component: () => import("@/views/OfficeAdmin/index.vue"),
      redirect: { name: "officeAdminHome" },
      children: [
        {
          path: "home",
          name: "officeAdminHome",
          component: () => import("@/components/OfficeAdmin/Main/Index/index.vue")
        },
        {
          path: "work_order_manager",
          name: "officeAdminWorkOrderManager",
          component: () => import("@/components/OfficeAdmin/Main/WorkOrderManager/index.vue")
        },
        {
          path: "digitize_sheet",
          name: "officeAdminDigitizeSheet",
          component: () => import("@/components/OfficeAdmin/Main/DigitizeSheet/index.vue")
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
  const permission = sessionStorage.getItem("wo_permission");

  if (to.name === "login") {
    if (typeof permission === "string") {
      next({ name: "index" });
    } else {
      next();
    }
  } else {
    if (typeof permission === "string") {
      const toName = to.name as string;

      if ((/^collegeAdmin{1}/.test(toName) && permission !== "1") ||
        (/^officeAdmin{1}/.test(toName) && permission !== "2") ||
        (/^root{1}/.test(toName) && permission !== "3")
      ) {
        next({ name: "index" });
      } else {
        next();
      }
    }
  }

});

// 修复路由重复点击同一个报错的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location: string) {
  return (originalPush.call(this, location) as any).catch((err: string) => err);
};

export default router;
