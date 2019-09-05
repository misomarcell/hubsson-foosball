import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import SuiVue from 'semantic-ui-vue';
import Firebase from "firebase";

Vue.config.productionTip = false;

Vue.use(SuiVue);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

Firebase.auth().onAuthStateChanged((user) => {
  store.commit("setUser", user ? user.displayName : undefined);
});