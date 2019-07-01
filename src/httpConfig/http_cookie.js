/**
 * http请求配置
 */
import axios from 'axios'
import {Message} from 'element-ui'
// import Qs from 'qs'

import cookie from '../../static/js/cookie.js'

// axios默认配置
const apiTestURL = "http://localhost:10001";


// axios.baseURL = apiTestURL;
axios.timeout = 10000

// const service = axios.create({
//   baseURL: apiTestURL,  // api的base_url
//   timeout: 10000  // 请求超时时间
// });

//整理数据
// service.defaults.transformRequest = function (data) {
//   data = JSON.stringify(data);
//   return data;
// };

axios.defaults.transformRequest = [
  function(data) {
    return JSON.stringify(data);
  }
];

// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use(
  config => {
    //config.data = JSON.stringify(config.data);
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    //判断是否存在ticket，如果存在的话，则每个http header都加上ticket
    if (cookie.get("token")) {
      //用户每次操作，都将cookie设置成2小时
      cookie.set("token",cookie.get("token") ,1/12);
      cookie.set("name",cookie.get("name") ,1/12);
      config.headers.token = cookie.get("token");
      config.headers.name= cookie.get("name");
    }
    return config;
  },
  error => {
    Message.error({message: '请求超时!'});
    return Promise.reject(error.response);
  });

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log('响应拦截器·', response)
    if (response.data.resultCode=="301") {
      console.log("response.data.resultCode是301")
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
//      cookie.del("ticket")
//      window.location.href='http://login.com'
      return
    }else{
      return response;
    }
  },
  error => {
    return Promise.reject(error.response)   // 返回接口返回的错误信息
  });
// export default axios;
