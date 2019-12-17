/*
 * @Author: Skye Young
 * @Date: 2019-11-08 10:18:07
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-01 14:14:10
 */

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
        <el-button
          v-if="!typeData&&data.value===1"
          @click.stop="appendLevel(node, data)"
          class="level-btn"
          type="primary"
          circle
        >
          <span class="el-icon-plus hover-action"></span>
        </el-button>
        <span>{{ node.label }}</span>
        <span>
          <el-button v-if="!node.isLeaf || (typeData && !node.parent.parent)" type="text" @click.stop="append(node, data)">
            <span class="el-icon-plus hover-action"></span>
          </el-button>
          <el-button v-if="typeData ? node.isLeaf && node.parent.parent : node.isLeaf" type="text" @click.stop="edit(node, data)">
            <span class="el-icon-edit hover-action"></span>
          </el-button>
          <el-button v-if="typeData ? node.isLeaf && node.parent.parent : node.isLeaf" class="red" type="text" @click.stop="remove(node, data)">
            <span class="el-icon-delete hover-action"></span>
          </el-button>

        </span>
      </span>
    </el-tree>
  </div>
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

type MessageBoxCloseAction = "confirm" | "cancel" | "close";

interface MessageBoxInputData {
  // value?: string;
  action?: MessageBoxCloseAction;
}

type MessageBoxData = MessageBoxInputData | MessageBoxCloseAction;

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
      data: [],
      isLoading: true
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
        inputValue: newChild.label
      })
        .then((returnInfo: MessageBoxData) => {
          const value = (returnInfo as any).value;
          if (!value) {
            this.$message({
              message: `名称不能为空`,
              type: "warning"
            });
          } else {
            // 类型
            if (this.typeData) {
              this.$http
                .post(
                  this.appendApi,
                  {
                    class1: this.type,
                    class2: node.label,
                    class3: value
                  },
                  {
                    headers: {
                      token: this.$store.state.userInfo.token
                    }
                  }
                )
                .then((res: AxiosResponse) => {
                  if (res.data.code === 0) {
                    newChild.label = value;
                    data.children.push(newChild);
                  } else {
                    this.$message({
                      message:
                        res.data.msg || `由于未知因素，无法添加${value}}`,
                      type: "warning"
                    });
                  }
                })
                .catch(() => {
                  this.$message({
                    message: `由于未知因素，无法添加${value}}`,
                    type: "warning"
                  });
                });
            }else{
                this.$http
                    .post(
                        `${this.appendApi}?${this.removeType}=${value}`,
                        {},
                        {
                            headers: {
                                token: this.$store.state.userInfo.token
                            }
                        }
                    )
                    .then((res: AxiosResponse) => {
                        if (res.data.code === 0) {
                            newChild.label = value;
                            data.children.push(newChild);
                        } else {
                            this.$message({
                                message:
                                    res.data.msg || `由于未知因素，无法添加${value}}`,
                                type: "warning"
                            });
                        }
                    })
                    .catch(() => {
                        this.$message({
                            message: `由于未知因素，无法添加${value}}`,
                            type: "warning"
                        });
                    });
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加节点"
          });
        });

      // 展开
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
        inputValue: newChild.label
      })
        .then((returnInfo: MessageBoxData) => {
          const value = (returnInfo as any).value;
          if (!value) {
            this.$message({
              message: `名称不能为空`,
              type: "warning"
            });
          } else {
            this.$http
              .post(
                `${this.appendApi}?${this.removeType}=${value}`,
                {},
                {
                  headers: {
                    token: this.$store.state.userInfo.token
                  }
                }
              )
              .then((res: AxiosResponse) => {
                if (res.data.code === 0) {
                  newChild.label = value;
                  (parent.data as any).push(newChild);
                } else {
                  this.$message({
                    message: res.data.msg || `由于未知因素，无法添加${value}}`,
                    type: "warning"
                  });
                }
              })
              .catch(() => {
                this.$message({
                  message: `由于未知因素，无法添加${value}}`,
                  type: "warning"
                });
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加节点"
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
        type: "warning"
      })
        .then(() => {
            if (this.typeData) {
                this.$http
                    .post(
                        this.removeApi,
                        {
                            class1: this.type,
                            class2: parent.label,
                            class3: data.label
                        },
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
                                message:
                                    res.data.msg || `由于未知因素，无法删除${data.label}`,
                                type: "warning"
                            });
                        }
                    })
                    .catch(() => {
                        this.$message({
                            message: `由于未知因素，无法删除${data.label}`,
                            type: "warning"
                        });
                    });
            }else{
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
                                message:
                                    res.data.msg || `由于未知因素，无法删除${data.label}`,
                                type: "warning"
                            });
                        }
                    })
                    .catch(() => {
                        this.$message({
                            message: `由于未知因素，无法删除${data.label}`,
                            type: "warning"
                        });
                    });
            }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    edit(node: TreeNode<any, TreeData>, data: TreeData) {
      const stateToken = this.$store.state.userInfo.token;
      this.$prompt("请输入名称", "编辑", {
        confirmButtonText: "保存",
        cancelButtonText: "取消编辑",
        inputValue: data.label
      })
        .then((returnInfo: MessageBoxData) => {
          const value = (returnInfo as any).value;
          if (!value) {
            this.$message({
              message: `名称不能为空`,
              type: "warning"
            });
          } else if (value !== data.label) {
            // 先删除
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(
              (d: TreeData) => d.value === data.value
            );

            this.$http
              .post(
                `${this.removeApi}`,
                  {
                      class1: this.type,
                      class2: parent.label,
                      class3: data.label
                  },
                {
                  headers: {
                    token: stateToken
                  }
                }
              )
              .then((res: AxiosResponse) => {
                if (res.data.code === 0) {
                  // 再添加
                  // 类型
                  if (this.typeData) {
                    this.$http
                      .post(
                        this.appendApi,
                        {
                          class1: this.type,
                          class2: parent.label,
                          class3: value
                        },
                        {
                          headers: {
                            token: stateToken
                          }
                        }
                      )
                      .then((response: AxiosResponse) => {
                        if (response.data.code === 0) {
                          // 删除节点
                          children.splice(index, 1);
                          // 生成节点
                          const newChild: TreeData = {
                            label: value,
                            children: []
                          };

                          if (!parent.data.children) {
                            this.$set(parent.data, "children", []);
                          }

                          parent.data.children.push(newChild);
                        } else {
                          this.$message({
                            message: `由于未知因素，无法编辑${data.label}`,
                            type: "warning"
                          });
                        }
                      })
                      .catch(() => {
                        this.$message({
                          message: `由于未知因素，无法编辑${data.label}}`,
                          type: "warning"
                        });
                      });
                  } else {
                    this.$http
                      .post(
                        `${this.appendApi}?${this.removeType}=${value}`,
                        {},
                        {
                          headers: {
                            token: this.$store.state.userInfo.token
                          }
                        }
                      )
                      .then((response: AxiosResponse) => {
                        if (response.data.code === 0) {
                          // 删除节点
                          children.splice(index, 1);
                          // 生成节点
                          const newChild: TreeData = {
                            label: value,
                            children: []
                          };

                          if (!parent.data) {
                            this.$set(parent, "data", []);
                          }

                          (parent.data as any).push(newChild);
                        } else {
                          this.$message({
                            message: `由于未知因素，无法编辑${data.label}`,
                            type: "warning"
                          });
                        }
                      })
                      .catch(() => {
                        this.$message({
                          message: `由于未知因素，无法编辑${data.label}`,
                          type: "warning"
                        });
                      });
                  }
                } else {
                  this.$message({
                    message: `由于未知因素，无法编辑${data.label}`,
                    type: "warning"
                  });
                }
              })
              .catch(() => {
                this.$message({
                  message: `由于未知因素，无法编辑${data.label}`,
                  type: "warning"
                });
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消编辑"
          });
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
        this.$data.isLoading = false;
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
        this.$data.isLoading = false;
        this.$message({
          message: `由于未知因素，无法获取${this.type}列表`,
          type: "warning"
        });
      });
  }
});
</script>

<style lang="scss" scoped>
.tree {
  margin-block-start: 5px;
}

.level-btn {
  position: fixed;
  top: 30vh;
  right: 2vw;
  z-index: 1;
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
    transform: scale(1.2);
  }
}
</style>
