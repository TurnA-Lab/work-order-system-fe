/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:44:41 
 * @Last Modified by:   Skye Young 
 * @Last Modified time: 2019-10-28 19:44:41 
 */

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
  gender: string;
  birthday: string;
  enterTime: string;
  techTittle: string;
  eduBgd: string;
  degree: string;
  school: string;
  major: string;
  phone: string;
  dptname: string;
  dtpId: string;
}

export default Vue.extend({
  data() {
    return {
      isLoading: true,
      table1: [],
      table2: []
    };
  },
  created() {
    let userInfo: UserInfo;
    (this as any).$axios
      .post(
        "/api/online/user/getMyInfo",
        {},
        {
          headers: {
            token: this.$store.state.userInfo.token
          }
        }
      )
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
            value: userInfo.gender
          },
          {
            key: "联系电话",
            value: userInfo.phone
          },
          {
            key: "工作部门",
            value: userInfo.dptname
          },
          {
            key: "单位号",
            value: ""
          },
          {
            key: "出生日期",
            value: userInfo.birthday
          },
          {
            key: "入校时间",
            value: userInfo.enterTime
          }
        ];
        (this.table2 as Array<{ key: string; value: string }>) = [
          {
            key: "专业技术职称",
            value: userInfo.techTittle
          },
          {
            key: "最高学历",
            value: userInfo.eduBgd
          },
          {
            key: "最高学位",
            value: userInfo.degree
          },
          {
            key: "授学位单位名称",
            value: userInfo.school
          },
          {
            key: "获最高学位的专业名称",
            value: userInfo.major
          }
        ];
      });
  }
});
</script>

<style lang="scss" scoped>
header,
main {
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