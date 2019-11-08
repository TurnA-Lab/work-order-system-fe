/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:46:28 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-08 23:33:12
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
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="form-item" label="获奖名称" prop="content" required>
      <el-input v-model="form.content" placeholder="请输入获奖名称"></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="获奖教师（第一）" required>
      <el-input v-model="form.name" placeholder="请输入获奖教师（第一）"></el-input>
    </el-form-item>

    <el-form-item label="获奖成员">
      <el-tag
        :key="name"
        v-for="name in form.teammate"
        closable
        @close="handleClose(form.teammate,name)"
      >{{name}}</el-tag>
      <el-input
        class="input-new-member"
        v-if="etc.teammate.inputVisible"
        v-model="etc.inputValue"
        ref="memberInput"
        @keyup.enter.native="handleInputConfirm(form.teammate,etc.teammate.inputVisible)"
        @blur="handleInputConfirm(form.teammate,etc.teammate.inputVisible)"
      ></el-input>
      <el-button v-else class="button-new-member" @click="showMemberInput()" plain>+ 新成员</el-button>
    </el-form-item>
    <el-form-item class="form-item" label="奖项" prop="prize" required>
      <el-select v-model="form.prize" placeholder="请选择，或输入以查找" filterable>
        <el-option
          v-for="item in options.prize"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="form-item" label="获奖类型" prop="sort" required>
      <el-cascader
        v-model="form.sort"
        placeholder="请选择，或输入以查找"
        :options="options.sort"
        :props="{ expandTrigger: 'hover' }"
        :show-all-levels="false"
        filterable
      ></el-cascader>
    </el-form-item>
    <el-form-item class="form-item" label="级别" prop="level" required>
      <el-select v-model="form.level" placeholder="请选择，或输入以查找" filterable>
        <el-option
          v-for="item in options.level"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item class="form-item" label="颁奖部门" prop="awardUnit" required>
      <el-input v-model="form.awardUnit" placeholder="请输入颁奖部门"></el-input>
    </el-form-item>
    <el-form-item class="form-item" label="获奖时间" prop="awardTime" required>
      <el-date-picker v-model="form.awardTime" type="date" placeholder="获奖时间"></el-date-picker>
    </el-form-item>
    <el-form-item class="form-item" label="证书" prop="uploadField">
      <upload-btn></upload-btn>
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
import SubmitBtn from "../Etc/SubmitFormBtn.vue";
import UploadBtn from "../Etc/UploadBtn.vue";

export default Vue.extend({
  components: {
    SubmitBtn,
    UploadBtn
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
        content: "",
        name: "",
        teammate: [],
        awardUnit: "",
        awardTime: "",
        prize: "",
        level: "",
        sort: ""
      },
      options: {
        department: [],
        prize: [],
        level: [],
        sort: []
      },
      rules: {
        content: [{ validator: validateProjectName, trigger: "blur" }],
        name: [{ validaor: validatePrincipalNames, trigger: "blur" }],
        awardUnit: [{ validator: validateSponsor, trigger: "blur" }],
        awardTime: [{ validator: validateHonorDate, trigger: "blur" }]
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
      (this as any).$refs.form.validate((valid: boolean) => {
        if (valid) {
          this.$store.commit(
            "orderForm",
            Object.assign(this.form, {
              class2: this.form.sort[0],
              class3: this.form.sort[1],
              teammate: this.form.teammate.toString()
            })
          );
        }
      });
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

    // 请求奖项列表
    this.$http
      .post(
        "/api/online/getPrizeList",
        {},
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.options.prize = res.data.data;
        } else {
          this.$message({
            message: res.data.msg || "由于未知因素，无法获取奖项列表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法获取奖项列表",
          type: "warning"
        });
      });

    // 请求级别列表
    this.$http
      .post(
        "/api/online/getLevelSet",
        {},
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.options.level = res.data.data;
        } else {
          this.$message({
            message: res.data.msg || "由于未知因素，无法获取获奖级别列表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法获取获奖级别列表",
          type: "warning"
        });
      });

    // 请求获奖类型列表
    this.$http
      .post(
        "/api/online/getTypeList",
        {
          class1: "获奖类"
        },
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.options.sort = res.data.data;
        } else {
          this.$message({
            message: res.data.msg || "由于未知因素，无法获取获奖类型列表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法获取获奖类型列表",
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