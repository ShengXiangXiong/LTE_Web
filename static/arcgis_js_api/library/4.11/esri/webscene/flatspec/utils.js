// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(h,c){function k(a,e,b,g){if(b.has(a))return g;b.add(a);e&&a.name&&(g[e]=a);for(var d=0,f=a.properties;d<f.length;d++){var c=f[d];"string"!==typeof c.type&&k(c.type,e?e+"."+c.name:c.name,b,g)}b.delete(a);return g}function l(a,e,b){var c=0;for(a=a.properties;c<a.length;c++){var d=a[c],f=e?e+"."+d.name:d.name;"string"===typeof d.type?b.push({name:f,type:d.type,default:d.default,enum:d.enum}):0===d.type.properties.length?b.push({name:f,type:"unknown",default:d.default,
enum:d.enum}):l(d.type,f,b)}return b}Object.defineProperty(c,"__esModule",{value:!0});c.collectClassPaths=function(a){return k(a,"",new Set,{})};c.flatten=function(a){a=l(a,"",[]);a.sort(function(a,b){return a.name.localeCompare(b.name)});return a};h=function(){function a(){this.stack=[];this.seen=new Map}a.prototype.addProperty=function(a){this.currentClass.properties.push(a)};a.prototype.addSeen=function(a,b){this.seen.set(a,b)};a.prototype.push=function(a,b){this.seen.set(b.type,b);this.stack.push({klass:b,
propertyName:a})};a.prototype.pop=function(){return this.stack.pop().klass};Object.defineProperty(a.prototype,"currentClass",{get:function(){return this.stack[this.stack.length-1].klass},enumerable:!0,configurable:!0});Object.defineProperty(a.prototype,"pathString",{get:function(){return this.stack.map(function(a){return a.propertyName}).filter(function(a){return!!a}).join(".")},enumerable:!0,configurable:!0});return a}();c.ScanContext=h;c.sorted=function(a){a=a.slice();a.sort();return a}});