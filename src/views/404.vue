/*
 * @Author: Skye Young 
 * @Date: 2019-11-25 12:36:40 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-25 13:40:42
 */

<template>
  <div class="box">
    <h1 class="head">404</h1>
    <h3 class="content">该页已经丢失或不存在。</h3>
    <a class="link" @click="back">
      返回来源页
      <span class="el-icon-right content"></span>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      fromLink: ""
    };
  },
  methods: {
    back() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
});
</script>

<style lang="scss" scoped>
.box {
  position: fixed;
  top: 20%;
  left: 30%;
}

.head {
  color: #555;
  font-size: 4rem;
}

.content,
.link {
  color: #95a5a6;
}

.link {
  box-shadow: 0px 0.1rem #ddd;
  cursor: pointer;

  & > span {
    transition: transform 0.2s;
  }

  &:hover > span {
    transform: translateX(0.6rem);
  }
}
</style>