// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'

// Vue.config.productionTip = false

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')


import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import store from "./store";
import "./assets/reset.css";
import "./assets/animate.css";
import "./assets/style.css";
import echarts from "echarts";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import bus from "./bus";
import "core-js";
Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/api'  //自动附加在所有axios请求前面，则可以省略/api，直接写'/xxxx/xxx'。否则需要设置'/api/xxxx/xxx'
// axios.interceptors.request.use((config) => {
//   config.headers.authorization = window.sessionStorage.getItem("token");
//   return config;
// });

Vue.config.productionTip = false;

Vue.prototype.$EventBus = bus;
// Vue.prototype.$isLogin = false;

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ElementUI);

// const BASIC_AUTH = "Basic Y29tbWE6Y29tbWE=";

// if (router.meta.show) {
//   axios.interceptors.request.use((config) => {
//     config.headers.authorization = window.sessionStorage.getItem("token");
//     return config;
//   });
// } else {
//   axios.interceptors.request.use((config) => {
//     config.headers.Authorization = BASIC_AUTH;
//     return config;
//   });
// }
axios.interceptors.response.use(async(res) =>{
  if(res.data.code == 401){
    await router.push({path: '/login'})
  }
  return res;
}

)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

