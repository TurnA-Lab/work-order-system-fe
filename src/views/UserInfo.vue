<template>
  <el-card class="card slide-up">
    <header>
      <a class="back" type="info" @click="goBack">
        <span id="backIcon" class="el-icon-back"></span> 返回
      </a>
      <el-divider direction="vertical"></el-divider>
      <el-button
        type="text"
        @click="loadProfile"
        :disabled="this.$store.state.userInfoPage.profileBtnIsDisabled"
      >个人资料</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button
        type="text"
        @click="loadPassword"
        :disabled="this.$store.state.userInfoPage.passwordBtnIsDisabled"
      >修改密码</el-button>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import UserInfoProfile from "@/components/UserMenuCard.vue";

export default Vue.extend({
  components: {
    UserInfoProfile
  },
  data() {
    return {
      profileIsDisabled: false,
      passwordIsDisabled: false
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
@import "@/colors/default.scss";

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