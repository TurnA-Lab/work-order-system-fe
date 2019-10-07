<template>
  <div class="divider" :class="{transparent: isTransparent}"></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ["isTransparent"]
})
</script>

<style scoped>
.divider {
  display: inline-block;
  border-left: 1px solid #dcdfe6;
  padding-inline-start: 1px;
  padding-block-start: 1em;
  margin-inline-start: 6px;
  margin-inline-end: 6px;
  vertical-align: middle;
}

.transparent {
  padding-block-start: 0px;
}
</style>