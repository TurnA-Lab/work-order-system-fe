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
import Vue from "vue";
import Axios, { AxiosResponse } from "axios";
import VerticalDivider from "@/components/Etc/VerticalDivider.vue";
import "@/interface/type-tree";

export default Vue.extend({
  components: {
    VerticalDivider,
  },
  props: {
    type: String,
    typeApi: String,
    typeData: Object,
    removeApi: String,
    removeType: String,
    appendApi: String,
  },
  data() {
    return {
      data: [],
      isLoading: true,
    };
  },
  methods: {
    append(node: TreeNode<any, TreeData>, data: TreeData) {
      const newChild: TreeData = { label: "新节点", children: [] };

      if (!data.children) {
        this.$set(data, "children", []);
      }

      // 修改名称
      this.$prompt("请输入名称", "新增节点", {
        confirmButtonText: "保存",
        cancelButtonText: "取消保存",
        inputValue: newChild.label,
      })
        .then(
          (returnInfo: MessageBoxData) =>
            (returnInfo as MessageBoxInputData).value ||
            Promise.reject("名称不能为空")
        )
        .then((value: string) =>
          this.removeType === "class3"
            ? // 类型
              this.$http
                .post(
                  this.appendApi,
                  {
                    class1: this.type,
                    class2: node.label,
                    class3: value,
                  },
                  {
                    headers: {
                      token: this.$store.state.userInfo.token,
                    },
                  }
                )
                .then((res: AxiosResponse) => {
                  return { res, value };
                })
            : // 级别、奖项
              this.$http
                .get(this.appendApi, {
                  params: { [this.removeType]: value },
                  headers: {
                    token: this.$store.state.userInfo.token,
                  },
                })
                .then((res: AxiosResponse) => {
                  return { res, value };
                })
        )
        .then(({ res, value }) => {
          return res.data.code === 0
            ? value
            : Promise.reject([res.data.msg, value]);
        })
        .then((value: string) => {
          // 设置 newChild 的值
          newChild.label = value;

          // 添加到树
          data.children.push(newChild);
        })
        .catch(([err, value]) =>
          this.$message({
            message: err || `由于未知因素，无法添加${value}}`,
            type: "warning",
          })
        );

      // 展开节点列表
      node.expanded = true;
    },
    appendLevel(node: TreeNode<any, TreeData>, data: TreeData) {
      const newChild: TreeData = { label: "新节点", children: [] };
      const parent = node.parent;

      if (!parent.data) {
        this.$set(parent, "data", []);
      }

      // 修改名称
      this.$prompt("请输入名称", "新增节点", {
        confirmButtonText: "保存",
        cancelButtonText: "取消保存",
        inputValue: newChild.label,
      })
        .then(
          (returnInfo: MessageBoxData) =>
            (returnInfo as MessageBoxInputData).value ||
            Promise.reject("名称不能为空")
        )
        .then((value: string) =>
          this.$http
            .get(this.appendApi, {
              params: {
                [this.removeType]: data.label,
              },
              headers: {
                token: this.$store.state.userInfo.token,
              },
            })
            .then((res: AxiosResponse) => {
              return { res, value };
            })
        )
        .then(({ res, value }) => {
          if (res.data.code === 0) {
            newChild.label = value;
            (parent.data as any).push(newChild);
          } else {
            return Promise.reject([res.data.msg, value]);
          }
        })
        .catch(([err, value]) => {
          this.$message({
            message: err || `由于未知因素，无法添加${value}}`,
            type: "warning",
          });
        });
    },
    remove(node: TreeNode<any, TreeData>, data: TreeData) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d: TreeData) => d.value === data.value);

      this.$confirm(`即将删除“${data.label}”, 是否继续?`, "注意", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() =>
          this.$http.get(this.removeApi, {
            params: {
              [this.removeType]: data.label,
            },
            headers: {
              token: this.$store.state.userInfo.token,
            },
          })
        )
        .then((res: AxiosResponse) =>
          res.data.code === 0
            ? children.splice(index, 1)
            : Promise.reject(res.data.msg)
        )
        .catch((err: string) =>
          this.$message({
            message: err || `由于未知因素，无法删除${data.label}`,
            type: "warning",
          })
        );
    },
    edit(node: TreeNode<any, TreeData>, data: TreeData) {
      const stateToken = this.$store.state.userInfo.token;
      this.$prompt("请输入名称", "编辑", {
        confirmButtonText: "保存",
        cancelButtonText: "取消编辑",
        inputValue: data.label,
      })
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
          this.$http
            .get(this.removeApi, {
              params: {
                [this.removeType]: data.label,
              },
              headers: {
                token: this.$store.state.userInfo.token,
              },
            })
            .then((res: AxiosResponse) =>
              res.data.code === 0 ? value : Promise.reject(res.data.data.msg)
            )
        )
        .then((value: string) =>
          // 再添加
          this.removeType === "class3"
            ? // 类型
              this.$http
                .post(
                  this.appendApi,
                  {
                    class1: this.type,
                    class2: node.label,
                    class3: value,
                  },
                  {
                    headers: {
                      token: this.$store.state.userInfo.token,
                    },
                  }
                )
                .then((res: AxiosResponse) => {
                  return { res, value };
                })
            : // 级别、奖项
              this.$http
                .get(this.appendApi, {
                  params: { [this.removeType]: value },
                  headers: {
                    token: this.$store.state.userInfo.token,
                  },
                })
                .then((res: AxiosResponse) => {
                  return { res, value };
                })
        )
        .then(({ res, value }) => {
          if (res.data.code === 0) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(
              (d: TreeData) => d.value === data.value
            );

            // 删除节点
            children.splice(index, 1);
            // 生成节点
            const newChild: TreeData = {
              label: value,
              children: [],
            };

            if (!parent.data.children) {
              this.$set(parent.data, "children", []);
            }

            parent.data.children.push(newChild);
          } else {
            return Promise.reject(res.data.msg);
          }
        })
        .catch((err: string) => {
          this.$message({
            message: err || `由于未知因素，无法添加${data.label}}`,
            type: "warning",
          });
        });
    },
  },
  created() {
    this.$http
      .get(this.typeApi, {
        headers: {
          token: this.$store.state.userInfo.token,
        },
        params: this.typeData || {},
      })
      .then((res: AxiosResponse) =>
        res.data.code === 0 ? res.data.data : Promise.reject(res.data.msg)
      )
      .then((data) => (this.data = data))
      .catch((err: string) =>
        this.$message({
          message: err || `由于未知因素，无法获取${this.type}列表`,
          type: "warning",
        })
      )
      .finally(() => {
        this.isLoading = false;
      });
  },
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
