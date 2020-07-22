<template>
  <el-dialog
    custom-class="edit-dialog"
    :visible="isVisible"
    :close-on-click-modal="false"
    @close="close"
    append-to-body
    v-loading="isLoading"
  >
    <div slot="title">
      编辑用户信息
      <span class="last-time">最后修改时间 {{ form.lastTime }}</span>
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
        <el-form-item class="form-item" label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="工号">
          <el-input v-model="form.worknum"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="性别">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option
              v-for="item in options.gender"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
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

        <el-form-item class="form-item" label="联系电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="出生年月">
          <el-date-picker
            align="center"
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="入校时间">
          <el-date-picker
            align="center"
            v-model="form.enterTime"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="职称">
          <el-input v-model="form.teacherTittle"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="最高学历">
          <el-input v-model="form.eduBgd"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="最高学位">
          <el-input v-model="form.degree"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="授学位单位名称">
          <el-input v-model="form.school"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="获最高学位的专业名称">
          <el-input v-model="form.major"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="是否双师型">
          <el-select v-model="form.doubleTeacher" placeholder="请选择">
            <el-option
              v-for="item in options.noOrYesList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="是否具有行业背景">
          <el-select v-model="form.background" placeholder="请选择">
            <el-option
              v-for="item in options.noOrYesList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="是否博士生导师">
          <el-select v-model="form.tutor" placeholder="请选择">
            <el-option
              v-for="item in options.noOrYesList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" class="dialog-btn-line">
      <el-button @click="close" type="primary" plain>取消编辑</el-button>
      <el-button :loading="isDisable" @click="updateUserInfo" type="primary">{{
        saveBtnText
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";

import { Department } from "@/interface/list-data";
import { UserInfo } from "@/interface/user";
import { genderList, noOrYesList } from "@/static-data/work-order";
import { fetchDepartmentList, postData } from "@/utils/fetchData";
import { allNotNull } from "@/utils/validate";

export default Vue.extend({
  props: { userData: Object, dataIndex: Number, isVisible: Boolean },
  data() {
    return {
      isLoading: true,
      isDisable: false,
      form: {},
      options: {
        department: [],
        gender: genderList,
        noOrYesList
      }
    };
  },
  methods: {
    close() {
      this.$emit("toggle-is-visible", false);
    },
    updateUserInfo() {
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

        postData("/api/root/user/updateInfo", this.form)
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
    }
  },
  watch: {
    userData(newValue: UserInfo) {
      // 深拷贝一份，防止覆盖原数据，影响操作
      const form: UserInfo = JSON.parse(JSON.stringify(newValue));
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
          ((this.options.department as Department[]) = data)
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
