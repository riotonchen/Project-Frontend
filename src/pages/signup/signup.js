import Vue from "vue";
import signup from "./signup.vue";
import router from "../../router";
import store from "../../store";
import "../../registerServiceWorker";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/zh-TW";
import "../../plugins/element";

Vue.use(ElementUI, {
  locale
});

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(signup)
}).$mount("#signup");
