import Vue from "vue";
import Router from "vue-router";

import { Roles } from "@/static-data/login";
import Page404 from "@/views/404.vue";

import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login/index.vue"),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/",
      name: "index",
      redirect: () => {
        const permission = sessionStorage.getItem("wo_permission");
        if (
          permission === Roles.user.toString() ||
          permission === Roles.college_admin.toString()
        ) {
          return "/user";
        } else if (permission === Roles.office_admin.toString()) {
          return "/office_admin";
        } else if (permission === Roles.root.toString()) {
          return "/root";
        } else {
          return "/login";
        }
      }
    },
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/User/Home/index.vue"),
      meta: {
        title: "主页"
      }
    },
    {
      path: "/user/info",
      name: "userInfo",
      component: () => import("@/views/User/Info/index.vue"),
      redirect: { name: "userInfoProfile" },
      children: [
        {
          path: "profile",
          name: "userInfoProfile",
          component: () => import("@/views/User/Info/Profile.vue"),
          meta: {
            title: "个人资料"
          }
        },
        {
          path: "password",
          name: "userInfoPassword",
          component: () => import("@/views/User/Info/Password.vue"),
          meta: {
            title: "修改密码"
          }
        }
      ]
    },
    {
      path: "/user/work_order",
      name: "userWorkOrder",
      component: () => import("@/views/User/WorkOrder/index.vue"),
      redirect: { name: "userOrders" },
      children: [
        {
          path: "orders",
          name: "userOrders",
          component: () => import("@/views/User/WorkOrder/Orders/index.vue"),
          meta: {
            title: "我的工单"
          }
        },
        {
          path: "new_order",
          name: "userNewOrder",
          component: () => import("@/views/User/WorkOrder/NewOrder/index.vue"),
          meta: {
            title: "创建工单"
          }
        }
      ]
    },
    {
      path: "/college_admin",
      name: "collegeAdmin",
      component: () => import("@/views/User/CollegeAdmin/index.vue"),
      redirect: { name: "collegeAdminMemberManager" },
      children: [
        {
          path: "member_manager",
          name: "collegeAdminMemberManager",
          component: () =>
            import("@/views/User/CollegeAdmin/MemberManager.vue"),
          meta: {
            title: "部门成员管理"
          }
        },
        {
          path: "export_sheet",
          name: "collegeAdminExportSheet",
          component: () => import("@/views/User/CollegeAdmin/ExportSheet.vue"),
          meta: {
            title: "确认表导出"
          }
        }
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
          component: () => import("@/views/OfficeAdmin/Main/Home.vue"),
          meta: {
            title: "主页"
          }
        },
        {
          path: "work_order_manager",
          name: "officeAdminWorkOrderManager",
          component: () =>
            import("@/views/OfficeAdmin/Main/WorkOrderManager/index.vue"),
          meta: {
            title: "工单管理"
          }
        },
        {
          path: "import_sheet",
          name: "officeAdminImportSheet",
          component: () => import("@/views/OfficeAdmin/Main/ImportSheet.vue"),
          meta: {
            title: "奖励 / 业绩分表格录入"
          }
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
          component: () => import("@/views/Root/Main/Home.vue"),
          meta: {
            title: "主页"
          }
        },
        {
          path: "type_manager",
          name: "rootTypeManager",
          component: () => import("@/views/Root/Main/TypeManager.vue"),
          meta: {
            title: "类型 / 级别管理"
          }
        },
        {
          path: "bonus_manager",
          name: "rootBonusManager",
          component: () => import("@/views/Root/Main/BonusManager/index.vue"),
          meta: {
            title: "奖励管理"
          }
        },
        {
          path: "performance_manager",
          name: "rootPerformanceManager",
          component: () =>
            import("@/views/Root/Main/PerformanceManager/index.vue"),
          meta: {
            title: "业绩分管理"
          }
        },
        {
          path: "user_manager",
          name: "rootUserManager",
          component: () => import("@/views/Root/Main/UserManager/index.vue"),
          meta: {
            title: "用户管理"
          }
        }
      ]
    },

    {
      path: "*",
      name: "page404",
      component: Page404,
      meta: {
        title: "404"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 获取权限
  const permission = sessionStorage.getItem("wo_permission");
  const toName = to.name as string;
  const metaTitle = to.meta.title as string;

  // 设置选项卡显示标题
  document.title =
    (metaTitle ? metaTitle + " - " : "") + store.getters.siteName;

  if (toName === "login") {
    if (typeof permission === "string") {
      next({ name: "index" });
    } else {
      next();
    }
  } else {
    // 如果有权限
    if (typeof permission === "string") {
      // 如果权限匹配
      if (
        (toName.indexOf("collegeAdmin") !== -1 &&
          permission !== Roles.college_admin.toString()) ||
        (toName.indexOf("officeAdmin") !== -1 &&
          permission !== Roles.office_admin.toString()) ||
        (toName.indexOf("root") !== -1 && permission !== Roles.root.toString())
      ) {
        next({ name: "index" });
      } else {
        next();
      }
    } else {
      next({ name: "login" });
    }
  }
});

router.afterEach((to, from) => {
  // 动态标题
  const title = document.title; // 记录下当前的网页的标题
  let timer: any; // 计时器
  let count = 0; // 计数
  const dot = ["", ".", "..", "..."];

  document.addEventListener("visibilitychange", () => {
    // 清除可能存在的计时器
    if (timer !== null || timer !== undefined) {
      clearInterval(timer);
    }

    // 如果在浏览本网站
    if (document.visibilityState === "visible") {
      document.title = title !== document.title ? title : document.title;
    } else {
      timer = setInterval(() => {
        document.title = "等待操作中" + dot[count];
        count = count === 3 ? 0 : count++;
      }, 100);
    }
  });
});

export default router;
