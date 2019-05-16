// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["require","exports"],function(k,d){function f(a){for(var c=0,b=0;b<a.length;b++)c+=a[b];return c/a.length}function g(a){for(var c=f(a),b=a.length,d=0,e=0;e<a.length;e++)d+=Math.pow(a[e]-c,2);return 1<b?d/(b-1):0}Object.defineProperty(d,"__esModule",{value:!0});d.aggregateFunction=function(a,c){var b=h[a.toLowerCase()];if(null==b)throw Error("Function Not Recognised");if(c.length<b.minParams||c.length>b.maxParams)throw Error("Invalid Parameter count for call to "+a.toUpperCase());return b.evaluate(c)};
d.isAggregate=function(a,c){a=h[a.toLowerCase()];return null!=a&&c>=a.minParams&&c<=a.maxParams};var h={min:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.min.apply(Math,a[0])}},max:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.max.apply(Math,a[0])}},avg:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:f(a[0])}},sum:{minParams:1,maxParams:1,evaluate:function(a){if(null==a[0])a=null;else{a=a[0];for(var c=0,b=0;b<a.length;b++)c+=
a[b];a=c}return a}},stddev:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:Math.sqrt(g(a[0]))}},count:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:a[0].length}},var:{minParams:1,maxParams:1,evaluate:function(a){return null==a[0]?null:g(a[0])}}}});