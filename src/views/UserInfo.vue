<template>
  <el-card class="card slide-up" :class="{fullscreen: wheel}">
    <header>
      <a class="back" type="info" @click="goBack">
        <span id="backIcon" class="el-icon-back"></span> 返回
      </a>
      <el-divider direction="vertical"></el-divider>
      <el-button
        type="text"
        @click="loadProfile"
        :disabled="this.$store.state.userInfoPage.btnIsDisabled"
      >个人资料</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button
        type="text"
        @click="loadPassword"
        :disabled="!this.$store.state.userInfoPage.btnIsDisabled"
      >修改密码</el-button>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  created() {
    window.addEventListener("wheel", event => {
      if (event.deltaY > 20) {
        this.wheel = true;
      }
      if (event.deltaY < -20) {
        this.wheel = false;
      }
    });
  },
  data() {
    return {
      wheel: false
    };
  },
  methods: {
    goBack() {
      this.$router.push({ name: "index" });
    },
    loadProfile() {
      this.$router.push({ name: "userInfoProfile" });
    },
    loadPassword() {
      this.$router.push({ name: "userInfoPassword" });
    }
  }
});
</script>

<style lang="scss" scoped>
.card {
  align-self: flex-end;

  width: 90vw;
  height: 95vh;
  border-radius: 1rem 1rem 0rem 0rem;

  opacity: 0;
}

.slide-up {
  animation: slide-up 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}

@keyframes slide-up {
  0% {
    opacity: 1;
    transform: translateY(20vw);
  }

  100% {
    opacity: 1;
    transform: translateY(0vw);
  }
}

.fullscreen {
  width: 100vw;
  height: 100vh;
  border-radius: 0%;
}

.back {
  color: #95a5a6;

  cursor: pointer;
  user-select: none;
  margin-inline-start: 12px;

  &:hover > span {
    animation: arrow-move 0.8s;
  }
}

@keyframes arrow-move {
  0%,
  50%,
  100% {
    transform: translateX(0px);
  }

  25%,
  75% {
    transform: translateX(-0.8vw);
  }
}
</style>