import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueFire from "vuefire";

Vue.config.productionTip = false;
Vue.use(VueFire);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
