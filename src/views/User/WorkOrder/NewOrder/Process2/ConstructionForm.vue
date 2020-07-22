<template>
  <el-form
    class="form-part"
    :model="form"
    ref="form"
    size="medium"
    label-position="left"
    label-width="auto"
    v-loading="isLoading"
  >
    <el-form-item class="form-item" label="院部" prop="department">
      <el-select
        v-model="form.department"
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

    <el-form-item class="form-item" label="项目名称" prop="project">
      <el-input v-model="form.project" placeholder="请输入项目名称"></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="项目负责人" prop="name">
      <el-input
        v-model="form.name"
        placeholder="请输入项目负责人"
        disabled
      ></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="成员">
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

    <el-form-item class="form-item" label="立项日期">
      <el-date-picker
        v-model="form.startTime"
        align="center"
        type="date"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        placeholder="请选择立项日期"
      ></el-date-picker>
    </el-form-item>

    <el-form-item class="form-item" label="项目起止年月">
      <el-date-picker
        v-model="startingAndEnding"
        align="center"
        format="yyyy 年 MM 月"
        value-format="yyyy/MM"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form-item>

    <el-form-item class="form-item" label="主办单位">
      <el-input v-model="form.sponsor" placeholder="请输入主办单位"></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="项目类型">
      <el-cascader
        v-model="kind"
        placeholder="请选择，或输入以查找"
        :options="options.kind"
        :props="{ expandTrigger: 'hover', value: 'label' }"
        :show-all-levels="false"
        filterable
      ></el-cascader>
    </el-form-item>

    <el-form-item class="form-item" label="项目级别">
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

    <el-form-item class="form-item" label="佐证材料" prop="uploadField">
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
import { Department, Kind, Level } from "@/interface/list-data";
import {
  fetchDepartmentList,
  fetchKindList,
  fetchLevelList
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
      startingAndEnding: [],
      teammate: [],
      teammateInputVisible: false,
      teammateInputValue: "",
      form: {
        department: "",
        project: "",
        name: "",
        startTime: "",
        sponsor: "",
        level: ""
      },
      options: {
        department: [],
        kind: [],
        level: []
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
          startingAndEnding: this.startingAndEnding.join("-")
        })
      );
    }
  },
  created() {
    // 加载中
    this.isLoading = true;

    // 获取个人信息
    const userInfo = this.$store.state.userInfo;
    // 默认部门为自己的部门
    this.form.department = userInfo.department;
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

    // 请求建设类型列表
    const kind = fetchKindList({
      params: {
        class1: "建设类"
      }
    })
      .then((data: Kind[]) => ((this.options.kind as Kind[]) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取建设类型列表",
          type: "warning"
        });
      });

    // 请求项目级别列表
    const level = fetchLevelList()
      .then((data: Level[]) => ((this.options.level as Level[]) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取获奖级别列表",
          type: "warning"
        });
      });

    Promise.all([department, kind, level]).then(() => {
      this.isLoading = false;
    });
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheet/user-form.scss";
</style>
