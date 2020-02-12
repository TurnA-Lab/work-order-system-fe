<template>
  <el-card class="box" shadow="never">
    <div class="slide-enter">
      <h1>欢迎回来，</h1>
      <h2>{{ name }}</h2>
    </div>
    <div class="slide-enter">
      <h5>
        工号
        <span>{{ worknum }}</span>
      </h5>
      <h5>
        隶属于
        <span>{{ department }}</span>
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
.box {
  display: flex;
  align-items: flex-end;

  height: $card-width * 1.414;
  width: $card-width;
  background: linear-gradient(0deg, #06beb6 0%, #48b1bf 100%);
  border-radius: 1rem;

  box-sizing: border-box;
  padding-block-end: 1.2vh;
  padding-inline-start: 1vw;
  padding-inline-end: 1vw;

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
  color: #fff;
  font-weight: 800;
}

h1 {
  margin: 0%;
  font-size: 2rem;
}

h2 {
  margin-block-start: 0%;
  font-size: 1.4rem;
}

h5 {
  margin: 0%;
  font-weight: 100;
  line-height: 1rem;
  font-size: 0.76rem;
  color: #fff;

  span {
    color: #ecf0f1;
  }
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.4rem;
}

h5 {
  line-height: 1rem;
  font-size: 0.76rem;
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

@include screen($larger) {
  .box {
    height: $static-card-width * 1.414;
    width: $static-card-width;
  }
}
</style>
