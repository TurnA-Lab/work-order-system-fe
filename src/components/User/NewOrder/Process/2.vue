/*
 * @Author: Skye Young 
 * @Date: 2019-10-28 19:46:46 
 * @Last Modified by:   Skye Young 
 * @Last Modified time: 2019-10-28 19:46:46 
 */

<template>
  <component :is="form"></component>
</template>

<script lang="ts">
import Vue from "vue";
import form1 from "@/components/User/NewOrder/Form/1.vue";
import form2 from "@/components/User/NewOrder/Form/2.vue";
import form3 from "@/components/User/NewOrder/Form/3.vue";

export default Vue.extend({
  components: {
    form1,
    form2,
    form3
  },
  computed: {
    form() {
      return "form" + this.$store.state.order.class;
    }
  }
});
</script>

<style scoped>
</style>
