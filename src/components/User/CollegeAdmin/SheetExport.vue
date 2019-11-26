/*
 * @Author: Skye Young 
 * @Date: 2019-11-26 21:13:44 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-26 22:25:12
 */

<template>
  <div>
    <header>
      <h2>部门成员管理</h2>
    </header>
    <main>
      <div>
        <el-button
          type="primary"
          @click="downloadPerformanceTable"
          disabled="performanceIsDisabled"
        >
          <i class="el-icon-download"></i>
          导出业绩表
        </el-button>
        <el-button type="primary" @click="downloadBonusTable" disabled="bonusIsDisabled">
          <i class="el-icon-download"></i>
          导出奖金表
        </el-button>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped>
header {
  margin-left: 15px;
}

main {
  height: 50vh;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>