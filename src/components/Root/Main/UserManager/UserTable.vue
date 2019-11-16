/*
 * @Author: Skye Young 
 * @Date: 2019-11-12 21:48:02 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-16 22:25:22
 */

<template>
  <div>
    <!-- <el-table class="table" header-align="center" :data="tableData" :height="autoHeight" stripe>
      <el-table-column prop="name" label="姓名" width="120" sortable fixed></el-table-column>
      <el-table-column prop="gender" label="性别" width="100" sortable></el-table-column>
      <el-table-column prop="worknum" label="工号" width="200" sortable></el-table-column>
      <el-table-column prop="dptname" label="部门" width="200" sortable></el-table-column>
      <el-table-column prop="techTittle" label="职称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="200" sortable></el-table-column>
      <el-table-column prop="degree" label="最高学历" width="180"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
    </div>-->
    <what-table
      :columns="columns"
      :dataSource="tableData"
      :options="options"
      :pagination="pagination"
    ></what-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import WhatTable from "@/components/Etc/WhatTable.vue";

export default Vue.extend({
  components: {
    WhatTable
  },
  data() {
    return {
      columns: [
        {
          prop: "name",
          label: "姓名"
          // width: 60
        },
        {
          prop: "gender",
          label: "性别"
        },
        {
          prop: "worknum",
          label: "工号"
        },
        {
          prop: "phone",
          label: "手机号"
        },
        {
          prop: "techTittle",
          label: "职称"
        }
      ],
      options: {
        mutiSelect: false,
        index: true, // 显示序号， 多选则 mutiSelect
        loading: false, // 表格动画
        initTable: true // 是否一挂载就加载数据
      },
      pagination: {
        total: 9,
        pageIndex: 1,
        pageSize: 9
      },
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
          name: "小哥",
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
// .table {
//   height: 60vh !important;
// }
</style>