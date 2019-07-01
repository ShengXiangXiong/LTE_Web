import axios from 'axios'
import {Message} from 'element-ui'

axios.defaults.transformRequest = [
  function(data) {
    return JSON.stringify(data);
  }
];

axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  return config;
}, err => {
  Message.error({message: '请求超时!'});
  // return Promise.resolve(err);
})
axios.interceptors.response.use(data => {
  if(data.status && data.status === 200){
    if(data.data.ok === false){
      Message.error({message: data.data.msg});
      return;
    }
    if(data.data.code === 2){
      //code为2时表示token失效
      Message.error({message: data.data.msg});
      window.location.href="/login"
    }
    if (data.data.code === 1) {
      //code为1时表示请求成功
      Message.success({message: data.data.msg});
    }
  }
  // if (data.status && data.status === 200 && data.data.ok === false) {
  //   Message.error({message: data.data.msg});
  //   return;
  // }
  return data;
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({message: '服务器被吃了⊙﹏⊙∥'});
  } else if (err.response.status === 403) {
    Message.error({message: '权限不足,请联系管理员!  0.0'});
  } else if (err.response.status === 401) {
    Message.error({message: err.response.data.msg});
  } else {
    if (err.response.data.msg) {
      Message.error({message: err.response.data.msg});
    }else{
      Message.error({message: '未知错误!  0.0'});
    }
  }
  // return err
  // return Promise.resolve(err);
})
