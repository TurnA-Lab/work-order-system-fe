/*
 * @Author: Skye Young
 * @Date: 2019-11-20 20:10:57
 * @Last Modified by:   Skye Young
 * @Last Modified time: 2019-11-20 20:10:57
 */

<template>
  <div>
    <div>
      <el-form
        :class="{'is-disable': isDisable}"
        ref="form"
        :model="form"
        size="medium"
        label-position="right"
        label-width="160px"
      >
        <el-form-item class="form-item" label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="工号" prop="worknum">
          <el-input v-model="form.worknum" placeholder="请输入工号"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option
              :key="item.value"
              v-for="item in options.gender"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="院部" prop="department">
          <el-select v-model="form.dptname" placeholder="请选择，或输入以查找" filterable>
            <el-option
              :key="item.value"
              v-for="item in options.department"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="出生年月" prop="birthday">
          <el-date-picker align="center" v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="入校时间" prop="enterTime">
          <el-date-picker align="center" v-model="form.enterTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="职称" prop="techTittle">
          <el-input v-model="form.techTittle" placeholder="请输入职称"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="最高学历" prop="eduBgd">
          <el-input v-model="form.eduBgd" placeholder="请输入最高学历"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="最高学位" prop="degree">
          <el-input v-model="form.degree" placeholder="请输入最高学位"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="授学位单位名称" prop="school">
          <el-input v-model="form.school" placeholder="请输入授学位单位名称"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="获最高学位的专业名称" prop="major">
          <el-input v-model="form.major" placeholder="请输入获最高学位的专业名称"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="是否双师型" prop="doubleTeacher">
          <el-select v-model="form.doubleTeacher" placeholder="请选择">
            <el-option
              :key="item.value"
              v-for="item in options.doubleTeacher"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="是否具有行业背景" prop="background">
          <el-select v-model="form.background" placeholder="请选择">
            <el-option
              :key="item.value"
              v-for="item in options.background"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="是否博士生导师" prop="placeholder">
          <el-select v-model="form.tutor" placeholder="请选择">
            <el-option
              :key="item.value"
              v-for="item in options.tutor"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div class="btn-line">
      <el-button @click="reset('form')" type="primary" plain>重置</el-button>
      <el-button :loading="isDisable" @click="addUserInfo" type="primary">{{saveBtnText}}</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";
import validate from "@/utils/validate";

interface UserData {
  dtpId: number;
  dptname: string;
  name: string;
  worknum: string;
  gender: string;
  birthday: string;
  enterTime: string;
  phone: string;
  techTittle: string;
  eduBgd: string;
  degree: string;
  school: string;
  major: string;
  doubleTeacher: number | string;
  background: number | string;
  tutor: number | string;
  permission: number;
}

export default Vue.extend({
  data() {
    return {
      isDisable: false,
      form: {
        dtpId: "",
        dptname: "",
        name: "",
        worknum: "",
        gender: "",
        birthday: "",
        enterTime: "",
        phone: "",
        techTittle: "",
        eduBgd: "",
        degree: "",
        school: "",
        major: "",
        doubleTeacher: "",
        background: "",
        tutor: "",
        permission: 0
      },
      options: {
        department: [],
        gender: [
          {
            label: "男",
            value: "0"
          },
          {
            label: "女",
            value: "1"
          }
        ],
        tutor: [
          {
            label: "否",
            value: "0"
          },
          {
            label: "是",
            value: "1"
          }
        ],
        background: [
          {
            label: "否",
            value: "0"
          },
          {
            label: "是",
            value: "1"
          }
        ],
        doubleTeacher: [
          {
            label: "否",
            value: "0"
          },
          {
            label: "是",
            value: "1"
          }
        ]
      }
    };
  },
  methods: {
    reset(formName: string) {
      (this.$refs[formName] as any).resetFields();
    },
    addUserInfo() {
      if (validate(this.form)) {
        this.isDisable = true;
        this.$http
          .post("/api/online/root/addUserInfo", this.form, {
            headers: {
              token: this.$store.state.userInfo.token
            }
          })
          .then((res: AxiosResponse) => {
            this.isDisable = false;
            if (res.data.code === 0) {
              this.$message({
                message: res.data.msg || "用户信息添加成功",
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.msg || "用户信息添加失败",
                type: "warning"
              });
            }
          })
          .catch(() => {
            this.isDisable = false;
            this.$message({
              message: "未知错误",
              type: "warning"
            });
          });
      } else {
        this.$message({
          message: "请填写完整后提交!",
          type: "warning"
        });
      }
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
  },
  computed: {
    saveBtnText() {
      return this.$data.isDisable ? "正在保存..." : "添加用户";
    }
  }
});
</script>

<style lang="scss" scoped>
.form-item {
  width: 450px;
}

.el-form {
  height: 78vh;
  width: inherit;
  overflow: auto;
}

.btn-line {
  position: absolute;
  bottom: 20px;
  right: 50px;
}

.is-disable {
  filter: blur(10px);
  cursor: not-allowed;
}
</style>
