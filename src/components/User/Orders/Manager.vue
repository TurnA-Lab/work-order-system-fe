/*
 * @Author: Skye Young 
 * @Date: 2019-12-19 20:00:42 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-12-19 20:32:53
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
      工单审核
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
        <div v-if="form.class1 === '建设类'">
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

          <el-form-item class="form-item" label="立项年度">
            <el-date-picker
              align="center"
              v-model="form.startTime"
              type="year"
              value-format="yyyy"
              placeholder="请选择立项年度"
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
            <file-previewer-btn>点击查看</file-previewer-btn>
          </el-form-item>

          <el-form-item class="form-item" label="是否已结束">
            <el-select v-model="form.isEnd" placeholder="请选择" :disabled="editIsDisable">
              <el-option
                :key="item.value"
                v-for="item in options.isEnd"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="form-item" label="建设经费">
            <el-input v-model="form.expenditure" placeholder="请输入建设经费" :disabled="editIsDisable"></el-input>
          </el-form-item>

          <el-form-item class="form-item" label="业绩分">
            <el-input v-model="form.point" placeholder="请输入业绩分" :disabled="editIsDisable"></el-input>
          </el-form-item>

          <el-form-item class="form-item" label="年度">
            <el-date-picker
              align="center"
              v-model="form.year"
              type="year"
              placeholder="请选择立项年度"
              :disabled="editIsDisable"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="学年">
            <el-select v-model="form.schoolYear" placeholder="请选择" :disabled="editIsDisable">
              <el-option v-for="item in schoolYears" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div v-else-if="form.class1 === '成果类'">
          <el-form-item class="form-item" label="成果名称">
            <el-input v-model="form.production" :disabled="editIsDisable"></el-input>
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
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="form-item" label="第一作者">
            <el-input v-model="form.name" :disabled="editIsDisable"></el-input>
          </el-form-item>

          <el-form-item class="form-item" label="课题组成员">
            <el-input v-model="form.teammate" :disabled="editIsDisable"></el-input>
          </el-form-item>

          <el-form-item class="form-item" label="发表刊物/出版社/授权单位">
            <el-input v-model="form.unit" placeholder="请输入发表刊物/出版社/授权单位" :disabled="editIsDisable"></el-input>
          </el-form-item>

          <el-form-item class="form-item" label="发表/出版/授权时间">
            <el-date-picker
              align="center"
              v-model="form.publishTime"
              type="month"
              format="yyyy 年 MM 月"
              value-format="yyyy-MM"
              placeholder="发表/出版/授权时间"
              :disabled="editIsDisable"
            ></el-date-picker>
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

          <el-form-item class="form-item" label="是否被转让（仅限专利）">
            <el-select v-model="form.patent" placeholder="请选择" :disabled="editIsDisable">
              <el-option
                v-for="item in options.patent"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="form-item" label="佐证材料">
            <file-previewer-btn>点击查看</file-previewer-btn>
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
            <el-select v-model="form.schoolYear" placeholder="请选择" :disabled="editIsDisable">
              <el-option v-for="item in schoolYears" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-else-if="form.class1 === '获奖类'">
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
            <el-input v-model="form.teammate" :disabled="editIsDisable"></el-input>
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
            <el-input v-model="form.awardUnit" placeholder="请输入颁奖部门" :disabled="editIsDisable"></el-input>
          </el-form-item>

          <el-form-item class="form-item" label="获奖时间" :disabled="editIsDisable">
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

          <el-form-item class="form-item" label="证书">
            <file-previewer-btn>点击查看</file-previewer-btn>
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
            <el-select v-model="form.schoolYear" placeholder="请选择" :disabled="editIsDisable">
              <el-option v-for="item in schoolYears" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
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
      dataStatus: 0,
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
            value: "0"
          },
          {
            label: "已结束",
            value: "1"
          }
        ],
        patent: [
          {
            label: "空",
            value: 0
          },
          {
            label: "是",
            value: 1
          },
          {
            label: "否",
            value: 2
          }
        ],
        level: [],
        sort: [],
        prize: []
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
    toggleStatus(text: string, form: any) {
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
            (this.form as any).class2 = object.label;

            for (const key2 in object.children) {
              if (object.children.hasOwnProperty(key2)) {
                const element = object.children[key2];

                if (element.value === this.sort[1]) {
                  (this.form as any).class3 = object.label;
                }
              }
            }
          }
        }
      }
      if ((this.form as any).class1 === "建设类") {
        (this.form as any).beginToEndTime = (this
          .form as any).beginToEndTime.toString();
      }

      // 处理审核状态和是否结束
      let temForm = Object.assign({}, this.form, {
        status: statusText.indexOf((this.form as any).status as string) - 1
      });

      temForm = Object.assign({}, temForm, {
        isEnd: isEndText.indexOf((this.form as any).isEnd as string)
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
    data(newValue: any, oldValue: any) {
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
      if ((this.form as any).class1 === "建设类") {
        newValue.beginToEndTime = (newValue.beginToEndTime as string).split(
          ","
        );
      }
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

    // 请求项目类型列表
    this.$http
      .post(
        "/api/online/getTypeList",
        {
          class1: (this.form as any).class1
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

    if ((this.form as any).class1 !== "成果类") {
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

    if ((this.form as any).class1 === "获奖类") {
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
    }
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
