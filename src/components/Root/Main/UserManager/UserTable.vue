/*
 * @Author: Skye Young 
 * @Date: 2019-11-12 21:48:02 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-13 22:23:15
 */

<template>
  <el-table class="table" :data="tableData" height="250" stripe>
    <el-table-column prop="name" label="姓名" width="120" fixed></el-table-column>
    <el-table-column prop="gender" label="性别" width="100"></el-table-column>
    <el-table-column prop="worknum" label="工号" width="180"></el-table-column>
    <el-table-column prop="dptname" label="部门" width="180"></el-table-column>
    <el-table-column prop="techTittle" label="职称" width="180"></el-table-column>
    <el-table-column prop="phone" label="手机号" width="200"></el-table-column>
    <el-table-column prop="degree" label="最高学历" width="180"></el-table-column>
    <el-table-column label="操作" width="200" fixed="right">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      tableData: [
        {
          dtpId: 0,
          dptname: "电气与信息工程学院",
          name: "小虎哥",
          worknum: "172219605216",
          gender: "男",
          birthday: "1976-10-20",
          enterTime: "2007-09-20",
          phone: "156563621312",
          techTittle: "讲师",
          eduBgd: "研究生",
          degree: "博士",
          school: "苏州大学",
          major: "电子信息工程",
          doubleTeacher: 0,
          background: 1,
          tutor: 1,
          permission: 1
        },
        {
          dtpId: 0,
          dptname: "电气与信息工程学院",
          name: "小虎哥",
          worknum: "172219605216",
          gender: "男",
          birthday: "1976-10-20",
          enterTime: "2007-09-20",
          phone: "156563621312",
          techTittle: "讲师",
          eduBgd: "研究生",
          degree: "博士",
          school: "苏州大学",
          major: "电子信息工程",
          doubleTeacher: 0,
          background: 1,
          tutor: 1,
          permission: 1
        },
        {
          dtpId: 0,
          dptname: "电气与信息工程学院",
          name: "小虎哥",
          worknum: "172219605216",
          gender: "男",
          birthday: "1976-10-20",
          enterTime: "2007-09-20",
          phone: "156563621312",
          techTittle: "讲师",
          eduBgd: "研究生",
          degree: "博士",
          school: "苏州大学",
          major: "电子信息工程",
          doubleTeacher: 0,
          background: 1,
          tutor: 1,
          permission: 1
        },
        {
          dtpId: 0,
          dptname: "电气与信息工程学院",
          name: "小虎哥",
          worknum: "172219605216",
          gender: "男",
          birthday: "1976-10-20",
          enterTime: "2007-09-20",
          phone: "156563621312",
          techTittle: "讲师",
          eduBgd: "研究生",
          degree: "博士",
          school: "苏州大学",
          major: "电子信息工程",
          doubleTeacher: 0,
          background: 1,
          tutor: 1,
          permission: 1
        },
        {
          dtpId: 0,
          dptname: "电气与信息工程学院",
          name: "小虎哥",
          worknum: "172219605216",
          gender: "男",
          birthday: "1976-10-20",
          enterTime: "2007-09-20",
          phone: "156563621312",
          techTittle: "讲师",
          eduBgd: "研究生",
          degree: "博士",
          school: "苏州大学",
          major: "电子信息工程",
          doubleTeacher: 0,
          background: 1,
          tutor: 1,
          permission: 1
        },
        {
          dtpId: 0,
          dptname: "电气与信息工程学院",
          name: "小虎哥",
          worknum: "172219605216",
          gender: "男",
          birthday: "1976-10-20",
          enterTime: "2007-09-20",
          phone: "156563621312",
          techTittle: "讲师",
          eduBgd: "研究生",
          degree: "博士",
          school: "苏州大学",
          major: "电子信息工程",
          doubleTeacher: 0,
          background: 1,
          tutor: 1,
          permission: 1
        },
        {
          dtpId: 0,
          dptname: "电气与信息工程学院",
          name: "小虎哥",
          worknum: "172219605216",
          gender: "男",
          birthday: "1976-10-20",
          enterTime: "2007-09-20",
          phone: "156563621312",
          techTittle: "讲师",
          eduBgd: "研究生",
          degree: "博士",
          school: "苏州大学",
          major: "电子信息工程",
          doubleTeacher: 0,
          background: 1,
          tutor: 1,
          permission: 1
        },
        {
          dtpId: 0,
          dptname: "电气与信息工程学院",
          name: "小虎哥",
          worknum: "172219605216",
          gender: "男",
          birthday: "1976-10-20",
          enterTime: "2007-09-20",
          phone: "156563621312",
          techTittle: "讲师",
          eduBgd: "研究生",
          degree: "博士",
          school: "苏州大学",
          major: "电子信息工程",
          doubleTeacher: 0,
          background: 1,
          tutor: 1,
          permission: 1
        },
        {
          dtpId: 0,
          dptname: "电气与信息工程学院",
          name: "小虎哥",
          worknum: "172219605216",
          gender: "男",
          birthday: "1976-10-20",
          enterTime: "2007-09-20",
          phone: "156563621312",
          techTittle: "讲师",
          eduBgd: "研究生",
          degree: "博士",
          school: "苏州大学",
          major: "电子信息工程",
          doubleTeacher: 0,
          background: 1,
          tutor: 1,
          permission: 1
        },
        {
          dtpId: 0,
          dptname: "电气与信息工程学院",
          name: "小虎哥",
          worknum: "172219605216",
          gender: "男",
          birthday: "1976-10-20",
          enterTime: "2007-09-20",
          phone: "156563621312",
          techTittle: "讲师",
          eduBgd: "研究生",
          degree: "博士",
          school: "苏州大学",
          major: "电子信息工程",
          doubleTeacher: 0,
          background: 1,
          tutor: 1,
          permission: 1
        },
        {
          dtpId: 0,
          dptname: "电气与信息工程学院",
          name: "小虎哥",
          worknum: "172219605216",
          gender: "男",
          birthday: "1976-10-20",
          enterTime: "2007-09-20",
          phone: "156563621312",
          techTittle: "讲师",
          eduBgd: "研究生",
          degree: "博士",
          school: "苏州大学",
          major: "电子信息工程",
          doubleTeacher: 0,
          background: 1,
          tutor: 1,
          permission: 1
        }
      ]
    };
  }
});
</script>

<style lang="scss" scoped>
.table {
}
</style>