// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define(["../../Component","../../Dropdowns/AccordionDropdown/index","dojo/i18n!../../Filters/TagsFilter/nls/resources","../../Buttons/CheckToggle"],function(h,k,l,m){return function(e){function b(a){if(c[a])return c[a].exports;var d=c[a]={i:a,l:!1,exports:{}};return e[a].call(d.exports,d,d.exports,b),d.l=!0,d.exports}var c={};return b.m=e,b.c=c,b.d=function(a,d,c){b.o(a,d)||Object.defineProperty(a,d,{enumerable:!0,get:c})},b.r=function(a){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,
Symbol.toStringTag,{value:"Module"});Object.defineProperty(a,"__esModule",{value:!0})},b.t=function(a,d){if((1&d&&(a=b(a)),8&d)||4&d&&"object"==typeof a&&a&&a.__esModule)return a;var c=Object.create(null);if(b.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:a}),2&d&&"string"!=typeof a)for(var e in a)b.d(c,e,function(d){return a[d]}.bind(null,e));return c},b.n=function(a){var d=a&&a.__esModule?function(){return a.default}:function(){return a};return b.d(d,"a",d),d},b.o=function(a,d){return Object.prototype.hasOwnProperty.call(a,
d)},b.p="",b(b.s=383)}({0:function(e,b,c){function a(a,b){function c(){this.constructor=a}d(a,b);a.prototype=null===b?Object.create(b):(c.prototype=b.prototype,new c)}c.d(b,"b",function(){return a});c.d(b,"a",function(){return g});var d=function(a,b){return(d=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,b){a.__proto__=b}||function(a,b){for(var f in b)b.hasOwnProperty(f)&&(a[f]=b[f])})(a,b)},g=function(){return(g=Object.assign||function(a){for(var b,d=1,c=arguments.length;d<c;d++)for(var f in b=
arguments[d])Object.prototype.hasOwnProperty.call(b,f)&&(a[f]=b[f]);return a}).apply(this,arguments)}},207:function(e,b){e.exports=m},22:function(e,b){e.exports=k},383:function(e,b,c){c.r(b);var a=c(0),d=c(99);e=c(4);var g=c(22),h=c.n(g),g=c(207),k=c.n(g);c=function(b){function c(a){a=b.call(this,a)||this;return a.handleFilterStringChange=a.handleFilterStringChange.bind(a),a.handleToggleClick=a.handleToggleClick.bind(a),a.handleClearFilter=a.handleClearFilter.bind(a),a}return a.b(c,b),c.prototype.render=
function(a){return a(h.a,{key:this.props.key+"-accordion",title:this.props.title?this.props.title:d.tags,clearable:!!this.props.tagsFilter,onClear:this.handleClearFilter,padding:!1},a("div",{class:"ftr-tags__input-area"},a("input",{id:"filter-tag-filters",class:"ftr-tags__input",type:"search",placeholder:d.filterTags,"aria-label":d.filterTags,oninput:this.handleFilterStringChange,value:this.props.filterString})),a("ul",{class:"ftr-tags__tree",id:this.props.key+"-accordion-tree",role:"tree","aria-label":d.tags},
0<this.props.availableTags.length?this.mapTagsToToggles(a):a("p",{class:"ftr-tags__none"},d.noTags)))},c.prototype.mapTagsToToggles=function(a){var b=this;return this.props.availableTags.map(function(c){return a(k.a,{key:c.value,name:c.value,value:c.value,selectedToggles:b.props.tagsFilter?b.props.tagsFilter:void 0,onToggleClick:b.handleToggleClick})})},c.prototype.handleToggleClick=function(b,c){var d,e;(c=this.props.tagsFilter)&&c[b]?(d=a.a({},c),delete d[b],0<Object.keys(d).length?this.props.onTagSelect(d):
this.props.onTagSelect()):c?this.props.onTagSelect(a.a({},c,((d={})[b]=!0,d))):this.props.onTagSelect(((e={})[b]=!0,e))},c.prototype.handleFilterStringChange=function(a){a.preventDefault();this.props.onFilterStringChange(a.target.value)},c.prototype.handleClearFilter=function(){this.props.tagsFilter&&this.props.onTagSelect()},c}(e.Component);b.default=c},4:function(e,b){e.exports=h},99:function(e,b){e.exports=l}})});