<template>
  <div>
    <header>
      <h2>个人资料</h2>
    </header>
    <main>
      <el-table class="showTable" :data="table" :show-header="false">
        <el-table-column prop="key" width="140"></el-table-column>
        <el-table-column prop="value"></el-table-column>
      </el-table>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  created() {
    if (!this.$store.state.userInfoPage.profileBtnIsDisabled) {
      this.$store.dispatch("toggleTwoBtn");
    }
  },
  data() {
    const userInfo = this.$store.state.userInfo;
    return {
      table: [
        {
          key: "姓名",
          value: userInfo.name
        },
        {
          key: "权限",
          value: userInfo.permission
        },
        {
          key: "工号",
          value: userInfo.worknum
        },
        {
          key: "工作部门",
          value: userInfo.department
        }
      ]
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

.showTable {
  width: 40%;
}
</style>