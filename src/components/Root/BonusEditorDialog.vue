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
      <span class="last-time">最后修改时间 {{ lastModifiedTime }}</span>
    </div>
    <div>
      <el-form
        :class="{ 'is-disable': isDisable }"
        class="form-part"
        ref="form"
        :model="form"
        size="medium"
        label-position="left"
        label-width="auto"
      >
        <el-form-item class="form-item" label="项目名称">
          <el-input
            v-model="form.project"
            placeholder="请输入项目名称"
          ></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="负责人">
          <el-input v-model="form.master" placeholder="请输入负责人"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="类别">
          <el-input v-model="form.type" placeholder="请输入类别"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="院部">
          <el-select
            v-model="form.department"
            placeholder="请选择，或输入以查找"
            filterable
          >
            <el-option
              v-for="item in options.department"
              :key="item.id"
              :label="item.dptName"
              :value="item.dptName"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="奖金计算科室">
          <el-select v-model="form.computeOffice" placeholder="请选择">
            <el-option
              v-for="item in options.computeOfficeList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
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
          <el-input
            v-model.number="form.bonus"
            placeholder="请输入奖金"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" class="dialog-btn-line">
      <el-button @click="close" type="primary" plain>取消编辑</el-button>
      <el-button :loading="isDisable" @click="updateInfo" type="primary">{{
        saveBtnText
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import moment from "moment";
import Vue from "vue";

import { Bonus, Department } from "@/interface/list-data";
import { computeOffice } from "@/static-data/work-order";
import { fetchDepartmentList, postData } from "@/utils/fetchData";
import { allNotNull } from "@/utils/validate";

export default Vue.extend({
  props: { data: Object, dataIndex: Number, isVisible: Boolean },
  data() {
    return {
      isLoading: true,
      isDisable: false,
      editIsDisable: true,
      statusIsVisible: false,
      form: {},
      options: {
        department: [],
        computeOfficeList: computeOffice
      }
    };
  },
  methods: {
    close() {
      this.$emit("toggle-is-visible", false);
    },
    updateInfo() {
      if (
        allNotNull(
          Object.assign({}, this.form, {
            null1: "validate",
            null2: "validate",
            null3: "validate",
            updateTime: "validate"
          })
        )
      ) {
        this.isDisable = true;

        postData("/api/root/bonus/update", this.form)
          .then(() => {
            // 更新表格
            this.$emit("update-table-data", this.dataIndex, this.form);

            this.$message({
              message: "用户信息保存成功",
              type: "success"
            });
          })
          .catch((err: string) => {
            this.$message({
              message: err || "未知错误",
              type: "warning"
            });
          })
          .finally(() => {
            this.isDisable = false;
            this.close();
          });
      } else {
        this.$message({
          message: "填写尚不完整，请补全后提交",
          type: "warning"
        });
      }
    }
  },
  computed: {
    saveBtnText() {
      return this.$data.isDisable ? "正在保存..." : "保存编辑";
    },
    lastModifiedTime() {
      const form: Bonus = this.$data.form;
      return moment(
        form.updateTime === null ? form.createTime : form.updateTime
      ).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  watch: {
    data(newValue: Bonus) {
      // 深拷贝一份，防止覆盖原数据，影响操作
      const form: Bonus = JSON.parse(JSON.stringify(newValue));
      // 赋给表单
      this.form = form;
    }
  },
  created() {
    this.isLoading = true;

    // 请求院部列表
    fetchDepartmentList()
      .then(
        (data: Department[]) =>
          ((this.options as {
            department: Department[];
          }).department = data)
      )
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取院部列表",
          type: "warning"
        });
      })
      .finally(() => (this.isLoading = false));
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
