import Vue from "vue";
import App from "./App.vue";
import VueObserveVisibility from "vue-observe-visibility";
import VueScrollTo from "vue-scrollto";

Vue.use(VueObserveVisibility);
Vue.use(VueScrollTo, { duration: 500, easing: "ease" });

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
