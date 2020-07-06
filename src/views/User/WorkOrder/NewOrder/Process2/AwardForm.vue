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
        v-model="form.department"
        placeholder="请选择，或输入以查找"
        filterable
        disabled
      >
        <el-option
          :key="item.value"
          v-for="item in options.department"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="form-item" label="获奖名称" prop="content">
      <el-input v-model="form.content" placeholder="请输入获奖名称"></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="获奖教师（第一）">
      <el-input
        v-model="form.name"
        placeholder="请输入获奖教师（第一）"
      ></el-input>
    </el-form-item>

    <el-form-item label="获奖成员">
      <el-tag
        :key="name"
        v-for="name in form.teammate"
        closable
        @close="handleClose(form.teammate, name)"
        >{{ name }}</el-tag
      >
      <el-input
        class="input-new-member"
        v-if="etc.teammate.inputVisible"
        v-model="etc.inputValue"
        ref="memberInput"
        @keyup.enter.native="
          handleInputConfirm(form.teammate, etc.teammate.inputVisible)
        "
        @blur="handleInputConfirm(form.teammate, etc.teammate.inputVisible)"
      ></el-input>
      <el-button
        v-else
        class="button-new-member"
        @click="showMemberInput()"
        plain
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

    <el-form-item class="form-item" label="获奖类型" prop="sort">
      <el-cascader
        v-model="sort"
        placeholder="请选择，或输入以查找"
        :options="options.sort"
        :props="{ expandTrigger: 'hover' }"
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
          :key="item.value"
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
        type="month"
        format="yyyy 年 MM 月"
        value-format="yyyy-MM"
        placeholder="获奖时间"
      ></el-date-picker>
    </el-form-item>

    <el-form-item class="form-item" label="证书" prop="uploadField">
      <upload-btn files="certificate"></upload-btn>
    </el-form-item>

    <el-form-item class="form-item btn-line">
      <el-button plain @click="repealActive">上一步</el-button>
      <submit-btn @next="nextActive"></submit-btn>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";
import SubmitBtn from "@/components/User/SubmitFormBtn.vue";
import UploadBtn from "@/components/User/UploadBtn.vue";
import {
  fetchKindList,
  fetchLevelList,
  fetchPrizeList,
  fetchDepartmentList,
} from "@/utils/fetchList";
import { Department } from "@/interface/list-data";
import FilterVue from "../../../../OfficeAdmin/Main/WorkOrderManager/Construction/Filter.vue";

interface Type {
  label: string;
  value: string | number;
  children: Type[];
}

export default Vue.extend({
  components: {
    SubmitBtn,
    UploadBtn,
  },
  data() {
    return {
      sort: [],
      form: {
        department: "",
        content: "",
        name: "",
        teammate: [],
        awardUnit: "",
        awardTime: "",
        prize: "",
        level: "",
        class2: "",
        class3: "",
      },
      options: {
        department: [],
        prize: [],
        level: [],
        sort: [],
      },
      etc: {
        name: {
          inputVisible: false,
        },
        teammate: {
          inputVisible: false,
        },
        inputValue: "",
      },
    };
  },
  methods: {
    handleClose(nameField: string[], member: string) {
      nameField.splice(nameField.indexOf(member), 1);
    },
    showPrincipalInput() {
      this.etc.name.inputVisible = true;
      this.$nextTick(() => {
        (this as any).$refs.principalInput.$refs.input.focus();
      });
    },
    showMemberInput() {
      this.etc.teammate.inputVisible = true;
      this.$nextTick(() => {
        (this as any).$refs.memberInput.$refs.input.focus();
      });
    },
    handleInputConfirm(nameField: string[], inputVisible: boolean) {
      const inputValue = this.etc.inputValue;
      if (inputValue) {
        nameField.push(inputValue);
      }
      if (this.etc.name.inputVisible === inputVisible) {
        this.etc.name.inputVisible = false;
      } else {
        this.etc.teammate.inputVisible = false;
      }
      this.etc.inputValue = "";
    },
    repealActive() {
      this.$store.commit("repealActive");
    },
    nextActive() {
      for (const key in this.options.sort) {
        if (this.options.sort.hasOwnProperty(key)) {
          const object = this.options.sort[key] as Type;

          if (object.value === this.sort[0]) {
            this.form.class2 = object.label;

            for (const key2 in object.children) {
              if (object.children.hasOwnProperty(key2)) {
                const element = object.children[key2];

                if (element.value === this.sort[1]) {
                  this.form.class3 = element.label;
                }
              }
            }
          }
        }
      }

      this.$store.commit(
        "orderForm",
        Object.assign(this.form, {
          teammate: this.form.teammate.toString(),
        })
      );
    },
  },
  created() {
    // 默认部门为自己的部门
    this.form.department = this.$store.state.userInfo.department;

    // 请求院部列表
    fetchDepartmentList()
      .then((data: Department[]) => ((this.options.department as any) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取院部列表",
          type: "warning",
        });
      });

    // 请求奖项列表
    fetchPrizeList()
      .then((data: Department[]) => ((this.options.prize as any) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取奖项列表",
          type: "warning",
        });
      });

    // 请求级别列表
    fetchLevelList()
      .then((data: Department[]) => ((this.options.level as any) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取获奖级别列表",
          type: "warning",
        });
      });

    // 请求获奖类型列表
    fetchKindList({
      params: {
        class1: "获奖类",
      },
    })
      .then((data: Department[]) => ((this.options.sort as any) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取获奖类型列表",
          type: "warning",
        });
      });
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheet/user-form.scss";
</style>
