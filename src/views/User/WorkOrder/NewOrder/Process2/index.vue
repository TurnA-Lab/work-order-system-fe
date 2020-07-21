<template>
  <component :is="form"></component>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  components: {
    Form1: () => import("./ConstructionForm.vue"),
    Form2: () => import("./AchievementForm.vue"),
    Form3: () => import("./AwardForm.vue")
  },
  computed: {
    form() {
      return "Form" + this.$store.state.order.class;
    }
  }
});
</script>
