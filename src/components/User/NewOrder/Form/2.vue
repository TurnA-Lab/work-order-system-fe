/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:46:18 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-10-29 13:17:01
 */

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

    <el-form-item class="form-item" label="成果名称" prop="projectName" required>
      <el-input v-model="form.projectName" placeholder="请输入成果名称"></el-input>
    </el-form-item>

    <el-form-item label="第一作者" required>
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
      <el-button v-else class="button-new-member" @click="showPrincipalInput()" plain>+ 第一作者</el-button>
    </el-form-item>

    <el-form-item label="组员">
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
      <el-button v-else class="button-new-member" @click="showMemberInput()" plain>+ 新组员</el-button>
    </el-form-item>
    <!--  -->
    <el-form-item class="form-item" label="成果类别" prop="honor" required>
      <el-cascader
        v-model="form.honor"
        placeholder="请选择，或输入以查找"
        :options="options.honor"
        :props="{ expandTrigger: 'hover' }"
        :show-all-levels="false"
        filterable
      ></el-cascader>
    </el-form-item>
    <el-form-item class="form-item" label="发表刊物/出版社/授权单位" prop="sponsor" required>
      <el-input v-model="form.sponsor" placeholder="请输入发表刊物/出版社/授权单位"></el-input>
    </el-form-item>
    <el-form-item class="form-item" label="是否被转让（仅限专利）" prop="isTransfered" required>
      <el-select v-model="form.isTransfered" placeholder="请选择">
        <el-option
          v-for="item in options.isTransfered"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="form-item" label="发表/出版/授权时间" prop="honorDate" required>
      <el-date-picker v-model="form.honorDate" type="month" placeholder="发表/出版/授权时间"></el-date-picker>
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
        callback(new Error("成果名称不能为空"));
      }
    };

    const validatePrincipalNames = (
      rule: object,
      value: string,
      callback: (callback: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("第一作者不能为空"));
      }
    };

    const validateSponsor = (
      rule: object,
      value: string,
      callback: (callback: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("发表刊物/出版社/授权单位不能为空"));
      }
    };

    const validateHonor = (
      rule: object,
      value: string,
      callback: (callback: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("成果名称不能为空"));
      }
    };

    const validateHonorDate = (
      rule: object,
      value: string,
      callback: (callback: object | void) => void
    ) => {
      if (!value) {
        callback(new Error("发表/出版/授权时间不能为空"));
      }
    };

    return {
      form: {
        department: "",
        projectName: "",
        principalNames: [],
        memberNames: [],
        isTransfered: 0,
        sponsor: "",
        honor: "",
        honorDate: ""
      },
      options: {
        department: [],
        honor: [],
        isTransfered: [
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
      rules: {
        projectName: [{ validator: validateProjectName, trigger: "blur" }],
        principalNames: [{ validaor: validatePrincipalNames, trigger: "blur" }],
        sponsor: [{ validator: validateSponsor, trigger: "blur" }],
        honor: [{ validator: validateHonor, trigger: "blur" }],
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
    this.$http
      .post(
        "/api/online/getDepartmentList",
        {},
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.options.department = res.data.data;
        } else {
          this.$message({
            message: res.data.msg || "由于未知因素，无法获取院部列表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法获取院部列表",
          type: "warning"
        });
      });

    // 请求成果类型列表
    this.$http
      .post(
        "/api/online/getTypeList",
        {
          class1: "成果类"
        },
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.options.honor = res.data.data;
        } else {
          this.$message({
            message: res.data.msg || "由于未知因素，无法获取成果类型列表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法获取成果类型列表",
          type: "warning"
        });
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