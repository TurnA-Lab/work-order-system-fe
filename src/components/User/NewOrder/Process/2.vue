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
