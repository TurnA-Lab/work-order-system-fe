<template>
  <component :is="form"></component>
</template>

<script lang="ts">
import Vue from "vue";
import form1 from "@/components/UserNewOrderForm1.vue";
import form2 from "@/components/UserNewOrderForm2.vue";
import form3 from "@/components/UserNewOrderForm3.vue";

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
