/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:48:06 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-08 22:12:54
 */

<template>
  <div id="app" :class="{offline: offline}">
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
    window.addEventListener("offline", () => {
      this.offline = true;
    });

    window.addEventListener("online", () => {
      location.reload();
      this.offline = false;
    });

    const title = document.title;
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        if (title !== document.title) {
          document.title = title;
        }
      } else {
        document.title = "不要忘了我啊！";
      }
    });
  }
});
</script>

<style lang="scss">
@import "@/stylesheet/default.scss";

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
    background-color: white;
    color: #999;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 1vw 4vw;

    display: flex;
    justify-content: center;
    align-items: center;

    user-select: none;
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