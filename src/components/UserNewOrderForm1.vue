<template>
  <div class="formArea">
    <main class="form-part">
      <el-form :model="form" ref="form" size="small" label-position="left" label-width="auto">
        <el-form-item label="院部">
          <el-select
            v-model="form.department"
            :loading="options.departmentIsLoading"
            placeholder="请选择，或输入以查找"
            filterable
          >
            <el-option
              v-for="item in options.department"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="form.projectName"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人">
          <el-input v-model="form.principalName"></el-input>
        </el-form-item>
        <el-form-item label="课题组成员">
          <el-input v-model="form.memberNames"></el-input>
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
            :options="options.sort"
            :props="{ expandTrigger: 'hover' }"
          ></el-cascader>
        </el-form-item>
      </el-form>
    </main>
  </div>
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
        principalName: "",
        memberNames: "",
        projectYear: "",
        startNEndDate: "",
        sponsor: "",
        sort: ""
      },
      options: {
        department: [],
        sort: []
      }
    };
  },
  created() {
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
  },
  methods: {}
});
</script>

<style lang="scss" scoped>
.form-part {
  width: 35%;
}
</style>