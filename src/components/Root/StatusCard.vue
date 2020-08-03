<template>
  <div
    class="status-card"
    :class="{ disable: isDisable }"
    @click="showIsDisable"
  >
    <el-tooltip
      class="item"
      effect="dark"
      content="点击切换状态"
      placement="top"
    >
      <figure
        class="status-icon"
        :class="{ off: isOff }"
        v-loading="isLoading"
        @click="toggleStatus"
      >
        <div class="status-info">{{ isOff ? "关闭中" : "开启中" }}</div>
        <v-icon :name="icon" scale="2"></v-icon>
      </figure>
    </el-tooltip>
    <div class="status-title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import Vue from "vue";

export default Vue.extend({
  props: {
    fetchApi: String,
    amendApi: String,
    title: String,
    icon: String
  },
  data() {
    return {
      isDisable: true,
      isOff: true,
      isLoading: true
    };
  },
  methods: {
    toggleStatus() {
      this.isLoading = true;
      this.$http
        .get(this.amendApi, {
          headers: {
            token: this.$store.state.userInfo.token
          }
        })
        .then((res: AxiosResponse) => res.data.code === 0 || Promise.reject())
        .catch(() => {
          this.$message({
            message: `由于未知因素，无法修改${this.title}状态`,
            type: "warning"
          });
        })
        .finally(() => {
          this.getStatus();
          this.isLoading = false;
        });
    },
    showIsDisable() {
      if (this.isDisable) {
        this.$message({
          message: `由于未知因素，无法获取、修改${this.title}状态`,
          type: "warning"
        });
      }
    },
    getStatus() {
      this.$http
        .get(this.fetchApi, {
          headers: {
            token: this.$store.state.userInfo.token
          }
        })
        .then((res: AxiosResponse) =>
          res.data.code === 0 ? res.data.data : res.data.msg
        )
        .then(data => {
          this.isDisable = false;
          this.isOff = !data[Object.keys(data)[0]];
        })
        .catch((err: string) => {
          this.isDisable = true;
          this.isOff = true;

          // 使用延时器，以保证消息提示不会出现错误
          setTimeout(() => {
            this.$message({
              message: err || `由于未知因素，无法获取${this.title}状态`,
              type: "warning"
            });
          }, Math.random());
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  created() {
    this.getStatus();
  }
});
</script>

<style lang="scss" scoped>
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
  height: 16vw;
  max-width: 200px;
  max-height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-block-end: 1vh;
  margin-block-start: 1vh;
  margin-inline-end: 0.5vw;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  border-radius: 1rem;
  cursor: pointer;
  z-index: 0;

  .status-title {
    text-align: center;
    color: #cfcfcf;
  }

  .status-icon {
    width: 8vw;
    height: 8vw;
    max-width: 100px;
    max-height: 100px;

    border-radius: 50%;
    background-color: rgb(53, 73, 94);
    color: var(--main);
    transition: transform 0.3s ease-out;

    display: flex;
    justify-content: center;
    align-items: center;

    & > svg {
      transition: transform 0.3s, opacity 0.3s;
    }

    & > .status-info {
      position: absolute;
      opacity: 0;
      transform: scale(0);
      transition: transform 0.3s, opacity 0.3s;
    }

    &:hover {
      transform: scale(1.1);

      & > svg {
        transform: scale(0);
        opacity: 0;
      }

      & > .status-info {
        transform: scale(1);
        opacity: 1;
      }
    }
  }
}
</style>
