import Vue from "vue";
import App from "./App";

import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";

import myPlugin from "./plugin/index.js";

Vue.use(Vuetify)
Vue.use(myPlugin);

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  render: (h) => h(App),
});
