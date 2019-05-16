// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../../../core/tsSupport/decorateHelper ../../../../../core/tsSupport/generatorHelper ../../../../../core/tsSupport/awaiterHelper ../../../../../core/tsSupport/declareExtendsHelper ../../../../../core/Accessor ../../../../../core/Error ../../../../../core/HandleOwner ../../../../../core/Logger ../../../../../core/maybe ../../../../../core/accessorSupport/decorators ../../../../../layers/graphics/data/FeatureFilter ../../../../../layers/graphics/data/utils ../../../engine/webgl/definitions".split(" "),
function(k,l,b,m,n,q,r,t,u,v,g,c,w,x,y){Object.defineProperty(l,"__esModule",{value:!0});var z=v.getLogger("esri.views.2d.layers.features.controllers.BaseController");k=function(h){function a(){var a=null!==h&&h.apply(this,arguments)||this;a.configuration=null;a.processor=null;a.remoteClient=null;a.service=null;a.tileStore=null;a.filters=Array(y.MAX_FILTERS);return a}q(a,h);a.prototype.initialize=function(){this.handles.add([this.tileStore.on("update",this.onTileUpdate.bind(this))])};a.prototype.destroy=
function(){};Object.defineProperty(a.prototype,"spatialReference",{get:function(){return this.tileStore.tileScheme.spatialReference},enumerable:!0,configurable:!0});a.prototype.setFilterBase=function(a,c){return n(this,void 0,void 0,function(){var e,d,b,p;return m(this,function(f){switch(f.label){case 0:return[4,this._getFilter(a)];case 1:return e=f.sent(),[4,x.normalizeFilter(c,null,this.spatialReference)];case 2:return d=f.sent(),(this.configuration.filter=d)?[4,e.update(d)]:[2,e.clear()];case 3:f.sent(),
f.label=4;case 4:return f.trys.push([4,6,,7]),[4,this.queryObjectIds(e.createQuery().toJSON())];case 5:return b=f.sent(),[2,e.setTrue(b)];case 6:return p=f.sent(),z.error(new t("featurelayer-controller:query-filter-error","An error occurred while executing the query",{error:p})),[2,{show:[],hide:[]}];case 7:return[2]}})})};a.prototype.enableEvent=function(a){};a.prototype._getFilter=function(a){return n(this,void 0,void 0,function(){var b,e,c;return m(this,function(d){switch(d.label){case 0:b=this.filters[a];
if(g.isSome(b))return[2,b];e=new w.default({geometryType:this.service.geometryType,hasM:!1,hasZ:!1,timeInfo:this.service.timeInfo});this.filters[a]=e;return[4,this.queryObjectIds({})];case 1:return c=d.sent(),e.setKnownIds(c),[2,e]}})})};a.prototype._getFilterFlags=function(a){for(var b=0,c=0;c<this.filters.length;c++)var d=this.filters[c],d=g.isNone(d)||d.check(a),b=b|(d?1:0)<<c;return b};a.prototype.hasGeometryFilter=function(){return this.filters.some(function(a){return g.isSome(a)&&!!a.geometry})};
b([c.property()],a.prototype,"configuration",void 0);b([c.property()],a.prototype,"processor",void 0);b([c.property({constructOnly:!0})],a.prototype,"remoteClient",void 0);b([c.property({constructOnly:!0})],a.prototype,"service",void 0);b([c.property({dependsOn:["tileStore"]})],a.prototype,"spatialReference",null);b([c.property({constructOnly:!0})],a.prototype,"tileInfo",void 0);b([c.property({constructOnly:!0})],a.prototype,"tileStore",void 0);b([c.property()],a.prototype,"filters",void 0);return a=
b([c.subclass()],a)}(c.declared(r,u));l.default=k});