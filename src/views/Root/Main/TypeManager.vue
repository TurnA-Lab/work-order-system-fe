<template>
  <el-tabs tab-position="right">
    <el-tab-pane label="类型">
      <div class="tabs-body">
        <el-tabs>
          <el-tab-pane label="建设类">
            <type-tree
              type="建设类"
              :type-data="{ class1: '建设类' }"
              remove-type="class3"
              type-api="/api/common/kind/list"
              remove-api="/api/common/kind/delete"
              append-api="/api/common/kind/add"
            ></type-tree>
          </el-tab-pane>
          <el-tab-pane label="成果类">
            <type-tree
              type="成果类"
              :type-data="{ class1: '成果类' }"
              remove-type="class3"
              type-api="/api/common/kind/list"
              remove-api="/api/common/kind/delete"
              append-api="/api/common/kind/add"
            ></type-tree>
          </el-tab-pane>
          <el-tab-pane label="获奖类">
            <type-tree
              type="获奖类"
              :type-data="{ class1: '获奖类' }"
              remove-type="class3"
              type-api="/api/common/kind/list"
              remove-api="/api/common/kind/delete"
              append-api="/api/common/kind/add"
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
              remove-type="prize"
              type-api="/api/common/prize/list"
              remove-api="/api/common/prize/delete"
              append-api="/api/common/prize/add"
            ></type-tree>
          </el-tab-pane>

          <el-tab-pane label="获奖级别">
            <type-tree
              type="获奖级别"
              remove-type="level"
              type-api="/api/common/level/list"
              remove-api="/api/common/level/delete"
              append-api="/api/common/level/add"
            ></type-tree>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import TypeTree from "@/components/Root/TypeTree.vue";

export default Vue.extend({
  components: {
    TypeTree,
  },
});
</script>
