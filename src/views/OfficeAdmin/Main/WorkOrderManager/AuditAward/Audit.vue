<template>
  <el-dialog
    custom-class="edit-dialog"
    :visible="isVisible"
    :close-on-click-modal="false"
    @close="close"
    v-loading="isLoading"
    append-to-body
  >
    <div slot="title">
      工单审核
      <span class="last-time">最后修改时间 {{ form.lastTime }}</span>
    </div>
    <div>
      <el-form
        :class="{ 'is-disable': isDisable }"
        class="form-part"
        ref="form"
        :model="form"
        size="medium"
        label-position="left"
        label-width="auto"
      >
        <el-form-item class="form-item" label="获奖名称">
          <el-input v-model="form.content" :disabled="editIsDisable"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="院部">
          <el-select
            v-model="form.department"
            placeholder="请选择，或输入以查找"
            filterable
            :disabled="editIsDisable"
          >
            <el-option
              :key="item.value"
              v-for="item in options.department"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="获奖教师（第一）">
          <el-input v-model="form.name" :disabled="editIsDisable"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="获奖成员">
          <el-input
            v-model="form.teammate"
            :disabled="editIsDisable"
          ></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="奖项">
          <el-select
            v-model="form.prize"
            placeholder="请选择，或输入以查找"
            filterable
            :disabled="editIsDisable"
          >
            <el-option
              v-for="item in options.prize"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="获奖类型">
          <el-cascader
            v-model="sort"
            placeholder="请选择，或输入以查找"
            :options="options.sort"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
            filterable
            :disabled="editIsDisable"
          ></el-cascader>
        </el-form-item>

        <el-form-item class="form-item" label="级别">
          <el-select
            v-model="form.level"
            placeholder="请选择，或输入以查找"
            filterable
            :disabled="editIsDisable"
          >
            <el-option
              v-for="item in options.level"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="颁奖部门">
          <el-input
            v-model="form.awardUnit"
            placeholder="请输入颁奖部门"
            :disabled="editIsDisable"
          ></el-input>
        </el-form-item>

        <el-form-item
          class="form-item"
          label="获奖时间"
          :disabled="editIsDisable"
        >
          <el-date-picker
            align="center"
            v-model="form.awardTime"
            type="date"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="获奖时间"
            :disabled="editIsDisable"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="年度">
          <el-date-picker
            align="center"
            v-model="form.year"
            type="year"
            value-format="yyyy"
            placeholder="请选择立项年度"
            :disabled="editIsDisable"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="学年">
          <el-select
            v-model="form.schoolYear"
            placeholder="请选择"
            :disabled="editIsDisable"
          >
            <el-option
              v-for="item in schoolYears"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="证书">
          <file-previewer-btn :files="form.certificate"
            >点击查看</file-previewer-btn
          >
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" class="dialog-btn-line">
      <div v-if="editIsDisable">
        <el-button @click="toggleEdit" type="primary" :disabled="isDisable"
          >进行编辑</el-button
        >
      </div>
      <div v-else>
        <el-button @click="toggleEdit" :disabled="isDisable"
          >取消编辑</el-button
        >
        <el-button
          :loading="isDisable"
          @click="updateInfo"
          :disabled="isDisable"
          >{{ saveBtnText }}</el-button
        >
      </div>
      <el-popover placement="top" width="160" v-model="statusIsVisible">
        <p>
          标记审核状态
          <br />
          当前为 “{{ form.status }}”。
        </p>
        <div style="text-align: center;">
          <el-button
            type="primary"
            size="mini"
            @click="toggleStatus('已通过', form)"
            >通过</el-button
          >
          <el-button
            type="primary"
            size="mini"
            @click="toggleStatus('未通过', form)"
            >不通过</el-button
          >
        </div>
        <el-button slot="reference" type="primary" :disabled="isDisable"
          >审批</el-button
        >
      </el-popover>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";
import yearRange from "@/utils/returnYearRange";
import FilePreviewerBtn from "@/components/Etc/FileViewerBtn.vue";

interface Data {
  aid: number;
  department: string;
  worknum: string;
  name: string;
  teammate: string;
  awardUnit: string;
  content: string;
  class1: string;
  class2: string;
  class3: string;
  level: string;
  prize: string;
  bonus: number;
  awardYear: string;
  certificate: string;
  awardTime: string;
  schoolYear: string;
  year: string;
  status: number | string;
  reason: string;
  lastTime: string;
}

interface Type {
  label: string;
  value: string | number;
  children: Type[];
}

const statusText = ["未通过", "审核中", "已通过"];

export default Vue.extend({
  props: ["data", "isVisible"],
  components: {
    FilePreviewerBtn
  },
  data() {
    return {
      isLoading: true,
      dataStatus: 0,
      schoolYears: yearRange,
      statusIsVisible: false,
      editIsDisable: true,
      isDisable: false,
      sort: [],
      form: {},
      options: {
        department: [],
        prize: [],
        level: [],
        sort: []
      }
    };
  },
  methods: {
    close() {
      this.$emit("toggle-is-visible", false);
      this.editIsDisable = true;
    },
    toggleEdit() {
      this.editIsDisable = !this.editIsDisable;
    },
    toggleStatus(text: string, form: Data) {
      this.statusIsVisible = false;

      if (text === "未通过") {
        this.$prompt("请输入原因", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputType: "textarea"
        }).then(({ value }: any) => {
          form.status = text;
          form.reason = value;
          this.updateInfo(false);
        });
      } else {
        form.status = text;
        this.updateInfo(false);
      }
    },
    updateInfo(isEdit: boolean = true) {
      this.isDisable = true;
      this.editIsDisable = true;

      // 处理类别
      for (const key in this.options.sort) {
        if (this.options.sort.hasOwnProperty(key)) {
          const object = this.options.sort[key] as Type;

          if (object.value === this.sort[0]) {
            (this.form as Data).class2 = object.label;

            for (const key2 in object.children) {
              if (object.children.hasOwnProperty(key2)) {
                const element = object.children[key2];

                if (element.value === this.sort[1]) {
                  (this.form as Data).class3 = element.label;
                }
              }
            }
          }
        }
      }

      // 处理审核状态和是否结束
      const temForm = Object.assign({}, this.form, {
        status: statusText.indexOf((this.form as Data).status as string) - 1
      });

      this.$http
        .post("/api/online/officeAdmin/awardSupplement", temForm, {
          headers: {
            token: this.$store.state.userInfo.token
          }
        })
        .then((res: AxiosResponse) => {
          this.isDisable = false;
          if (res.data.code === 0) {
            if (isEdit) {
              this.close();
              this.$emit("refresh");
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
      for (const key in this.options.sort) {
        if (this.options.sort.hasOwnProperty(key)) {
          const object = this.options.sort[key] as Type;

          if (object.label === newValue.class2) {
            (this.sort as any[])[0] = object.value;

            for (const key2 in object.children) {
              if (object.children.hasOwnProperty(key2)) {
                const element = object.children[key2];

                if (element.label === newValue.class3) {
                  (this.sort as any[])[1] = element.value;
                }
              }
            }
          }
        }
      }

      this.form = newValue;
    },
    dataStatus(newValue: number, oldValue: number) {
      if (newValue === 4) {
        this.$data.isLoading = false;
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
          this.dataStatus += 1;
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

    // 请求项目类型列表
    this.$http
      .post(
        "/api/online/getTypeList",
        {
          class1: "获奖类"
        },
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.options.sort = res.data.data;
          this.dataStatus += 1;
        } else {
          this.$message({
            message: res.data.msg || "由于未知因素，无法获取获奖类型列表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法获取获奖类型列表",
          type: "warning"
        });
      });

    // 请求奖项列表
    this.$http
      .post(
        "/api/online/getPrizeSet",
        {},
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.options.prize = res.data.data;
          this.dataStatus += 1;
        } else {
          this.$message({
            message: res.data.msg || "由于未知因素，无法获取奖项列表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法获取奖项列表",
          type: "warning"
        });
      });

    // 请求项目级别列表
    this.$http
      .post(
        "/api/online/getLevelSet",
        {},
        {
          headers: {
            token: stateToken
          }
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.code === 0) {
          this.options.level = res.data.data;
          this.dataStatus += 1;
        } else {
          this.$message({
            message: res.data.msg || "由于未知因素，无法获取项目级别列表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法获取项目级别列表",
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

.last-time {
  color: #dddddd;
  font-size: 8px;
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

<style lang="scss">
.edit-dialog {
  width: 60vw !important;
}

.el-textarea__inner {
  max-height: 50vh;
}
</style>
