import Vue from "vue";
import home from "./home.vue";
import router from "./router";
import store from "./store";
import "../../registerServiceWorker";
//import iView from "iview";
//import "iview/dist/styles/iview.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-TW";
import "../../plugins/element";

Vue.use(ElementUI, {
  locale
});
Vue.use(ElementUI);
//Vue.use(iView);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(home)
}).$mount("#home");
