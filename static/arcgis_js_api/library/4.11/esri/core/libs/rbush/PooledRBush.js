// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["require","exports","../../PooledArray","../quickselect/quickselect"],function(B,C,v,I){function q(b,a){t(b,0,b.children.length,a,b)}function t(b,a,d,c,e){e||(e=r(null,!0));e.minX=Infinity;e.minY=Infinity;e.maxX=-Infinity;e.maxY=-Infinity;for(var f=void 0;a<d;a++)f=b.children[a],u(e,b.leaf?c(f):f);return e}function u(b,a){b.minX=Math.min(b.minX,a.minX);b.minY=Math.min(b.minY,a.minY);b.maxX=Math.max(b.maxX,a.maxX);b.maxY=Math.max(b.maxY,a.maxY);return b}function F(b,a){return b.minX-a.minX}
function G(b,a){return b.minY-a.minY}function D(b){return(b.maxX-b.minX)*(b.maxY-b.minY)}function w(b){return b.maxX-b.minX+(b.maxY-b.minY)}function E(b,a){return b.minX<=a.minX&&b.minY<=a.minY&&a.maxX<=b.maxX&&a.maxY<=b.maxY}function x(b,a){return a.minX<=b.maxX&&a.minY<=b.maxY&&a.maxX>=b.minX&&a.maxY>=b.minY}function r(b,a){return{children:b,height:1,leaf:a,minX:Infinity,minY:Infinity,maxX:-Infinity,maxY:-Infinity}}function H(b,a,d,c,e){for(var f=[a,d];f.length;)if(d=f.pop(),a=f.pop(),!(d-a<=c)){var l=
a+Math.ceil((d-a)/c/2)*c;I(b,l,a,d,e);f.push(a,l,l,d)}}Object.defineProperty(C,"__esModule",{value:!0});B=function(){function b(a,d){void 0===a&&(a=9);this.compareMinX=F;this.compareMinY=G;this.toBBox=function(a){return a};this._maxEntries=Math.max(4,a||9);this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries));d&&("function"===typeof d?this.toBBox=d:this._initFormat(d));this.clear()}b.prototype.destroy=function(){this.clear();n.prune();y.prune();h.prune();z.prune()};b.prototype.all=function(a){this._all(this.data,
a)};b.prototype.search=function(a,d){var c=this.data,b=this.toBBox;if(x(a,c))for(n.clear();c;){for(var f=0,l=c.children.length;f<l;f++){var g=c.children[f],k=c.leaf?b(g):g;x(a,k)&&(c.leaf?d(g):E(a,k)?this._all(g,d):n.push(g))}c=n.pop()}};b.prototype.collides=function(a){var d=this.data,c=this.toBBox;if(!x(a,d))return!1;for(n.clear();d;){for(var b=0,f=d.children.length;b<f;b++){var l=d.children[b],g=d.leaf?c(l):l;if(x(a,g)){if(d.leaf||E(a,g))return!0;n.push(l)}}d=n.pop()}return!1};b.prototype.load=
function(a,d){void 0===d&&(d=a.length);if(!d)return this;if(d<this._minEntries){for(var c=0;c<d;c++)this.insert(a[c]);return this}a=this._build(a.slice(0,d),0,d-1,0);this.data.children.length?this.data.height===a.height?this._splitRoot(this.data,a):(this.data.height<a.height&&(c=this.data,this.data=a,a=c),this._insert(a,this.data.height-a.height-1,!0)):this.data=a;return this};b.prototype.insert=function(a){a&&this._insert(a,this.data.height-1);return this};b.prototype.clear=function(){this.data=
r([],!0);return this};b.prototype.remove=function(a,d){if(!a)return this;var c=this.data,b,f,l,g,k=this.toBBox(a);h.clear();for(z.clear();c||h.length;){c||(c=h.pop(),b=h.data[h.length-1],f=z.pop(),l=!0);if(c.leaf){a:{g=a;var m=c.children,p=d;if(p){for(var A=0;A<m.length;A++)if(p(g,m[A])){g=A;break a}g=-1}else g=m.indexOf(g)}if(-1!==g){c.children.splice(g,1);h.push(c);this._condense(h);break}}l||c.leaf||!E(c,k)?b?(f++,c=b.children[f],l=!1):c=null:(h.push(c),z.push(f),f=0,b=c,c=c.children[0])}return this};
b.prototype.toJSON=function(){return this.data};b.prototype.fromJSON=function(a){this.data=a;return this};b.prototype._all=function(a,d){for(y.clear();a;){if(!0===a.leaf){var c=0;for(a=a.children;c<a.length;c++)d(a[c])}else y.pushArray(a.children);a=y.pop()}};b.prototype._build=function(a,d,c,b){var f=c-d+1,e=this._maxEntries,g;if(f<=e)return g=r(a.slice(d,c+1),!0),q(g,this.toBBox),g;b||(b=Math.ceil(Math.log(f)/Math.log(e)),e=Math.ceil(f/Math.pow(e,b-1)));g=r([],!1);g.height=b;f=Math.ceil(f/e);e=
f*Math.ceil(Math.sqrt(e));for(H(a,d,c,e,this.compareMinX);d<=c;d+=e){var k=Math.min(d+e-1,c);H(a,d,k,f,this.compareMinY);for(var m=d;m<=k;m+=f)g.children.push(this._build(a,m,Math.min(m+f-1,k),b-1))}q(g,this.toBBox);return g};b.prototype._chooseSubtree=function(a,d,b,e){for(;;){e.push(d);if(!0===d.leaf||e.length-1===b)break;for(var c=Infinity,l=Infinity,g=void 0,k=0,m=d.children.length;k<m;k++){var p=d.children[k],h=D(p),n=(Math.max(p.maxX,a.maxX)-Math.min(p.minX,a.minX))*(Math.max(p.maxY,a.maxY)-
Math.min(p.minY,a.minY))-h;n<l?(l=n,c=h<c?h:c,g=p):n===l&&h<c&&(c=h,g=p)}d=g||d.children[0]}return d};b.prototype._insert=function(a,d,c){var b=this.toBBox;c=c?a:b(a);h.clear();b=this._chooseSubtree(c,this.data,d,h);b.children.push(a);for(u(b,c);0<=d;)if(h.data[d].children.length>this._maxEntries)this._split(h,d),d--;else break;this._adjustParentBBoxes(c,h,d)};b.prototype._split=function(a,d){var b=a.data[d],e=b.children.length,f=this._minEntries;this._chooseSplitAxis(b,f,e);e=this._chooseSplitIndex(b,
f,e);e=r(b.children.splice(e,b.children.length-e),b.leaf);e.height=b.height;q(b,this.toBBox);q(e,this.toBBox);d?a.data[d-1].children.push(e):this._splitRoot(b,e)};b.prototype._splitRoot=function(a,b){this.data=r([a,b],!1);this.data.height=a.height+1;q(this.data,this.toBBox)};b.prototype._chooseSplitIndex=function(a,b,c){var d,f,l;d=f=Infinity;for(var g=b;g<=c-b;g++){var k=t(a,0,g,this.toBBox),m=t(a,g,c,this.toBBox),h;h=Math.max(0,Math.min(k.maxX,m.maxX)-Math.max(k.minX,m.minX))*Math.max(0,Math.min(k.maxY,
m.maxY)-Math.max(k.minY,m.minY));k=D(k)+D(m);h<d?(d=h,l=g,f=k<f?k:f):h===d&&k<f&&(f=k,l=g)}return l};b.prototype._chooseSplitAxis=function(a,b,c){var d=a.leaf?this.compareMinX:F,f=a.leaf?this.compareMinY:G,l=this._allDistMargin(a,b,c,d);b=this._allDistMargin(a,b,c,f);l<b&&a.children.sort(d)};b.prototype._allDistMargin=function(a,b,c,e){a.children.sort(e);e=this.toBBox;for(var d=t(a,0,b,e),l=t(a,c-b,c,e),g=w(d)+w(l),k=b;k<c-b;k++){var h=a.children[k];u(d,a.leaf?e(h):h);g+=w(d)}for(k=c-b-1;k>=b;k--)h=
a.children[k],u(l,a.leaf?e(h):h),g+=w(l);return g};b.prototype._adjustParentBBoxes=function(a,b,c){for(;0<=c;c--)u(b.data[c],a)};b.prototype._condense=function(a){for(var b=a.length-1,c=void 0;0<=b;b--)0===a.data[b].children.length?0<b?(c=a.data[b-1].children,c.splice(c.indexOf(a.data[b]),1)):this.clear():q(a.data[b],this.toBBox)};b.prototype._initFormat=function(a){var b=["return a"," - b",";"];this.compareMinX=new Function("a","b",b.join(a[0]));this.compareMinY=new Function("a","b",b.join(a[1]));
this.toBBox=new Function("a","return {minX: a"+a[0]+", minY: a"+a[1]+", maxX: a"+a[2]+", maxY: a"+a[3]+"};")};return b}();C.PooledRBush=B;var n=new v,y=new v,h=new v,z=new v({deallocator:null});C.default=B});