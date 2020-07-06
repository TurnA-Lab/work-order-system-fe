<template>
  <component :is="form"></component>
</template>

<script lang="ts">
import Vue from "vue";
import Form1 from "./ConstructionForm.vue";
import Form2 from "./AchievementForm.vue";
import Form3 from "./AwardForm.vue";

export default Vue.extend({
  components: {
    Form1,
    Form2,
    Form3,
  },
  computed: {
    form() {
      return "Form" + this.$store.state.order.class;
    },
  },
});
</script>
