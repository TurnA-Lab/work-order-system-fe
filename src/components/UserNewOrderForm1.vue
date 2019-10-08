<template>
  <div>
    <el-form :model="form" ref="form">
      <el-form-item label>
        <el-select v-model="form.department" placeholder>
          <!-- <el-option v-for="" :key=""></el-option> -->
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      form: {
        department: 0
      }
    };
  }
});
</script>

<style lang="scss" scoped>
</style>