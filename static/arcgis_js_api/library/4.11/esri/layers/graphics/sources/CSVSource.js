// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../geometry ../../../core/Accessor ../../../core/has ../../../core/Loadable ../../../core/promiseUtils ../../../core/requireUtils ../../../core/workers ../../../core/accessorSupport/decorators ../../../tasks/support/FeatureSet module".split(" "),function(h,f,k,d,l,e,g,m,n,p,q,c,r,t){Object.defineProperty(f,"__esModule",{value:!0});g.add("esri-workers-for-memory-layers",!1);e=function(e){function a(b){b=
e.call(this,b)||this;b.type="csv";return b}k(a,e);a.prototype.load=function(){var b=this,a;a=n.resolve();this.addResolvingPromise(a.then(function(){return q.open(p.getAbsMid("./support/CSVSourceWorker",h,t),{strategy:g("esri-workers-for-memory-layers")?"dedicated":"local"}).then(function(a){b._connection=a;return a.invoke("load",{url:b.url,parsing:{columnDelimiter:b.delimiter,fields:b.fields&&b.fields.map(function(b){return b.toJSON()}),latitudeField:b.latitudeField,longitudeField:b.longitudeField,
spatialReference:b.spatialReference&&b.spatialReference.toJSON(),timeInfo:b.timeInfo&&b.timeInfo.toJSON()}})}).then(function(a){b.locationInfo=a.locationInfo;b.layerDefinition=a.layerDefinition;b.columnDelimiter=a.columnDelimiter})}));return this.when()};a.prototype.destroy=function(){this._connection&&this._connection.close()};a.prototype.openPorts=function(){var b=this;return this.load().then(function(){return b._connection.openPorts()})};a.prototype.queryFeatures=function(b){var a=this;return this.load().then(function(){return a._connection.invoke("queryFeatures",
b?b.toJSON():null)}).then(function(b){return r.fromJSON(b)})};a.prototype.queryFeaturesJSON=function(b){var a=this;return this.load().then(function(){return a._connection.invoke("queryFeatures",b?b.toJSON():null)})};a.prototype.queryFeatureCount=function(b){var a=this;return this.load().then(function(){return a._connection.invoke("queryFeatureCount",b?b.toJSON():null)})};a.prototype.queryObjectIds=function(b){var a=this;return this.load().then(function(){return a._connection.invoke("queryObjectIds",
b?b.toJSON():null)})};a.prototype.queryExtent=function(a){var b=this;return this.load().then(function(){return b._connection.invoke("queryExtent",a?a.toJSON():null)}).then(function(a){return{count:a.count,extent:l.Extent.fromJSON(a.extent)}})};d([c.property()],a.prototype,"type",void 0);d([c.property()],a.prototype,"url",void 0);d([c.property()],a.prototype,"delimiter",void 0);d([c.property()],a.prototype,"fields",void 0);d([c.property()],a.prototype,"latitudeField",void 0);d([c.property()],a.prototype,
"longitudeField",void 0);d([c.property()],a.prototype,"spatialReference",void 0);d([c.property()],a.prototype,"timeInfo",void 0);d([c.property()],a.prototype,"locationInfo",void 0);d([c.property()],a.prototype,"layerDefinition",void 0);d([c.property()],a.prototype,"columnDelimiter",void 0);return a=d([c.subclass("esri.layers.graphics.sources.CSVSource")],a)}(c.declared(e,m));f.default=e});