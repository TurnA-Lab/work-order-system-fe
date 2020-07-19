<template>
  <el-form
    class="form-part"
    :model="form"
    ref="form"
    size="medium"
    label-position="left"
    label-width="auto"
  >
    <el-form-item class="form-item" label="院部" prop="department">
      <el-select
        v-model="form.dptName"
        placeholder="请选择，或输入以查找"
        filterable
        disabled
      >
        <el-option
          v-for="item in options.department"
          :key="item.id"
          :label="item.dptName"
          :value="item.dptName"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="form-item" label="获奖名称" prop="content">
      <el-input v-model="form.content" placeholder="请输入获奖名称"></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="获奖教师（第一）" prop="name">
      <el-input
        v-model="form.name"
        placeholder="请输入获奖教师（第一）"
        disabled
      ></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="课题组成员" prop="teammate">
      <el-tag
        :key="name"
        v-for="name in teammate"
        closable
        @close="handleClose(teammate, name)"
        >{{ name }}</el-tag
      >
      <el-input
        class="input-new-member"
        v-if="teammateInputVisible"
        v-model.trim="teammateInputValue"
        ref="memberInput"
        @keyup.enter.native="handleInputConfirm(form.teammate)"
        @blur="handleInputConfirm(form.teammate)"
      ></el-input>
      <el-button v-else class="button-new-member" @click="showMemberInput" plain
        >+ 新成员</el-button
      >
    </el-form-item>

    <el-form-item class="form-item" label="奖项" prop="prize">
      <el-select
        v-model="form.prize"
        placeholder="请选择，或输入以查找"
        filterable
      >
        <el-option
          v-for="item in options.prize"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="form-item" label="获奖类型" prop="kind">
      <el-cascader
        v-model="kind"
        placeholder="请选择，或输入以查找"
        :options="options.kind"
        :props="{ expandTrigger: 'hover', value: 'label' }"
        :show-all-levels="false"
        filterable
      ></el-cascader>
    </el-form-item>

    <el-form-item class="form-item" label="级别" prop="level">
      <el-select
        v-model="form.level"
        placeholder="请选择，或输入以查找"
        filterable
      >
        <el-option
          v-for="item in options.level"
          :key="item.id"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="form-item" label="颁奖部门" prop="awardUnit">
      <el-input
        v-model="form.awardUnit"
        placeholder="请输入颁奖部门"
      ></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="获奖时间" prop="awardTime">
      <el-date-picker
        align="center"
        v-model="form.awardTime"
        type="date"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        placeholder="获奖时间"
      ></el-date-picker>
    </el-form-item>

    <el-form-item class="form-item" label="证书" prop="testimonial">
      <upload-btn files="testimonial"></upload-btn>
    </el-form-item>

    <el-form-item class="form-item btn-line">
      <el-button plain @click="repealActive">上一步</el-button>
      <submit-btn @next="nextActive"></submit-btn>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from "vue";

import SubmitBtn from "@/components/User/SubmitFormBtn.vue";
import UploadBtn from "@/components/User/UploadBtn.vue";
import { Award, Department, Level } from "@/interface/list-data";
import {
  fetchDepartmentList,
  fetchKindList,
  fetchLevelList,
  fetchPrizeList
} from "@/utils/fetchData";

export default Vue.extend({
  components: {
    SubmitBtn,
    UploadBtn
  },
  data() {
    return {
      isLoading: true,
      kind: [],
      teammate: [],
      teammateInputVisible: false,
      teammateInputValue: "",
      form: {
        dptName: "",
        content: "",
        name: "",
        awardUnit: "",
        awardTime: "",
        prize: "",
        level: "",
        class2: "",
        class3: ""
      },
      options: {
        department: [],
        prize: [],
        level: [],
        kind: []
      }
    };
  },
  methods: {
    handleClose(nameField: string[], member: string) {
      nameField.splice(nameField.indexOf(member), 1);
    },
    showMemberInput() {
      this.teammateInputVisible = true;
      this.$nextTick(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).$refs.memberInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      const inputValue = this.teammateInputValue;
      if (inputValue && typeof inputValue === "string") {
        (this.teammate as string[]).push(inputValue);
      }
      this.teammateInputVisible = false;
      this.teammateInputValue = "";
    },
    repealActive() {
      this.$store.commit("repealActive");
    },
    nextActive() {
      this.$store.commit(
        "orderForm",
        Object.assign(this.form, {
          class2: this.kind[0],
          class3: this.kind[1],
          teammate: this.teammate.join("、"),
          status: 0
        })
      );
    }
  },
  created() {
    // 获取个人信息
    const userInfo = this.$store.state.userInfo;
    // 默认部门为自己的部门
    this.form.dptName = userInfo.department;
    // 默认负责人是自己
    this.form.name = userInfo.name;

    // 请求院部列表
    const department = fetchDepartmentList()
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

    // 请求奖项列表
    const prize = fetchPrizeList()
      .then(
        (data: Department[]) => ((this.options.prize as Department[]) = data)
      )
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取奖项列表",
          type: "warning"
        });
      });

    // 请求级别列表
    const level = fetchLevelList()
      .then((data: Level[]) => ((this.options.level as Level[]) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取获奖级别列表",
          type: "warning"
        });
      });

    // 请求获奖类型列表
    const kind = fetchKindList({
      params: {
        class1: "获奖类"
      }
    })
      .then((data: Award[]) => ((this.options.kind as Award[]) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取获奖类型列表",
          type: "warning"
        });
      });

    Promise.all([department, kind, level, prize]).then(() => {
      this.isLoading = false;
    });
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheet/user-form.scss";
</style>
