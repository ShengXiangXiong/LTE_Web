import esriLoader from 'esri-loader'
const options = {
  // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败
  // url: 'https://js.arcgis.com/4.11/'
  url: '/static/arcgis_js_api/library/4.11/init.js'
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
  "esri/widgets/Legend",
  "esri/Graphic",
  "esri/geometry/Circle"
];


export default function importEsri() {
  return new Promise((resolve, reject)=>{
    esriLoader.loadModules(modules, options).then((res)=>{
      let [map,web_map,mapview, FeatureLayer,MapImageLayer, QueryTask, Query, SimpleFillSymbol,SimpleLineSymbol, color,
        TileLayer, Zoom, Compass, Search, Legend, Graphic,Circle] = [...res];
      let apis = {map,web_map,mapview, FeatureLayer,MapImageLayer, QueryTask, Query, SimpleFillSymbol,SimpleLineSymbol, color,
        TileLayer, Zoom, Compass, Search, Legend, Graphic,Circle};
      resolve(apis)
    }).catch(err => {reject(err)})
  })
  // esriLoader.loadModules(modules, options).then((
  //   [map,web_map,mapview, FeatureLayer,MapImageLayer, QueryTask, Query, SimpleFillSymbol,SimpleLineSymbol, color,
  //     TileLayer, Zoom, Compass, Search, Legend]
  // ) => {
  //   this.map_apis = {
  //     map,web_map,mapview, FeatureLayer,MapImageLayer, QueryTask, Query, SimpleFillSymbol,SimpleLineSymbol, color,
  //     TileLayer, Zoom, Compass, Search, Legend
  //   };
  //   console.log("1");
  //   return this.map_apis;
  // }).catch(error => {console.log('加载api错误', error)});
}
