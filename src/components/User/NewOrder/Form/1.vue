<template>
  <el-form
    class="form-part"
    :model="form"
    ref="form"
    :rules="rules"
    size="medium"
    label-position="left"
    label-width="auto"
  >
    <el-form-item class="form-item" label="院部" prop="department" required>
      <el-select v-model="form.department" placeholder="请选择，或输入以查找" filterable>
        <el-option
          :key="item.value"
          v-for="item in options.department"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="form-item" label="项目名称" prop="projectName" required>
      <el-input v-model="form.projectName" placeholder="请输入项目名称"></el-input>
    </el-form-item>
    <el-form-item label="项目负责人" required>
      <el-tag
        :key="name"
        v-for="name in form.principalNames"
        closable
        @close="handleClose(form.principalNames,name)"
      >{{name}}</el-tag>
      <el-input
        class="input-new-member"
        v-if="etc.principalNames.inputVisible"
        v-model="etc.inputValue"
        ref="principalInput"
        @keyup.enter.native="handleInputConfirm(form.principalNames,etc.principalNames.inputVisible)"
        @blur="handleInputConfirm(form.principalNames,etc.principalNames.inputVisible)"
      ></el-input>
      <el-button v-else class="button-new-member" @click="showPrincipalInput()" plain>+ 新负责人</el-button>
    </el-form-item>
    <el-form-item label="课题组成员">
      <el-tag
        :key="name"
        v-for="name in form.memberNames"
        closable
        @close="handleClose(form.memberNames,name)"
      >{{name}}</el-tag>
      <el-input
        class="input-new-member"
        v-if="etc.memberNames.inputVisible"
        v-model="etc.inputValue"
        ref="memberInput"
        @keyup.enter.native="handleInputConfirm(form.memberNames,etc.memberNames.inputVisible)"
        @blur="handleInputConfirm(form.memberNames,etc.memberNames.inputVisible)"
      ></el-input>
      <el-button v-else class="button-new-member" @click="showMemberInput()" plain>+ 新成员</el-button>
    </el-form-item>
    <el-form-item class="form-item" label="立项年度" prop="projectYear" required>
      <el-date-picker v-model="form.projectYear" type="year" placeholder="请选择立项年度"></el-date-picker>
    </el-form-item>
    <el-form-item class="form-item" label="项目起止年月" prop="startNEndDate" required>
      <el-date-picker
        v-model="form.startNEndDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form-item>
    <el-form-item class="form-item" label="主办单位" prop="sponsor" required>
      <el-input v-model="form.sponsor" placeholder="请输入主办单位"></el-input>
    </el-form-item>
    <el-form-item class="form-item" label="项目类型" prop="sort" required>
      <el-cascader
        v-model="form.sort"
        placeholder="请选择，或输入以查找"
        :options="options.sort"
        :props="{ expandTrigger: 'hover' }"
        :show-all-levels="false"
        filterable
      ></el-cascader>
    </el-form-item>
    <el-form-item class="form-item" label="项目级别" prop="rank" required>
      <el-select v-model="form.rank" placeholder="请选择，或输入以查找" filterable>
        <el-option
          v-for="item in options.rank"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="form-item" label="佐证材料" prop="uploadField" required>
      <el-upload class="upload-demo" drag action multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item class="form-item btn-line">
      <el-button plain @click="repealActive">上一步</el-button>
      <submit-btn @click="nextActive"></submit-btn>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";
import submitBtn from "../Etc/submitFormBtn.vue";

export default Vue.extend({
  components: {
    submitBtn
  },
  data() {
    const validateProjectName = (
      rule: object,
      value: string,
      callback: (callback: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("项目名称不能为空"));
      }
    };

    const validatePrincipalNames = (
      rule: object,
      value: string,
      callback: (callback: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("负责人不能为空"));
      }
    };

    const validateProjectYear = (
      rule: object,
      value: string,
      callback: (callback: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("立项年度不能为空"));
      }
    };

    const validateStartNEndDate = (
      rule: object,
      value: string,
      callback: (callback: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("起止年月不能为空"));
      }
    };

    const validateSponsor = (
      rule: object,
      value: string,
      callback: (callback: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("主办单位不能为空"));
      }
    };

    return {
      form: {
        department: "",
        projectName: "",
        principalNames: [],
        memberNames: [],
        projectYear: "",
        startNEndDate: "",
        sponsor: "",
        sort: "",
        rank: ""
      },
      options: {
        department: [],
        sort: [],
        rank: []
      },
      rules: {
        projectName: [{ validator: validateProjectName, trigger: "blur" }],
        principalNames: [{ validaor: validatePrincipalNames, trigger: "blur" }],
        projectYear: [{ validator: validateProjectYear, trigger: "blur" }],
        startNEndDate: [{ validator: validateStartNEndDate, trigger: "blur" }],
        sponsor: [{ validator: validateSponsor, trigger: "blur" }]
      },
      etc: {
        principalNames: {
          inputVisible: false
        },
        memberNames: {
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
      this.etc.principalNames.inputVisible = true;
      this.$nextTick(() => {
        (this as any).$refs.principalInput.$refs.input.focus();
      });
    },
    showMemberInput() {
      this.etc.memberNames.inputVisible = true;
      this.$nextTick(() => {
        (this as any).$refs.memberInput.$refs.input.focus();
      });
    },
    handleInputConfirm(nameField: string[], inputVisible: boolean) {
      const inputValue = this.etc.inputValue;
      if (inputValue) {
        nameField.push(inputValue);
      }
      if (this.etc.principalNames.inputVisible === inputVisible) {
        this.etc.principalNames.inputVisible = false;
      } else {
        this.etc.memberNames.inputVisible = false;
      }
      this.etc.inputValue = "";
    },
    repealActive() {
      this.$store.commit("repealActive");
    },
    nextActive() {
      this.$store.commit("orderForm", this.form);
    }
  },
  created() {
    // 请求院部列表
    (this as any).$axios
      .post("/departmentList", {
        token: this.$store.state.userInfo.token
      })
      .then((res: AxiosResponse) => {
        if (res.data.code === 1) {
          this.options.department = res.data.data;
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
      });

    // 请求项目类别列表
    (this as any).$axios
      .post("/sortList", {
        token: this.$store.state.userInfo.token
      })
      .then((res: AxiosResponse) => {
        if (res.data.code === 1) {
          this.options.sort = res.data.data;
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
      });

    // 请求项目级别列表
    (this as any).$axios
      .post("/rankList", {
        token: this.$store.state.userInfo.token
      })
      .then((res: AxiosResponse) => {
        if (res.data.code === 1) {
          this.options.rank = res.data.data;
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
      });
  }
});
</script>

<style lang="scss" scoped>
.form-part {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  height: 70vh;
  user-select: none;

  .form-item {
    width: 480px;
  }
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-member {
  height: 36px;
  line-height: 36px;
  padding-top: 0;
  padding-bottom: 0;

  color: #bbbbbb;

  .el-tag + & {
    margin-left: 10px;
  }
}

.input-new-member {
  height: 36px;
  width: 120px;
  // vertical-align: bottom;

  .el-tag + & {
    margin-left: 10px;
  }
}

.uploadField {
  -webkit-column-break-before: always;
}

.btn-line {
  display: flex;
  justify-content: flex-end;
}
</style>