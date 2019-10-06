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
          <router-link :to="{name: 'userWO'}">工单系统</router-link>
        </el-button>
      </template>
    </user-menu-card>
    <user-menu-card class="item"></user-menu-card>
    <user-menu-card class="item flex-box">
      <template v-slot:main>
        <div class="grid">
          <el-tooltip content="夜间模式" placement="top">
            <el-button class="btn" @click="logout" circle disabled plain></el-button>
          </el-tooltip>
          <div></div>
          <div></div>
          <!-- <el-button class="btn" circle disabled></el-button>
          <el-button class="btn" style="pointer-events: none;" circle disabled></el-button>-->
          <el-tooltip content="更换主题" placement="top">
            <el-button class="btn" @click="logout" circle disabled plain></el-button>
          </el-tooltip>
          <el-tooltip content="全屏模式" placement="bottom">
            <el-button
              class="btn"
              @click="toggleFullScreen"
              icon="el-icon-full-screen"
              circle
              plain
            >
              <!-- <div class="icon fullscreen"></div> -->
            </el-button>
          </el-tooltip>
          <div></div>
          <!-- <el-button class="btn" style="pointer-events: none;" circle disabled></el-button>
          <el-button class="btn" style="pointer-events: none;" circle disabled></el-button>-->
          <div></div>
          <el-tooltip content="退出登录" placement="bottom-start">
            <el-button class="btn" @click="logout" icon="el-icon-switch-button" circle plain></el-button>
          </el-tooltip>
        </div>
      </template>
    </user-menu-card>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import UserMenuCard from "@/components/UserMenuCard.vue";

export default Vue.extend({
  components: {
    UserMenuCard
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.commit("clearUserInfo");
      sessionStorage.clear();
      this.$router.replace({ name: "login" });
    },
    toggleFullScreen() {
      if (document.fullscreen) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
main {
  display: flex;

  height: 430px;
  padding-left: 16em;

  .item {
    // opacity: 0;
    transition: all 0.3s;

    @for $i from 0 to 4 {
      &:nth-of-type(#{$i + 1}) {
        z-index: $i;
        animation-delay: $i * 0.1s;
      }
    }

    &:not(:last-of-type):hover {
      transform: translateY(-1rem);

      & ~ .item {
        transform: translateX(430px * 0.7 * 0.45);
      }
    }

    &:not(:first-of-type) {
      margin-left: -430px * 0.7 * 0.45;
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

    height: 430px * 0.7 * 0.8;
    width: 430px * 0.7 * 0.4;
  }

  .btn {
    margin-left: 0px;
  }
}
</style>