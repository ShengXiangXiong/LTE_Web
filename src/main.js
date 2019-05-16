// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
// import '@/tool/map_load_tool.js'
import esriLoader from 'esri-loader'

Vue.config.productionTip = false;
Vue.use(ElementUI);

const axiosInstance = axios.create({
  headers:{'Content-Type':'application/json;charset=utf-8'},
  withCredentials:true,
});
Vue.prototype.$http = axiosInstance;
/* eslint-disable no-new */
new Vue({
/*  created () {
    const options = {
      // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败
      // url: 'https://js.arcgis.com/4.11/'
      url: 'http://localhost/arcgis_js_api/library/4.11/init.js'
    };
    let modules =  [
      "esri/Map",
      "esri/WebMap",
      'esri/views/MapView',
      "esri/layers/FeatureLayer",
      "esri/layers/MapImageLayer",
      "esri/tasks/QueryTask",
      "esri/tasks/support/Query",
      "esri/symbols/SimpleFillSymbol",
      "esri/symbols/SimpleLineSymbol",
      "esri/Color",
      "esri/layers/TileLayer",
      "esri/widgets/Zoom",
      "esri/widgets/Compass",
      "esri/widgets/Search",
      "esri/widgets/Legend"
      // "esri/InfoTemplate"
    ];
    esriLoader.loadModules(modules, options).then((
      [map,web_map,mapview, FeatureLayer,MapImageLayer, QueryTask, Query, SimpleFillSymbol,SimpleLineSymbol, color,
        TileLayer, Zoom, Compass, Search, Legend]
    ) => {
      Vue.prototype.$map_apis = {
        map,web_map,mapview, FeatureLayer,MapImageLayer, QueryTask, Query, SimpleFillSymbol,SimpleLineSymbol, color,
        TileLayer, Zoom, Compass, Search, Legend
      };
      console.log(this.$map_apis)
    }).catch(error => {console.log('加载api错误', error)});
  },*/
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
