<template>
  <div class="box" shadow="never">
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    const { name, worknum, department } = this.$store.state.userInfo;
    return {
      name,
      worknum,
      department
    };
  }
});
</script>

<style lang="scss" scoped>
.box {
  box-sizing: border-box;

  display: flex;
  flex-flow: column;
  justify-content: flex-end;

  height: var(--card-height);
  width: var(--card-width);
  background: linear-gradient(0deg, #06beb6 0%, #48b1bf 100%);
  border-radius: 1rem;

  padding-block-end: 4vh;
  padding-inline-start: 2vw;
  padding-inline-end: 2vw;

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
