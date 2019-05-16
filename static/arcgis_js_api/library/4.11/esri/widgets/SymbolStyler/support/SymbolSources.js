// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/assignHelper ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper dojo/dom-construct dojo/i18n!../nls/SymbolStyler ../../../Color ../../../symbols ../../../core/Accessor ../../../core/devEnvironmentUtils ../../../core/promiseUtils ../../../core/urlUtils ../../../core/accessorSupport/decorators ../../../symbols/support/gfxUtils ../../../symbols/support/jsonUtils ../../../symbols/support/styleUtils ../../../symbols/support/symbolUtils".split(" "),
function(g,h,x,k,d,q,e,y,z,l,r,f,A,c,t,u,v,p){function B(b){var a=b.get("data.thumbnail.href"),m=b.data.title,c=q.create("div");r.isDevEnvironment()&&(a=r.adjustStaticAGOUrl(a));if(!a)return c.appendChild(w(m)),f.resolve(c);a=new z.WebStyleSymbol({name:b.data.name,styleUrl:b.portalItem.itemUrl+"/data",thumbnail:{url:a?A.makeAbsolute(a,b.get("portalItem.itemUrl")):null}});return p.renderPreviewHTML(a,{node:c,size:"flat"===b.data.dimensionality?24:48,disableUpsampling:!0}).then(function(a){return c}).catch(function(){c.appendChild(w(m));
return c})}function w(b){void 0===b&&(b=e.noTitle);return q.create("span",{innerHTML:b,alt:""})}function C(b,a,m){var c=v.styleNameFromItem(m),d=null;c||(d=m.itemUrl+"/data");return v.fetchSymbolFromStyle({data:b,baseUrl:m.itemUrl,styleName:c,styleUrl:d},a,{portal:m.portal})}Object.defineProperty(h,"__esModule",{value:!0});var D=[{name:"Circle",type:"esriSMS",style:"esriSMSCircle",color:[0,0,128,128],size:18,outline:{color:[0,0,128,255],width:1}},{name:"Square",type:"esriSMS",style:"esriSMSSquare",
color:[0,0,128,128],size:18,outline:{color:[0,0,128,255],width:1}},{name:"Diamond",type:"esriSMS",style:"esriSMSDiamond",color:[0,0,128,128],size:18,outline:{color:[0,0,128,255],width:1}},{name:"Cross",type:"esriSMS",style:"esriSMSCross",color:[0,0,128,128],size:18,outline:{color:[0,0,128,255],width:1}},{name:"X",type:"esriSMS",style:"esriSMSX",color:[0,0,128,128],size:18,outline:{color:[0,0,128,255],width:1}},{name:"Triangle",type:"esriSMS",style:"esriSMSTriangle",color:[0,0,128,128],size:18,outline:{color:[0,
0,128,255],width:1}}];g=[{title:e.sphere,name:"Sphere",primitive:"sphere"},{title:e.tallCylinder,name:"Tall_Cylinder",primitive:"cylinder",mixins:{width:5,height:10,depth:5}},{title:e.cylinder,name:"Cylinder",primitive:"cylinder"},{title:e.tallCube,name:"Tall_Cube",primitive:"cube",mixins:{width:5,height:10,depth:5,anchor:"bottom"}},{title:e.cube,name:"Cube",primitive:"cube"},{title:e.tallCone,name:"Tall_Cone",primitive:"cone",mixins:{width:5,height:10,depth:5}},{title:e.cone,name:"Cone",primitive:"cone"},
{title:e.invertedCone,name:"Inverted_Cone",primitive:"invertedCone"},{title:e.diamond,name:"Diamond",primitive:"diamond"},{title:e.tetrahedron,name:"Tetrahedron",primitive:"tetrahedron"}];var E=[{title:e.circle,name:"Circle",primitive:"circle"},{title:e.square,name:"Square",primitive:"square"},{title:e.cross,name:"Cross",primitive:"cross"},{title:e.x,name:"X",primitive:"x"},{title:e.kite,name:"Kite",primitive:"kite"},{title:e.triangle,name:"Triangle",primitive:"triangle"}].map(function(b){return{dimensionality:"flat",
name:b.name,title:b.title,type:"PointSymbol3D",symbolLayers:[{type:"Icon",resource:{primitive:b.primitive},material:{color:t.defaultThematicColor},outline:{color:[0,0,0]}}]}}),F=g.map(function(b){return{dimensionality:"volumetric",name:b.name,title:b.title,type:"PointSymbol3D",symbolLayers:[x({type:"Object",resource:{primitive:b.primitive}},b.mixins)]}}),G={getSymbol:function(b){return C(b.parentData,b.data.name,b.portalItem).then(function(a){"point-3d"===a.type&&a.symbolLayers.forEach(function(a){a.get("material.color")&&
("icon"===a.type?a.material.color=t.defaultThematicColor.clone():"object"===a.type&&(a.material.color=a.material.color||new y([255,255,255])))});return a})},getThumbnail:function(b){return B(b)}},H={getSymbol:function(b){return f.resolve(u.fromJSON(b.data))},getThumbnail:function(b){return b.getSymbol().then(function(a){return p.renderPreviewHTML(a,{size:24})})}},I={getSymbol:function(b){return f.resolve(u.fromJSON(b.data))},getThumbnail:function(b){return b.getSymbol().then(function(a){return p.renderPreviewHTML(a,
{size:48})})}},n=function(b){function a(){return null!==b&&b.apply(this,arguments)||this}k(a,b);a.prototype.getSymbol=function(){var a=this;return this._symbol?f.resolve(this._symbol):this.strategy.getSymbol(this).then(function(b){return a._symbol=b})};a.prototype.getThumbnail=function(a){var b=this;return this._thumbnail?(a.appendChild(this._thumbnail),f.resolve(Function.prototype)):this.strategy.getThumbnail(this).then(function(c){b._thumbnail=c;return function(){a.appendChild(b._thumbnail)}})};
d([c.property()],a.prototype,"strategy",void 0);d([c.property()],a.prototype,"data",void 0);d([c.property()],a.prototype,"parentData",void 0);d([c.property()],a.prototype,"portalItem",void 0);return a=d([c.subclass("esri.widgets.SymbolStyler.SymbolItem")],a)}(c.declared(l));h.SymbolItem=n;g=function(b){function a(){return null!==b&&b.apply(this,arguments)||this}k(a,b);a.prototype.fetchData=function(){var a=this;return this.data?f.resolve(this.data):this.portalItem.fetchData().then(function(b){a._set("data",
b);return b})};d([c.property({readOnly:!0})],a.prototype,"data",void 0);d([c.property({aliasOf:"portalItem.id"})],a.prototype,"id",void 0);d([c.property({aliasOf:"portalItem.name"})],a.prototype,"name",void 0);d([c.property({aliasOf:"portalItem.title"})],a.prototype,"title",void 0);d([c.property()],a.prototype,"portalItem",void 0);return a=d([c.subclass("esri.widgets.SymbolStyler.PortalItemSymbolSourceBase")],a)}(c.declared(l));var J=function(b){function a(){var a=null!==b&&b.apply(this,arguments)||
this;a.type="symbol-set";return a}k(a,b);a.prototype.getItems=function(){return f.resolve(null)};d([c.property({readOnly:!0})],a.prototype,"type",void 0);return a=d([c.subclass("esri.widgets.SymbolStyler.SymbolSetSymbolSource")],a)}(c.declared(g));h.SymbolSetSymbolSource=J;g=function(b){function a(){var a=null!==b&&b.apply(this,arguments)||this;a.type="web-style";return a}k(a,b);a.prototype.getItems=function(){var a=this;return this._items?f.resolve(this._items):this.fetchData().then(function(b){return b.items.map(function(c){return new n({data:c,
parentData:b,portalItem:a.portalItem,strategy:G})})}).then(function(b){return a._items=b})};d([c.property({readOnly:!0})],a.prototype,"type",void 0);return a=d([c.subclass("esri.widgets.SymbolStyler.WebStyleSymbolSource")],a)}(c.declared(g));h.WebStyleSymbolSource=g;g=function(b){function a(){var a=null!==b&&b.apply(this,arguments)||this;a.data=D;a.id="basic-symbol-set";a.name="Basic";a.title=e.basic;a.type="symbol-set";return a}k(a,b);a.prototype.getItems=function(){return f.resolve(null)};d([c.property()],
a.prototype,"data",void 0);d([c.property()],a.prototype,"id",void 0);d([c.property()],a.prototype,"name",void 0);d([c.property()],a.prototype,"title",void 0);d([c.property({readOnly:!0})],a.prototype,"type",void 0);return a=d([c.subclass("esri.widgets.SymbolStyler.BasicSymbolSetSource")],a)}(c.declared(l));h.BasicSymbolSetSource=g;g=function(b){function a(){var a=null!==b&&b.apply(this,arguments)||this;a.data={items:E};a.id="basic-web-style:flat";a.name="Basic";a.title=e.basic;a.type="web-style";
return a}k(a,b);a.prototype.getItems=function(){if(this._items)return f.resolve(this._items);var a=this.data.items.map(function(a){return new n({data:a,strategy:H})});return f.resolve(this._items=a)};d([c.property()],a.prototype,"data",void 0);d([c.property()],a.prototype,"id",void 0);d([c.property()],a.prototype,"name",void 0);d([c.property()],a.prototype,"title",void 0);d([c.property({readOnly:!0})],a.prototype,"type",void 0);return a=d([c.subclass("esri.widgets.SymbolStyler.IconPrimitiveWebStyleSource")],
a)}(c.declared(l));h.IconPrimitiveWebStyleSource=g;l=function(b){function a(){var a=null!==b&&b.apply(this,arguments)||this;a.data={items:F};a.id="basic-web-style:volumetric";a.name="Basic";a.title=e.basic;a.type="web-style";return a}k(a,b);a.prototype.getItems=function(){var a=this;if(this._items)return f.resolve(this._items);var b=this.data.items.map(function(b){return new n({data:b,parentData:a.data,strategy:I})});return f.resolve(this._items=b)};d([c.property()],a.prototype,"data",void 0);d([c.property()],
a.prototype,"id",void 0);d([c.property()],a.prototype,"name",void 0);d([c.property()],a.prototype,"title",void 0);d([c.property({readOnly:!0})],a.prototype,"type",void 0);return a=d([c.subclass("esri.widgets.SymbolStyler.ObjectPrimitiveWebStyleSource")],a)}(c.declared(l));h.ObjectPrimitiveWebStyleSource=l});