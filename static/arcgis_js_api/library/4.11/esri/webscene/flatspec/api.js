// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/generatorHelper ../../core/tsSupport/awaiterHelper ../../Basemap ../../Ground ../../WebScene ../../core/compilerUtils ../../core/JSONSupport ../../core/MultiOriginJSONSupport ../../core/accessorSupport/ensureType ../../core/accessorSupport/extensions/serializableProperty/type ../../layers/GroupLayer ../../layers/mixins/OperationalLayer ./utils".split(" "),function(X,y,f,g,F,G,H,z,I,J,A,K,B,C,L){function t(a,b,c){return g(this,void 0,void 0,function(){var d;
return f(this,function(e){switch(e.label){case 0:d=b.typeName;switch(d){case "array":return[3,1];case "union":return[3,3];case "json":return[3,5];case "native":return[3,7];case "enum":return[3,9]}return[3,11];case 1:return[4,M(a,b,c)];case 2:return e.sent(),[3,12];case 3:return[4,N(a,b,c)];case 4:return e.sent(),[3,12];case 5:return[4,D(a,b,c)];case 6:return e.sent(),[3,12];case 7:return[4,O(a,b,c)];case 8:return e.sent(),[3,12];case 9:return[4,P(a,b,c)];case 10:return e.sent(),[3,12];case 11:z.neverReached(b),
e.label=12;case 12:return[2]}})})}function O(a,b,c){return g(this,void 0,void 0,function(){return f(this,function(d){c.addProperty({name:a,type:n(b),default:b.default});return[2]})})}function Q(a){a=a.slice();a.sort();return a}function P(a,b,c){return g(this,void 0,void 0,function(){var d;return f(this,function(e){d=b.values.slice();b.nullable&&d.push(null);c.addProperty({name:a,type:n(b),enum:Q(d).map(function(a){return"string"===typeof a?'"'+a+'"':""+a}).join("|"),default:b.default});return[2]})})}
function M(a,b,c){return g(this,void 0,void 0,function(){return f(this,function(d){switch(d.label){case 0:return[4,t(a+"[]",b.elementType,c)];case 1:return d.sent(),[2]}})})}function N(a,b,c){return g(this,void 0,void 0,function(){var d,e,w,k,g,l;return f(this,function(m){switch(m.label){case 0:d=[],e=0,w=b.types,m.label=1;case 1:if(!(e<w.length))return[3,5];k=w[e];if("native"!==k.type.typeName)return[3,2];d.push(k.type);return[3,4];case 2:return m=k.value,g=a+"\x3c"+(R[m]||m)+"\x3e",[4,t(g,k.type,
c)];case 3:m.sent(),m.label=4;case 4:return e++,[3,1];case 5:return d.length&&(l=d.map(n),b.nullable&&l.push("null"),l.sort(),c.addProperty({type:l.join("|"),name:a,default:b.default})),[2]}})})}function S(a,b,c){return g(this,void 0,void 0,function(){return f(this,function(d){return a.type===H&&"layers"===b?[2,p("web-scene/operational-layers")]:a.type===F&&"baseLayers"===b?[2,p("web-scene/basemap")]:a.type===G&&"layers"===b?[2,p("web-scene/ground")]:a.type===B&&"layers"===b?[2,p("web-scene/operational-layers",
function(a){return a!==B})]:[2,T(c)]})})}function D(a,b,c){return g(this,void 0,void 0,function(){var d,e,g,k,h,l,m,u,n,p,v,q,r;return f(this,function(f){switch(f.label){case 0:d=b.type.__accessorMetadata__;e=b.type.prototype.declaredClass.replace(/\./g,"/");g=d&&d.properties;if(!g)return a&&c.addProperty({name:a,type:"unknown"}),[2,null];if((k=c.seen.get(b.type))&&a)return c.addProperty({name:a,type:k}),[2,k];h={type:b.type,name:e,properties:[]};a&&c.addProperty({name:a,type:h});c.push(a,h);l=[];
for(m in g)l.push(m);u=0;f.label=1;case 1:if(!(u<l.length))return[3,7];n=l[u];p=g[n];v=E(p);if(!v||!v.enabled)return[3,6];q=v.target;return"string"!==typeof q&&null!=q?[3,4]:[4,S(b,n,p)];case 2:return(r=f.sent())?[4,t("string"===typeof q?q:n,r,c)]:[3,6];case 3:return f.sent(),[3,6];case 4:return[4,U(q,c)];case 5:f.sent(),f.label=6;case 6:return u++,[3,1];case 7:return[2,c.pop()]}})})}function U(a,b){return g(this,void 0,void 0,function(){var c,d,e;return f(this,function(g){for(c in a)d=a[c],e=void 0,
e=d.types?r(d.types):h(d.type),e.default=d.default,t(c,e,b);return[2]})})}function p(a,b){return g(this,void 0,void 0,function(){var c,d,e,g,k,h,l,m;return f(this,function(f){switch(f.label){case 0:c=C.supportedTypes[a];d={typeName:"union",key:"layerType",types:[]};e=[];for(g in c)e.push(g);k=0;f.label=1;case 1:if(!(k<e.length))return[3,4];h=e[k];return[4,C.typeModuleMap[h]()];case 2:l=f.sent();if(!l||b&&!b(l))return[3,3];d.types.push({type:{typeName:"json",type:l},value:h});f.label=3;case 3:return k++,
[3,1];case 4:if(0===d.types.length)return[2,null];m={typeName:"array",elementType:1===d.types.length?d.types[0].type:d};return[2,m]}})})}function n(a){switch(a.typeName){case "array":return n(a.elementType)+"[]";case "union":var b=a.types.map(function(a){return n(a.type)});a.nullable&&b.push("null");return""+b.join(" | ");case "native":switch(a.type){case Number:return"number";case A.Integer:return"integer";case String:return"string";case Boolean:return"boolean";default:return"unknown"}case "json":return a.type.prototype.declaredClass;
case "enum":return"string";default:z.neverReached(a)}}function V(a){a=a.prototype.itemType&&a.prototype.itemType.Type;if(!a)return{typeName:"array",elementType:{typeName:"native",type:null}};if("function"===typeof a)return{typeName:"array",elementType:h(a)};if(a.typeMap){var b=[],c;for(c in a.typeMap){var d=a.typeMap[c];b.push({type:h(d),value:x(d)?null:c})}return{typeName:"array",elementType:{typeName:"union",key:"string"===typeof a.key?a.key:"type",types:b}}}}function T(a){if(a.types)return r(a.types);
var b;if(a.json){b=a.json.origins;var c=a.json,d=b&&b["web-document"];b=b&&b["web-scene"]||d||c||null}else b=null;c=E(a);a=h(b&&b.type||a.type);b&&void 0!==b.default&&"function"!==typeof b.default&&(a.default=b.default);c.allowNull&&(a.nullable=!0);return a}function r(a){if(Array.isArray(a))return{typeName:"array",elementType:r(a[0])};var b=[],c;for(c in a.typeMap){var d=a.typeMap[c];b.push({type:h(d),value:x(d)?null:c})}return 1===b.length?b[0].type:{typeName:"union",key:"string"===typeof a.key?
a.key:"type",types:b}}function h(a){return a?Array.isArray(a)?"string"===typeof a[0]||"number"===typeof a[0]?{typeName:"enum",values:a}:1<a.length?{typeName:"union",key:null,types:a.map(function(a){return{type:h(a),value:null}})}:{typeName:"array",elementType:h(a[0])}:K.isCollection(a)?V(a):x(a)?{typeName:"native",type:a}:W(a)?{typeName:"json",type:a}:{typeName:"native",type:null}:{typeName:"native",type:null}}function W(a){return(a=a._meta&&a._meta.bases)?-1!==a.indexOf(I)||-1!==a.indexOf(J):!1}
function x(a){return a===String||a===Boolean||a===Number||a===A.Integer}function E(a){if(!a.json)return null;var b=a.json.origins;a=a.json.write;var c=b&&b["web-document"]&&b["web-document"].write;return b&&b["web-scene"]&&b["web-scene"].write||c||a||null}Object.defineProperty(y,"__esModule",{value:!0});y.scan=function(a){return g(this,void 0,void 0,function(){var b;return f(this,function(c){b=new L.ScanContext;return[2,D(null,{typeName:"json",type:a},b)]})})};var R={"unique-value":"uniqueValue",
"class-breaks":"classBreaks","point-3d":"PointSymbol3D","line-3d":"LineSymbol3D","mesh-3d":"MeshSymbol3D","polygon-3d":"PolygonSymbol3D","label-3d":"LabelSymbol3D","web-style":"styleSymbolReference",text:"Text",object:"Object",icon:"Icon",fill:"Fill",extrude:"Extrude",line:"Line",path:"Path","point-cloud-class-breaks":"pointCloudClassBreaksRenderer","point-cloud-rgb":"pointCloudRGBRenderer","point-cloud-stretch":"pointCloudStretchRenderer","point-cloud-unique-value":"pointCloudUniqueValueRenderer",
"fixed-size":"pointCloudFixedSizeAlgorithm",splat:"pointCloudSplatAlgorithm",bitfield:"pointCloudBitfieldFilter",return:"pointCloudReturnFilter",value:"pointCloudValueFilter","stay-above":"stayAbove",color:"colorInfo",opacity:"transparencyInfo",size:"sizeInfo",rotation:"rotationInfo"}});