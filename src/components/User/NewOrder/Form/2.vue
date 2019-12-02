/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:46:18 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-18 21:32:15
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

    <el-form-item class="form-item" label="成果名称" prop="production" required>
      <el-input v-model="form.production" placeholder="请输入成果名称"></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="第一作者" required>
      <el-input v-model="form.name" placeholder="请输入第一作者"></el-input>
    </el-form-item>

    <el-form-item label="组员">
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
      <el-button v-else class="button-new-member" @click="showMemberInput()" plain>+ 新组员</el-button>
    </el-form-item>

    <el-form-item class="form-item" label="成果类别" prop="sort" required>
      <el-cascader
        v-model="form.sort"
        placeholder="请选择，或输入以查找"
        :options="options.sort"
        :props="{ expandTrigger: 'hover' }"
        :show-all-levels="false"
        filterable
      ></el-cascader>
    </el-form-item>

    <el-form-item class="form-item" label="发表刊物/出版社/授权单位" prop="unit" required>
      <el-input v-model="form.unit" placeholder="请输入发表刊物/出版社/授权单位"></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="是否被转让（仅限专利）" prop="patent" required>
      <el-select v-model="form.patent" placeholder="请选择">
        <el-option
          v-for="item in options.patent"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="form-item" label="发表/出版/授权时间" prop="publishTime" required>
      <el-date-picker
        align="center"
        v-model="form.publishTime"
        type="month"
        placeholder="发表/出版/授权时间"
      ></el-date-picker>
    </el-form-item>

    <el-form-item class="form-item" label="佐证材料" prop="uploadField">
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

interface Type {
  label: string;
  value: string | number;
  children: Type[];
}

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
      sort: [],
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
        sort: [],
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
      rules: {
        production: [{ validator: validateProjectName, trigger: "blur" }],
        name: [{ validaor: validatePrincipalNames, trigger: "blur" }],
        unit: [{ validator: validateSponsor, trigger: "blur" }],
        sort: [{ validator: validateHonor, trigger: "blur" }],
        publishTime: [{ validator: validateHonorDate, trigger: "blur" }]
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
          for (const key in this.options.sort) {
            if (this.options.sort.hasOwnProperty(key)) {
              const object = this.options.sort[key] as Type;

              if (object.value === this.sort[0]) {
                this.form.class2 = object.label;

                for (const key2 in object.children) {
                  if (object.children.hasOwnProperty(key2)) {
                    const element = object.children[key2];

                    if (element.value === this.sort[1]) {
                      this.form.class3 = object.label;
                    }
                  }
                }
              }
            }
          }
          this.$store.commit(
            "orderForm",
            Object.assign({}, this.form, {
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
          this.options.sort = res.data.data;
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
@import "@/stylesheet/user-form.scss";
</style>