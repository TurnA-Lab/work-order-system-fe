<template>
  <el-card class="box" shadow="never">
    <h1>欢迎回来，</h1>
    <h2>{{name}}</h2>
    <h5>工号 {{worknum}}</h5>
    <h5>隶属于 {{department}}</h5>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      name: sessionStorage.getItem("wo_name"),
      worknum: sessionStorage.getItem("wo_worknum"),
      department: sessionStorage.getItem("wo_department")
    };
  }
});
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: flex-end;

  height: 430px;
  width: 430px * 0.7;
  background: linear-gradient(0deg, #06beb6 0%, #48b1bf 100%);
  border-radius: 1rem;

  box-sizing: border-box;
  padding-block-end: 1.5rem;
  padding-inline-start: 1rem;
}

h1,
h2,
h5 {
  color: white;
  user-select: none;
}

h1,
h2 {
  font-weight: 800;
}

h1 {
  margin: 0%;
}

h2 {
  margin-block-start: 0%;
}

h5 {
  margin: 0%;
  line-height: 1.2rem;

  font-weight: 100;
}
</style>