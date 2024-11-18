// // 组件功能：负责统一导出一个配置后的 axios
// // 1.导入 axios 模块
// // import routes from '@/router';
// // import store from '@/store';
// import store from '@/store';
// import axios from 'axios'
// // import { config } from 'vue/types/umd';
// // 2 .配置 axios 模块
// // 2.1. 配置基地址
// // axios.defaults.baseURL = '/api/'
// // 2.2 设置请求拦截器
// // 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
// const BASIC_AUTH = "Basic Y29tbWE6Y29tbWE=";

// axios.defaults.withCredentials = true;

// // axios.interceptors.request.use(config => {
// //     if (routes.meta.show ) {
// //         // 为请求头对象，添加token验证的Authorization字段
// //         config.headers.Authorization = `Bearer ${store.state.token}`;
// //     }else{
// //         config.headers.Authorization = BASIC_AUTH;
// //     }
// //     return config
// // });

// axios.interceptors.request.use(config => {
//     //为请求头对象，添加token验证的Authorization字段
//     const url = config.url;
//     if (url.includes("auth/oauth")) {
//         config.headers.Authorization = BASIC_AUTH
//     }else{
//         config.headers.Authorization = `Bearer ${store.state.token}`;
//     }  
//     // config.headers.Authorization = BASIC_AUTH;
//     // config.headers.Authorization = 'Bearer 430fd2a1-0086-4d1b-bdd5-bf8775181f46';
//     config.headers["Auth-Sub"] = "user";
//     // config.headers["Content-Type"] = "application/x-www-form-urlencoded";

//     // config.headers.Cookie =
//     //       "JSESSIONID=Zfoh5ERu9RrhTfZfFWZyKu6orHARhhJVL2kFLjee";
//     return config
// })

// // 3.导出 axios 模块方法
// export default axios
