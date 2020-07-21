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

    <el-form-item class="form-item" label="成果名称" prop="production">
      <el-input
        v-model="form.production"
        placeholder="请输入成果名称"
      ></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="第一作者" prop="name">
      <el-input
        v-model="form.name"
        placeholder="请输入第一作者"
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

    <el-form-item class="form-item" label="成果类别" prop="kind">
      <el-cascader
        v-model="kind"
        placeholder="请选择，或输入以查找"
        :options="options.kind"
        :props="{ expandTrigger: 'hover', value: 'label' }"
        :show-all-levels="false"
        filterable
      ></el-cascader>
    </el-form-item>

    <el-form-item
      class="form-item"
      label="发表刊物/出版社/授权单位"
      prop="unit"
    >
      <el-input
        v-model="form.unit"
        placeholder="请输入发表刊物/出版社/授权单位"
      ></el-input>
    </el-form-item>

    <el-form-item
      class="form-item"
      label="是否被转让（非专利填否）"
      prop="isUsed"
    >
      <el-select v-model="form.isUsed" placeholder="请选择">
        <el-option
          v-for="item in options.patentisUsed"
          :key="item.key"
          :label="item.value"
          :value="item.key"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      class="form-item"
      label="发表/出版/授权时间"
      prop="publishTime"
    >
      <el-date-picker
        align="center"
        v-model="form.publishTime"
        type="month"
        format="yyyy 年 MM 月"
        value-format="yyyy-MM"
        placeholder="发表/出版/授权时间"
      ></el-date-picker>
    </el-form-item>

    <el-form-item class="form-item" label="佐证材料" prop="testimonial">
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
import { Achievement, Department } from "@/interface/list-data";
import { noOrYesList } from "@/static-data/work-order";
import { fetchDepartmentList, fetchKindList } from "@/utils/fetchData";

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
        department: "",
        production: "",
        name: "",
        unit: "",
        publishTime: "",
        isUsed: ""
      },
      options: {
        department: [],
        kind: [],
        patentisUsed: noOrYesList
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
        Object.assign({}, this.form, {
          class2: this.kind[0],
          class3: this.kind[1],
          teammate: this.teammate.join("、")
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

    // 请求成果类型列表
    const kind = fetchKindList({
      params: {
        class1: "成果类"
      }
    })
      .then(
        (data: Achievement[]) => ((this.options.kind as Achievement[]) = data)
      )
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取成果类型列表",
          type: "warning"
        });
      });

    Promise.all([department, kind]).then(() => {
      this.isLoading = false;
    });
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheet/user-form.scss";
</style>
