import esriLoader from 'esri-loader'

const options = {
  // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败
  url: 'https://js.arcgis.com/4.11/'
  // url: 'http://10.103.252.26/arcgis_js_api/library/4.11/init.js'
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
  "esri/geometry/Circle",

  "esri/views/2d/draw/Draw",
  "esri/geometry/Polyline",
  "esri/geometry/Polygon",
  "esri/geometry/Point",
  "esri/core/urlUtils",
  "esri/config",
];


export default function importEsri() {
  return new Promise((resolve, reject)=>{
    esriLoader.loadModules(modules, options).then((res)=>{
      let [map,web_map,mapview, FeatureLayer,MapImageLayer, QueryTask, Query, SimpleFillSymbol,SimpleLineSymbol, color,
        TileLayer, Zoom, Compass, Search, Legend, Graphic,Circle,Draw,Polyline,Polygon,Point, urlUtils, esriConfig] = [...res];
      let apis = {map,web_map,mapview, FeatureLayer,MapImageLayer, QueryTask, Query, SimpleFillSymbol,SimpleLineSymbol, color,
        TileLayer, Zoom, Compass, Search, Legend, Graphic,Circle,Draw,Polyline,Polygon,Point, urlUtils, esriConfig};
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
