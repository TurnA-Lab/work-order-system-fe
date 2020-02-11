<template>
  <component :is="form"></component>
</template>

<script lang="ts">
import Vue from "vue";
import form1 from "@/components/User/NewOrder/Form/Construction.vue";
import form2 from "@/components/User/NewOrder/Form/Achievement.vue";
import form3 from "@/components/User/NewOrder/Form/Award.vue";

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

<style scoped></style>
