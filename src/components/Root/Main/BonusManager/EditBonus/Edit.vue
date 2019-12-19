/*
 * @Author: Skye Young
 * @Date: 2019-11-17 20:11:55
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-19 18:44:42
 */

<template>
  <el-dialog
    custom-class="edit-dialog"
    :visible="isVisible"
    :close-on-click-modal="false"
    @close="close"
    append-to-body
  >
    <div slot="title">
      编辑奖金信息
      <span class="last-time">最后修改时间 {{form.lastTime}}</span>
    </div>
    <div>
      <el-form
        :class="{'is-disable': isDisable}"
        class="form-part"
        ref="form"
        :model="form"
        size="medium"
        label-position="left"
        label-width="auto"
      >
        <el-form-item class="form-item" label="项目名称">
          <el-input v-model="form.project" placeholder="请输入项目名称"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="负责人">
          <el-input v-model="form.master" placeholder="请输入负责人"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="类别">
          <el-input v-model="form.type" placeholder="请输入类别"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="院部">
          <el-select v-model="form.department" placeholder="请选择，或输入以查找" filterable>
            <el-option
              :key="item.value"
              v-for="item in options.department"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="奖金计算科室">
          <el-select v-model="form.computeoffice" placeholder="请选择">
            <el-option v-for="item in computeOfficeList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="立项年度">
          <el-date-picker
            align="center"
            v-model="form.year"
            type="year"
            value-format="yyyy"
            placeholder="请选择立项年度"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="奖金">
          <el-input v-model.number="form.bonus" placeholder="请输入奖金"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" class="dialog-btn-line">
      <el-button @click="close" type="primary" plain>取消编辑</el-button>
      <el-button :loading="isDisable" @click="updateInfo" type="primary">{{saveBtnText}}</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";
import { computeOffice } from "@/utils/returnComputeOffice";

interface Data {
  id: number;
  department: string;
  computeoffice: string;
  type: string;
  year: string;
  project: string;
  master: string;
  bonus: number;
  status: number | string;
  lastTime: string;
}

export default Vue.extend({
  props: ["data", "isVisible"],
  data() {
    return {
      computeOfficeList: computeOffice,
      isDisable: false,
      editIsDisable: true,
      statusIsVisible: false,
      form: {},
      options: {
        department: []
      }
    };
  },
  methods: {
    close() {
      this.$emit("toggle-is-visible", false);
    },
    updateInfo() {
      this.isDisable = true;

      this.$http
        .post("/api/online/root/updateBonusInfo", this.form, {
          headers: {
            token: this.$store.state.userInfo.token
          }
        })
        .then((res: AxiosResponse) => {
          this.isDisable = false;
          if (res.data.code === 0) {
            this.close();
            this.$message({
              message: res.data.msg || "用户信息保存成功",
              type: "success"
            });
          } else {
            this.$message({
              message: res.data.msg || "用户信息保存失败",
              type: "warning"
            });
          }
        })
        .catch(() => {
          this.isDisable = false;
          this.$message({
            message: "未知错误",
            type: "warning"
          });
        });
    }
  },
  computed: {
    saveBtnText() {
      return this.$data.isDisable ? "正在保存..." : "保存编辑";
    }
  },
  watch: {
    data(newValue: Data, oldValue: Data) {
      this.form = newValue;
    }
  },
  created() {
    const stateToken = this.$store.state.userInfo.token;

    // 请求院部列表
    this.$http
      .post(
        "/api/online/getDepartmentList",
        {},
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.options.department = res.data.data;
        } else {
          this.$message({
            message: res.data.msg || "由于未知因素，无法获取院部列表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法获取院部列表",
          type: "warning"
        });
      });
  }
});
</script>

<style lang="scss" scoped>
.form-item {
  width: 450px;
}

.is-disable {
  filter: blur(10px);
  cursor: not-allowed;
}
</style>

<style lang="scss">
.edit-dialog {
  width: 60vw;
  border-radius: 1rem;

  min-width: 450px;
  max-height: 80vh;
  margin: 0px !important;
}

.form-part {
  width: inherit;
  height: 60vh;
  overflow: auto;
}

.last-time {
  color: #dddddd;
  font-size: 8px;
}

.dialog-btn-line {
  position: fixed;
  bottom: 20vh;
  right: 25vw;
}
</style>
