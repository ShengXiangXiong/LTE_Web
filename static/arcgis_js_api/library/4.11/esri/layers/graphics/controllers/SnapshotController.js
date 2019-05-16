// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/tsSupport/assignHelper ../../../core/Accessor ../../../core/Error ../../../core/Evented ../../../core/Handles ../../../core/Logger ../../../core/Promise ../../../core/promiseUtils ../../../core/unitUtils ../../../core/accessorSupport/decorators ../../../geometry/support/scaleUtils ../../support/GraphicsManager ../../../views/3d/layers/graphics/Graphics3DVerticalScale".split(" "),
function(y,z,m,d,A,n,g,p,q,r,t,h,u,e,v,w,x){var l=r.getLogger("esri.layers.graphics.controllers.SnapshotController");return function(k){function b(a){a=k.call(this)||this;a.type="snapshot";a._gManager=null;a._verticalScale=null;a._handles=new q;a._source=null;a._started=!1;a._pendingQueries=new Map;a.extent=null;a.hasAllFeatures=!1;a.hasFeatures=!1;a.layer=null;a.layerView=null;a.maxPageSize=null;a.defaultReturnZ=void 0;a.defaultReturnM=void 0;a.pageSize=null;a.paginationEnabled=!1;return a}m(b,k);
b.prototype.initialize=function(){var a=this,f=this.layer.when(function(){return a._verifyCapabilities()}).then(function(){return a._init()});this.addResolvingPromise(f)};b.prototype.destroy=function(){this.cancelQuery();this._gManager&&(this._gManager.destroy(),this._gManager=null);this._handles.destroy();this._pendingQueries=this._handles=null};Object.defineProperty(b.prototype,"updating",{get:function(){return!!(this._pendingQueries&&0<this._pendingQueries.size)},enumerable:!0,configurable:!0});
Object.defineProperty(b.prototype,"graphics",{set:function(a){var f=this._get("graphics");f!==a&&(this._handles.remove("graphics"),a&&(this._collectionChanged({added:a.toArray(),removed:f&&f.toArray()}),this._handles.add(a.on("change",this._collectionChanged.bind(this)),"graphics")),this._set("graphics",a))},enumerable:!0,configurable:!0});b.prototype.cancelQuery=function(){var a=this;this._pendingQueries&&(this._pendingQueries.forEach(function(f,c){f.isFulfilled()||f.cancel(Error(a._cancelErrorMsg))}),
this._pendingQueries.clear(),this.notifyChange("updating"))};b.prototype.refresh=function(){this.isResolved()&&this._started&&this._queryFeatures()};b.prototype.startup=function(){this._started||(this._started=!0,this._resolutionParams=this._getResolutionParams(),this._queryFeatures())};b.prototype.update=function(){this.startup()};b.prototype._init=function(){var a=this.layer;this.paginationEnabled=!!a.get("capabilities.query.supportsPagination");this._source=a.source;var f=a.maxRecordCount||4E3;
this.pageSize=null==this.maxPageSize?f:Math.min(f,this.maxPageSize);this._gManager=new w({graphics:this.graphics,objectIdField:a.objectIdField});this._verticalScale=new x({sourceSpatialReference:a.spatialReference,destSpatialReference:this.layerView.view.spatialReference});this._setupStateWatchers()};b.prototype._getResolutionParams=function(){var a=this.layer,f=a.get("capabilities.query.supportsQuantization"),c;if("polyline"===a.geometryType||"polygon"===a.geometryType){var b=u.getMetersPerUnit(this.layerView.view.spatialReference);
null!=b&&(c=this._featureResolution.scale,b=this._featureResolution.value/b,c=a.maxScale?a.maxScale:a.minScale?Math.min(c,a.minScale):Math.min(c,v.getScale(this.layerView.view,a.fullExtent)),c*=b/this._featureResolution.scale)}return c?{maxAllowableOffset:f?null:c,quantizationParameters:f?{mode:"view",originPosition:"upperLeft",tolerance:c,extent:a.fullExtent}:null}:null};b.prototype._setupStateWatchers=function(){var a=this;this._handles.add([this.watch("extent",this.refresh.bind(this)),this.layerView.watch("availableFields",
function(f,c){f&&c?-1===c.indexOf("*")&&(f.sort(),c.sort(),JSON.stringify(f)!==JSON.stringify(c)&&a.refresh()):a.refresh()}),this.layer.watch("definitionExpression, historicMoment",this.refresh.bind(this)),this.layer.on("edits",this._editsHandler.bind(this))])};b.prototype._createQueryParams=function(){var a=this.layer,f=this.layerView,c=a.createQuery();c.outSpatialReference=f.view.spatialReference;c.geometry=this.extent;c.outFields=f.availableFields;(a=a.capabilities&&a.capabilities.data)&&a.supportsZ&&
null==c.returnZ&&null!=this.defaultReturnZ&&(c.returnZ=this.defaultReturnZ);a&&a.supportsM&&null==c.returnM&&null!=this.defaultReturnM&&(c.returnM=this.defaultReturnM);c.set(this._resolutionParams);this.paginationEnabled&&(c.start=0,c.num=this.pageSize);return c};b.prototype._queryFeatures=function(){this.cancelQuery();this.hasAllFeatures=this.hasFeatures=!1;this._gManager.beginPagedUpdate();this.emit("query-start");this._executeQuery(this._createQueryParams())};b.prototype._executeQuery=function(a){var f=
this,c=this._source.queryFeatures(a).then(function(a){return a.unquantize()}),b=this._gManager.createIntentToAdd();this._querySetup(b,c);c.then(this._processFeatureSet.bind(this,a,b)).catch(function(a){return f._queryError(b,a)}).then(function(){return f._queryTeardown(b)},function(){return f._queryTeardown(b)})};b.prototype._processFeatureSet=function(a,b,c){var f=c.exceededTransferLimit,e=c.features,d=this._maxFeatures[this.layer.geometryType]||0,g=e?e.length:0,h=this._gManager.numGraphics+g,k=
h>=d;k&&(l.warn('Feature limit exceeded on layer "',this.layer.title,'". Not all features are shown.'),(d=h-d)&&e.splice(g-d,d));a=f&&this.paginationEnabled&&!k?this._queryNextPage(a):!1;this._verticalScale.adjust(e);e&&this._gManager.addPage(e,b);this.hasFeatures=!0;a||(this._gManager.endPagedUpdate(),this.hasAllFeatures=!f,this.emit("query-end",{success:!0}));return c};b.prototype._queryNextPage=function(a){a.start+=this.pageSize;this._executeQuery(a);return!0};b.prototype._queryError=function(a,
b){b&&"cancel"===b.dojoType&&!this.hasFeatures?this._gManager.revertPagedUpdate():this._gManager.endPagedUpdate();this.emit("query-end",{success:!1});if(b&&"cancel"===b.dojoType)return h.reject(b);a=new g("snapshotcontroller:tile-request-failed","Failed to query for features",{error:b});l.error(a);return h.reject(a)};b.prototype._querySetup=function(a,b){this._pendingQueries.set(a,b);this.notifyChange("updating")};b.prototype._queryTeardown=function(a){this._gManager.removeIntent(a);this._pendingQueries.delete(a);
this.notifyChange("updating")};b.prototype._processRefetch=function(a,b){(b=b.features)&&this._gManager.add(b,a)};b.prototype._refetchError=function(a,b){};b.prototype._verifyCapabilities=function(){if(!this.layer.get("capabilities.operations.supportsQuery"))throw new g("graphicscontroller:query-capability-required","Service requires query capabilities to be used as a feature layer",{layer:this.layer});};b.prototype._collectionChanged=function(a){var b=a.added;if(b)for(var c=0;c<b.length;c++)b[c].layer=
this.layer,b[c].sourceLayer=this.layer;if(b=a.removed)for(c=0;c<b.length;c++)b[c].layer=null,b[c].sourceLayer=null};b.prototype._editsHandler=function(a){var b=this,c=function(a){return a.objectId},e=a.deletedFeatures.map(c);this._gManager.delete(e);a=a.addedFeatures.concat(a.updatedFeatures).map(c);if(a.length){c=this._createQueryParams();c.objectIds=a;var c=this._source.queryFeatures(c),d=this._gManager.createIntentToAdd(a);this._querySetup(d,c);c.then(this._processRefetch.bind(this,d)).catch(this._refetchError.bind(this,
d)).then(function(){return b._queryTeardown(d)},function(){return b._queryTeardown(d)})}};d([e.shared("SnapshotController: query cancelled")],b.prototype,"_cancelErrorMsg",void 0);d([e.property({readOnly:!0})],b.prototype,"type",void 0);d([e.shared({value:.25,scale:945})],b.prototype,"_featureResolution",void 0);d([e.shared({point:16E3,multipoint:8E3,polyline:4E3,polygon:4E3,multipatch:4E3})],b.prototype,"_maxFeatures",void 0);d([e.property()],b.prototype,"_pendingQueries",void 0);d([e.property({dependsOn:["_pendingQueries"]})],
b.prototype,"updating",null);d([e.property()],b.prototype,"graphics",null);d([e.property()],b.prototype,"extent",void 0);d([e.property()],b.prototype,"hasAllFeatures",void 0);d([e.property()],b.prototype,"hasFeatures",void 0);d([e.property()],b.prototype,"layer",void 0);d([e.property()],b.prototype,"layerView",void 0);d([e.property()],b.prototype,"maxPageSize",void 0);d([e.property()],b.prototype,"defaultReturnZ",void 0);d([e.property()],b.prototype,"defaultReturnM",void 0);d([e.property()],b.prototype,
"pageSize",void 0);d([e.property()],b.prototype,"paginationEnabled",void 0);return b=d([e.subclass("esri.layers.graphics.controllers.SnapshotController")],b)}(e.declared(n,t,p))});