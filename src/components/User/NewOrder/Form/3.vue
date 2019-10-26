<template>
  <el-form
    class="form-part"
    :model="form"
    :rules="rules"
    ref="form"
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

    <el-form-item class="form-item" label="获奖名称" prop="projectName" required>
      <el-input v-model="form.projectName" placeholder="请输入获奖名称"></el-input>
    </el-form-item>

    <el-form-item label="获奖教师（第一）" required>
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
      <el-button v-else class="button-new-member" @click="showPrincipalInput()" plain>+ 获奖教师</el-button>
    </el-form-item>

    <el-form-item label="获奖成员">
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
    <!--  -->
    <el-form-item class="form-item" label="奖项" prop="level" required>
      <el-select v-model="form.level" placeholder="请选择，或输入以查找" filterable>
        <el-option
          v-for="item in options.level"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="form-item" label="项目类型" prop="bonusClass" required>
      <el-cascader
        v-model="form.bonusClass"
        placeholder="请选择，或输入以查找"
        :options="options.bonusClass"
        :props="{ expandTrigger: 'hover' }"
        :show-all-levels="false"
        filterable
      ></el-cascader>
    </el-form-item>
    <el-form-item class="form-item" label="级别" prop="rank" required>
      <el-select v-model="form.rank" placeholder="请选择，或输入以查找" filterable>
        <el-option
          v-for="item in options.rank"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="form-item" label="颁奖部门" prop="sponsor" required>
      <el-input v-model="form.sponsor" placeholder="请输入颁奖部门"></el-input>
    </el-form-item>
    <el-form-item class="form-item" label="获奖时间" prop="honorDate" required>
      <el-date-picker v-model="form.honorDate" type="date" placeholder="获奖时间"></el-date-picker>
    </el-form-item>
    <el-form-item class="form-item" label="证书" prop="uploadField" required>
      <el-upload class="upload-demo" drag action multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <!--  -->
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
        callback(new Error("获奖名称不能为空"));
      }
    };

    const validatePrincipalNames = (
      rule: object,
      value: string,
      callback: (callback: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("获奖教师不能为空"));
      }
    };

    const validateSponsor = (
      rule: object,
      value: string,
      callback: (callback: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("颁奖部门不能为空"));
      }
    };

    const validateHonorDate = (
      rule: object,
      value: string,
      callback: (callback: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("获奖时间不能为空"));
      }
    };

    return {
      form: {
        department: "",
        projectName: "",
        principalNames: [],
        memberNames: [],
        sponsor: "",
        honorDate: "",
        level: "",
        rank: "",
        bonusClass: ""
      },
      options: {
        department: [],
        level: [],
        rank: [],
        bonusClass: []
      },
      rules: {
        projectName: [{ validator: validateProjectName, trigger: "blur" }],
        principalNames: [{ validaor: validatePrincipalNames, trigger: "blur" }],
        sponsor: [{ validator: validateSponsor, trigger: "blur" }],
        honorDate: [{ validator: validateHonorDate, trigger: "blur" }]
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
    const stateToken = this.$store.state.userInfo.token;

    // 请求院部列表
    (this as any).$axios
      .post(
        "/departmentList",
        {},
        {
          headers: {
            token: stateToken
          }
        }
      )
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

    // 请求奖项列表
    (this as any).$axios
      .post(
        "/levelList",
        {},
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 1) {
          this.options.level = res.data.data;
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
        }
      });

    // 请求级别列表
    (this as any).$axios
      .post(
        "/rankList",
        {},
        {
          headers: {
            token: stateToken
          }
        }
      )
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

    // 请求类型列表
    (this as any).$axios
      .post(
        "/bonusClassList",
        {},
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 1) {
          this.options.bonusClass = res.data.data;
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

.btn-line {
  display: flex;
  justify-content: flex-end;
}
</style>