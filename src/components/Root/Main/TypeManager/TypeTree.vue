<template>
  <el-tree :data="data" node-key="value" :highlight-current="true" accordion>
    <span class="custom-tree-node" slot-scope="{ node, data }">
      <span>{{ node.label }}</span>
      <span>
        <el-button v-if="!node.isLeaf" type="text" size="medium" @click="append(node, data)">添加</el-button>
        <el-button v-else type="text" size="medium" @click="remove(node, data)">删除</el-button>
      </span>
    </span>
  </el-tree>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";
import VerticalDivider from "@/components/Etc/VerticalDivider.vue";

interface TreeData {
  value?: number;
  label: string;
  disabled?: boolean;
  isLeaf?: boolean;
  children: TreeData[];
}

interface TreeNode<K, D> {
  checked: boolean;
  childNodes: Array<TreeNode<K, D>>;
  data: D;
  expanded: boolean;
  id: number;
  indeterminate: boolean;
  isLeaf: boolean;
  level: number;
  loaded: boolean;
  loading: boolean;
  parent: TreeNode<K, D>;
  store: any;
  visible: boolean;
  disabled: boolean;
  icon: string;
  key: K;
  label: string;
  nextSibling: TreeNode<K, D>;
  previousSibling: TreeNode<K, D>;
  isCurrent: boolean;
}

export default Vue.extend({
  components: {
    VerticalDivider
  },
  props: [
    "type",
    "typeApi",
    "typeData",
    "removeApi",
    "removeType",
    "appendApi"
  ],
  data() {
    return {
      data: []
    };
  },
  methods: {
    append(node: TreeNode<any, TreeData>, data: TreeData) {
      const newChild: TreeData = { value: 1, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);

      // 展开
      node.expanded = true;
      // 阻止冒泡
      (event as any).stopPropagation();
    },

    remove(node: TreeNode<any, TreeData>, data: TreeData) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d: TreeData) => d.value === data.value);
      // children.splice(index, 1);
      // console.log(data.label);
      this.$http
        .post(
          `${this.removeApi}?${this.removeType}=${data.label}`,
          {},
          {
            headers: {
              token: this.$store.state.userInfo.token
            }
          }
        )
        .then((res: AxiosResponse) => {
          if (res.data.code === 0) {
            children.splice(index, 1);
          } else {
            this.$message({
              message: res.data.msg || `由于未知因素，无法删除${data.label}`,
              type: "warning"
            });
          }
        });
    }
  },
  created() {
    this.$http
      .post(this.typeApi, this.typeData || {}, {
        headers: {
          token: this.$store.state.userInfo.token
        }
      })
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.data = res.data.data;
        } else {
          this.$message({
            message: res.data.msg || `由于未知因素，无法获取${this.type}列表`,
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: `由于未知因素，无法获取${this.type}列表`,
          type: "warning"
        });
      });
  }
});
</script>

<style lang="scss" scoped>
.custom-tree-node {
  // min-width: 15vw;
  width: 60vw;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}
</style>