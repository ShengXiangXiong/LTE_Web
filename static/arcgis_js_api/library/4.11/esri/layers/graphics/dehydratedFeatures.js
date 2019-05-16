// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.11/esri/copyright.txt for details.
//>>built
define("require exports ../../geometry ../../Graphic ../../core/compilerUtils ../../core/lang ../../core/typedArrayUtil ../../geometry/SpatialReference ../../geometry/support/aaBoundingBox ../../geometry/support/aaBoundingRect ../../geometry/support/quantizationUtils ../support/Field ./dehydratedFeatureComparison".split(" "), function (K, d, p, q, k, r, m, E, g, h, l, F, G) {
  function t(a, b, c) {
    if (!a) return null;
    switch (b) {
      case "point":
        return a = {
          x: a.x,
          y: a.y,
          z: a.z,
          m: a.m,
          hasZ: null != a.z,
          hasM: null != a.m,
          type: "point",
          spatialReference: c
        };
      case "polyline":
        return a = {paths: a.paths, hasZ: !!a.hasZ, hasM: !!a.hasM, type: "polyline", spatialReference: c};
      case "polygon":
        return a = {rings: a.rings, hasZ: !!a.hasZ, hasM: !!a.hasM, type: "polygon", spatialReference: c};
      case "multipoint":
        return a = {points: a.points, hasZ: !!a.hasZ, hasM: !!a.hasM, type: "multipoint", spatialReference: c}
    }
  }

  function u(a, b, c, d) {
    return {x: a, y: b, z: c, hasZ: null != c, hasM: !1, spatialReference: d, type: "point"}
  }

  function n(a) {
    return "declaredClass" in a
  }

  function v(a) {
    return "declaredClass" in a
  }

  function w(a) {
    if (!a) return 0;
    switch (a.type) {
      case "point":
        return 1;
      case "polyline":
        var b = 0, c = 0;
        for (a = a.paths; c < a.length; c++) b += a[c].length;
        return b;
      case "polygon":
        c = b = 0;
        for (a = a.rings; c < a.length; c++) b += a[c].length;
        return b;
      case "multipoint":
        return a.points.length;
      case "extent":
        return 2;
      case "mesh":
        return (b = a.vertexAttributes && a.vertexAttributes.position) ? b.length / 3 : 0;
      default:
        k.neverReached(a)
    }
  }

  function H(a) {
    var b = a.spatialReference.toJSON();
    switch (a.type) {
      case "point":
        return {x: a.x, y: a.y, z: a.z, m: a.m, spatialReference: b};
      case "polygon":
        var c =
          a.hasZ, d = a.hasM;
        return {rings: x(a.rings), hasZ: c, hasM: d, spatialReference: b};
      case "polyline":
        var e = a.paths, c = a.hasZ, d = a.hasM;
        return {paths: x(e), hasZ: c, hasM: d, spatialReference: b};
      case "extent":
        var e = a.xmin, I = a.xmax, f = a.ymin, g = a.ymax, h = a.zmin, l = a.zmax, m = a.mmin, n = a.mmax, c = a.hasZ,
          d = a.hasM;
        return {
          xmin: e,
          xmax: I,
          ymin: f,
          ymax: g,
          zmin: h,
          zmax: l,
          mmin: m,
          mmax: n,
          hasZ: c,
          hasM: d,
          spatialReference: b
        };
      case "multipoint":
        return e = a.points, c = a.hasZ, d = a.hasM, {points: y(e) ? z(e) : e, hasZ: c, hasM: d, spatialReference: b};
      default:
        k.neverReached(a)
    }
  }

  function x(a) {
    return J(a) ? a.map(function (a) {
      return z(a)
    }) : a
  }

  function z(a) {
    return a.map(function (a) {
      return m.toArray(a)
    })
  }

  function J(a) {
    for (var b = 0; b < a.length; b++) {
      var c = a[b];
      if (0 !== c.length) return y(c)
    }
    return !1
  }

  function y(a) {
    return a.length && (m.isFloat32Array(a[0]) || m.isFloat64Array(a[0]))
  }

  function A(a, b) {
    g.empty(b);
    "mesh" === a.type && (a = a.extent);
    switch (a.type) {
      case "point":
        b[0] = b[3] = a.x;
        b[1] = b[4] = a.y;
        a.hasZ && (b[2] = b[5] = a.z);
        break;
      case "polyline":
        for (var c = 0; c < a.paths.length; c++) g.expandWithNestedArray(b,
          a.paths[c], a.hasZ);
        break;
      case "polygon":
        for (c = 0; c < a.rings.length; c++) g.expandWithNestedArray(b, a.rings[c], a.hasZ);
        break;
      case "multipoint":
        g.expandWithNestedArray(b, a.points, a.hasZ);
        break;
      case "extent":
        b[0] = a.xmin;
        b[1] = a.ymin;
        b[3] = a.xmax;
        b[4] = a.ymax;
        null != a.zmin && (b[2] = a.zmin);
        null != a.zmax && (b[5] = a.zmax);
        break;
      default:
        k.neverReached(a)
    }
  }

  function B(a, b) {
    h.empty(b);
    "mesh" === a.type && (a = a.extent);
    switch (a.type) {
      case "point":
        b[0] = b[2] = a.x;
        b[1] = b[3] = a.y;
        break;
      case "polyline":
        for (var c = 0; c < a.paths.length; c++) h.expandWithNestedArray(b,
          a.paths[c]);
        break;
      case "polygon":
        for (c = 0; c < a.rings.length; c++) h.expandWithNestedArray(b, a.rings[c]);
        break;
      case "multipoint":
        h.expandWithNestedArray(b, a.points);
        break;
      case "extent":
        b[0] = a.xmin;
        b[1] = a.ymin;
        b[2] = a.xmax;
        b[3] = a.ymax;
        break;
      default:
        k.neverReached(a)
    }
  }

  Object.defineProperty(d, "__esModule", {value: !0});
  d.equals = G.equals;
  d.isFeatureGeometry = function (a) {
    return p.isFeatureGeometryType(a.type)
  };
  d.isPoint = function (a) {
    return "point" === a.type
  };
  d.fromFeatureSetJSON = function (a) {
    var b = p.featureGeometryTypeKebabDictionary.fromJSON(a.geometryType),
      c = E.fromJSON(a.spatialReference), d = a.transform, e = a.features.map(function (e) {
        var f = a.objectIdFieldName;
        e = {
          uid: q.generateUID(),
          objectId: f && e.attributes ? e.attributes[f] : null,
          attributes: e.attributes,
          geometry: t(e.geometry, b, c),
          visible: !0
        };
        if ((f = e.geometry) && d) switch (f.type) {
          case "point":
            e.geometry = l.hydratePoint(d, f, f, f.hasZ, f.hasM);
            break;
          case "multipoint":
            e.geometry = l.hydrateMultipoint(d, f, f, f.hasZ, f.hasM);
            break;
          case "polygon":
            e.geometry = l.hydratePolygon(d, f, f, f.hasZ, f.hasM);
            break;
          case "polyline":
            e.geometry =
              l.hydratePolyline(d, f, f, f.hasZ, f.hasM);
            break;
          default:
            k.neverReached(f)
        }
        return e
      });
    return {
      geometryType: b,
      features: e,
      spatialReference: c,
      fields: a.fields ? a.fields.map(function (a) {
        return F.fromJSON(a)
      }) : null,
      objectIdFieldName: a.objectIdFieldName,
      globalIdFieldName: a.globalIdFieldName,
      geohashFieldName: a.geohashFieldName,
      geometryProperties: a.geometryProperties,
      hasZ: a.hasZ,
      hasM: a.hasM,
      exceededTransferLimit: a.exceededTransferLimit,
      transform: null
    }
  };
  d.fromJSONGeometry = t;
  d.makeDehydratedPoint = u;
  d.isHydratedGeometry =
    function (a) {
      return "declaredClass" in a
    };
  d.isHydratedPoint = n;
  d.isHydratedGraphic = v;
  d.hydrateGraphic = function (a, b) {
    if (!a || v(a)) return a;
    b = new q({layer: b, sourceLayer: b});
    b.visible = a.visible;
    b.symbol = r.clone(a.symbol);
    b.attributes = r.clone(a.attributes);
    a.geometry && ("mesh" === a.geometry.type ? b.geometry = a.geometry : b.read({geometry: H(a.geometry)}));
    return b
  };
  d.clonePoint = function (a, b) {
    if (!a) return null;
    if (n(a)) {
      if (null == b) return a.clone();
      if (n(b)) return b.copy(a)
    }
    null != b ? (b.x = a.x, b.y = a.y, b.spatialReference =
      a.spatialReference, a.hasZ ? (b.z = a.z, b.hasZ = a.hasZ) : (b.z = null, b.hasZ = !1), a.hasM ? (b.m = a.m, b.hasM = !0) : (b.m = null, b.hasM = !1)) : (b = u(a.x, a.y, a.z, a.spatialReference), a.hasM && (b.m = a.m, b.hasM = !0));
    return b
  };
  d.estimateSize = function (a) {
    for (var b = 32, c = 0, d = Object.keys(a.attributes); c < d.length; c++) {
      var e = d[c], b = b + e.length, e = a.attributes[e];
      switch (typeof e) {
        case "string":
          b += e.length;
          break;
        default:
        case "number":
          b += 8
      }
    }
    a = a.geometry ? "mesh" === a.geometry.type ? 0 : w(a.geometry) : 0;
    return b + 12 * a
  };
  d.numVertices = w;
  d.hasVertices =
    function (a) {
      if (!a) return !1;
      switch (a.type) {
        case "extent":
        case "point":
          return !0;
        case "polyline":
          var b = 0;
          for (a = a.paths; b < a.length; b++) if (0 < a[b].length) return !0;
          return !1;
        case "polygon":
          b = 0;
          for (a = a.rings; b < a.length; b++) if (0 < a[b].length) return !0;
          return !1;
        case "multipoint":
          return 0 < a.points.length;
        case "mesh":
          return a.vertexAttributes && a.vertexAttributes.position && 0 < a.vertexAttributes.position.length;
        default:
          k.neverReached(a)
      }
    };
  d.computeAABB = A;
  d.expandAABB = function (a, b) {
    A(a, C);
    g.expand(b, C)
  };
  d.computeAABR =
    B;
  d.expandAABR = function (a, b) {
    B(a, D);
    h.expand(b, D)
  };
  var C = g.create(), D = h.create()
});
