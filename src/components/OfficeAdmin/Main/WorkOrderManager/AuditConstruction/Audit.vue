/*
 * @Author: Skye Young 
 * @Date: 2019-11-17 20:11:55 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-30 22:11:05
 */

<template>
  <el-dialog
    custom-class="edit-dialog"
    :visible="isVisible"
    :close-on-click-modal="false"
    @close="close"
    append-to-body
  >
    <div slot="title">工单审核</div>
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
          <el-input v-model="form.name" :disabled="EditIsDisable"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="工号">
          <el-input v-model="form.worknum" :disabled="EditIsDisable"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="权限">
          <el-select v-model="form.permission" placeholder="请选择">
            <el-option
              :key="item.value"
              v-for="item in options.permission"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="性别">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option
              :key="item.value"
              v-for="item in options.gender"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="院部" prop="department">
          <el-select v-model="form.department" placeholder="请选择，或输入以查找" filterable>
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
          <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="入校时间">
          <el-date-picker v-model="form.enterTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="职称">
          <el-input v-model="form.techTitle"></el-input>
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
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="是否具有行业背景">
          <el-select v-model="form.background" placeholder="请选择">
            <el-option
              :key="item.value"
              v-for="item in options.background"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="是否博士生导师">
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

    <div slot="footer" class="dialog-btn-line">
      <div v-if="EditIsDisable">
        <el-button @click="toggleEdit" type="primary" :disabled="isDisable">进行编辑</el-button>
      </div>
      <div v-else>
        <el-button @click="toggleEdit" :disabled="isDisable">取消编辑</el-button>
        <el-button :loading="isDisable" @click="updateInfo" :disabled="isDisable">{{saveBtnText}}</el-button>
      </div>
      <el-popover placement="top" width="160" v-model="statusIsVisible">
        <p>
          标记审核状态
          <br />
          当前为 “{{form.status}}”。
        </p>
        <div style="text-align: center;">
          <el-button type="primary" size="mini" @click="toggleStatus('通过')">通过</el-button>
          <el-button type="primary" size="mini" @click="toggleStatus('不通过')">不通过</el-button>
        </div>
        <el-button slot="reference" type="primary" :disabled="isDisable">标记状态</el-button>
      </el-popover>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";

interface Data {
  cid: number;
  department: string;
  projectNum: string;
  project: string;
  worknum: string;
  name: string;
  teammate: string;
  class1: string;
  class2: string;
  class3: string;
  startTime: string;
  beginToEndTime: string;
  level: string;
  sponsor: string;
  testimonial: string;
  expenditure: number;
  point: number;
  computeYear: string;
  bonus: number;
  fileNumber: number;
  isEnd: number | string;
  schoolyear: string;
  year: string;
  status: number | string;
  reason: string;
  lastTime: string;
}

const permissionText = ["普通用户", "学院管理员", " root 管理员"];

export default Vue.extend({
  props: ["data", "isVisible"],
  data() {
    return {
      statusIsVisible: false,
      EditIsDisable: true,
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
            label: " root 管理员",
            value: "2"
          }
        ]
      }
    };
  },
  methods: {
    close() {
      this.$emit("toggle-is-visible", false, this.form);
    },
    toggleEdit() {
      this.EditIsDisable = !this.EditIsDisable;
    },
    toggleStatus(text: string) {
      this.statusIsVisible = false;
      (this.form as Data).status = text;
      this.updateInfo(false);
    },
    updateInfo(isEdit: boolean = true) {
      const isEndText = ["未结束", "已结束"];
      const statusText = ["未通过", "审核中", "已通过"];

      this.isDisable = true;
      this.EditIsDisable = true;

      const temForm = Object.assign({}, this.form, {
        status: statusText.indexOf((this.form as Data).status as string) - 1,
        isEnd: isEndText.indexOf((this.form as Data).isEnd as string)
      });

      this.$http
        .post("/api/online/officeAdmin/constructionSupplement", temForm, {
          headers: {
            token: this.$store.state.userInfo.token
          }
        })
        .then((res: AxiosResponse) => {
          this.isDisable = false;
          if (res.data.code === 0) {
            if (isEdit) {
              this.close();
              this.$message({
                message: res.data.msg || "保存成功",
                type: "success"
              });
            }
          } else {
            this.$message({
              message: res.data.msg || "保存失败",
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
    }
  },
  computed: {
    saveBtnText() {
      return this.$data.isDisable ? "正在保存..." : "保存编辑";
    }
  },
  watch: {
    data(newValue: Data, oldValue: Data) {
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

.dialog-btn-line {
  position: fixed;
  bottom: 20vh;
  right: 25vw;

  div {
    margin-block-end: 10px;
  }
}
</style>