import Vue from "vue";
import App from "./App";
import myPlugin from "./plugin/index.js";

Vue.use(myPlugin);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
