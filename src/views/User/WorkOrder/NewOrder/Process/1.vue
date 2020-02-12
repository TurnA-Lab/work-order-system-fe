<template>
  <div class="box">
    <el-card class="card" shadow="hover">
      <div slot="header">建设类</div>
      <h4>
        包括：
        <br />专业建设、课程建设、教材建设、高教研究和教师团队等。
      </h4>
      <el-button
        class="select-btn"
        type="primary"
        plain
        @click="$store.commit('orderClass', 1)"
        >选定</el-button
      >
    </el-card>
    <el-card class="card" shadow="hover">
      <div slot="header">成果类</div>
      <h4>
        包括：
        <br />学术论文、学术专著、专利和艺术作品等。
      </h4>
      <el-button
        class="select-btn"
        type="primary"
        plain
        @click="$store.commit('orderClass', 2)"
        >选定</el-button
      >
    </el-card>
    <el-card class="card" shadow="hover">
      <div slot="header">获奖类</div>
      <h4>
        包括：
        <br />教学成果奖、教育科学研究优秀成果奖、讲课比赛、微课比赛等。
      </h4>
      <el-button
        class="select-btn"
        type="primary"
        plain
        @click="$store.commit('orderClass', 3)"
        >选定</el-button
      >
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  height: 70vh;
  padding: 0% 4vw;

  .card {
    height: $card-width * 1.414;
    width: $card-width;
  }

  @include screen($larger) {
    .card {
      height: $static-card-width * 1.414;
      width: $static-card-width;
    }
  }
}
</style>
