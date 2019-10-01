<template>
  <transition appear appear-class="slide-fade-enter" appear-active-class="slide-fade-enter-active">
    <el-card class="user">
      <el-container>
        <!-- <el-header>
          <user-header></user-header>
        </el-header>-->
        <el-main></el-main>
      </el-container>
    </el-card>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
// import UserHeader from "@/components/UserHeader.vue";

export default Vue.extend({
  name: "userIndex",
  components: {
    // UserHeader
  }
});
</script>

<style lang="scss" scoped>
.user {
  position: fixed;
  width: 90vw;
  height: 95vh;
  top: 5vh;
  left: 5vw;
}

.slide-fade-enter {
  opacity: 0;
  transform: translateY(30vw);
}

.slide-enter-active {
  transition-property: opacity transform;
  transition-duration: 0.2s 1.2s;
}
</style>