import Vue from "vue";
// import css
import "vue-easytable/libs/themes-base/index.css";

// import table and pagination comp
import { VTable, VPagination } from "vue-easytable";

// Register to global
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);
