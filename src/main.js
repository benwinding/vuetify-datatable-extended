import Vue from "vue";
import App from "./App";
import myPlugin from "./plugin.js";

Vue.use(myPlugin, {
  job: "Web Dev",
});

new Vue({
  el: "#app",
  render: (h) => h(App),
});
