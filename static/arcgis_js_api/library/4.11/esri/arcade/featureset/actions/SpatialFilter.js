// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../sources/Empty ../support/FeatureSet ../support/IdSet ../support/shared ../../../core/promiseUtils ../../../geometry/geometryEngineAsync".split(" "),function(r,t,q,h,f,n,l,m,k){var g=function(b){function d(a){var c=b.call(this,a)||this;c._relation="";c._relationGeom=null;c._relationString="";c.declaredClass="esri.arcade.featureset.actions.SpatialFilter";c._relationString=a.relationString;c._parent=a.parentfeatureset;c._maxProcessing=
40;c._relation=a.relation;c._relationGeom=a.relationGeom;return c}q(d,b);d.prototype._getSet=function(a){var c=this;return null===this._wset?this._ensureLoaded().then(function(){return c._parent._getFilteredSet("esriSpatialRelRelation"!==c._relation?c._relation:c._relation+":"+c._relationString,c._relationGeom,null,null,a)}).then(function(b){c._checkCancelled(a);c._wset=new n(b._candidates.slice(0),b._known.slice(0),b._ordered,c._clonePageDefinition(b.pagesDefinition));return c._wset}):m.resolve(this._wset)};
d.prototype._isInFeatureSet=function(a){var c=this._parent._isInFeatureSet(a);if(c===l.IdState.NotInFeatureSet)return c;c=this._idstates[a];return void 0===c?l.IdState.Unknown:c};d.prototype._getFeature=function(a,c,b){return this._parent._getFeature(a,c,b)};d.prototype._getFeatures=function(a,c,b,d){return this._parent._getFeatures(a,c,b,d)};d.prototype._featureFromCache=function(a){return this._parent._featureFromCache(a)};d.prototype.executeSpatialRelationTest=function(a){if(null===a.geometry)return m.resolve(!1);
switch(this._relation){case "esriSpatialRelEnvelopeIntersects":var c=l.shapeExtent(this._relationGeom);a=l.shapeExtent(a.geometry);return k.intersects(c,a);case "esriSpatialRelIntersects":return k.intersects(this._relationGeom,a.geometry);case "esriSpatialRelContains":return k.contains(this._relationGeom,a.geometry);case "esriSpatialRelOverlaps":return k.overlaps(this._relationGeom,a.geometry);case "esriSpatialRelWithin":return k.within(this._relationGeom,a.geometry);case "esriSpatialRelTouches":return k.touches(this._relationGeom,
a.geometry);case "esriSpatialRelCrosses":return k.crosses(this._relationGeom,a.geometry);case "esriSpatialRelRelation":return k.relate(this._relationGeom,a.geometry,this._relationString)}};d.prototype._fetchAndRefineFeatures=function(a,c,b){var d=this,e=new n([],a,!1,null),p=Math.min(c,a.length);return this._parent._getFeatures(e,-1,p,b).then(function(){d._checkCancelled(b);for(var c=[],e=0;e<p;e++){var f=d._parent._featureFromCache(a[e]);c.push(d.executeSpatialRelationTest(f))}return m.all(c)}).then(function(b){for(var e=
0;e<c;e++)d._idstates[a[e]]=!0===b[e]?l.IdState.InFeatureSet:l.IdState.NotInFeatureSet;return"success"})};d.prototype._getFilteredSet=function(a,c,b,d,f){var e=this;return this._ensureLoaded().then(function(){return e._parent._getFilteredSet("esriSpatialRelRelation"!==e._relation?e._relation:e._relation+":"+e._relationString,e._relationGeom,b,d,f)}).then(function(a){e._checkCancelled(f);return null!==c?new n(a._candidates.slice(0).concat(a._known.slice(0)),[],a._ordered,e._clonePageDefinition(a.pagesDefinition)):
new n(a._candidates.slice(0),a._known.slice(0),a._ordered,e._clonePageDefinition(a.pagesDefinition))})};d.prototype._stat=function(a,c,b,d,f,g,h){var e=this;return""!==b?m.resolve({calculated:!1}):this._parent._stat(a,c,"esriSpatialRelRelation"!==this._relation?this._relation:this._relation+":"+this._relationString,this._relationGeom,f,g,h).then(function(k){return!1===k.calculated?null===f&&""===b&&null===d?e._manualStat(a,c,g,h):{calculated:!1}:k})};d.prototype._canDoAggregates=function(a,c,b,d,
f){return""!==b||null!==d||null===this._parent?m.resolve(!1):this._parent._canDoAggregates(a,c,"esriSpatialRelRelation"!==this._relation?this._relation:this._relation+":"+this._relationString,this._relationGeom,f)};d.prototype._getAggregatePagesDataSourceDefinition=function(a,c,b,d,f,g,h){return null===this._parent?m.reject(Error("Should never be called")):this._parent._getAggregatePagesDataSourceDefinition(a,c,"esriSpatialRelRelation"!==this._relation?this._relation:this._relation+":"+this._relationString,
this._relationGeom,f,g,h)};d.prototype.arcadeScriptStep=function(a,c,b){a=this.arcadeAssignNextScriptStepIdentifiers(b);switch(this._relation){case "esriSpatialRelEnvelopeIntersects":return"var "+a.newFeatureSet+" \x3d "+this.bigDataCachePipeline("envelopeIntersects( "+a.currentFeatureSet+","+this.constructArcadeGeom(null===this._relationGeom?null:this._relationGeom.extent,c,b)+")")+"; ";case "esriSpatialRelIntersects":return"var "+a.newFeatureSet+" \x3d "+this.bigDataCachePipeline("intersects( "+
a.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,c,b)+")")+"; ";case "esriSpatialRelContains":return"var "+a.newFeatureSet+" \x3d "+this.bigDataCachePipeline("contains( "+a.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,c,b)+")")+"; ";case "esriSpatialRelOverlaps":return"var "+a.newFeatureSet+" \x3d "+this.bigDataCachePipeline("overlaps( "+a.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,c,b)+")")+"; ";case "esriSpatialRelWithin":return"var "+
a.newFeatureSet+" \x3d "+this.bigDataCachePipeline("within( "+a.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,c,b)+")")+"; ";case "esriSpatialRelTouches":return"var "+a.newFeatureSet+" \x3d "+this.bigDataCachePipeline("touches( "+a.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,c,b)+")")+"; ";case "esriSpatialRelCrosses":return"var "+a.newFeatureSet+" \x3d "+this.bigDataCachePipeline("crosses( "+a.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,
c,b)+")")+"; ";case "esriSpatialRelRelation":return"var "+a.newFeatureSet+" \x3d "+this.bigDataCachePipeline("relate( "+a.currentFeatureSet+","+this.constructArcadeGeom(this._relationGeom,c,b)+', "'+this._relationString+'")')+";"}return"var "+a.newFeatureSet+" \x3d null; "};return d}(f);f._featuresetFunctions.intersects=function(b){return null===b||void 0===b?new h({parentfeatureset:this}):new g({parentfeatureset:this,relation:"esriSpatialRelIntersects",relationGeom:b})};f._featuresetFunctions.envelopeIntersects=
function(b){return null===b||void 0===b?new h({parentfeatureset:this}):new g({parentfeatureset:this,relation:"esriSpatialRelEnvelopeIntersects",relationGeom:b})};f._featuresetFunctions.contains=function(b){return null===b||void 0===b?new h({parentfeatureset:this}):new g({parentfeatureset:this,relation:"esriSpatialRelContains",relationGeom:b})};f._featuresetFunctions.overlaps=function(b){return null===b||void 0===b?new h({parentfeatureset:this}):new g({parentfeatureset:this,relation:"esriSpatialRelOverlaps",
relationGeom:b})};f._featuresetFunctions.within=function(b){return null===b||void 0===b?new h({parentfeatureset:this}):new g({parentfeatureset:this,relation:"esriSpatialRelWithin",relationGeom:b})};f._featuresetFunctions.touches=function(b){return null===b||void 0===b?new h({parentfeatureset:this}):new g({parentfeatureset:this,relation:"esriSpatialRelTouches",relationGeom:b})};f._featuresetFunctions.crosses=function(b){return null===b||void 0===b?new h({parentfeatureset:this}):new g({parentfeatureset:this,
relation:"esriSpatialRelCrosses",relationGeom:b})};f._featuresetFunctions.relate=function(b,d){return null===b||void 0===b?new h({parentfeatureset:this}):new g({parentfeatureset:this,relation:"esriSpatialRelRelation",relationGeom:b,relationString:d})};return g});