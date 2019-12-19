/*
 * @Author: Skye Young
 * @Date: 2019-10-28 19:45:47
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-19 18:22:22
 */

<template>
  <main>
    <user-menu-card class="item">
      <div class="menu-link" @click="$router.push({ name: 'userInfo'})">
        <span>账户信息</span>
      </div>
    </user-menu-card>

    <user-menu-card class="item">
      <div class="menu-link" @click="$router.push({ name: 'userWorkOrder'})">
        <span>工单系统</span>
      </div>
    </user-menu-card>

    <user-menu-card class="item">
      <div v-if="isCollegeAdmin" class="menu-link" @click="$router.push({ name: 'collegeAdmin'})">
        <span>学院管理入口</span>
      </div>
      <div v-else class="user-about">
        <span>
          Powered by
          <br />JUSTNC
        </span>
      </div>
    </user-menu-card>

    <user-menu-card class="item">
      <div class="grid">
        <el-tooltip content="夜间模式" placement="top">
          <el-button class="btn" @click="logout" circle disabled plain></el-button>
        </el-tooltip>
        <div></div>
        <div></div>
        <el-tooltip content="更换主题" placement="top">
          <el-button class="btn" @click="logout" circle disabled plain></el-button>
        </el-tooltip>
        <el-tooltip content="全屏模式" placement="bottom">
          <el-button class="btn" @click="toggleFullScreen" icon="el-icon-full-screen" circle plain></el-button>
        </el-tooltip>
        <div></div>
        <div></div>
        <el-tooltip content="退出登录" placement="bottom-start">
          <el-button class="btn" @click="logout" icon="el-icon-switch-button" circle plain></el-button>
        </el-tooltip>
      </div>
    </user-menu-card>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import UserMenuCard from "./Card.vue";

export default Vue.extend({
  components: {
    UserMenuCard
  },
  methods: {
    logout() {
      this.$store.commit("clearUserInfo");
      sessionStorage.clear();
      this.$router.replace({ name: "login" });
      this.$message({
        type: "success",
        message: "退出登录成功!"
      });
    },
    toggleFullScreen() {
      if (document.fullscreen) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  },
  computed: {
    isCollegeAdmin() {
      return (
        this.$store.state.userInfo.permission === "1" ||
        this.$store.state.userInfo.permission === 1
      );
    }
  },
  created() {
    if (
      sessionStorage.getItem("wo_permission") === "1" &&
      !localStorage.getItem("collageAdminAlertCount")
    ) {
      this.$notify({
        title: "注意",
        dangerouslyUseHTMLString: true,
        message:
          "基于功能考虑，学院管理员被合并到用户页面，当前版本可通过<span style='color: #f39c12'>第三张卡片</span>进行访问。",
        type: "warning",
        duration: 0
      });
      localStorage.setItem("collageAdminAlertCount", "1");
    }
  }
});
</script>

<style lang="scss" scoped>
@import "@/stylesheet/default.scss";

main {
  display: flex;

  height: $card-width * 1.414;

  .item {
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    @for $i from 1 to 4 {
      &:nth-of-type(#{$i + 1}) {
        z-index: $i;
        animation-delay: $i * 0.15s;
      }
    }

    &:not(:last-of-type):hover {
      transform: translateY(-1rem);

      & ~ .item {
        transform: translateX($card-width * 0.45);
      }
    }

    &:not(:first-of-type) {
      margin-left: -$card-width * 0.45;
    }

    &:hover .menu-link > span {
      color: #2c3e50;
    }
  }

  .menu-link {
    font-family: "FZCuJinLJW";
    writing-mode: vertical-rl;

    display: flex;
    align-items: center;

    width: $card-width;

    span {
      color: #95a5a6;
      font-size: 1.2rem;
      transition: color 1s;
    }
  }

  .user-about {
    height: $static-card-width * 1.414;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: initial;

    span {
      color: #d3dbe2;
      text-align: center;
    }
  }

  .grid {
    display: grid;
    justify-content: center;
    grid-template-rows: repeat(4, 25%);
    grid-template-columns: 50% 50%;
    place-items: center;

    height: $card-width * 0.8;
    width: $card-width * 0.4;
  }

  .btn {
    margin-left: 0px;
  }
}

@include screen($larger) {
  main {
    height: $static-card-width * 1.414;

    .item {
      &:not(:last-of-type):hover {
        & ~ .item {
          transform: translateX($static-card-width * 0.45);
        }
      }

      &:not(:first-of-type) {
        margin-left: -$static-card-width * 0.45;
      }
    }

    .menu-link {
      width: $static-card-width;
    }

    .grid {
      height: $static-card-width * 0.8;
      width: $static-card-width * 0.4;
    }
  }
}
</style>
