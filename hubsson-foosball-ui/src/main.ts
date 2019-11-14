import Vue from 'vue';
import firebaseService from './services/firebase.service';
import App from './App.vue';
import router from './router';
import store from './store';
import SuiVue from 'semantic-ui-vue';


Vue.use(SuiVue);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

firebaseService.subscribeOnAuthStateChange((user) => store.commit('setUser', user ? user.displayName : undefined));
