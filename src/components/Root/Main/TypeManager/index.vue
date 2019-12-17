/*
 * @Author: Skye Young
 * @Date: 2019-11-08 10:18:14
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-14 20:19:42
 */

<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="类型">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="建设类">
            <type-tree
              type="建设类"
              type-api="/api/online/getTypeList"
              :type-data="{'class1': '建设类'}"
              remove-api="/api/online/root/deleteType"
              remove-type="class3"
              append-api="/api/online/root/addType"
            ></type-tree>
          </el-tab-pane>
          <el-tab-pane label="成果类">
            <type-tree
              type="成果类"
              type-api="/api/online/getTypeList"
              :type-data="{'class1': '成果类'}"
              remove-api="/api/online/root/deleteType"
              remove-type="class3"
              append-api="/api/online/root/addType"
            ></type-tree>
          </el-tab-pane>
          <el-tab-pane label="获奖类">
            <type-tree
              type="获奖类"
              type-api="/api/online/getTypeList"
              :type-data="{'class1': '获奖类'}"
              remove-api="/api/online/root/deleteType"
              remove-type="class3"
              append-api="/api/online/root/addType"
            ></type-tree>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>
    <el-tab-pane label="级别">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="奖项">
            <type-tree
              type="奖项"
              type-api="/api/online/getPrizeSet"
              remove-api="/api/online/root/deletePrize"
              remove-type="prize"
              append-api="/api/online/root/addPrize"
            ></type-tree>
          </el-tab-pane>

          <el-tab-pane label="获奖级别">
            <type-tree
              type="获奖级别"
              type-api="/api/online/getLevelSet"
              remove-api="/api/online/root/deleteLevel"
              remove-type="level"
              append-api="/api/online/root/addLevel"
            ></type-tree>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import TypeTree from "./TypeTree.vue";

export default Vue.extend({
  components: {
    TypeTree
  }
});
</script>

<style lang="scss" scoped>
.tabs-body {
  background-color: #ffffff;
  margin: 0px 1vw 1vw 1vw;
  padding: 1vh 2vw;
  border-radius: 1rem 2px 2px 1rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
