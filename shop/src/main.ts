import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from "@/router/router";
// @ts-ignore
import { Scrollbar } from 'element-ui';
import "scss/resetStyle.css"
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;
// 使用iView组件库
Vue.use(ViewUI);
// 使用滚动条
Vue.component(Scrollbar.name, Scrollbar);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
