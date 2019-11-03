<template>
  <el-card class="status-card" :class="{disable: isDisable}" @click="showIsDisable">
    <el-tooltip class="item" effect="dark" content="点击切换状态" placement="top">
      <figure class="status-icon" :class="{off: isOff}" v-loading="isLoading" @click="toggleStatus">
        <div class="status-info">{{isOff ?"关闭中" : "开启中"}}</div>
        <v-icon :name="icon" scale="2"></v-icon>
      </figure>
    </el-tooltip>
    <div class="status-title">{{title}}</div>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";

export default Vue.extend({
  props: ["fetchApi", "amendApi", "title", "icon"],
  data() {
    return {
      isDisable: true,
      isOff: true,
      isLoading: true,
      getStatus: () => {
        this.$http
          .post(
            this.fetchApi,
            {},
            {
              headers: {
                token: this.$store.state.userInfo.token
              }
            }
          )
          .then((res: AxiosResponse) => {
            this.$data.isDisable = false;
            this.$data.isLoading = false;
            if (res.data.code === 0) {
              this.$data.isOff = false;
            } else {
              this.$data.isOff = true;
            }
          })
          .catch(() => {
            this.$data.isDisable = true;
            this.$data.isOff = true;
            this.$data.isLoading = false;
            setTimeout(() => {
              this.$message({
                message: `由于未知因素，无法获取${this.title}状态`,
                type: "warning"
              });
            }, Math.random());
          });
      }
    };
  },
  methods: {
    toggleStatus() {
      this.isLoading = true;
      this.$http
        .post(
          this.amendApi,
          {},
          {
            headers: {
              token: this.$store.state.userInfo.token
            }
          }
        )
        .then((res: AxiosResponse) => {
          this.isLoading = false;
          if (res.data.code !== 0) {
            this.$message({
              message: `由于未知因素，无法修改${this.title}状态`,
              type: "warning"
            });
          }
          this.getStatus();
        })
        .catch(() => {
          this.isLoading = false;
          this.$message({
            message: `由于未知因素，无法修改${this.title}状态`,
            type: "warning"
          });
        });
    },
    showIsDisable() {
      if (this.isDisable) {
        this.$message({
          message: `由于未知因素，无法获取、修改${this.title}状态`,
          type: "warning"
        });
      }
    }
  },
  created() {
    this.getStatus();
  }
});
</script>

<style lang="scss" scoped>
@import "@/stylesheet/default.scss";

.off {
  color: #999999 !important;
  background-color: #dddddd !important;
}

.disable {
  cursor: not-allowed;

  .status-icon {
    pointer-events: none;
  }
}

.status-card {
  width: 16vw;
  display: flex;
  justify-content: center;
  font-size: 1vw;
  margin-block-end: 0.5vh;
  margin-inline-end: 0.5vw;

  .status-title {
    text-align: center;
    color: #cfcfcf;
  }

  .status-icon {
    width: 8vw;
    height: 8vw;
    border-radius: 50%;
    background-color: rgb(53, 73, 94);
    color: $main;
    transition: all 0.4s;

    display: flex;
    justify-content: center;
    align-items: center;

    & > svg {
      transition: all 0.3s;
    }

    & > .status-info {
      position: absolute;
      opacity: 0;
      transform: scale(0);
      transition: all 0.2s 0.1s;
    }

    &:hover {
      transform: scale(1.08);

      & > svg {
        transform: scale(0);
      }

      & > .status-info {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
}
</style>