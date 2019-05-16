// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../languageUtils ../featureset/support/WhereClause ./fieldStats ../../core/promiseUtils".split(" "),function(r,m,g,n,l,h){function k(b,d,f,a,e,c){if(1===a.length){if(g.isArray(a[0]))return h.resolve(l.calculateStat(b,a[0],g.defaultUndefined(a[1],-1)));if(g.isImmutableArray(a[0]))return h.resolve(l.calculateStat(b,a[0].toArray(),g.defaultUndefined(a[1],-1)))}else if(2===a.length){if(g.isArray(a[0]))return h.resolve(l.calculateStat(b,a[0],g.defaultUndefined(a[1],-1)));if(g.isImmutableArray(a[0]))return h.resolve(l.calculateStat(b,
a[0].toArray(),g.defaultUndefined(a[1],-1)));if(g.isFeatureSet(a[0]))return p(n.create(a[1]),c,e).then(function(c){return a[0]._qStat(b,c,g.defaultUndefined(a[2],1E3),d.progressTracker)})}else if(3===a.length&&g.isFeatureSet(a[0]))return p(n.create(a[1]),c,e).then(function(c){return a[0]._qStat(b,c,g.defaultUndefined(a[2],1E3),d.progressTracker)});return h.resolve(l.calculateStat(b,a,-1))}function p(b,d,f){try{var a=b.getVariables();if(0<a.length){for(var e=[],c=0;c<a.length;c++)e.push(d.evaluateIdentifier(f,
{name:a[c]}));return h.all(e).then(function(c){for(var d={},e=0;e<a.length;e++)d[a[e]]=c[e];b.setVariablesDictionary(d);return b})}return h.resolve(b)}catch(q){return h.reject(q)}}Object.defineProperty(m,"__esModule",{value:!0});m.registerFunctions=function(b){"async"===b.mode&&(b.functions.stdev=function(d,f){return b.standardFunctionAsync(d,f,function(a,e,c){return k("stdev",a,e,c,d,b)})},b.functions.variance=function(d,f){return b.standardFunctionAsync(d,f,function(a,e,c){return k("variance",a,
e,c,d,b)})},b.functions.average=function(d,f){return b.standardFunctionAsync(d,f,function(a,e,c){return k("mean",a,e,c,d,b)})},b.functions.mean=function(d,f){return b.standardFunctionAsync(d,f,function(a,e,c){return k("mean",a,e,c,d,b)})},b.functions.sum=function(d,f){return b.standardFunctionAsync(d,f,function(a,e,c){return k("sum",a,e,c,d,b)})},b.functions.min=function(d,f){return b.standardFunctionAsync(d,f,function(a,e,c){return k("min",a,e,c,d,b)})},b.functions.max=function(d,f){return b.standardFunctionAsync(d,
f,function(a,e,c){return k("max",a,e,c,d,b)})},b.functions.count=function(d,f){return b.standardFunctionAsync(d,f,function(a,b,c){g.pcCheck(c,1,1);if(g.isFeatureSet(c[0]))return c[0].count(a.progressTracker);if(g.isArray(c[0])||g.isString(c[0]))return c[0].length;if(g.isImmutableArray(c[0]))return c[0].length();throw Error("Invalid Parameters for Count");})})}});