// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/tool/map_load_tool.js'
import './httpConfig/http.js'
import store from './store/store'
import {initMenu} from './httpConfig/utils';

Vue.config.productionTip = false;
Vue.use(ElementUI);

// Vue.prototype.getRequest = getRequest;
// Vue.prototype.postRequest = postRequest;
// Vue.prototype.deleteRequest = deleteRequest;
// Vue.prototype.putRequest = putRequest;
// Vue.prototype.isNotNullORBlank = isNotNullORBlank;

router.beforeEach((to, from, next)=> {
    if (to.name === 'login') {
      next();
      return;
    }
    let name = store.state.user.name;
    if (name === 'not logged') {
      if (to.meta.requireAuth || to.name == null) {
        //被拦截时，将其原本想请求的地址写在redirect中，传给拦截的route（这里就是"/"即login），然后在login成功后
        // 它可以直接通过获取redirect中的数据，跳转到他之前想跳转的地址
        next({path: '/', query: {redirect: to.path}})
      } else {
        next();
      }
    } else {
      // initMenu(router, store);
      // if(to.path=='/chat')
      //   store.commit("updateMsgList", []);
      next();
    }
  }
)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
