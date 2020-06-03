// plugin.js
import Component from "/src/components/Component.vue";

// This exports the plugin object.
export default {
  // The install method will be called with the Vue constructor as
  // the first argument, along with possible options
  install(Vue, options) {
    // Add or modify global methods or properties.
    Vue.yourMethod = (value) => value;
    // Add a component or directive to your plugin, so it will be installed globally to your project.
    Vue.component("component", Component);
    // Add `Vue.mixin()` to inject options to all components.
    Vue.mixin({
      // Add component lifecycle hooks or properties.
      created() {
        console.log("Hello from created hook!");
      },
    });
    // Add Vue instance methods by attaching them to Vue.prototype.
    Vue.prototype.$myProperty = "This is a Vue instance property.";
  },
};
