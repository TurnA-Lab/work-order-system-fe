<template>
  <span>
    <template v-for="(role, index) in roles">
      <el-tooltip
        :content="`进入${rolesObject[role]}界面`"
        placement="bottom"
        :key="index"
      >
        <el-button
          @click="turn2OtherPage(role)"
          :icon="roleIcon[role]"
          type="text"
          circle
          plain
        ></el-button>
      </el-tooltip>
    </template>
  </span>
</template>

<script lang="ts">
import Vue from "vue";

import { rolesObject } from "@/static-data/roles";
import { rolesInOrder } from "@/utils/validate";

export default Vue.extend({
  data() {
    return {
      rolesObject,
      roleIcon: {
        user: "el-icon-s-order",
        // eslint-disable-next-line @typescript-eslint/camelcase
        college_admin: "el-icon-s-management",
        // eslint-disable-next-line @typescript-eslint/camelcase
        office_admin: "el-icon-s-platform"
      },
      allRoles() {
        return rolesInOrder(
          JSON.parse(sessionStorage.getItem("wo_permission") as string)
        );
      }
    };
  },
  computed: {
    roles() {
      return this.$data.allRoles().slice(0, -1);
    },
    currentRole() {
      return this.$data.allRoles().pop();
    }
  },
  methods: {
    turn2OtherPage(role: string) {
      const label = rolesObject[role as keyof typeof rolesObject];
      const currentLabel =
        rolesObject[this.currentRole as keyof typeof rolesObject];

      this.$confirm(
        `切换到 <span style='color: var(--main)'>${label}</span> 页面后，回到 <span style='color: var(--main)'>${currentLabel}</span> 页面将要求再次登录, 是否继续?`,
        "注意",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          // 修改权限
          const permission: string[] = this.roles;
          // 删除高级权限
          permission.splice(permission.indexOf(role) + 1);
          // 设置到 sessionStorage
          sessionStorage.setItem("wo_permission", JSON.stringify(permission));
          // 切换路由
          this.$router.replace({ name: "index" });
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "切换成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消切换角色"
          });
        });
    }
  }
});
</script>
