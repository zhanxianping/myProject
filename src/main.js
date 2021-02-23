import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from "./utils/api";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ws from "./utils/webSocket";
import phone from "./utils/phone";

Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$get = api.get;
Vue.prototype.$post = api.post;
Vue.prototype.$ws = ws;
Vue.prototype.$phone = phone;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
