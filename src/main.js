import Vue from "vue";
import VueRouter from "vue-router";
import DashboardPlugin from "./material-dashboard";

// Plugins
import App from "./App.vue";
import Chartist from "chartist";

// router setup
// import routes from "./routes/routes";
import {router} from './_helpers'

import { store } from "./_store";
import Interceptors from "./_helpers/interceptors";

import axios from "axios";
import VueAxios from "vue-axios";
import Vuelidate from "vuelidate";
import VeeValidate from "vee-validate";
import VueMoment from "vue-moment";
// import moment from "moment-timezone";
import VueQrcode from "@xkeshi/vue-qrcode";
import Toasted from "vue-toasted";
import VueHtmlToPaper from "vue-html-to-paper";

Vue.use(VueAxios, axios); 
Vue.use(Vuelidate);
Vue.use(VeeValidate);
Vue.use(VueMoment);
Vue.component(VueQrcode.name, VueQrcode);
Vue.use(Toasted);

// plugin setup
Vue.use(VueRouter);
Vue.use(DashboardPlugin);

const options = {
  name: "_blank",
  specs:["fullscreen=yes","titlebar=yes","scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css"
  ]
};
Vue.use(VueHtmlToPaper, options);
Interceptors();

// configure router
// const routers = new VueRouter({
//   router, // short for routes: routes
//   linkExactActiveClass: "nav-item active"
// });

// global library setup
Object.defineProperty(Vue.prototype, "$Chartist", {
  get() {
    return this.$root.Chartist;
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  }
});
