/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:45:47 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-26 21:32:56
 */

<template>
  <main>
    <user-menu-card class="item">
      <template v-slot:header>
        <el-button type="text">
          <router-link :to="{name: 'userInfoProfile'}">账户信息</router-link>
        </el-button>
      </template>
    </user-menu-card>

    <user-menu-card class="item">
      <template v-slot:header>
        <el-button type="text">
          <router-link :to="{name: 'userWorkOrder'}">工单系统</router-link>
        </el-button>
      </template>
    </user-menu-card>

    <user-menu-card class="item">
      <div v-if="isCollegeAdmin">
        <router-link :to="{name: 'userCollegeAdmin'}">学院管理入口</router-link>
      </div>
      <div v-else>
        <span>Powered by JUSTNC</span>
      </div>
    </user-menu-card>

    <user-menu-card class="item flex-box">
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
      return this.$store.state.userInfo.permission === 1;
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
  }

  .flex-box {
    display: flex;
    justify-content: center;
    align-items: center;
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

    .grid {
      height: $static-card-width * 0.8;
      width: $static-card-width * 0.4;
    }
  }
}
</style>