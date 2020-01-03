<template>
  <el-row>

  <div>
    <div>

      <div id="viewDiv"></div>
      <div class="esri-widget" id="optionsDiv">

        <div id="line-button" class="esri-widget esri-widget--button esri-interactive" title="画线">
          <span class="esri-icon-polyline"></span>
        </div>
        <div id="area-button" class="esri-widget esri-widget--button esri-interactive" title="画面">
          <span class="esri-icon-polygon"></span>
        </div>
        <div id="point-button" class="esri-widget esri-widget--button esri-interactive" title="画点">
          <span class="esri-icon-radio-checked"></span>
        </div>
        <div id="circle-button" class="esri-widget esri-widget--button esri-interactive" title="画圆">
          <span class="esri-icon-radio-unchecked"></span>
        </div>
        <div id="rectangle-button" class="esri-widget esri-widget--button esri-interactive" title="画矩形">
          <span class="esri-icon-checkbox-unchecked"></span>
        </div>



          <el-col>
            <el-input type="text"
              v-model="gsmNameFind"
              auto-complete="off"
              placeholder="请输入"
          ></el-input>
        </el-col>
        <el-col> <el-button class="esri-widget" id="doBtn" @click="doQuery" icon="el-icon-search" type="primary" size="small">查询</el-button></el-col>
        <el-col> <el-button class="esri-widget" id="doBtn1" @click="roadMeasure" icon="el-icon-search" type="primary" size="small">路测</el-button></el-col>
        <el-col> <el-button class="esri-widget" id="doBtn2" @click="reverTrace" icon="el-icon-search" type="primary" size="small">反向跟踪</el-button></el-col>

        <el-dropdown @command="handleCommand">
          <el-button type="primary" class="esri-widget">
            覆盖图层显示<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="showBuildingLayer">小区覆盖图层显示</el-dropdown-item>
            <el-dropdown-item command="showAreaLayer">区域覆盖图层显示</el-dropdown-item>
            <el-dropdown-item command="showNetInLayer">网内干扰图层显示</el-dropdown-item>
            <el-dropdown-item command="showNetOutLayer">网外干扰图层显示</el-dropdown-item>
            <el-dropdown-item command="showVirtualLayer">虚拟路测图层显示</el-dropdown-item>
            <el-dropdown-item command="showLayer">图层显示</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </div>
    </div>

  </div>
  </el-row>

</template>

<script>
  import Index from '../index'
  import load_esri from '../../utils/map_load_tool'
  import esriLoader from 'esri-loader'
  import {AreaCoverAnalysis, LoadShpLayer, PostAreaCoverDefect} from '@/httpConfig/api'

  export default {
    name: "planeMap",
    components: {Index},
    data(){
      return {
        AreaCover: {
          maxLatitude: 32.258000,
          minLatitude: 32.257300,
          maxLongitude: 118.749300,
          minLongitude: 118.749250,
          incrementAngle: '65',
          threadNum: '3',
          reflectionNum: '3',
          diffractionNum: '2',
          diffPointsMargin: '3',
          computeIndoor: true,
          computeDiffrac: true,
          directCoeff: '0.3',
          reflectCoeff: '1.0',
          diffractCoeff: '1.0',
          diffractCoeff2: '1.0',
        },
        PostAreaCover: {
          maxLatitude: 32.258000,
          minLatitude: 32.257300,
          maxLongitude: 118.749300,
          minLongitude: 118.749250,

        },
        nowLayer: null,
        nowLegend: null,
        drawFlag: false,
        message: 'aa',
        apis: null,
        buildInfo:null,
        gsmInfo: null,
        map:null,
        query:null,
        queryTaskForBuilding: null,
        queryTaskForGSM: null,
        mapImage:null,
        mapView:null,
        buildingPopupTemplate:null,
        gsmPopupTemplate: null,
        functionPopupTemplate:null,
        graphic: null,
        gsmNameFind: '汊河变中兴宏基站-扇区1',
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
        this.apis.urlUtils.addProxyRule({
          urlPrefix: "http://10.103.252.26:6080",  //切片服务地址
          proxyUrl: "http://10.103.252.26:80/DotNet/proxy.ashx"   //代理部署地址
        });

        let mapUrl = 'http://10.103.252.26:6080/arcgis/rest/services/LTE2/MapServer';
        let buildingLayerUrl = 'http://10.103.252.26:6080/arcgis/rest/services/LTE2/MapServer/0';
        let gsmLayerUrl = 'http://10.103.252.26:6080/arcgis/rest/services/gsm/MapServer/0';
        let testName = '小区8覆盖.shp';
        this.map = new apis.map();
        this.mapImage = new apis.TileLayer({
          url: mapUrl,
          legendEnabled: false,
        });
        this.map.add(this.mapImage);

        this.mapView = new apis.mapview ({
          container: "viewDiv",
          map: this.map,
          zoom: 3,
        });
        // this.addGsmLayer(testName);

        this.addGsmLayer('小区.shp')

        //清空默认logo
        this.mapView.ui.components=[""];
        //在地图上加载小插件
        let searchWidget = new apis.Search({view: this.mapView});
        let zoomWidget = new apis.Zoom({view: this.mapView});
        this.mapView.ui.add(searchWidget,"top-right");
        this.mapView.ui.add('optionsDiv', 'top-left');
        this.mapView.ui.add("line-button", "top-left");//添加绘制线按钮，自定义UI
        this.mapView.ui.add("area-button", "top-left");//添加绘制面按钮，自定义UI
        this.mapView.ui.add("point-button", "top-left");//添加绘制面按钮，自定义UI
        this.mapView.ui.add("circle-button", "top-left");//添加绘制面按钮，自定义UI
        this.mapView.ui.add("rectangle-button", "top-left");//添加绘制面按钮，自定义UI

        //创建查询对象
        this.query = new this.apis.Query();
        this.query.outFields = ["*"];//返回所有查询的属性
        this.query.returnGeometry = true;
        this.queryTaskForBuilding = new this.apis.QueryTask(buildingLayerUrl);
        this.queryTaskForGSM = new this.apis.QueryTask(gsmLayerUrl);

        this.mapView.on('click', this.eventHandler);
        //给地图绑定点击监听事件
        // let buildingFeatureLayer = new this.apis.FeatureLayer({
        //   url:buildingLayerUrl,
        //   outFields: ["*"],
        //   popupTemplate:this.building
        // });
        //let viewListener = this.mapView.on("pointer-move",this.eventHandler);
        this.mapView.when(() => {
          let draw = new this.apis.Draw({
            view: this.mapView
          });
          console.log('done');
          let drawLineButton = document.getElementById("line-button");
          drawLineButton.onclick = () => {
            this.mapView.graphics.removeAll();//清楚之前的绘制
            this.enableCreateLine(draw, this.mapView);
        };
        //绑定面按钮绘制事件
        let drawAreaButton = document.getElementById("area-button");
        drawAreaButton.onclick = () => {
          this.mapView.graphics.removeAll();//清楚之前的绘制
          this.enableCreateArea(draw, this.mapView);
        };
        //绑定面按钮绘制事件
        let drawPointButton = document.getElementById("point-button");
        drawPointButton.onclick = () => {
          this.enableCreatePoint(draw, this.mapView);
        };
        //绑定面按钮绘制事件
        let drawCircleButton = document.getElementById("circle-button");
        drawCircleButton.onclick = () => {
          this.enableCreateCircle(draw, this.mapView);
        };
        //绑定面按钮绘制事件
        let drawRectangleButton = document.getElementById("rectangle-button");
        drawRectangleButton.onclick = () => {
          this.enableCreateRectangle(draw, this.mapView);
        };
        });

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
        };
        //building弹出窗体

        this.gsmPopupTemplate = {
          title: 'The information of this selected gsm',
          content: [{
            type: 'fields',
            fieldInfos: [{
              fieldName: 'eNodeB',
              // label:"FID",
              visible: true,
            }, {
              fieldName: 'CI',
              // label:"Bid",
              visible: true,
            }, {
              fieldName: 'CellName',
              visible: true,
            }, {
              fieldName: 'Longitude',
              visible: true,
            }, {
              fieldName: 'Latitude',
              visible: true,
            }, {
              fieldName: 'Radius',
              visible: true,
            }, {
              fieldName: 'EARFCN',
              visible: true,
            }, {
              fieldName: 'EIRP',
              visible: true,
            }, {
              fieldName: 'Tilt',
              visible: true,
            }, {
              fieldName: 'Azimuth',
              visible: true,
            }]
          }]
          // fieldInfos:["*"],
        }
        //功能项弹出窗体
        let coverLayerAction = {
          title: '查看覆盖图层',
          id: 'findCoverLayer',
        };
        let task = '<a href="http://www.w3school.com.cn">小区覆盖计算</a>'
        this.functionPopupTemplate = {
          title:"The executing task for this selected building",
          content: task,
          actions: [coverLayerAction]
        };

        //绑定弹窗监听
        this.mapView.popup.on('trigger-action', (event)=>{
            if (event.action.id === 'findCoverLayer') {
              let coverName = this.findLayer();
              this.addLayer(coverName)
            }
        })
        //todo 根据点击不同的layer，展现不同的popupTemplate

      },

      // Executes each time the button is clicked
      doQuery () {
        // Clear the results from a previous query
        this.mapView.graphics.removeAll();
        this.query.where = "CellName = '" + this.gsmNameFind + "'";
        console.log(this.query.where)
        // 查询GSM
        this.queryTaskForGSM.execute(this.query).then((res) => {
          if(res.features!==0){
            //解析attributes
            let featureArray = res.features;
            let graphict = featureArray[0];
            console.log(res)
            this.gsmInfo = graphict.attributes
            graphict.symbol = {
              type: "simple-line",
              color: [226, 119, 40],
            };
            //再次点击时，就相当于点击这个graphic，那么就会自动呈现template
            this.mapView.graphics.add(graphict);
            this.graphic = graphict;
            return graphict;
          }
        })
            .then((graphict)=>{
              if(graphict==null){
                return
              }
              this.mapView.goTo({
                    target: graphict,
                    scale: 6000
                  },
                  {
                    duration: 2000
                  });
              //左键将查询到的graphic绑定定义好的template
              graphict.popupTemplate = this.gsmPopupTemplate
            })
            .catch(error=>{
              console.log("error = ", error);
                  })
      },
      getResults (response) {
        console.log(response);
        let temp = this.functionPopupTemplate;
        // Loop through each of the results and assign a symbol and PopupTemplate
        // to each so they may be visualized on the map
        var peakResults = response.features.map(function (feature) {
          // Sets the symbol of each resulting feature to a cone with a
          // fixed color and width. The height is based on the mountain's elevation
          feature.popupTemplate = temp;
          feature.symbol = {
            type: 'simple-line',
            color: [226, 119, 40],
          };
          return feature
        });
        this.mapView.graphics.add(peakResults);
        //this.graphic = peakResults;
        // return peakResults;
        // animate to the results after they are added to the map
        this.mapView.goTo(peakResults).then(function () {
          this.mapView.popup.open({
            features: peakResults,
            featureMenuOpen: true,
            updateLocationEnabled: true
          })
        })
      },

      eventHandler(evt){
        this.graphic = null;
        this.buildInfo = null;
        if (!this.drawFlag){
          this.mapView.graphics.removeAll();//clear currently displayed results
        }
        // console.log(evt);
        let point = this.mapView.toMap(evt);
        this.query.geometry = point;//获取地图点击的点，得到geometry区域
        let lat = point.latitude;
        let lon = point.longitude;


        this.query.outSpatialReference = this.mapView.spatialReference;

        this.queryTaskForGSM.execute(this.query).then((res) => {
          // this.queryTaskForGSM.execute(this.query).then((res) => {
          if (res.features !== 0) {
            //解析attributes
            let featureArray = res.features
            let graphic = featureArray[0]
            graphic.attributes['Longitude'] = lon
            graphic.attributes['Latitude'] = lat
            this.buildInfo = graphic.attributes
            graphic.symbol = {
              type: 'simple-line',
              color: [226, 119, 40],
            }
            //再次点击时，就相当于点击这个graphic，那么就会自动呈现template
            this.mapView.graphics.add(graphic)
            this.graphic = graphic
            return graphic
          }
        })
          .then((graphic) => {
            if (graphic == null) {
              return
            }
            this.mapView.on('click', (evt) => {
              if (evt.button === 2) {
                //右键显示功能选项框
                graphic.popupTemplate = this.functionPopupTemplate
              } else if (evt.button === 0) {
                //左键将查询到的graphic绑定定义好的template
                graphic.popupTemplate = this.gsmPopupTemplate
              }
            })
          })

        this.queryTaskForBuilding.execute(this.query).then((res) => {
        // this.queryTaskForGSM.execute(this.query).then((res) => {
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

      },

      findLayer () {
        return '小区1覆盖.shp'
      },
      addGsmLayer(gsmLayerName){



        let grassRenderer = {
          type: 'simple', // autocasts as new SimpleRenderer()
          symbol: {
            type: 'simple-line', // autocasts as new SimpleLineSymbol()
            style: 'none',
            width: 0.7,
            color: 'black'
          },
          label: 'grass'
        };

        let layer = new this.apis.MapImageLayer({
          // url: 'http://127.0.0.1:6080/arcgis/rest/services/LTE/MapServer',
          // url: 'http://10.103.242.20:6080/arcgis/rest/services/LTE1/MapServer',
          url: 'http://10.103.252.26:6080/arcgis/rest/services/LTE/MapServer',
          sublayers: [{
            renderer: grassRenderer,  // renderer
            source: {
              type: 'data-layer',
              dataSource: {
                type: 'table',
                workspaceId: '1',
                dataSourceName: gsmLayerName
              }
            }
          }]
        });

        const legend = new this.apis.Legend({
          view: this.mapView
        });

        this.nowLegend = legend;
        this.mapView.ui.add(legend, "bottom-right");
        this.nowLayer = layer;
        this.map.add(layer);
















        // let gsmRenderer = {
        //   type: 'simple', // autocasts as new SimpleRenderer()
        //   symbol: {
        //     type: 'simple-line', // autocasts as new SimpleLineSymbol()
        //     style: 'none',
        //     width: 0.7,
        //     color: 'black'
        //   },
        // };
        //
        // let layer = new this.apis.MapImageLayer({
        //   // url: 'http://127.0.0.1:6080/arcgis/rest/services/LTE/MapServer',
        //   // url: 'http://10.103.242.20:6080/arcgis/rest/services/LTE1/MapServer',
        //   url: 'http://10.103.252.26:6080/arcgis/rest/services/LTE/MapServer',
        //   legendEnabled: false,
        //   sublayers: [{
        //     renderer: gsmRenderer,  // renderer
        //     source: {
        //       type: 'data-layer',
        //       dataSource: {
        //         type: 'table',
        //         workspaceId: '0',
        //         dataSourceName: gsmLayerName
        //       }
        //     }
        //   }]
        // });
        //
        // this.map.add(layer);
      },
      addLayer (dataSourceName, colorFeature) {

        this.map.remove(this.nowLayer);
        this.mapView.ui.remove(this.nowLegend);
        const color1 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#0000CD",
          style: "solid",
        };
        const color2 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#4169E1",
          style: "solid",
        };
        const color3 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#1E90FF",
          style: "solid",
        };
        const color4 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#40E0D0",
          style: "solid",
        };
        const color5 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#00FF00",
          style: "solid",
        };
        const color6 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#7CFC00",
          style: "solid",
        };
        const color7 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#FFA500",
          style: "solid",

        };
        const color8 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#FF7F50",
          style: "solid",

        };
        const color9 = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: "#FF0000",
          style: "solid",
        };

        const renderer = {
          type: 'class-breaks',
          field: colorFeature, // RecePower
          legendOptions: {
            title: "这是图例"
          },
          symbol: {
            type: 'simple-line', // autocasts as new SimpleLineSymbol()
            style: 'none',
            width: 0.7,
            color: 'green'
          },
          classBreakInfos: [
            {
              minValue: -220,
              maxValue: -120,
              symbol: color1,
              label: "-120"
            },
            {
              minValue: -119,
              maxValue: -100,
              symbol: color2,
              label: "-119 - -100"
            },
            {
              minValue: -99,
              maxValue: -90,
              symbol: color3,
              label: "-99 - -90"
            },
            {
              minValue: -89,
              maxValue: -80,
              symbol: color4,
              label: "-89 - -80"
            },
            {
              minValue: -79,
              maxValue: -70,
              symbol: color5,
              label: "-79 - -70"
            },
            {
              minValue: -69,
              maxValue: -60,
              symbol: color6,
              label: "-69 - -60"
            },
            {
              minValue: -59,
              maxValue: -50,
              symbol: color7,
              label: "-59 - -50"
            },
            {
              minValue: -49,
              maxValue: -40,
              symbol: color8,
              label: "-59 - -40"
            },
            {
              minValue: -40,
              maxValue: -1,
              symbol: color9,
              label: "-40"
            },
          ]
        };

        // let grassRenderer = {
        //   type: 'simple', // autocasts as new SimpleRenderer()
        //   symbol: {
        //     type: 'simple-line', // autocasts as new SimpleLineSymbol()
        //     style: 'none',
        //     width: 0.7,
        //     color: 'green'
        //   },
        //   label: 'grass'
        // };

        let layer = new this.apis.MapImageLayer({
          // url: 'http://127.0.0.1:6080/arcgis/rest/services/LTE/MapServer',
          // url: 'http://10.103.242.20:6080/arcgis/rest/services/LTE1/MapServer',
          url: 'http://10.103.252.26:6080/arcgis/rest/services/LTE/MapServer',
          sublayers: [{
            renderer: renderer,  // renderer
            source: {
              type: 'data-layer',
              dataSource: {
                type: 'table',
                workspaceId: '1',
                dataSourceName: dataSourceName
              }
            }
          }]
        });

        const legend = new this.apis.Legend({
          view: this.mapView
        });

        this.nowLegend = legend;
        this.mapView.ui.add(legend, "bottom-right");
        this.nowLayer = layer;
        this.map.add(layer);
      },

      handleCommand(command) {
        if (command === 'showBuildingLayer')
        {
          this.showBuildingLayer()
        }
        if (command === 'showAreaLayer')
        {
          this.showAreaLayer()
        }
        if (command === 'showNetInLayer')
        {
          this.showNetInLayer()
        }
        if (command === 'showNetOutLayer')
        {
          this.showNetOutLayer()
        }
        if (command === 'showVirtualLayer')
        {
          this.showVirtualLayer()
        }
      },

      showBuildingLayer()
      {
        //汊河变中兴宏基站-扇区1
        let colorFea = 'RecePower';
        let gsmNameDate = null;
        let errInfo = null;
        gsmNameDate = LoadShpLayer({'IndexName': this.gsmNameFind})
        // gsmNameDate = LoadShpLayer({'IndexName': '小区8覆盖'})
            .then(res=>{
              let temp = res.data.obj;
              console.log(temp);
              this.addLayer(temp, colorFea)
            })
            .catch(err => {errInfo = err;});
      },
      showAreaLayer()
      {
        //创建点
        let long = 118.7672780923098;
        let lat = 32.07823890473458;

        //生成绘制的图形
        let graphic = new this.apis.Graphic({
          geometry: new this.apis.Point(long, lat),
          symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            style: "square",
            color: "blue",
            size: "8px",  // pixels
            outline: {  // autocasts as new SimpleLineSymbol()
              color: [ 255, 255, 0 ],
              width: 3  // points
            }
          }
        });
        // 将绘制的图形添加到view
        this.mapView.graphics.add(graphic);
        this.mapView.goTo({
              target: graphic,
              scale: 6000
            },
            {
              duration: 1000
            });
      },
      showNetInLayer()
      {

      },
      showNetOutLayer()
      {
        PostAreaCoverDefect(this.PostAreaCover).then((response) => {
          console.log(response);
          this.jumpProgress();
        }).catch((error) => {
          console.log(error);});
      },
      showVirtualLayer()
      {
        // console.log(this.AreaCover);
        AreaCoverAnalysis(this.AreaCover).then((response) => {
          console.log(response);
          // if (response && response.data.ok) {
            this.jumpProgress();
          // }
        }).catch((error) => {
          console.log(error);});
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

      //开始监听画线
      enableCreateLine(draw, view) {
        let action = draw.create("polyline", {
          mode: "click"
        });
        // 获取焦点
        view.focus();
        // 顶点添加事件
        action.on("vertex-add", this.createPolyline);
        //顶点移除事件
        action.on("vertex-remove", this.createPolyline);
        // 鼠标移动事件
        action.on("cursor-update", this.createPolyline);
        // 绘制完成事件
        action.on("draw-complete", this.createPolyline);
      },
  //开始监听画面
      enableCreateArea(draw, view) {
        let action = draw.create("polygon", {
          mode: "click"//点击方式加点
        });
        // 获取焦点
        view.focus();
        // 顶点添加事件
        action.on("vertex-add", this.createPolygon);
        //顶点移除事件
        action.on("vertex-remove", this.createPolygon);
        // 鼠标移动事件
        action.on("cursor-update", this.createPolygon);
        // 绘制完成事件
        action.on("draw-complete", this.createPolygon);
  },
  //开始监听画点
      enableCreatePoint(draw, view) {
        let action = draw.create("point", {
          mode: "click"//点击方式加点
        });
        // 获取焦点
        view.focus();
        // 顶点添加事件
        action.on("vertex-add", this.createPoint);
        //顶点移除事件
        action.on("vertex-remove", this.createPoint);
        // 绘制完成事件
        action.on("draw-complete", this.createPoint);
  },
  //开始监听画圆
      enableCreateCircle(draw, view) {
        let action = draw.create("circle", {
          mode: "click"//点击方式加点
        });
        // 获取焦点
        view.focus();
        //顶点移除事件
        action.on("vertex-remove", this.createCircle);
        // 鼠标移动事件
        action.on("cursor-update", this.createCircle);
        // 绘制完成事件
        action.on("draw-complete", this.createCircle);
  },
  //开始监听画矩形
      enableCreateRectangle(draw, view) {
        let action = draw.create("rectangle", {
          mode: "click"//点击方式加点
        });
        // 获取焦点
        view.focus();
        //顶点移除事件
        action.on("vertex-remove", this.createRectangle);
        // 鼠标移动事件
        action.on("cursor-update", this.createRectangle);
        // 绘制完成事件
        action.on("draw-complete", this.createRectangle);
  },
  //根据点坐标生成新的线
      createPolyline(event) {
        //获取所有顶点
        let vertices = event.vertices;
        //清除之前绘制
        this.mapView.graphics.removeAll();
        // 生成绘制的图形
        let graphic = new this.apis.Graphic({
          geometry: new this.apis.Polyline({
            paths: vertices,
            spatialReference: this.mapView.spatialReference
          }),
          symbol: {
            type: "simple-line", // autocasts as new SimpleFillSymbol
            color: [4, 90, 141],
            width: 4,
            cap: "round",
            join: "round"
          }
        });
        // 将绘制的图形添加到view

        this.mapView.graphics.add(graphic);
  },
  //根据点坐标生成新的线
      createPolygon(event) {
        //获取所有顶点
        let vertices = event.vertices;
        //清除之前绘制
        this.mapView.graphics.removeAll();

        // 生成绘制的图形
        let graphic = new this.apis.Graphic({
          geometry: new this.apis.Polygon({
            hasZ: false,
            hasM: false,
            rings: [vertices],
            spatialReference: this.mapView.spatialReference
          }),
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [ 51,51, 204, 0.9 ],
            style: "solid",
            outline: {  // autocasts as new SimpleLineSymbol()
              color: "white",
              width: 1
            }
          }
    });
    // 将绘制的图形添加到view
        this.mapView.graphics.add(graphic);
  },
  //根据点坐标生成新的线
      createPoint(event) {
        //获取所有顶点
        var coordinates = event.coordinates;

        //生成绘制的图形
        var graphic = new this.apis.Graphic({
          geometry: new this.apis.Point({
            hasZ: false,
            hasM: false,
            x:coordinates[0],
            y:coordinates[1],
            spatialReference: this.mapView.spatialReference
          }),
          symbol: {
            type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
            style: "square",
            color: "blue",
            size: "8px",  // pixels
            outline: {  // autocasts as new SimpleLineSymbol()
              color: [ 255, 255, 0 ],
              width: 3  // points
            }
          }
    });
    // 将绘制的图形添加到view
        this.mapView.graphics.add(graphic);
  },
  //根据点坐标生成新的线
      createCircle(event) {
        //获取所有顶点
        var vertices = event.vertices;
        //少于一个点无法展示圆
        if(vertices.length<2){
          return
        }
        //清除之前绘制
        this.mapView.graphics.removeAll();
        this.drawFlag = false;
        //生成绘制的图形,两点画圆
        var center=new this.apis.Point({
          hasZ: false,
          hasM: false,
          x:vertices[0][0],
          y:vertices[0][1],
          spatialReference: this.mapView.spatialReference
        });
        let dis=center.distance(new this.apis.Point({
          hasZ: false,
          hasM: false,
          x:vertices[1][0],
          y:vertices[1][1],
          spatialReference: this.mapView.spatialReference
        }));
        let graphic = new this.apis.Graphic({
          geometry: new this.apis.Circle({
            hasZ: false,
            hasM: false,
            center:center,
            radius:dis,
            spatialReference: this.mapView.spatialReference
          }),
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [ 51,51, 204, 0.9 ],
            style: "solid",
            outline: {  // autocasts as new SimpleLineSymbol()
              color: "white",
              width: 1
            }
          }
        });
        // 将绘制的图形添加到view
        this.mapView.graphics.add(graphic);
        this.drawFlag = true;
  },
      createRectangle(event) {
        let startPointLat = 0;
        let startPointLon = 0;
        let centerPointLat = 0;
        let centerPointLon = 0;
        let endPointLat = 0;
        let endPointLon = 0;

        //获取所有顶点
        var vertices = event.vertices;
        //两点画矩形
        if(vertices.length<2){
          return
        }
        var rings=[vertices[0],[vertices[0][0],vertices[1][1]],vertices[1],[vertices[1][0],vertices[0][1]]];
        //清除之前绘制
        this.mapView.graphics.removeAll();
        this.drawFlag = false;
        // 生成绘制的图形
        var graphic = new this.apis.Graphic({
          geometry: new this.apis.Polygon({
            hasZ: false,
            hasM: false,
            rings: [rings],
            spatialReference: this.mapView.spatialReference
          }),
          symbol: {
            type: "simple-fill",  // autocasts as new SimpleFillSymbol()
            color: [ 51,51, 204, 0.9 ],
            style: "solid",
            outline: {  // autocasts as new SimpleLineSymbol()
              color: "white",
              width: 1
            }
          }
        });
        // 将绘制的图形添加到view
        this.mapView.graphics.add(graphic);
        this.drawFlag = true;

        if (event.type === 'draw-complete'){
          console.log(graphic);
          centerPointLat = graphic.geometry.extent.center.latitude;
          centerPointLon = graphic.geometry.extent.center.longitude;
        }
        if(event.native.type === 'pointerup'){
          let point = this.mapView.toMap(event.native);
          endPointLat = point.latitude;
          endPointLon = point.longitude;
        }

        if (endPointLat > centerPointLat) {
          startPointLat = centerPointLat - (endPointLat - centerPointLat);
        }
        else{
          startPointLat = centerPointLat + (centerPointLat - endPointLat);
        }

        if (endPointLon > centerPointLon) {
          startPointLon = centerPointLon - (endPointLon - centerPointLon);
        }
        else{
          startPointLon = centerPointLon + (centerPointLon - endPointLon);
        }

        if (startPointLat !== 0 && startPointLon !== 0){
          this.AreaCover.maxLatitude = Math.max(startPointLat, endPointLat);
          this.AreaCover.minLatitude = Math.min(startPointLat, endPointLat);
          this.AreaCover.maxLongitude = Math.max(startPointLon, endPointLon);
          this.AreaCover.minLongitude = Math.min(startPointLon, endPointLon);

          this.PostAreaCover.maxLatitude = Math.max(startPointLat, endPointLat);
          this.PostAreaCover.minLatitude = Math.min(startPointLat, endPointLat);
          this.PostAreaCover.maxLongitude = Math.max(startPointLon, endPointLon);
          this.PostAreaCover.minLongitude = Math.min(startPointLon, endPointLon);

          console.log(this.AreaCover.maxLatitude);
          console.log(this.AreaCover.minLatitude);
          console.log(this.AreaCover.maxLongitude);
          console.log(this.AreaCover.minLongitude);
        }
      },

      roadMeasure(){

        let colorFea = 'RSRP';
        let gsmNameDate = null;
        let errInfo = null;
        let LoadName = 'TD路测';
        gsmNameDate = LoadShpLayer({'IndexName': LoadName})
            .then(res=>{
              let temp = res.data.obj;
              console.log(temp);
              this.addLayer(temp, colorFea)
            })
            .catch(err => {errInfo = err;});

        let pt = new this.apis.Point({
          latitude: 32.07823890473458,
          longitude: 118.7672780923098
        });

        this.mapView.goTo({
              target: pt,
              scale: 6000
            },
            {
              duration: 1000
            });
      },
      reverTrace(){
        let colorFea = 'receivePW';
        let gsmNameDate = null;
        let errInfo = null;
        let LoadName = '反向跟踪点';
        gsmNameDate = LoadShpLayer({'IndexName': LoadName})
            .then(res=>{
              let temp = res.data.obj;
              console.log(temp);
              this.addLayer(temp, colorFea)
            })
            .catch(err => {errInfo = err;});
        let pt = new this.apis.Point({
          latitude: 32.07823890473458,
          longitude: 118.7672780923098
        });
        this.mapView.goTo({
              target: pt,
              scale: 6000
            },
            {
              duration: 1000
            });
      },
      jumpProgress(){
        let routeUrl = this.$router.resolve({
          path: "/index/taskProgress",
        });
        window.open(routeUrl.href, '_blank');
      },
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
