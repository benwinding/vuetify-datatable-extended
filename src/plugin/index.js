import Component from "./plugin.vue";

// This exports the plugin object.
export default {
  install(Vue) {
    Vue.component("v-data-table-extended", Component);
  },
};
