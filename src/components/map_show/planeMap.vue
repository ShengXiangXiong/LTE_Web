<template>
  <div>
    <div>
      <div id="viewDiv"></div>
      <div class="esri-widget" id="optionsDiv">
        <el-input type="text"
                  v-model="gsmNameFind"
                  auto-complete="off"
                  placeholder="请输入基站名称"
        ></el-input>
        <button class="esri-widget" id="doBtn">查询</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Index from '../index'
  import load_esri from '../../utils/map_load_tool'
  import esriLoader from 'esri-loader'
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
        queryTaskForBuilding: null,
        queryTaskForGSM: null,
        mapImage:null,
        mapView:null,
        buildingPopupTemplate:null,
        cellPopupTemplate:null,
        functionPopupTemplate:null,
        graphic: null,
        gsmNameFind: null
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

        let mapUrl = 'http://127.0.0.1:6080/arcgis/rest/services/LTE/MapServer'
        let gsmLayerUrl = 'http://127.0.0.1:6080/arcgis/rest/services/LTE/MapServer/3'
        let buildingLayerUrl = 'http://127.0.0.1:6080/arcgis/rest/services/LTE/MapServer/2'

        this.map = new apis.map();
        this.mapImage = new apis.MapImageLayer({url:mapUrl});
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
        // this.mapView.ui.add(zoomWidget,"top-left");
        this.mapView.ui.add('optionsDiv', 'top-left')
        //创建查询对象
        this.query = new this.apis.Query();
        this.query.outFields = ["*"];//返回所有查询的属性
        this.query.returnGeometry = true;
        this.queryTaskForBuilding = new this.apis.QueryTask(buildingLayerUrl)
        this.queryTaskForGSM = new this.apis.QueryTask(gsmLayerUrl)
        //给地图绑定点击监听事件
        // let buildingFeatureLayer = new this.apis.FeatureLayer({
        //   url:buildingLayerUrl,
        //   outFields: ["*"],
        //   popupTemplate:this.buildingPopupTemplate
        // });

        // let viewListener = this.mapView.on("pointer-move",this.do_query);
        // let viewListener = this.mapView.on("pointer-move",this.eventHandler);
        this.mapView.on('click', this.eventHandler)

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
              fieldName: 'CellName',
              visible:true,
            }]
          }]
          // fieldInfos:["*"],
        }
        //功能项弹出窗体
        let coverLayerAction = {
          title: '查看覆盖图层',
          id: 'findCoverLayer',
        }
        let task = '<a href="http://www.w3school.com.cn">小区覆盖计算</a>'
        this.functionPopupTemplate = {
          title:"The executing task for this selected building",
          content: task,
          actions: [coverLayerAction]
        }
        let coverName = this.findLayer()
        this.addLayer(coverName)
        //绑定弹窗监听
        this.mapView.popup.on('trigger-action', function (event) {
          // Execute the measureThis() function if the measure-this action is clicked
          if (event.action.id === 'findCoverLayer') {
            let coverName = this.findLayer()
            console.log(coverName)
            this.addLayer(coverName)
          }
        })

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

      // Executes each time the button is clicked
      doQuery () {
        // Clear the results from a previous query
        this.mapView.graphics.removeAll()
        /*********************************************
         *
         * Set the where clause for the query. This can be any valid SQL expression.
         * In this case the inputs from the three drop down menus are used to build
         * the query. For example, if "Elevation", "is greater than", and "10,000 ft"
         * are selected, then the following SQL where clause is built here:
         *
         * params.where = "ELEV_ft > 10000";
         *
         * ELEV_ft is the field name for Elevation and is assigned to the value of the
         * select option in the HTML below. Other operators such as AND, OR, LIKE, etc
         * may also be used here.
         *
         **********************************************/
        params.where = 'CellName = ' + this.gsmNameFind
        // executes the query and calls getResults() once the promise is resolved
        // promiseRejected() is called if the promise is rejected
        this.queryTaskForGSM
          .execute(params)
          .then(this.getResults)
          .catch(this.promiseRejected)
      },
      // Called each time the promise is resolved
      getResults (response) {
        // Loop through each of the results and assign a symbol and PopupTemplate
        // to each so they may be visualized on the map
        var peakResults = response.features.map(function (feature) {
          // Sets the symbol of each resulting feature to a cone with a
          // fixed color and width. The height is based on the mountain's elevation
          feature.symbol = {
            type: 'simple-line',
            color: [226, 119, 40],
          }
          feature.popupTemplate = this.functionPopupTemplate
          return feature
        })

        this.mapView.graphics.add(peakResults)

        // animate to the results after they are added to the map
        view.goTo(peakResults).then(function () {
          view.popup.open({
            features: peakResults,
            featureMenuOpen: true,
            updateLocationEnabled: true
          })
        })
      },
      // Called each time the promise is rejected
      promiseRejected (error) {
        console.error('Promise rejected: ', error.message)
      },

      showGraphic () {
        this.graphic = null
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
        this.queryTaskForBuilding.execute(this.query).then((res) => {
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
      },

      findLayer () {
        return '小区8覆盖.shp'
      },
      addLayer (dataSourceName) {
        let grassRenderer = {
          type: 'simple', // autocasts as new SimpleRenderer()
          symbol: {
            type: 'simple-line', // autocasts as new SimpleLineSymbol()
            style: 'none',
            width: 0.7,
            color: 'green'
          },
          label: 'grass'
        }
        let layer = new this.apis.MapImageLayer({
          url: 'http://127.0.0.1:6080/arcgis/rest/services/LTE/MapServer',
          sublayers: [{
            renderer: grassRenderer,
            source: {
              type: 'data-layer',
              dataSource: {
                type: 'table',
                workspaceId: '0',
                dataSourceName: dataSourceName
              }
            }
          }]
        })
        this.map.add(layer)
      }

    }
  };
</script>

<style scoped>
  /*@import url('http://localhost/arcgis_js_api/library/4.11/esri/css/main.css');*/
  /*@import "/static/arcgis_js_api/library/4.11/esri/css/main.css";*/
  #viewDiv {
    margin: 0 auto;
    border: 0 solid #000;
    width: 100%;
    height: 1000px;
    padding-top: 15px;
  }

  #optionsDiv {
    background-color: dimgray;
    color: white;
    padding: 10px;
    width: 200px;
  }
</style>
