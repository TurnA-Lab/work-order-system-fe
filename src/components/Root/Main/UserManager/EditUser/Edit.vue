/*
 * @Author: Skye Young
 * @Date: 2019-11-17 20:11:55
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-19 18:43:47
 */

<template>
  <el-dialog
    custom-class="edit-dialog"
    :visible="isVisible"
    :close-on-click-modal="false"
    @close="close"
    append-to-body
  >
    <div slot="title">
      编辑用户信息
      <span class="last-time">最后修改时间 {{form.lastTime}}</span>
    </div>
    <div>
      <el-form
        :class="{'is-disable': isDisable}"
        class="form-part"
        ref="form"
        :model="form"
        size="medium"
        label-position="left"
        label-width="auto"
      >
        <el-form-item class="form-item" label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="工号">
          <el-input v-model="form.worknum"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="权限">
          <el-select v-model="form.permission" placeholder="请选择">
            <el-option
              :key="item.value"
              v-for="item in options.permission"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="性别">
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
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="联系电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="出生年月">
          <el-date-picker align="center" v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="入校时间">
          <el-date-picker align="center" v-model="form.enterTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="职称">
          <el-input v-model="form.techTittle"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="最高学历">
          <el-input v-model="form.eduBgd"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="最高学位">
          <el-input v-model="form.degree"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="授学位单位名称">
          <el-input v-model="form.school"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="获最高学位的专业名称">
          <el-input v-model="form.major"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="是否双师型">
          <el-select v-model="form.doubleTeacher" placeholder="请选择">
            <el-option
              :key="item.value"
              v-for="item in options.doubleTeacher"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="是否具有行业背景">
          <el-select v-model="form.background" placeholder="请选择">
            <el-option
              :key="item.value"
              v-for="item in options.background"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="是否博士生导师">
          <el-select v-model="form.tutor" placeholder="请选择">
            <el-option
              :key="item.value"
              v-for="item in options.tutor"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" class="dialog-btn-line">
      <el-button @click="close" type="primary" plain>取消编辑</el-button>
      <el-button :loading="isDisable" @click="updateUserInfo" type="primary">{{saveBtnText}}</el-button>
    </div>
  </el-dialog>
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
  permission: number | string;
}

const permissionText = ["普通用户", "学院管理员", "科室管理员"];

export default Vue.extend({
  props: ["userData", "isVisible"],
  data() {
    return {
      isDisable: false,
      form: {},
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
        ],
        permission: [
          {
            label: "普通用户",
            value: "0"
          },
          {
            label: "学院管理员",
            value: "1"
          },
          {
            label: "科室管理员",
            value: "2"
          }
        ]
      }
    };
  },
  methods: {
    close() {
      this.$emit("toggle-is-visible", false);
    },
    updateUserInfo() {
      if (validate(this.form)) {
        this.isDisable = true;

        this.$http
          .post(
            "/api/online/root/updateUserInfo",
            Object.assign({}, this.form, {
              doubleTeacher:
                (this.form as UserData).doubleTeacher === "否" ? 0 : 1,
              background: (this.form as UserData).background === "否" ? 0 : 1,
              tutor: (this.form as UserData).tutor === "否" ? 0 : 1,
              permission: permissionText.indexOf((this.form as UserData)
                .permission as string)
            }),
            {
              headers: {
                token: this.$store.state.userInfo.token
              }
            }
          )
          .then((res: AxiosResponse) => {
            this.isDisable = false;
            if (res.data.code === 0) {
              this.close();
              this.$emit("refresh");
              this.$message({
                message: res.data.msg || "用户信息保存成功",
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.msg || "用户信息保存失败",
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
          message: "填写尚不完整，请补全后提交",
          type: "warning"
        });
      }
    }
  },
  computed: {
    saveBtnText() {
      return this.$data.isDisable ? "正在保存..." : "保存编辑";
    }
  },
  watch: {
    userData(newValue: UserData, oldValue: UserData) {
      newValue.doubleTeacher = newValue.doubleTeacher === 0 ? "否" : "是";
      newValue.background = newValue.background === 0 ? "否" : "是";
      newValue.tutor = newValue.tutor === 0 ? "否" : "是";
      newValue.permission = permissionText[newValue.permission as number];
      this.form = newValue;
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
  }
});
</script>

<style lang="scss" scoped>
.form-item {
  width: 450px;
}

.is-disable {
  filter: blur(10px);
  cursor: not-allowed;
}
</style>

<style lang="scss">
.edit-dialog {
  width: 60vw;
  border-radius: 1rem;

  min-width: 450px;
  max-height: 80vh;
  margin: 0px !important;
}

.form-part {
  width: inherit;
  height: 60vh;
  overflow: auto;
}

.last-time {
  color: #dddddd;
  font-size: 8px;
}

.dialog-btn-line {
  position: fixed;
  bottom: 20vh;
  right: 25vw;
}
</style>
