<template>
  <div id="app" :class="{ offline: offline }">
    <div class="offline-msg">
      <v-icon name="plane" scale="2"></v-icon>&nbsp;当前未连接到网络
    </div>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "vue-awesome/icons/plane";

export default Vue.extend({
  data() {
    return {
      offline: !navigator.onLine
    };
  },
  created() {
    if (sessionStorage.getItem("wo_user")) {
      this.$store.commit(
        "updateUserInfo",
        JSON.parse(sessionStorage.getItem("wo_user") as string)
      );
    }
  },
  mounted() {
    // 离线与否
    window.addEventListener("offline", () => {
      this.offline = true;
    });

    window.addEventListener("online", () => {
      location.reload();
      this.offline = false;
    });

    // 动态标题
    const title = document.title;
    let timer: NodeJS.Timeout;
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
  }
});
</script>

<style lang="scss">
@import "@/stylesheet/default.scss";

@font-face {
  font-family: "FZCuJinLJW";
  src: url("assets/fonts/FZCuJinLJW.eot");
  src: url("assets/fonts/FZCuJinLJW.eot?#font-spider")
      format("embedded-opentype"),
    url("assets/fonts/FZCuJinLJW.woff2") format("woff2"),
    url("assets/fonts/FZCuJinLJW.woff") format("woff"),
    url("assets/fonts/FZCuJinLJW.TTF") format("truetype"),
    url("assets/fonts/FZCuJinLJW.svg") format("svg");
  font-weight: normal;
  font-style: normal;
}

.offline {
  pointer-events: none;

  &::before {
    cursor: not-allowed !important;
    pointer-events: auto !important;
  }

  & > .main {
    filter: blur(10px);
  }

  & > .offline-msg {
    transform: translateY(0vh) !important;
    opacity: 1 !important;
  }
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: #f8f9fa;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0%;
  left: 0%;

  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: all;
  user-select: none;

  &::before {
    content: "";
    position: fixed;
    top: 0%;
    left: 0%;
    opacity: 0;
    width: 100vw;
    height: 100vh;
    transition: all 0.4s;
    z-index: 999;
    pointer-events: none;
  }

  & > .offline-msg {
    position: fixed;
    top: 2vh;

    font-size: 1.4vw;
    border-radius: 2vh;
    text-align: center;
    background-color: #ffffff;
    color: #999;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 1vw 4vw;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1000;

    transform: translateY(-10vh);
    opacity: 0;
    transition: opacity, transform 0.6s, 0.6s;
  }

  .main {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  // vue-awesome
  .fa-icon {
    width: auto;
    height: 2vw; /* or any other relative font sizes */

    /* You would have to include the following two lines to make this work in Safari */
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
