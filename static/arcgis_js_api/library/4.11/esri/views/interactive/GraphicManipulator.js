// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/decorateHelper ../../core/tsSupport/declareExtendsHelper ../../core/Accessor ../../core/Collection ../../core/Logger ../../core/accessorSupport/decorators ../../core/libs/gl-matrix-2/vec3 ../../views/3d/support/projectionUtils ../3d/support/stack ../draw/support/drawUtils".split(" "),function(f,g,d,k,l,m,n,c,p,q,r,t){Object.defineProperty(g,"__esModule",{value:!0});var u=n.getLogger("esri.views.interactive.GraphicManipulator");f=function(f){function a(b){b=
f.call(this)||this;b.interactive=!0;b.selectable=!1;b.allowOverlap=!0;b.grabbing=!1;b.dragging=!1;b.hovering=!1;b.selected=!1;b.active=!0;b._handlers=new m;return b}k(a,f);Object.defineProperty(a.prototype,"graphic",{get:function(){return this._get("graphic")},set:function(b){b.geometry&&"mesh"===b.geometry.type?u.error("Mesh geometries are not supported"):this._set("graphic",b)},enumerable:!0,configurable:!0});a.prototype.destroy=function(){this._handlers.removeAll();this._handlers=null;this._set("view",
null)};a.prototype.intersectionDistance=function(b){if(!this.active)return null;b=this.view.toMap(b,{include:[this.graphic]});if(!b)return null;var a=r.sv3d.get();return this.view.renderCoordsHelper.toRenderCoords(b,a)?p.vec3.distance(a,this.view.state.camera.eye):null};a.prototype.attemptDragTo=function(b,a){if(null==this.graphic.geometry||"mesh"===this.graphic.geometry.type)return!1;var c=this.view.toMap(a.previous),d=this.view.toMap(b.screenPoint),f=b.screenPoint.x-a.previous.x;a=b.screenPoint.y-
a.previous.y;var h=0,e=0;if(!c||!d)return!1;e=[0,0,0,0,0,0];q.bufferToBuffer([c.x,c.y,0,d.x,d.y,0],c.spatialReference,0,e,this.graphic.geometry.spatialReference,0,2);h=e[3]-e[0];e=e[4]-e[1];if(0===h&&0===e)return!0;this.graphic.geometry=t.move(this.graphic.geometry.clone(),h,e);var g={screenPoint:b.screenPoint,dxMap:h,dyMap:e,dx:f,dy:a};this._handlers.forEach(function(b){var a=b.handler;"drag"===b.type&&a(g)});return!0};a.prototype.click=function(b){this._handlers.forEach(function(a){"click"===a.type&&
a.handler(b)})};a.prototype.on=function(a,c){this._handlers.push({type:a,handler:c})};d([c.property({constructOnly:!0,nonNullable:!0})],a.prototype,"graphic",null);d([c.property({constructOnly:!0,nonNullable:!0})],a.prototype,"view",void 0);d([c.property()],a.prototype,"interactive",void 0);d([c.property()],a.prototype,"selectable",void 0);d([c.property()],a.prototype,"allowOverlap",void 0);d([c.property()],a.prototype,"grabbing",void 0);d([c.property()],a.prototype,"dragging",void 0);d([c.property()],
a.prototype,"hovering",void 0);d([c.property()],a.prototype,"selected",void 0);d([c.property()],a.prototype,"active",void 0);return a=d([c.subclass("esri.views.interactive.GraphicManipulator")],a)}(c.declared(l));g.GraphicManipulator=f});