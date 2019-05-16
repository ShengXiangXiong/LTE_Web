<template>
<div id="mapDiv">
  <div id="HomeButton"></div>
  <div id="search"></div>
  <div class = "btnBox">
    <button>漫游</button>
    <button>放大</button>
    <button>缩小</button>
    <button>全图</button>
    <button>测量</button>
    <button>清除</button>
    <button>定位</button>
    <button>上一视图</button>
    <button>下一视图</button>
  </div>
  <div id="measurementDiv"></div>
  <div class = "dingwei">
    <div class = "group">
      <label for="">经度：</label>
      <input type="text" id = "X">
    </div>
    <div class = "group">
      <label for="">纬度：</label>
      <input type="text" id = "Y">
    </div>
    <div class = "sure">
      <button>坐标查询</button>
    </div>
  </div>
</div>
</template>
<script type="text/javascript" src="static/arcgis_js_api/library/3.17/3.17/init.js"></script>
<script>
  require([
    "esri/map",
    "dojo/on",
    "dojo/dom",
    "dojo/query",
    "esri/toolbars/navigation",
    "esri/dijit/Measurement",
    "esri/units",
    "esri/dijit/HomeButton",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/graphic",
    "esri/Color",
    "esri/layers/GraphicsLayer",
    "dojo/dom-attr",
    "esri/dijit/Search",
    "dojo/domReady!"
  ],function(Map,on,dom,query,Navigation,Measurement,Units,HomeButton,Point,SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol,Graphic,Color,GraphicsLayer,domAttr,Search){
    var map;
    var extentList = [];
    var count = 0;
    map = new Map("mapDiv",{
      logo:false,
      slider:false,
      basemap:"streets",
      zoom:3,
      isClickRecenter:true,
      maxZoom:9,//最大空间等级
      minZoom:3,//最小空间等级
      center: [53.31, 23]
    });
    dojo.connect(map, "onExtentChange", showExtent);
    function showExtent(extent){
      console.log("XMin: " + extent.xmin + "\n")
      console.log("YMin: " + extent.ymin + "\n")
      console.log("XMax: " + extent.xmax + "\n")
      console.log("YMax: " + extent.ymax + "\n")
      extentList.push(
        {
          "xmin":extent.xmin,
          "ymin":extent.ymin,
          "xmax":extent.xmax,
          "ymax":extent.ymax,
          "spatialReference":{"wkid":102100}
        }
      )
      extentList = extentList.slice(-2);
      console.log("extentList",extentList);
    }
    //home按钮
    var home = new HomeButton({
      map: map
    }, "HomeButton");
    home.startup();
    //搜索组件
    var search = new Search({
      map: map
    }, "search");
    search.startup();
    //创建地图操作对象
    var navToolbar = new Navigation(map);
    //给地图添加mouse-drag事件，使count变为0
    on(map,"MouseDrag",function(){
      console.log("wodemap")
      count = 0;
    })
    //给地图添加mouse-drag事件，使count变为0
    on(map,"MouseWheel",function(){
      console.log("wodemap")
      count = 0;
    })
    //给按钮添加绑定事件
    query("button").on("click",function(event){
      //获得按钮的文本信息
      var value = this.innerHTML;
      switch (value){
        case "漫游":
          //默认是漫游操作
          navToolbar.deactivate();
          break;
        case "放大":
          navToolbar.activate(Navigation.ZOOM_IN);
          break;
        case "缩小":
          navToolbar.activate(Navigation.ZOOM_OUT);
          break;
        case "全图":
          navToolbar.zoomToFullExtent();
          break;
        case "测量":
          dom.byId("measurementDiv").style.display = dom.byId("measurementDiv").style.display == "block"?"none":"block";
          query(".dingwei")[0].style.display = "none";
          navToolbar.deactivate();
          break;
        case "清除":
          clearGraphics(map);
          break;
        case "定位":
          query(".dingwei")[0].style.display = query(".dingwei")[0].style.display == "block"?"none":"block";
          dom.byId("measurementDiv").style.display = "none";
          navToolbar.deactivate();
          break;
        case "坐标查询":
          gps(map,query,Point,SimpleMarkerSymbol,SimpleLineSymbol,Color,map,Graphic,GraphicsLayer);
          break;
        case "上一视图":
          console.log(count)
          if(count >= 0 && count < extentList.length - 1){
            var startExtent = new esri.geometry.Extent(extentList[count]);
            map.setExtent(startExtent);
            count++;
            if(count >= extentList.length - 1){
              count = extentList.length - 1;
            }
          }
          break;
        case "下一视图":
          console.log(count)
          if(count > 0 && count <= extentList.length - 1){
            var startExtent = new esri.geometry.Extent(extentList[count - 1]);
            map.setExtent(startExtent);
            count++;
            if(count >= extentList.length - 1){
              count = 0;
            }
          }
          break;
      }
    })
    //测量小工具
    var measurement = new Measurement({
      map: map,
      defaultAreaUnit: Units.SQUARE_KILOMETERS,
      defaultLengthUnit: Units.KILOMETERS
    }, dom.byId("measurementDiv"));
    measurement.startup();
  })
  //定位的代码
  //1.清空Graphics
  function clearGraphics(map){
    map.graphics.clear();
    var  graphicsLayerIds = map.graphicsLayerIds;
    var len = graphicsLayerIds.length;
    for(var i=0;i<len;i++){
      var gLayer = map.getLayer(graphicsLayerIds[i]);
      gLayer.clear();
    }
  }
  //2.点击坐标查询按钮，查询，定位点
  function gps(map,query,Point,SimpleMarkerSymbol,SimpleLineSymbol,Color,map,Graphic,GraphicsLayer){
    //清空graphics
    clearGraphics(map);
    map.infoWindow.hide();//infowindow隐藏
    var px = query("#X")[0].value
    var py = query("#Y")[0].value;
    if(px===""||py===""){
      alert("输入的值存在空值！");
      return;
    }
    var x=parseFloat(px);
    var y=parseFloat(py);
    var location = {
      x:x,
      y:y
    }
    location = transform(location);
    var point = new Point(location.x,location.y,map.spatialReference);
    addGraphicsToMap(point,SimpleMarkerSymbol,SimpleLineSymbol,Color,map,Graphic,GraphicsLayer);
    map.centerAndZoom(point,5);
  }
  //往地图上添加点
  function addGraphicsToMap(geometry,SimpleMarkerSymbol,SimpleLineSymbol,Color,map,Graphic,GraphicsLayer){
    clearGraphics(map);
    var type = geometry.type;
    var symbol;
    switch (type){
      case "point":
        symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE,15,new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0]),1),new Color([255,0,0,0.5]))
    }
    var graphics = map.graphics.add(new Graphic(geometry,symbol))
    var graphicslayer = new GraphicsLayer();
    graphicslayer.add(graphics);
    map.addLayer(graphicslayer);
  }
  //经纬度转墨卡托
  function transform(location){
    var x = location.x *20037508.34/180;
    var y = Math.log(Math.tan((90 + location.y)*Math.PI/360))/(Math.PI/180);
    y = y *20037508.34/180;
    return {
      x:x,
      y:y
    }
  }
</script>
<script>
    export default {
        name: "map_show"
    }
</script>

<style scoped>

</style>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>arcgis地图完整功能</title>
  <link rel="stylesheet" type="text/css" href="./arcgis_js_api/library/3.17/3.17/dijit/themes/tundra/tundra.css"/>
  <link rel="stylesheet" type="text/css" href="./arcgis_js_api/library/3.17/3.17/esri/css/esri.css" />
  <style>
    html,body,#mapDiv{
      height:100%;
      width: 100%;
      margin:0;
      padding: 0;
    }
    #mapDiv{
      position: relative;
    }
    #mapDiv>.btnBox>button{
      border:1px solid #ccc;
      background: #fff;
      cursor: pointer;
      width: 80px;
      height: 30px;
      border-radius: 5px;
    }
    .btnBox{
      position:absolute;
      top:20px;
      right: 50px;
      z-index:1000;
    }
    #measurementDiv{
      position: absolute;
      background: #fff;
      border: 1px solid #ddd;
      margin-top:10px;
      border-radius: 5px;
      width: 278px;
      height: auto;
      padding:10px;
      margin-left:50px;
      right: 106px;
      top:57px;
      display:none;
      z-index:1;
    }
    #HomeButton{
      position: absolute;
      z-index: 200;
      top:220px;
      left:24px;
    }
    .dingwei{
      width: 278px;
      background: #fff;
      border:1px solid #ccc;
      padding:10px;
      border-radius: 5px;
      margin-top:10px;
      display: none;
      position: absolute;
      height: auto;
      z-index:1;
      right: 106px;
      top:57px;
    }
    .dingwei .group{
      margin-top:10px;
    }
    .dingwei .group input{
      width: 209px;
      height: 30px;
      border: 1px solid #ddd;
      border-radius: 5px;
      outline: none;
      padding-left:5px;
    }
    .sure{
      text-align: center;
      margin-top:20px;
    }
    .sure button{
      width: 80px;
      height: 30px;
      border:0px;
      outline: 0;
      background: #87D2F1;
      border-radius: 5px;
      color:#fff;
      cursor: pointer;
    }
    .sure button:hover{
      background: #3879D9;
    }
    #search{
      position: absolute;
      z-index: 200;
      top:17px;
      left:50px;
    }
  </style>
</head>
<body>



</body>
</html>
