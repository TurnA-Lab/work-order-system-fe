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
      >
        <el-option
          :key="item.value"
          v-for="item in options.department"
          :label="item.label"
          :value="item.label"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item class="form-item" label="项目名称" prop="project">
      <el-input v-model="form.project" placeholder="请输入项目名称"></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="项目负责人" prop="name">
      <el-input v-model="form.name" placeholder="请输入项目负责人"></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="课题组成员">
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

    <el-form-item class="form-item" label="立项年月" prop="startTime">
      <el-date-picker
        align="center"
        v-model="form.startTime"
        type="month"
        format="yyyy 年 MM 月"
        value-format="yyyy-MM"
        placeholder="请选择立项年月"
      ></el-date-picker>
    </el-form-item>

    <el-form-item class="form-item" label="项目起止年月" prop="beginToEndTime">
      <el-date-picker
        align="center"
        v-model="form.beginToEndTime"
        type="daterange"
        format="yyyy 年 MM 月"
        value-format="yyyy-MM"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form-item>

    <el-form-item class="form-item" label="主办单位" prop="sponsor">
      <el-input v-model="form.sponsor" placeholder="请输入主办单位"></el-input>
    </el-form-item>

    <el-form-item class="form-item" label="项目类型" prop="sort">
      <el-cascader
        v-model="sort"
        placeholder="请选择，或输入以查找"
        :options="options.sort"
        :props="{ expandTrigger: 'hover' }"
        :show-all-levels="false"
        filterable
      ></el-cascader>
    </el-form-item>

    <el-form-item class="form-item" label="项目级别" prop="level">
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
import { AxiosResponse } from "axios";
import SubmitBtn from "../Etc/SubmitFormBtn.vue";
import UploadBtn from "../Etc/UploadBtn.vue";
import validate from "@/utils/validate";

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
    return {
      sort: [],
      form: {
        department: "",
        project: "",
        name: "",
        teammate: [],
        startTime: "",
        beginToEndTime: "",
        sponsor: "",
        level: "",
        class2: "",
        class3: ""
      },
      options: {
        department: [],
        sort: [],
        level: []
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
      for (const key in this.sort) {
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
        Object.assign({}, this.form, {
          teammate: this.form.teammate.toString(),
          beginToEndTime: this.form.beginToEndTime.toString()
        })
      );
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

    // 请求项目类型列表
    this.$http
      .post(
        "/api/online/getTypeList",
        {
          class1: "建设类"
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
            message: res.data.msg || "由于未知因素，无法获取项目类型列表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法获取项目类型列表",
          type: "warning"
        });
      });

    // 请求项目级别列表
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
            message: res.data.msg || "由于未知因素，无法获取项目级别列表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法获取项目级别列表",
          type: "warning"
        });
      });
  }
});
</script>

<style lang="scss" scoped>
@import "@/stylesheet/user-form.scss";
</style>
