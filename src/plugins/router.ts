import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login/index.vue";
import Page404 from "@/views/404.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "登录"
      }
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
      component: () => import("@/views/User/Home/index.vue"),
      meta: {
        title: "首页"
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
            import("@/views/User/CollegeAdmin/MemberManager/index.vue"),
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
      path: "/root",
      name: "root",
      component: () => import("@/views/Root/index.vue"),
      redirect: { name: "rootHome" },
      children: [
        {
          path: "home",
          name: "rootHome",
          component: () => import("@/views/Root/Main/Index/index.vue"),
          meta: {
            title: "首页"
          }
        },
        {
          path: "type_manager",
          name: "rootTypeManager",
          component: () => import("@/views/Root/Main/TypeManager/index.vue"),
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
      path: "/office_admin",
      name: "officeAdmin",
      component: () => import("@/views/OfficeAdmin/index.vue"),
      redirect: { name: "officeAdminHome" },
      children: [
        {
          path: "home",
          name: "officeAdminHome",
          component: () => import("@/views/OfficeAdmin/Main/Index/index.vue"),
          meta: {
            title: "首页"
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
          component: () =>
            import("@/views/OfficeAdmin/Main/ImportSheet/index.vue"),
          meta: {
            title: "奖励 / 业绩分表格录入"
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
  const permission = sessionStorage.getItem("wo_permission");

  // 设置选项卡显示标题
  document.title = to.meta.title ? to.meta.title + " - JUST WO" : "JUST WO";

  if (to.name === "login") {
    if (typeof permission === "string") {
      next({ name: "index" });
    } else {
      next();
    }
  } else {
    if (typeof permission === "string") {
      const toName = to.name as string;

      if (
        (/^collegeAdmin{1}/.test(toName) && permission !== "1") ||
        (/^officeAdmin{1}/.test(toName) && permission !== "2") ||
        (/^root{1}/.test(toName) && permission !== "3")
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
  const title = document.title;
  let timer: any;
  let count = 0;
  const dot = ["", ".", "..", "..."];

  document.addEventListener("visibilitychange", () => {
    if (timer !== null || timer !== undefined) {
      clearInterval(timer);
    }

    if (document.visibilityState === "visible") {
      if (title !== document.title) {
        document.title = title;
      }
    } else {
      timer = setInterval(() => {
        document.title = "等待操作中" + dot[count++];
        if (count === 4) {
          count = 0;
        }
      }, 100);
    }
  });
});

// 修复路由重复点击同一个报错的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location: string) {
  return (originalPush.call(this, location) as any).catch((err: string) => err);
};

export default router;
