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
      <span class="last-time">最后修改时间 {{ lastModifiedTime }}</span>
    </div>
    <el-form
      :model="form"
      class="form-part"
      ref="form"
      size="medium"
      label-position="left"
      label-width="auto"
    >
      <el-form-item class="form-item" label="项目名称">
        <el-input v-model="form.project" :disabled="editIsDisable"></el-input>
      </el-form-item>

      <el-form-item class="form-item" label="院部">
        <el-select
          v-model="form.dptName"
          placeholder="请选择，或输入以查找"
          filterable
          :disabled="editIsDisable"
        >
          <el-option
            v-for="item in options.department"
            :key="item.id"
            :label="item.dptName"
            :value="item.dptName"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="form-item" label="项目负责人">
        <el-input v-model="form.name" :disabled="editIsDisable"></el-input>
      </el-form-item>

      <el-form-item class="form-item" label="课题组成员">
        <el-input v-model="form.teammate" :disabled="editIsDisable"></el-input>
      </el-form-item>

      <el-form-item class="form-item" label="立项日期">
        <el-date-picker
          v-model="form.startTime"
          align="center"
          type="date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="请选择立项年月"
          :disabled="editIsDisable"
        ></el-date-picker>
      </el-form-item>

      <el-form-item class="form-item" label="项目起止年月">
        <el-date-picker
          v-model="startingAndEnding"
          align="center"
          format="yyyy 年 MM 月"
          value-format="yyyy/MM"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :disabled="editIsDisable"
        ></el-date-picker>
      </el-form-item>

      <el-form-item class="form-item" label="主办单位">
        <el-input
          v-model="form.sponsor"
          placeholder="请输入主办单位"
          :disabled="editIsDisable"
        ></el-input>
      </el-form-item>

      <el-form-item class="form-item" label="项目类型">
        <el-cascader
          v-model="kind"
          placeholder="请选择，或输入以查找"
          :options="options.kind"
          :props="{ expandTrigger: 'hover', value: 'label' }"
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
            :key="item.id"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="form-item" label="佐证材料">
        <file-previewer-btn :files="form.testimonial"
          >点击查看</file-previewer-btn
        >
      </el-form-item>

      <el-form-item class="form-item" label="是否已结束">
        <el-select v-model="isEnd" placeholder="请选择" disabled>
          <el-option
            v-for="item in options.isEnd"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item class="form-item" label="建设经费">
        <el-input
          v-model="form.expenditure"
          placeholder="请输入建设经费"
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item class="form-item" label="年度">
        <el-date-picker
          v-model="form.year"
          align="center"
          type="year"
          placeholder="年度"
          disabled
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="学年">
        <el-select v-model="form.schoolYear" placeholder="请选择" disabled>
          <el-option
            v-for="item in options.schoolYears"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

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
        <el-button @click="updateInfo" :disabled="isDisable">{{
          saveBtnText
        }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import moment from "moment";
import Vue from "vue";

import FilePreviewerBtn from "@/components/Etc/FileViewerBtn.vue";
import { Construction, Department } from "@/interface/list-data";
import { EndStatus, endStatusList, yearList } from "@/static-data/work-order";
import {
  fetchDepartmentList,
  fetchKindList,
  fetchLevelList,
  postData
} from "@/utils/fetchData";
import { allNotNull } from "@/utils/validate";

interface Type {
  label: string;
  value: string | number;
  children: Type[];
}

export default Vue.extend({
  props: { data: Object, dataIndex: Number, isVisible: Boolean },
  components: {
    FilePreviewerBtn
  },
  data(): {
    form: Construction | {}; // 表单
    kind: string[]; // 工单类型
    startingAndEnding: string[]; // 开始到结束的日期
    isEnd: string; // 是否结束
    isLoading: boolean; // 载入中
    canEdit: boolean; // 是否处于可编辑状态
    editIsDisable: boolean; // 禁止编辑
    isDisable: boolean; // 保存时禁止按钮操作
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any; // 下拉选项列表
  } {
    return {
      form: {},
      kind: [],
      startingAndEnding: [],
      isEnd: "",
      isLoading: true,
      canEdit: true,
      editIsDisable: true,
      isDisable: false,
      options: {
        department: [],
        isEnd: endStatusList,
        level: [],
        kind: [],
        schoolYears: yearList
      }
    };
  },
  methods: {
    close() {
      // 在保存时禁止关闭操作
      if (!this.isDisable) {
        this.$emit("toggle-is-visible", false);
        this.editIsDisable = true;
      }
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
    updateInfo() {
      if (
        allNotNull(
          Object.assign({}, this.form, {
            projectNum: "validate",
            computeYear: "validate",
            fileNumber: "validate",
            reason: "validate",
            fileNum: "validate",
            testimonial: "validate",
            updateTime: "validate",
            class2: this.kind[0],
            class3: this.kind[1],
            startingAndEnding: this.startingAndEnding.join("-")
          })
        )
      ) {
        // 阻止操作按钮
        this.isDisable = true;
        // 阻止操作表单
        this.editIsDisable = true;
        // 合并表单数据
        this.form = Object.assign(this.form, {
          class2: this.kind[0],
          class3: this.kind[1],
          startingAndEnding: this.startingAndEnding.join("-"),
          status: 0,
          reason: ""
        });
        // 提交表单
        postData("/api/user/construction/update", this.form)
          .then(() => {
            // 更新表格
            this.$emit("update-table-data", this.dataIndex, this.form);

            this.$message({
              message: "保存成功",
              type: "success"
            });
          })
          .catch(err => {
            this.$message({
              message: err || "保存时出现未知错误",
              type: "warning"
            });
          })
          .finally(() => {
            this.isDisable = false;
            this.close();
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
    },
    lastModifiedTime() {
      const form: Construction = this.$data.form;
      return moment(
        form.updateTime === null ? form.createTime : form.updateTime
      ).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  watch: {
    data(newValue: Construction) {
      // 深拷贝一份，防止覆盖原数据，影响操作
      const form: Construction = JSON.parse(JSON.stringify(newValue));
      // 转换部分数据以供显示
      this.kind = [form.class2, form.class3]; // 类型
      this.startingAndEnding = form.startingAndEnding.split("-"); // 起止日期
      this.isEnd = EndStatus[form.isEnd]; // 是否已结束
      // 是否可以编辑
      this.canEdit = form.isEnd !== EndStatus.已结束;
      // 赋给表单
      this.form = form;
    }
  },
  created() {
    // 载入中
    this.isLoading = true;

    // 请求院部列表
    const department = fetchDepartmentList()
      .then(
        (data: Department[]) =>
          ((this.options.department as Department[]) = data)
      )
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取院部列表",
          type: "warning"
        });
      });

    // 请求获奖类型列表
    const kind = fetchKindList({
      params: {
        class1: "建设类"
      }
    })
      .then((data: Department[]) => ((this.options.kind as any) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取建设类型列表",
          type: "warning"
        });
      });

    // 获取项目级别列表
    const level = fetchLevelList()
      .then((data: Department[]) => ((this.options.level as any) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取项目级别列表",
          type: "warning"
        });
      });

    // 载入结束
    Promise.all([department, kind, level]).then(() => {
      this.isLoading = false;
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
