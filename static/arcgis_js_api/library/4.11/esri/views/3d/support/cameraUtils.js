// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/tsSupport/assignHelper ../../../Camera ../../../config ../../../core/Logger ../../../core/promiseUtils ../../../core/libs/gl-matrix-2/vec3 ../../../core/libs/gl-matrix-2/vec3f64 ../../../geometry/Point ../../../geometry/SpatialReference ../../../geometry/support/scaleUtils ../../../geometry/support/webMercatorUtils ../camera/intersectionUtils ./cameraUtilsPlanar ./cameraUtilsSpherical ./earthUtils ./mathUtils ./projectionUtils ../webgl-engine/lib/Camera".split(" "),
function(fa,g,ga,J,K,U,D,u,n,q,r,V,E,W,L,M,z,x,m,X){function t(a){return"global"===a.viewingMode?M:L}function N(a,b,c){var d=a.renderSpatialReference,e=u.vec3.copy(Y,b.viewForward),e=O(a,b.eye,e,b.up,Z);a=a.spatialReference||r.WGS84;m.vectorToVector(b.eye,d,v,a)||(a=r.WGS84,m.vectorToVector(b.eye,d,v,a));if(!c)return new J(new q(v,a),e.heading,e.tilt,x.rad2deg(b.fov));c.position.x=v[0];c.position.y=v[1];c.position.z=v[2];c.position.spatialReference=a;c.heading=e.heading;c.tilt=e.tilt;c.fov=x.rad2deg(b.fov);
return c}function P(a,b,c){var d=a.state.camera,e=d.fovX,d=d.width/2/d.pixelRatio;"global"===a.viewingMode&&null!=c&&(b*=Math.cos(x.deg2rad(c)));b/=a.renderCoordsHelper.unitInMeters;return d/(39.37*K.screenDPI/b)/Math.tan(e/2)}function Q(a,b,c){var d=a.state.camera;b=39.37*K.screenDPI/(d.width/2/d.pixelRatio/(b*Math.tan(d.fovX/2)));"global"===a.viewingMode&&(b/=Math.cos(x.deg2rad(c)));return b*=a.renderCoordsHelper.unitInMeters}function R(a,b,c,d,e,f){if(w(f)){var h=D.createResolver();A(a,d.heading,
d.tilt,b,c,e,h);h.promise.then(function(b){return f.resolve(B(a,b,d.fov))})}else return b=A(a,d.heading,d.tilt,b,c,e),B(a,b,d.fov,f)}function O(a,b,c,d,e){return t(a).directionToHeadingTilt(b,c,d,e)}function aa(a,b,c){return a.basemapTerrain&&a.renderCoordsHelper.fromRenderCoords(b,y,a.spatialReference)&&a.basemapTerrain.getElevation(y)>y.z-1}function ba(a,b,c){return a.renderCoordsHelper.fromRenderCoords(b,y,a.spatialReference)?a.elevationProvider.queryElevation(y).then(function(a){return a>y.z-
10}):D.resolve(!1)}function ca(a,b){var c=n.vec3f64.create();if(b)if(b instanceof q){if(m.pointToVector(b,c,a.renderSpatialReference),null==b.z&&null!=a.basemapTerrain)return a.elevationProvider.queryElevation(b).then(function(b){null!=b&&a.renderCoordsHelper.setAltitude(b,c);return c})}else u.vec3.copy(c,b);else u.vec3.copy(c,a.state.camera.center);return D.resolve(c)}function da(a,b){var c=n.vec3f64.create();b&&b instanceof q?(m.pointToVector(b,c,a.renderSpatialReference),null==b.z&&null!=a.basemapTerrain&&
(b=a.elevationProvider.getElevation(b),null!=b&&a.renderCoordsHelper.setAltitude(b,c))):b?u.vec3.copy(c,b):u.vec3.copy(c,a.state.camera.center);return c}function A(a,b,c,d,e,f,h){var p=d&&d instanceof q?d:null;if(w(h))ca(a,d).then(function(d){H(a,b,c,p,d,e,f,h)});else return d=da(a,d),H(a,b,c,p,d,e,f,h)}function H(a,b,c,d,e,f,h,p){d||(d=m.vectorToPoint(e,a.renderSpatialReference,a.spatialReference||r.WGS84));f=Math.max(f,a.state.constraints.minimumPoiDistance);var k=ea(a,b,c,e,f,h),g=t(a).eyeForCenterWithHeadingTilt,
l=g(e,f,k.heading,k.tilt);if(h===C.ADJUST&&"global"===a.viewingMode&&0<c){var S=function(){var k=f,l=f,g=a.state.constraints.tilt(l),l=t(a).eyeTiltToLookAtTilt(e,l,c),l=Math.min(l,.5*Math.PI),g=g.min*(1-F)+l*F,k=t(a).lookAtTiltToEyeTilt(e,k,g);h=1>c-k?C.LOCKED:C.ADJUST;return H(a,b,k,d,e,f,h,p)};if(aa(a,l.eye,l.tilt))return S();if(w(p)){ba(a,l.eye,l.tilt).then(function(a){if(a)return S();p.resolve({eye:l.eye,up:l.up,center:n.vec3f64.clone(e),heading:l.heading,tilt:l.tilt})});return}}k={center:n.vec3f64.create(),
eye:n.vec3f64.create(),up:n.vec3f64.create(),tilt:0,heading:0};p&&!w(p)&&(k=p);k.eye=l.eye;k.up=l.up;k.center=n.vec3f64.clone(e);k.heading=l.heading;k.tilt=l.tilt;w(p)&&p.resolve(k);return k}function ea(a,b,c,d,e,f){var h=0;if(f=f===C.ADJUST)if(h=a.pointsOfInterest.centerOnSurfaceFrequent.distance,8<Math.log(e/h)/Math.LN2)f=!0;else{var g=a.renderSpatialReference,k=a.spatialReference||r.WGS84;f=m.vectorToPoint(d,g,k);g=m.vectorToPoint(a.pointsOfInterest.centerOnSurfaceFrequent.renderLocation,g,k);
h*=Math.tan(.5*a.state.camera.fov);f=5<g.distance(f)/h}f?(b=0,f=a.state.constraints.tilt(e),f.max=Math.min(f.max,.5*Math.PI),f=f.min*(1-F)+f.max*F,c=t(a).eyeTiltToLookAtTilt(d,e,c),h=Math.min(c,f)):h=t(a).eyeTiltToLookAtTilt(d,e,c);c=h=a.state.constraints.clampTilt(e,h);c=t(a).lookAtTiltToEyeTilt(d,e,c);return{heading:b,tilt:c}}function B(a,b,c,d){a=m.vectorToPoint(b.eye,a.renderSpatialReference,a.spatialReference||r.WGS84);return a?d?(d.position=a,d.heading=b.heading,d.tilt=b.tilt,d.fov=c,d):new J(a,
b.heading,b.tilt,c):null}function w(a){return a&&a.resolve&&a.reject}Object.defineProperty(g,"__esModule",{value:!0});var T=U.getLogger("esri.views.3d.support.cameraUtils"),v=n.vec3f64.create(),G=n.vec3f64.create(),Y=n.vec3f64.create(),Z={heading:0,tilt:0},y=new q,I=new x.Cyclical(-2.0037508342788905E7,2.0037508342788905E7),C;(function(a){a[a.LOCKED=0]="LOCKED";a[a.ADJUST=1]="ADJUST"})(C=g.OrientationMode||(g.OrientationMode={}));g.headingTiltToDirectionUp=function(a,b,c,d,e){return t(a).headingTiltToDirectionUp(b,
c,d,e)};g.externalToInternal=function(a,b){var c=a.renderSpatialReference,d=t(a).headingTiltToDirectionUp,e=n.vec3f64.create();if(!m.pointToVector(b.position,e,c))return null;c=d(e,b.heading,b.tilt);u.vec3.scale(c.direction,c.direction,a.state.camera.distance);u.vec3.add(c.direction,c.direction,e);a=W.cameraOnContentAlongViewDirection(a,e,c.direction,c.up);a.fov=x.deg2rad(b.fov);return a};g.internalToExternal=N;g.scaleToDistance=P;g.distanceToScale=Q;g.fromCenterScale=function(a,b,c,d,e,f){c=P(a,
c,b.latitude);return R(a,b,c,d,e,f)};g.fromCenterDistance=R;g.directionToHeadingTilt=O;g.getObserverForPointAtDistance=A;g.fromExtent=function(a,b,c,d,e,f){var h,g=0;null!=b.zmax&&null!=b.zmin&&(h=(b.zmax+b.zmin)/2,g=b.zmax-b.zmin);var k,m;if("global"===a.viewingMode){k=r.WebMercator;m=b.spatialReference||k;var l=new q(b.xmin,b.ymin,m),n=new q(b.xmax,b.ymax,m),l=E.project(l,k),n=E.project(n,k);if(null===l||null===n){w(f)&&f.reject();return}b=new q(I.center(l.x,n.x),(n.y+l.y)/2,k);null!=h&&(b.z=h);
h=z.getGreatCircleSpanAt(b,l,n);k=h.lon;m=h.lat;I.diff(l.x,n.x)>I.range/2&&(k+=z.halfEarthCircumference);k=Math.min(k,z.halfEarthCircumference);m=Math.min(m,z.halfEarthCircumference)}else l=a.spatialReference||r.WGS84,E.canProject(b,l)&&(b=E.project(b,l)),k=b.xmax-b.xmin,m=b.ymax-b.ymin,b=new q({x:b.xmin+.5*k,y:b.ymin+.5*m,z:h,spatialReference:l});h=a.state.camera;g=Math.max(1/Math.tan(h.fovX/2)*k*.5,1/Math.tan(h.fovY/2)*m*.5,1/Math.tan(h.fov/2)*g*.5)/1;if(w(f))h=D.createResolver(),A(a,c,d,b,g,e,
h),h.promise.then(function(b){return f.resolve(B(a,b,a.camera.fov))});else return c=A(a,c,d,b,g,e),B(a,c,a.camera.fov,f)};g.toExtent=function(a,b,c,d,e){b||(c||(c=a.state.camera),b=N(a,c,e));e=a.renderSpatialReference;var f;if(c)e=m.vectorToPoint(c.center,e,a.spatialReference||r.WGS84),f=c.distance;else{e=a.toMap(a.screenCenter);if(!e)return null;f=z.computeCarthesianDistance(b.position,e)}c||(c=a.state.camera);b=2*f*Math.tan(c.fovX/2)*1;c=2*f*Math.tan(c.fovY/2)*1;return"global"===a.viewingMode?M.toExtent(a,
e,b,c,d):L.toExtent(a,e,b,c,d)};var F=.7;g.observerToCamera=B;g.scaleToZoom=function(a,b){if(a=a.basemapTerrain&&a.basemapTerrain.tilingScheme)return a.levelAtScale(b);T.error("#scaleToZoom()","Cannot compute zoom from scale without a tiling scheme")};g.zoomToScale=function(a,b){if(a=a.basemapTerrain&&a.basemapTerrain.tilingScheme)return a.scaleAtLevel(b);T.error("#zoomToScale()","Cannot compute scale from zoom without a tiling scheme")};g.scaleToResolution=function(a,b){return a.spatialReference?
V.getResolutionForScale(b,a.spatialReference):void 0};g.computeScale=function(a,b,c){var d=a.renderSpatialReference;b||(b=a.state.camera);var e;e=r.WGS84;b instanceof X?(m.vectorToVector(b.center,d,G,e),e=G[1],b=b.distance):(e=b.position.latitude,m.pointToVector(b.position,v,d),m.pointToVector(c,G,d),b=u.vec3.distance(v,G));return Q(a,b,e)}});