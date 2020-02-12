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
      <!-- <el-button
        class="select-btn"
        type="primary"
        plain
        @click="$store.commit('orderClass', 1)"
        >选定</el-button
      > -->
    </menu-card>
    <menu-card>
      <div class="header">成果类</div>
      <div class="summary">
        <p>
          包括：<br />
          学术论文、学术专著、专利和艺术作品等。
        </p>
      </div>
      <!-- <el-button
        class="select-btn"
        type="primary"
        plain
        @click="$store.commit('orderClass', 2)"
        >选定</el-button
      > -->
    </menu-card>
    <menu-card>
      <div class="header">获奖类</div>
      <div class="summary">
        <p>
          包括：<br />
          教学成果奖、教育科学研究优秀成果奖、讲课比赛、微课比赛等。
        </p>
      </div>
      <!-- <el-button
        class="select-btn"
        type="primary"
        plain
        @click="$store.commit('orderClass', 3)"
        >选定</el-button
      > -->
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
  // flex-flow: column;
  // align-items: center;
  // padding: 0% 4vw;
  transition: box-shadow 0.2s;
  display: grid;
  grid-template-columns:
    calc(var(--card-width) * 0.6)
    calc(var(--card-width) * 0.4);

  &:hover {
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1) !important;
  }

  .header,
  .summary {
    writing-mode: vertical-rl;
  }

  .header {
    order: 1;
    // color: $--color-primary;
    text-decoration: overline underline;
    font-size: 1.2em;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .summary {
    display: flex;
    align-items: flex-end;
    justify-content: center;

    margin-inline-start: calc(var(--card-width) * 0.2);
    margin-block-end: calc(var(--card-width) * 0.1);

    text-align: start;
    text-decoration: underline;
    letter-spacing: 2px;
    line-height: 1.3em;

    p {
      height: calc(var(--card-width) * 0.7);
    }
  }
}
</style>
