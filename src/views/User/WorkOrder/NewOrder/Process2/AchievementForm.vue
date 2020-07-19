<template>
  <el-form
    class="form-part"
    :model="form"
    ref="form"
    size="medium"
    label-position="left"
    label-width="auto"
  >
    <el-form-item class="form-item" label="院部" prop="dptName">
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
      label="是否被转让（仅限专利）"
      prop="patent"
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
import { Department } from "@/interface/list-data";
import { fetchDepartmentList, fetchKindList } from "@/utils/fetchData";

interface Type {
  label: string;
  value: string | number;
  children: Type[];
}

const patentText = ["空", "是", "否"];

export default Vue.extend({
  components: {
    SubmitBtn,
    UploadBtn
  },
  data() {
    return {
      kind: [],
      form: {
        department: "",
        production: "",
        name: "",
        teammate: [],
        patent: "空",
        unit: "",
        publishTime: "",
        class2: "",
        class3: ""
      },
      options: {
        department: [],
        kind: [],
        patent: [
          {
            label: "空",
            value: 0
          },
          {
            label: "是",
            value: 1
          },
          {
            label: "否",
            value: 2
          }
        ]
      },
      etc: {
        name: {
          inputVisible: false
        },
        teammate: {
          inputVisible: false
        },
        inputValue: ""
      }
    };
  },
  methods: {
    handleClose(nameField: string[], member: string) {
      nameField.splice(nameField.indexOf(member), 1);
    },
    showPrincipalInput() {
      this.etc.name.inputVisible = true;
      this.$nextTick(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any).$refs.principalInput.$refs.input.focus();
      });
    },
    showMemberInput() {
      this.etc.teammate.inputVisible = true;
      this.$nextTick(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      this.$store.commit(
        "orderForm",
        Object.assign({}, this.form, {
          teammate: this.form.teammate.toString(),
          patent: patentText.indexOf(this.form.patent as string)
        })
      );
    }
  },
  created() {
    // 默认部门为自己的部门
    this.form.department = this.$store.state.userInfo.department;

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

    // 请求成果类型列表
    fetchKindList({
      params: {
        class1: "成果类"
      }
    })
      .then((data: Department[]) => ((this.options.kind as any) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取成果类型列表",
          type: "warning"
        });
      });
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/stylesheet/user-form.scss";
</style>
