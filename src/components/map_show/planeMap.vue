<template>
  <div>
    <div>
      <div id="viewDiv"></div>
    </div>
  </div>
</template>

<script>
  import Index from "../index";
  import load_esri from "../../utils/map_load_tool"
  import esriLoader from 'esri-loader'
  import {getMap, post} from "@/httpConfig/api"
  // let map_apis = load_esri();

  export default {
    name: "planeMap",
    components: {Index},
    data(){
      return {
        message: 'aa',
        apis: null,
        buildInfo:null,
        map:null,
        query:null,
        queryTask:null,
        mapImage:null,
        mapView:null,
        buildingPopupTemplate:null,
        cellPopupTemplate:null,
        functionPopupTemplate:null,
        graphic:null
      }
    },
    mounted () {
      this.loadMap()

    },
    computed: {
      view () {
        return this.mapView && this.mapView.view
      }
    },
    watch: {
      view () {

      }
    },
    methods: {
      async loadMap() {
        let apis = await load_esri();
        esriLoader.loadCss("/static/arcgis_js_api/library/4.11/esri/css/main.css");
        this.apis = apis;

        let mapUrl = "http://localhost:6080/arcgis/rest/services/GSM/MapServer";
        let gsmLayerUrl = "http://localhost:6080/arcgis/rest/services/GSM/MapServer/3";
        let buildingLayerUrl = "http://localhost:6080/arcgis/rest/services/GSM/MapServer/2";

        this.map = new apis.map();
        /*let grassRenderer = {
          type: "simple", // autocasts as new SimpleRenderer()
          symbol: {
            type: "simple-line", // autocasts as new SimpleLineSymbol()
            style: "none",
            width: 0.7,
            color: "green"
          },
          label: "grass"
        };*/

        this.mapImage = new apis.MapImageLayer({url:mapUrl});

        // let buildingLayer = new apis.FeatureLayer({
        //   url:buildingLayerUrl
        // })
        // let gsmLayer = new apis.FeatureLayer({
        //   url:gsmLayerUrl
        // })

        // this.map.addMany([buildingLayer,gsmLayer]);
        this.map.add(this.mapImage)

        this.mapView = new apis.mapview ({
          container: "viewDiv",
          map: this.map,
          zoom: 3,
        });
        //清空默认logo
        this.mapView.ui.components=[""];
        //在地图上加载小插件
        let searchWidget = new apis.Search({view: this.mapView});
        let zoomWidget = new apis.Zoom({view: this.mapView});
        this.mapView.ui.add(searchWidget,"top-right");
        this.mapView.ui.add(zoomWidget,"top-left");
        //创建查询对象
        this.query = new this.apis.Query();
        this.query.outFields = ["*"];//返回所有查询的属性
        this.query.returnGeometry = true;
        this.queryTask = new this.apis.QueryTask(buildingLayerUrl);

        //给地图绑定点击监听事件
        // let buildingFeatureLayer = new this.apis.FeatureLayer({
        //   url:buildingLayerUrl,
        //   outFields: ["*"],
        //   popupTemplate:this.buildingPopupTemplate
        // });

        // let viewListener = this.mapView.on("pointer-move",this.do_query);
        let viewListener = this.mapView.on("pointer-move",this.eventHandler);
        // this.mapView.on("click",this.clickHandler)

        //building弹出窗体
        this.buildingPopupTemplate = {
          title:"The information of this selected building",
          content:[{
            type:"fields",
            fieldInfos:[{
              fieldName:"FID",
              // label:"FID",
              visible:true,
            },{
              fieldName:"BId",
              // label:"Bid",
              visible:true,
            },{
              fieldName:"Longitude",
              visible:true,
            },{
              fieldName:"Latitude",
              visible:true,
            }]
          }]
          // fieldInfos:["*"],
        }
        //功能项弹出窗体
        let CellRayTracing = '<a href="http://www.w3school.com.cn">小区覆盖计算</a>'
        this.functionPopupTemplate = {
          title:"The executing task for this selected building",
          content:CellRayTracing
        }

        //todo 根据点击不同的layer，展现不同的popupTemplate

        // //cell弹出窗体
        // this.cellPopupTemplate = {
        //
        // }
      },

      do_query(evt){
        this.mapView.graphics.removeAll();//clear currently displayed results
        this.query.geometry = evt.mapPoint;//获取地图点击的点，得到geometry区域
        let lat = evt.mapPoint.latitude;
        let lon = evt.mapPoint.longitude;

        // this.add_circle(center,radius,color,attr,featureLayer);

        this.query.outSpatialReference = this.mapView.spatialReference;
        this.queryTask.execute(this.query).then((res)=>{
          console.log("执行了查询");
          //解析attributes
          let featureArray = res.features;
          let graphic = featureArray[0];
          graphic.attributes["Longitude"] = lon;
          graphic.attributes["Latitude"] = lat;
          this.buildInfo = graphic.attributes;
          console.log(graphic)
          graphic.symbol = {
            type: "simple-line",
            color: [226, 119, 40],
          };
          //将查询到的graphic绑定定义好的template
          graphic.popupTemplate = this.buildingPopupTemplate;
          //再次左键点击时，就相当于点击这个graphic，那么就会自动呈现template
          this.mapView.graphics.add(graphic);
          return graphic;
        }).then((graphic)=>{
          this.mapView.on("click",(evt)=>{
            console.log("951");
          })
        })
      },

      eventHandler(evt){
        this.graphic = null;
        this.buildInfo = null;
        this.mapView.graphics.removeAll();//clear currently displayed results
        let point = this.mapView.toMap(evt)
        this.query.geometry = point;//获取地图点击的点，得到geometry区域
        let lat = point.latitude;
        let lon = point.longitude;
        this.query.outSpatialReference = this.mapView.spatialReference;
        this.queryTask.execute(this.query).then((res)=>{
          if(res.features!==0){
            //解析attributes
            let featureArray = res.features;
            let graphic = featureArray[0];
            graphic.attributes["Longitude"] = lon;
            graphic.attributes["Latitude"] = lat;
            this.buildInfo = graphic.attributes;
            graphic.symbol = {
              type: "simple-line",
              color: [226, 119, 40],
            };
            //再次点击时，就相当于点击这个graphic，那么就会自动呈现template
            this.mapView.graphics.add(graphic);
            this.graphic = graphic;
            return graphic;
          }
        })
          .then((graphic)=>{
            if(graphic==null){
              return
            }
            this.mapView.on("click",(evt)=>{
              if(evt.button===2){
                //右键显示功能选项框
                graphic.popupTemplate = this.functionPopupTemplate;
              }
              else if(evt.button===0){
                //左键将查询到的graphic绑定定义好的template
                graphic.popupTemplate = this.buildingPopupTemplate;
              }
            })
          })
      },
      clickHandler (evt) {
        console.log(this.mapView.graphics)
        if(this.graphic == null && this.mapView.graphics.length === 0) {
          console.log('data is not received')
        }else{
          if(evt.button===2){
            //右键显示功能选项框
            this.graphic.popupTemplate = this.functionPopupTemplate;
            console.log("br")
          }
          else if(evt.button===0){
            //左键将查询到的graphic绑定定义好的template
            this.graphic.popupTemplate = this.buildingPopupTemplate;
            console.log("bl")
          }
        }
      },

      add_circle(center,radius,color,attr,layer){
        let circle = new this.apis.Circle({
          center:center,
          radius:radius,
          geodesic: true,
        });
        let point = {
          type:"point",
          longitude: center[1],
          latitude: center[0]
        };
        let markerSymbol = {
          type:"simple-marker",
          color:color
        };
        let fillSymbol = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [227, 139, 79, 0.8],
          outline:null
          // outline: {
          //   // autocasts as new SimpleLineSymbol()
          //   color: "blue",
          //   width: 1
          // }
        };

        // let circleGeometry  = new this.apis.geometry.Circle({ center: [geometry.getLongitude(), geometry.getLatitude()],
        //   radius: radius,
        // });


        let circleGraphic = new this.apis.Graphic({
          geometry:circle,
          symbol:fillSymbol,
          attributes:attr,
        });
        console.log(circleGraphic);

        let pointGraphic = new this.apis.Graphic({
          geometry:point,
          symbol:markerSymbol
        });

        this.mapView.graphics.add(circleGraphic);

        // this.mapView.graphics.add(pointGraphic);

        // layer.applyEdits({
        //   addFeatures: [circleGraphic],
        // }).then(editsResult=>{
        //   // let objectId = editsResult.addFeatureResults[0].objectId;
        //   // selectFeature(objectId);
        //   console.log("13");
        //   console.log(editsResult);
        //   layer.refresh();
        // }).catch(error=>{
        //   console.log("===============================================");
        //   console.error("[ applyEdits ] FAILURE: ", error.code, error.name, error.message);
        //   console.log("error = ", error);
        // });
      }
    }
  };
</script>

<style scoped>
  /*@import url('http://localhost/arcgis_js_api/library/4.11/esri/css/main.css');*/
  /*@import "/static/arcgis_js_api/library/4.11/esri/css/main.css";*/
  #viewDiv {
    margin: 0px auto;
    border: 0px solid #000;
    width: 100%;
    height: 1000px;
    padding-top: 15px;
  }
</style>
