<template>
  <div>
    <header>
      <h2>个人资料</h2>
    </header>
    <main v-loading="isLoading">
      <div class="table">
        <el-table :data="table1" :show-header="false">
          <el-table-column prop="key" width="180"></el-table-column>
          <el-table-column prop="value"></el-table-column>
        </el-table>
      </div>
      <div class="table">
        <el-table :data="table2" :show-header="false">
          <el-table-column prop="key" width="180"></el-table-column>
          <el-table-column prop="value"></el-table-column>
        </el-table>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";

interface UserInfo {
  worknum: string;
  permission: string;
  name: string;
  sex: string;
  birthDate: string;
  entranceDate: string;
  jobTitle: string;
  topEducation: string;
  topDegree: string;
  graduatedSchool: string;
  profession: string;
  phoneNum: string;
  department: string;
  departmentNum: string;
}

export default Vue.extend({
  created() {
    if (!this.$store.state.userInfoPage.btnIsDisabled) {
      this.$store.commit("toggleUserInfoBtn");
    }

    let userInfo: UserInfo;
    (this as any).$axios
      .post("/userInfo", {
        token: this.$store.state.userInfo.token
      })
      .then((res: AxiosResponse) => {
        this.isLoading = false;
        userInfo = res.data.data;
        (this.table1 as Array<{ key: string; value: string }>) = [
          {
            key: "姓名",
            value: userInfo.name
          },
          {
            key: "工号",
            value: userInfo.worknum
          },
          {
            key: "性别",
            value: userInfo.sex
          },
          {
            key: "联系电话",
            value: userInfo.phoneNum
          },
          {
            key: "工作部门",
            value: userInfo.department
          },
          {
            key: "单位号",
            value: userInfo.departmentNum
          },
          {
            key: "出生日期",
            value: userInfo.birthDate
          },
          {
            key: "入校时间",
            value: userInfo.entranceDate
          }
        ];
        (this.table2 as Array<{ key: string; value: string }>) = [
          {
            key: "专业技术职称",
            value: userInfo.jobTitle
          },
          {
            key: "最高学历",
            value: userInfo.topEducation
          },
          {
            key: "最高学位",
            value: userInfo.topDegree
          },
          {
            key: "授学位单位名称",
            value: userInfo.graduatedSchool
          },
          {
            key: "获最高学位的专业名称",
            value: userInfo.profession
          }
        ];
      });
  },
  data() {
    return {
      isLoading: true,
      table1: [],
      table2: []
    };
  }
});
</script>

<style lang="scss" scoped>
header,
main {
  // font-size: 2rem;
  margin-left: 15px;
}

main {
  display: flex;
  justify-content: space-between;

  .table {
    width: 48%;
  }
}
</style>