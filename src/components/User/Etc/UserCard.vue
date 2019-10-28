/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:45:13 
 * @Last Modified by:   Skye Young 
 * @Last Modified time: 2019-10-28 19:45:13 
 */

<template>
  <el-card class="box" shadow="never">
    <div class="slide-enter">
      <h1>欢迎回来，</h1>
      <h2>{{name}}</h2>
    </div>
    <div class="slide-enter">
      <h5>
        工号
        <span>{{worknum}}</span>
      </h5>
      <h5>
        隶属于
        <span>{{department}}</span>
      </h5>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    const userInfo = this.$store.state.userInfo;
    return {
      name: userInfo.name,
      worknum: userInfo.worknum,
      department: userInfo.department
    };
  }
});
</script>

<style lang="scss" scoped>
@import "@/stylesheet/default.scss";

.box {
  display: flex;
  align-items: flex-end;

  height: $card-width * 1.414;
  width: $card-width;
  background: linear-gradient(0deg, #06beb6 0%, #48b1bf 100%);
  border-radius: 1rem;

  box-sizing: border-box;
  padding-block-end: 1.2rem;
  padding-inline-start: 1rem;
  padding-inline-end: 1rem;

  opacity: 0;
  animation: fade 0.6s ease-in-out forwards;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(-3vw);
  }

  50% {
    opacity: 1;
  }

  to {
    opacity: 1;
    transform: translateY(0vw);
  }
}

h1,
h2 {
  color: white;
  font-weight: 800;
  user-select: none;
}

h1 {
  margin: 0%;
  font-size: 2.2vw;
}

h2 {
  margin-block-start: 0%;
  font-size: 1.8vw;
}

h5 {
  margin: 0%;
  line-height: 1.2vw;
  font-weight: 100;
  font-size: 0.96vw;
  color: white;
  user-select: none;

  span {
    color: #ecf0f1;
  }
}

.slide-enter {
  opacity: 0;
  animation: slide 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;

  @for $i from 0 to 2 {
    &:nth-of-type(#{$i + 1 }) {
      animation-delay: $i * 0.1s + 0.2s;
    }
  }
}

@keyframes slide {
  from {
    opacity: 0;
    transform: translateY(10vw);
  }

  10% {
    opacity: 1;
  }

  to {
    opacity: 1;
    transform: translateY(0vw);
  }
}
</style>