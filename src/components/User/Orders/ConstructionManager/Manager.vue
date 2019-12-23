/*
 * @Author: Skye Young
 * @Date: 2019-11-17 20:11:55
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-19 19:06:59
 */

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
      工单管理
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
        <el-form-item class="form-item" label="项目名称">
          <el-input v-model="form.project" :disabled="editIsDisable"></el-input>
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

        <el-form-item class="form-item" label="项目负责人">
          <el-input v-model="form.name" :disabled="editIsDisable"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="课题组成员">
          <el-input v-model="form.teammate" :disabled="editIsDisable"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="立项年月">
          <el-date-picker
            align="center"
            v-model="form.startTime"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="请选择立项年月"
            :disabled="editIsDisable"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="项目起止年月">
          <el-date-picker
            align="center"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            v-model="form.beginToEndTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :disabled="editIsDisable"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="主办单位">
          <el-input v-model="form.sponsor" placeholder="请输入主办单位" :disabled="editIsDisable"></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="项目类型">
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

        <el-form-item class="form-item" label="项目级别">
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

        <el-form-item class="form-item" label="佐证材料">
          <file-previewer-btn :files="form.testimonial">点击查看</file-previewer-btn>
        </el-form-item>

        <el-form-item class="form-item" label="是否已结束">
          <el-select v-model="form.isEnd" placeholder="请选择" disabled>
            <el-option
              :key="item.value"
              v-for="item in options.isEnd"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="建设经费">
          <el-input v-model="form.expenditure" placeholder="请输入建设经费" disabled></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="年度">
          <el-date-picker align="center" v-model="form.year" type="year" placeholder="年度" disabled></el-date-picker>
        </el-form-item>

        <el-form-item label="学年">
          <el-select v-model="form.schoolYear" placeholder="请选择" disabled>
            <el-option v-for="item in schoolYears" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" class="dialog-btn-line">
      <div v-if="editIsDisable">
        <el-button @click="toggleEdit" type="primary" :disabled="isDisable">进行编辑</el-button>
      </div>
      <div v-else>
        <el-button @click="toggleEdit" :disabled="isDisable">取消编辑</el-button>
        <el-button :loading="isDisable" @click="updateInfo" :disabled="isDisable">{{saveBtnText}}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";
import yearRange from "@/utils/returnYearRange";
import FilePreviewerBtn from "@/components/Etc/FileViewerBtn.vue";
import validate from "@/utils/validate";

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
  beginToEndTime: string | string[];
  level: string;
  sponsor: string;
  testimonial: string;
  expenditure: number;
  point: number;
  computeYear: string;
  bonus: number;
  fileNumber: number;
  isEnd: number | string;
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

const isEndText = ["未结束", "已结束"];
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
      canEdit: true,
      schoolYears: yearRange,
      statusIsVisible: false,
      editIsDisable: true,
      isDisable: false,
      sort: [],
      form: {},
      options: {
        department: [],
        isEnd: [
          {
            label: "未结束",
            value: 0
          },
          {
            label: "已结束",
            value: 1
          }
        ],
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
      if (this.canEdit) {
        this.editIsDisable = !this.editIsDisable;
      } else {
        this.$message({
          message: "仅在“审核中”和“未通过”时可以进行编辑",
          type: "warning"
        });
      }
    },
    updateInfo(isEdit: boolean = true) {
      if (
        validate(
          Object.assign({}, this.form, {
            projectNum: "validate",
            computeYear: "validate",
            fileNumber: "validate",
            reason: "validate"
          })
        )
      ) {
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

        // 处理
        const temForm = Object.assign({}, this.form, {
          beginToEndTime: (this.form as Data).beginToEndTime.toString(),
          isEnd: isEndText.indexOf((this.form as Data).isEnd as string),
          status: 0
        });

        this.$http
          .post("/api/online/user/updateUserConstruction", temForm, {
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
              return Promise.reject(res.data.msg);
            }
          })
          .catch((err: string) => {
            this.isDisable = false;
            this.$message({
              message: err || "未知错误",
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

      newValue.beginToEndTime = (newValue.beginToEndTime as string).split(",");

      this.canEdit = !(newValue.status === "已通过");

      newValue.isEnd = isEndText[newValue.isEnd as number];

      this.form = newValue;
    },
    dataStatus(newValue: number, oldValue: number) {
      if (newValue === 3) {
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
          class1: "建设类"
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
            message: res.data.msg || "由于未知因素，无法获取项目类型列表",
            type: "warning"
          });
        }
      })
      .catch(() => {
        this.$message({
          message: "由于未知因素，无法获取项目类型列表",
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
