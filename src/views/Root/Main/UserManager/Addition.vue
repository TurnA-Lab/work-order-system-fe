<template>
  <div>
    <div>
      <el-form
        :class="{ 'is-disable': isDisable }"
        ref="form"
        :model="form"
        size="medium"
        label-position="right"
        label-width="160px"
      >
        <el-form-item class="form-item" label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="工号" prop="worknum">
          <el-input v-model="form.worknum" placeholder="请输入工号"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option
              v-for="item in options.gender"
              :key="item.key"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="院部" prop="department">
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

        <el-form-item class="form-item" label="联系电话" prop="phone">
          <el-input
            v-model="form.phone"
            placeholder="请输入联系电话"
          ></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="出生年月" prop="birthday">
          <el-date-picker
            align="center"
            v-model="form.birthday"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="入校时间" prop="enterTime">
          <el-date-picker
            align="center"
            v-model="form.enterTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="职称" prop="teacherTitle">
          <el-input
            v-model="form.teacherTitle"
            placeholder="请输入职称"
          ></el-input>
        </el-form-item>

        <el-form-item
          class="form-item"
          label="最高学历"
          prop="educationBackground"
        >
          <el-input
            v-model="form.educationBackground"
            placeholder="请输入最高学历"
          ></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="最高学位" prop="degree">
          <el-input
            v-model="form.degree"
            placeholder="请输入最高学位"
          ></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="授学位单位名称" prop="school">
          <el-input
            v-model="form.school"
            placeholder="请输入授学位单位名称"
          ></el-input>
        </el-form-item>

        <el-form-item
          class="form-item"
          label="获最高学位的专业名称"
          prop="major"
        >
          <el-input
            v-model="form.major"
            placeholder="请输入获最高学位的专业名称"
          ></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="是否双师型" prop="doubleTeacher">
          <el-select v-model="form.doubleTeacher" placeholder="请选择">
            <el-option
              v-for="item in options.noOrYesList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          class="form-item"
          label="是否具有行业背景"
          prop="background"
        >
          <el-select v-model="form.industryBackground" placeholder="请选择">
            <el-option
              v-for="item in options.noOrYesList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          class="form-item"
          label="是否博士生导师"
          prop="placeholder"
        >
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

    <div class="btn-line">
      <el-button @click="reset('form')" type="primary" plain>重置</el-button>
      <el-button :loading="isDisable" @click="addUserInfo" type="primary">{{
        saveBtnText
      }}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ElForm } from "element-ui/types/form";
import Vue from "vue";

import { Department } from "@/interface/list-data";
import { genderList, noOrYesList } from "@/static-data/work-order";
import { fetchDepartmentList, postData } from "@/utils/fetchData";
import { allNotNull } from "@/utils/validate";

export default Vue.extend({
  data() {
    return {
      isDisable: false,
      form: {
        birthday: "",
        degree: "",
        department: "",
        doubleTeacher: "",
        educationBackground: "",
        enterTime: "",
        gender: "",
        industryBackground: "",
        major: "",
        name: "",
        phone: "",
        worknum: "",
        school: "",
        teacherTitle: "",
        tutor: "",
        permission: 0
      },
      options: {
        department: [],
        gender: genderList,
        noOrYesList: noOrYesList
      }
    };
  },
  methods: {
    reset(formName: string) {
      (this.$refs[formName] as ElForm).resetFields();
    },
    addUserInfo() {
      console.log(this.form);

      if (
        allNotNull(
          Object.assign({}, this.form, {
            dtpId: "validate"
          })
        )
      ) {
        this.isDisable = true;

        postData("/api/root/user/addUser", this.form)
          .then(() => {
            this.$message({
              message: "用户信息添加成功",
              type: "success"
            });
          })
          .catch((err: string) =>
            this.$message({
              message: err || "未知错误，用户信息保存失败",
              type: "warning"
            })
          )
          .finally(() => (this.isDisable = false));
      } else {
        this.$message({
          message: "请填写完整后提交!",
          type: "warning"
        });
      }
    }
  },
  created() {
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
      });
  },
  computed: {
    saveBtnText() {
      return this.$data.isDisable ? "正在保存..." : "添加用户";
    }
  }
});
</script>

<style lang="scss" scoped>
.form-item {
  width: 450px;
}

.el-form {
  height: 78vh;
  width: inherit;
  overflow: auto;
}

.btn-line {
  position: absolute;
  bottom: 20px;
  right: 50px;
}

.is-disable {
  filter: blur(10px);
  cursor: not-allowed;
}
</style>
