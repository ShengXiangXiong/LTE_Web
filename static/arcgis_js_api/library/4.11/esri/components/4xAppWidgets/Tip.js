// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper dojo/i18n!../../nls/common dojo/i18n!./Tip/nls/resources ../../core/accessorSupport/decorators ../../widgets/Widget ./Tip/TipViewModel ../../widgets/support/widget".split(" "),function(n,p,l,d,g,f,e,m,h,c){return function(k){function b(a){a=k.call(this)||this;a.compact=!0;a.iconClass="esri-icon-lightbulb";a.label=f.widgetLabel;a.dismissible=!0;a.dismissed=null;a.viewModel=new h;return a}l(b,k);b.prototype.render=
function(){var a,b=this.dismissed,d=this.tip,e=(a={},a["esri-disabled"]=!d,a["esri-tip--dismissed"]=b,a);a=b?null:d?this._renderTip():this._renderNoTip();return c.tsx("div",{key:"base",class:this.classes("esri-tip","esri-widget",e)},a)};b.prototype._renderNoTip=function(){return c.tsx("div",{key:"no-tip",class:"esri-tip__no-tip"},f.noTip)};b.prototype._renderTipSource=function(){var a=this.tip.source;if(!a||this.compact)return null;var b=a.url,a=a.title||f.defaultSourceTitle;return b?c.tsx("a",{key:"tip-source",
class:"esri-tip__source",target:"_blank",href:b},a):null};b.prototype._renderContent=function(){var a=this.tip.content;if("string"===typeof a)return c.tsx("div",{class:"esri-tip__content",key:a,innerHTML:a});if("object"===typeof a&&a.render&&"function"===typeof a.render)return c.tsx("div",{class:"esri-tip__content",key:a},a.render());if(a instanceof HTMLElement)return c.tsx("div",{class:"esri-tip__content",key:a,bind:a,afterCreate:this._attachToNode})};b.prototype._attachToNode=function(a){a.appendChild(this)};
b.prototype._renderTipIcon=function(){return this.compact?c.tsx("span",{class:"esri-icon-lightbulb"}):null};b.prototype._renderTitle=function(){var a=this.tip.title;return a?c.tsx("h2",{key:"title",class:this.classes("esri-widget__heading","esri-tip__heading")},this._renderTipIcon(),a):null};b.prototype._renderImage=function(){var a=this.tip,b=a.image,a=a.title;return b&&!this.compact?c.tsx("div",{class:"esri-tip__image-frame"},c.tsx("img",{alt:a,class:"esri-tip__image",src:b})):null};b.prototype._renderDismiss=
function(){return this.dismissible?c.tsx("button",{key:"dismiss",bind:this,onclick:this._dismiss,onkeydown:this._dismiss,class:this.classes("esri-widget__header-button","esri-tip__dismiss"),"aria-label":g.close,title:g.close},c.tsx("span",{"aria-hidden":"true",class:"esri-icon-close"})):null};b.prototype._renderHeader=function(){return c.tsx("header",{class:this.classes("esri-widget__header","esri-tip__header")},this._renderTitle(),this._renderDismiss())};b.prototype._renderInfoBlock=function(){return c.tsx("div",
{class:"esri-tip__info-block"},this._renderContent(),this._renderTipSource())};b.prototype._renderMain=function(){return c.tsx("div",{class:"esri-tip__main"},this._renderInfoBlock())};b.prototype._renderTip=function(){return[this._renderHeader(),this._renderImage(),this._renderMain()]};b.prototype._dismiss=function(){this.viewModel.dismissed=!0};d([e.property()],b.prototype,"compact",void 0);d([e.property()],b.prototype,"iconClass",void 0);d([e.property()],b.prototype,"label",void 0);d([c.renderable(),
e.property()],b.prototype,"dismissible",void 0);d([e.aliasOf("viewModel.dismissed")],b.prototype,"dismissed",void 0);d([e.aliasOf("viewModel.tip")],b.prototype,"tip",void 0);d([e.property({type:h}),c.renderable("viewModel.dismissed viewModel.tip.content viewModel.tip.image viewModel.tip.source.url viewModel.tip.source.title viewModel.tip.title".split(" "))],b.prototype,"viewModel",void 0);d([c.accessibleHandler()],b.prototype,"_dismiss",null);return b=d([e.subclass("esri.widgets.Tip")],b)}(e.declared(m))});