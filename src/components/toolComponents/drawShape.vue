<template>

  <div id="viewDiv">
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
  </div>
</template>

<script>
  export default {
    name: "drawShape"
  }
</script>

<style scoped>

</style>
