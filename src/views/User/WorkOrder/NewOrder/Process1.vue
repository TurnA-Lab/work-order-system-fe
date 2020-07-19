<template>
  <div class="box">
    <menu-card>
      <div class="header">建设类</div>
      <div class="summary">
        <p>
          包括：<br />
          专业建设、课程建设、教材建设、高教研究和教师团队等。
        </p>
      </div>
      <el-button
        class="select-btn"
        plain
        @click="$store.commit('orderClass', 1)"
        >选定</el-button
      >
    </menu-card>
    <menu-card>
      <div class="header">成果类</div>
      <div class="summary">
        <p>
          包括：<br />
          学术论文、学术专著、专利和艺术作品等。
        </p>
      </div>
      <el-button
        class="select-btn"
        plain
        @click="$store.commit('orderClass', 2)"
        >选定</el-button
      >
    </menu-card>
    <menu-card>
      <div class="header">获奖类</div>
      <div class="summary">
        <p>
          包括：<br />
          教学成果奖、教育科学研究优秀成果奖、讲课比赛、微课比赛等。
        </p>
      </div>
      <el-button
        class="select-btn"
        plain
        @click="$store.commit('orderClass', 3)"
        >选定</el-button
      >
    </menu-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import MenuCard from "@/components/User/Card.vue";

export default Vue.extend({
  components: {
    MenuCard
  }
});
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  height: 70vh;
  padding: 0% 4vw;
}

.menu-card {
  transition: box-shadow 0.2s;
  display: grid;
  grid-template-rows:
    calc(var(--card-height) * 0.8)
    calc(var(--card-height) * 0.2);
  grid-template-columns:
    calc(var(--card-width) * 0.6)
    calc(var(--card-width) * 0.4);
  background-color: #fdfdff;

  &:hover {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2) !important;
  }

  .header,
  .summary {
    writing-mode: vertical-rl;
  }

  .header {
    font-family: "FZCuJinLJW";

    order: 1;
    color: $--color-primary;
    font-size: 1.5em;

    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    $margin: 15px;

    &::before,
    &::after {
      content: "";
      display: block;
      opacity: 0.8;
      width: 2px;
      height: calc(3em + #{$margin});
      background-color: currentColor;
    }

    &::before {
      margin-inline-start: $margin;
      margin-block-end: 2px;
    }

    &::after {
      margin-inline-end: $margin;
      margin-block-start: 2px;
    }
  }

  .summary {
    display: flex;
    align-items: flex-end;
    justify-content: center;

    margin-inline-start: calc(var(--card-width) * 0.2);
    margin-block-end: calc(var(--card-width) * 0.1);

    color: #95a5a6;
    text-align: start;
    text-decoration: underline;
    letter-spacing: 2px;
    line-height: 1.3em;

    p {
      height: calc(var(--card-width) * 0.7);
      font-size: 0.6em;
    }
  }

  .select-btn {
    order: 2;
    grid-column-start: 1;
    grid-column-end: 3;
    justify-self: center;
    align-self: flex-start;

    padding: 0px;
    width: 40%;
    height: 40%;
    background-color: inherit;
  }
}
</style>
