<template>
  <div>
    <el-tree
      class="tree"
      v-loading="isLoading"
      :data="data"
      node-key="value"
      :highlight-current="true"
      accordion
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!-- 添加按钮，用于只有一级树的结构 -->
        <el-button
          v-if="removeType !== 'class3' && data.id === 1"
          @click.stop="appendLevel(node, data)"
          class="level-add-btn"
          type="primary"
          circle
        >
          <span class="el-icon-plus hover-action"></span>
        </el-button>
        <!-- 内容 -->
        <span>{{ node.label }}</span>
        <!-- 按钮组 -->
        <span>
          <!-- 添加按钮 -->
          <el-button
            v-if="!node.isLeaf || (typeData && !node.parent.parent)"
            class="hover-action"
            type="text"
            @click.stop="append(node, data)"
          >
            <span class="el-icon-plus hover-action"></span>
            添加
          </el-button>
          <!-- 编辑按钮 -->
          <el-button
            v-if="
              removeType === 'class3'
                ? node.isLeaf && node.parent.parent
                : node.isLeaf
            "
            class="hover-action"
            type="text"
            @click.stop="edit(node, data)"
          >
            <span class="el-icon-edit"></span>
            编辑
          </el-button>
          <!-- 删除按钮 -->
          <el-button
            v-if="
              removeType === 'class3'
                ? node.isLeaf && node.parent.parent
                : node.isLeaf
            "
            class="red hover-action"
            type="text"
            @click.stop="remove(node, data)"
          >
            <span class="el-icon-delete"></span>
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script lang="ts">
import "@/interface/type-tree";

import Vue from "vue";

import { fetchKindList, getData, postData } from "@/utils/fetchData";

export default Vue.extend({
  props: {
    type: String,
    typeApi: String,
    typeData: Object,
    removeApi: String,
    removeType: String,
    appendApi: String
  },
  data() {
    return {
      data: [],
      isLoading: true
    };
  },
  methods: {
    append(node: TreeNode<number, TreeData>, data: TreeData) {
      const newChild: TreeData = { label: "新节点", children: [] };

      if (!data.children) {
        this.$set(data, "children", []);
      }

      // 修改名称
      this.$prompt("请输入名称", "新增节点", {
        confirmButtonText: "保存",
        cancelButtonText: "取消保存",
        inputValue: newChild.label
      })
        .catch(() => Promise.reject("已取消"))
        .then(
          (returnInfo: MessageBoxData) =>
            (returnInfo as MessageBoxInputData).value ||
            Promise.reject("名称不能为空")
        )
        .then((value: string) =>
          this.removeType === "class3"
            ? // 类型
              postData(this.appendApi, {
                class1: this.type,
                class2: node.label,
                class3: value
              }).then(() => value)
            : // 级别、奖项
              getData(this.appendApi, {
                params: { [this.removeType]: value }
              }).then(() => value)
        )
        .then((value: string) => {
          // 设置 newChild 的值
          newChild.label = value;

          // 添加到树
          data.children.push(newChild);
        })
        .catch(err =>
          this.$message({
            message: err || "由于未知因素，无法添加",
            type: "warning"
          })
        );

      // 展开节点列表
      node.expanded = true;
    },
    appendLevel(node: TreeNode<number, TreeData>, data: TreeData) {
      const newChild: TreeData = { label: "新节点", children: [] };
      const parent = node.parent;

      if (!parent.data) {
        this.$set(parent, "data", []);
      }

      // 修改名称
      this.$prompt("请输入名称", "新增节点", {
        confirmButtonText: "保存",
        cancelButtonText: "取消保存",
        inputValue: newChild.label
      })
        .catch(() => Promise.reject("已取消"))
        .then(
          (returnInfo: MessageBoxData) =>
            (returnInfo as MessageBoxInputData).value ||
            Promise.reject("名称不能为空")
        )
        .then((value: string) =>
          getData(this.appendApi, {
            params: {
              [this.removeType]: data.label
            }
          }).then(() => value)
        )
        .then(value => {
          newChild.label = value;
          ((parent.data as unknown) as TreeData[]).push(newChild);
        })
        .catch(err => {
          this.$message({
            message: err || "由于未知因素，无法添加",
            type: "warning"
          });
        });
    },
    remove(node: TreeNode<number, TreeData>, data: TreeData) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d: TreeData) => d.value === data.value);

      this.$confirm(`即将删除“${data.label}”, 是否继续?`, "注意", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .catch(() => Promise.reject("已取消"))
        .then(() =>
          getData(this.removeApi, {
            params: {
              [this.removeType]: data.label
            }
          })
        )
        .then(() => {
          children.splice(index, 1);
        })
        .catch((err: string) =>
          this.$message({
            message: err || `由于未知因素，无法删除${data.label}`,
            type: "warning"
          })
        );
    },
    edit(node: TreeNode<number, TreeData>, data: TreeData) {
      this.$prompt("请输入名称", "编辑", {
        confirmButtonText: "保存",
        cancelButtonText: "取消编辑",
        inputValue: data.label
      })
        .catch(() => Promise.reject("已取消"))
        .then(
          (returnInfo: MessageBoxData) =>
            (returnInfo as MessageBoxInputData).value ||
            Promise.reject("名称不能为空")
        )
        .then((value: string) =>
          value === data.label ? Promise.reject("名称未改变") : value
        )
        .then((value: string) =>
          // 先删除
          getData(this.removeApi, {
            params: {
              [this.removeType]: data.label
            }
          }).then(() => value)
        )
        .then((value: string) =>
          // 再添加
          this.removeType === "class3"
            ? // 类型
              postData(this.appendApi, {
                class1: this.type,
                class2: node.label,
                class3: value
              }).then(() => value)
            : // 级别、奖项
              getData(this.appendApi, {
                params: { [this.removeType]: value }
              }).then(() => value)
        )
        .then(value => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(
            (d: TreeData) => d.value === data.value
          );

          // 生成节点
          const newChild: TreeData = {
            label: value,
            children: []
          };

          if (!parent.data.children) {
            this.$set(parent.data, "children", []);
          }

          // 删除并添加节点
          children.splice(index, 1, newChild);
        })
        .catch((err: string) => {
          this.$message({
            message: err || `由于未知因素，无法添加${data.label}}`,
            type: "warning"
          });
        });
    }
  },
  created() {
    new Promise(resolve =>
      resolve(
        this.typeData
          ? fetchKindList({ params: this.typeData })
          : getData(this.typeApi)
      )
    )
      .then(data => {
        this.data = data as never[];
      }) //TODO 懒得写类型
      .catch((err: string) =>
        this.$message({
          message: err || `由于未知因素，无法获取${this.type}列表`,
          type: "warning"
        })
      )
      .finally(() => {
        this.isLoading = false;
      });
  }
});
</script>

<style lang="scss" scoped>
.tree {
  margin-block-start: 5px;
}

.level-add-btn {
  position: fixed;
  top: 40vh;
  right: 2vw;
  z-index: 2;
  transform: none;
  transition: none;
}

.custom-tree-node {
  // min-width: 15vw;
  width: 60vw;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.red {
  color: #f56c6c;
}

.hover-action {
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.1);
  }
}
</style>

<style lang="scss">
.el-tree {
  margin-block-end: 3vh;
}
</style>
