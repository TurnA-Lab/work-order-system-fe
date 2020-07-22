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
      <span class="last-time">最后修改时间 {{ lastModifiedTime }}</span>
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
        <el-form-item class="form-item" label="成果名称">
          <el-input
            v-model="form.production"
            :disabled="editIsDisable"
          ></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="院部">
          <el-input v-model="form.dptName" disabled></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="第一作者">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="成员">
          <el-input
            v-model="form.teammate"
            :disabled="editIsDisable"
          ></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="发表刊物/出版社/授权单位">
          <el-input
            v-model="form.unit"
            placeholder="请输入发表刊物/出版社/授权单位"
            :disabled="editIsDisable"
          ></el-input>
        </el-form-item>

        <el-form-item class="form-item" label="发表/出版/授权日期">
          <el-date-picker
            align="center"
            v-model="form.publishTime"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="发表/出版/授权日期"
            :disabled="editIsDisable"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="成果类别">
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

        <el-form-item class="form-item" label="是否被转让（仅限专利）">
          <el-select
            v-model="form.isUsed"
            placeholder="请选择"
            :disabled="editIsDisable"
          >
            <el-option
              v-for="item in options.patentIsUsed"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="年度">
          <el-date-picker
            align="center"
            v-model="form.year"
            type="year"
            value-format="yyyy"
            placeholder="请选择年度"
            :disabled="editIsDisable"
          ></el-date-picker>
        </el-form-item>

        <el-form-item class="form-item" label="学年">
          <el-select
            v-model="form.schoolYear"
            placeholder="请选择"
            :disabled="editIsDisable"
          >
            <el-option
              v-for="item in options.schoolYears"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="佐证材料">
          <file-previewer-btn :files="form.certificate"
            >点击查看</file-previewer-btn
          >
        </el-form-item>

        <el-form-item class="form-item" label="审核状态">
          <el-select
            v-model="form.status"
            placeholder="请选择"
            :disabled="editIsDisable"
          >
            <el-option
              v-for="item in options.officeStatus"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="form-item" label="未通过原因">
          <el-input
            v-model="form.reason"
            placeholder="若未通过，请填写此项"
            :disabled="editIsDisable || form.status !== -1"
          ></el-input>
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
    </div>
  </el-dialog>
</template>

<script lang="ts">
import moment from "moment";
import Vue from "vue";

import FilePreviewerBtn from "@/components/Etc/FileViewerBtn.vue";
import { Achievement, Kind } from "@/interface/list-data";
import {
  noOrYesList,
  officeStatusList,
  yearList
} from "@/static-data/work-order";
import { LabelList } from "@/utils/enum2List";
import { fetchKindList, postData } from "@/utils/fetchData";
import { allNotNull } from "@/utils/validate";

export default Vue.extend({
  props: { data: Object, dataIndex: Number, isVisible: Boolean },
  components: {
    FilePreviewerBtn
  },
  data(): {
    form: Achievement | {}; // 表单
    kind: string[]; // 工单类型
    isLoading: boolean; // 载入中
    editIsDisable: boolean; // 禁止编辑
    isDisable: boolean; // 保存时禁止按钮操作
    options: {
      kind: Kind[];
      patentIsUsed: LabelList[];
      schoolYears: string[];
      officeStatus: LabelList[];
    }; // 下拉选项列表
  } {
    return {
      isLoading: true,
      editIsDisable: true,
      isDisable: false,
      kind: [],
      form: {},
      options: {
        kind: [],
        patentIsUsed: noOrYesList,
        schoolYears: yearList,
        officeStatus: officeStatusList
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
    updateInfo() {
      if (
        allNotNull(
          Object.assign({}, this.form, {
            class2: this.kind[0],
            class3: this.kind[1],
            testimonial: "validate",
            updateTime: "validate",
            reason:
              (this.form as Achievement).status === -1
                ? (this.form as Achievement).reason
                : "validate"
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
          class3: this.kind[1]
        });
        // 提交表单
        postData("/api/office/achievement/supplement", this.form)
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
      const form: Achievement = this.$data.form;
      return moment(
        form.updateTime === null ? form.createTime : form.updateTime
      ).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  watch: {
    data(newValue: Achievement) {
      // 深拷贝一份，防止覆盖原数据，影响操作
      const form: Achievement = JSON.parse(JSON.stringify(newValue));
      // 转换部分数据以供显示
      this.kind = [form.class2, form.class3]; // 类型
      // 赋给表单
      this.form = form;
    }
  },
  created() {
    // 加载中
    this.isLoading = true;

    // 请求成果类型列表
    fetchKindList({
      params: {
        class1: "成果类"
      }
    })
      .then((data: Kind[]) => ((this.options.kind as Kind[]) = data))
      .catch((err: string) => {
        this.$message({
          message: err || "由于未知因素，无法获取成果类型列表",
          type: "warning"
        });
      })
      .finally(() => (this.isLoading = false));
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
