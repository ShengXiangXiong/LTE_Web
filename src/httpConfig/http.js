import axios from 'axios'
import {Message} from 'element-ui'

axios.defaults.transformRequest = [
  function(data) {
    return JSON.stringify(data);
  }
];

axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  config.headers['auth'] = window.localStorage.getItem('token')
  // config.timeout = 1000 * 60 * 60 * 60*60*60*60
  return config;
}, err => {
  Message.error({message: '请求超时!' + err})
  // return Promise.resolve(err);
})
axios.interceptors.response.use(data => {
  if(data.status && data.status === 200){
    if(data.data.ok === false){
      Message.error({message: data.data.msg});
      return;
    } else if (data.data.code === 2) {
      //code为2时表示token失效
      Message.error({message: data.data.msg});
      window.location.href="/login"
    }
    //todo:后端返回的code逻辑并未与前端保持一致，只有login模块是修改后的，其它返回的结果并未包含code,等到后端返回的结果完全遵守约定时，才放开
    /*if (data.data.code === 1) {
      //code为1时表示请求成功
      Message.success({message: data.data.msg});
    }*/
    else {
      //code为1时表示请求成功
      // Message.success({message: data.data.msg});      // 阻止全局弹出请求成功，手动添加
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
})

export default axios
