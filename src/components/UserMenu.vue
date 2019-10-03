<template>
  <main>
    <user-menu-card class="item">
      <template v-slot:header>
        <el-button type="text">
          <router-link to="/user/info">账户信息</router-link>
        </el-button>
      </template>
      <template v-slot:main>
        <router-view></router-view>
      </template>
    </user-menu-card>
    <user-menu-card class="item"></user-menu-card>
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
  padding: 0rem 8rem;

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

  // .icon {
  //   display: block;
  //   margin: 0%;
  //   padding: 0%;
  //   height: 20px;
  //   width: 20px;
  //   background-repeat: no-repeat;
  //   background-position: center center;
  // }

  // .no-fullscreen {
  //   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E %3Cpath fill='cccccc' d='M436 192H312c-13.3 0-24-10.7-24-24V44c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24V44c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300V344c0-13.3-10.7-24-24-24H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12H312c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z'%3E%3C/path%3E %3C/svg%3E");
  // }

  // .fullscreen {
  //   background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E %3Cpath fill='cccccc' d='M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z'%3E%3C/path%3E %3C/svg%3E");
  // }
}
</style>