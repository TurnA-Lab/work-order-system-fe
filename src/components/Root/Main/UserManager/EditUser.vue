/*
 * @Author: Skye Young 
 * @Date: 2019-11-17 20:11:55 
 * @Last Modified by: Skye Young
 * @Last Modified time: 2019-11-17 22:03:10
 */

<template>
  <el-dialog
    custom-class="wo-dialog"
    :visible="$store.state.rootPages.editUserIsVisible"
    :close-on-click-modal="false"
    @close="close"
    append-to-body
  >
    <div slot="tittle">编辑用户信息</div>
    <div>
      <el-form ref="form" :model="form" size="medium" label-position="left" label-width="auto">
        <el-form-item label="姓名">
          <el-input v-model="form"></el-input>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="form"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button type="primary" plain>取消</el-button>
      <el-button type="primary">确认</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["userData"],
  data() {
    return {
      form: this.userData
    };
  },
  methods: {
    close() {
      this.$store.commit("toggleEditUser");
    }
  }
});
</script>

<style lang="scss" scoped>
.wo-dialog {
  border-radius: 1rem;
  width: 30vw;
  min-width: 450px;
}
</style>