<template>
  <main>
    <el-form
      class="form-part"
      :model="form"
      ref="form"
      size="medium"
      label-position="left"
      label-width="auto"
    >
      <el-form-item label="院部">
        <el-select v-model="form.department" placeholder="请选择，或输入以查找" filterable>
          <el-option
            :key="item.value"
            v-for="item in options.department"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="form.projectName"></el-input>
      </el-form-item>
      <el-form-item label="项目负责人">
        <!-- <el-input v-model="form.principalName"></el-input> -->
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
        <el-button v-else class="button-new-member" @click="showPrincipalInput()">+ 新负责人</el-button>
      </el-form-item>
      <el-form-item label="课题组成员">
        <el-tag
          :key="name"
          v-for="name in form.memberNames"
          closable
          :disable-transitions="false"
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
        <el-button v-else class="button-new-member" @click="showMemberInput()">+ 新成员</el-button>
      </el-form-item>
      <el-form-item label="立项年度">
        <el-date-picker v-model="form.projectYear" type="year"></el-date-picker>
      </el-form-item>
      <el-form-item label="项目起止年月">
        <el-date-picker
          v-model="form.startNEndDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="主办单位">
        <el-input v-model="form.sponsor"></el-input>
      </el-form-item>
      <el-form-item label="项目类别">
        <el-cascader
          v-model="form.sort"
          placeholder="请选择，或输入以查找"
          :options="options.sort"
          :props="{ expandTrigger: 'hover' }"
          :show-all-levels="false"
          filterable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="项目级别">
        <el-select v-model="form.rank" placeholder="请选择，或输入以查找" filterable>
          <el-option
            v-for="item in options.rank"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";

export default Vue.extend({
  data() {
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
      let inputValue = this.etc.inputValue;
      if (inputValue) {
        nameField.push(inputValue);
      }
      if (this.etc.principalNames.inputVisible === inputVisible) {
        this.etc.principalNames.inputVisible = false;
      } else {
        this.etc.memberNames.inputVisible = false;
      }
      this.etc.inputValue = "";
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
  column-count: 2;
  column-width: 100%;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-member {
  height: 32px;
  line-height: 32px;
  padding-top: 0;
  padding-bottom: 0;
  vertical-align: bottom;

  color: #bbbbbb;

  .el-tag + & {
    margin-left: 10px;
  }
}

.input-new-member {
  width: 90px;
  height: 32px;
  vertical-align: bottom;

  .el-tag + & {
    margin-left: 10px;
  }
}

.uploadField {
  align-self: start;
}
</style>