!function (t, e) {
    // debugger;
    "object" == typeof exports && "object" == typeof module ? module.exports = e(require("plugins/echarts/echarts.min")) : "function" == typeof define && define.amd ? define(["plugins/Echarts"], e) : "object" == typeof exports ? exports["echarts-liquidfill"] = e(require("plugins/echarts/echarts.min")) : t["echarts-liquidfill"] = e(t.echarts)
}(this, function (t) {
    return function (t) {
        window.echarts = t;
        function e(n) {
            if (r[n]) return r[n].exports;
            var i = r[n] = {exports: {}, id: n, loaded: !1};
            return t[n].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
        }

        var r = {};
        return e.m = t, e.c = r, e.p = "", e(0)
    }([function (t, e, r) {
        t.exports = r(74)
    }, function (t, e) {
        function r(t, e) {
            "createCanvas" === t && (K = null), Z[t] = e
        }

        function n(t) {
            if (null == t || "object" != typeof t) return t;
            var e = t, r = j.call(t);
            if ("[object Array]" === r) {
                if (!F(t)) {
                    e = [];
                    for (var i = 0, a = t.length; i < a; i++) e[i] = n(t[i])
                }
            } else if (H[r]) {
                if (!F(t)) {
                    var o = t.constructor;
                    if (t.constructor.from) e = o.from(t); else {
                        e = new o(t.length);
                        for (var i = 0, a = t.length; i < a; i++) e[i] = n(t[i])
                    }
                }
            } else if (!N[r] && !F(t) && !k(t)) {
                e = {};
                for (var s in t) t.hasOwnProperty(s) && (e[s] = n(t[s]))
            }
            return e
        }

        function i(t, e, r) {
            if (!S(e) || !S(t)) return r ? n(e) : t;
            for (var a in e) if (e.hasOwnProperty(a)) {
                var o = t[a], s = e[a];
                !S(s) || !S(o) || _(s) || _(o) || k(s) || k(o) || T(s) || T(o) || F(s) || F(o) ? !r && a in t || (t[a] = n(e[a], !0)) : i(o, s, r)
            }
            return t
        }

        function a(t, e) {
            for (var r = t[0], n = 1, a = t.length; n < a; n++) r = i(r, t[n], e);
            return r
        }

        function o(t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            return t
        }

        function s(t, e, r) {
            for (var n in e) e.hasOwnProperty(n) && (r ? null != e[n] : null == t[n]) && (t[n] = e[n]);
            return t
        }

        function l() {
            return K || (K = $().getContext("2d")), K
        }

        function h(t, e) {
            if (t) {
                if (t.indexOf) return t.indexOf(e);
                for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return r
            }
            return -1
        }

        function u(t, e) {
            function r() {
            }

            var n = t.prototype;
            r.prototype = e.prototype, t.prototype = new r;
            for (var i in n) t.prototype[i] = n[i];
            t.prototype.constructor = t, t.superClass = e
        }

        function c(t, e, r) {
            t = "prototype" in t ? t.prototype : t, e = "prototype" in e ? e.prototype : e, s(t, e, r)
        }

        function f(t) {
            if (t) return "string" != typeof t && "number" == typeof t.length
        }

        function d(t, e, r) {
            if (t && e) if (t.forEach && t.forEach === U) t.forEach(e, r); else if (t.length === +t.length) for (var n = 0, i = t.length; n < i; n++) e.call(r, t[n], n, t); else for (var a in t) t.hasOwnProperty(a) && e.call(r, t[a], a, t)
        }

        function p(t, e, r) {
            if (t && e) {
                if (t.map && t.map === X) return t.map(e, r);
                for (var n = [], i = 0, a = t.length; i < a; i++) n.push(e.call(r, t[i], i, t));
                return n
            }
        }

        function v(t, e, r, n) {
            if (t && e) {
                if (t.reduce && t.reduce === Q) return t.reduce(e, r, n);
                for (var i = 0, a = t.length; i < a; i++) r = e.call(n, r, t[i], i, t);
                return r
            }
        }

        function g(t, e, r) {
            if (t && e) {
                if (t.filter && t.filter === V) return t.filter(e, r);
                for (var n = [], i = 0, a = t.length; i < a; i++) e.call(r, t[i], i, t) && n.push(t[i]);
                return n
            }
        }

        function y(t, e, r) {
            if (t && e) for (var n = 0, i = t.length; n < i; n++) if (e.call(r, t[n], n, t)) return t[n]
        }

        function m(t, e) {
            var r = G.call(arguments, 2);
            return function () {
                return t.apply(e, r.concat(G.call(arguments)))
            }
        }

        function x(t) {
            var e = G.call(arguments, 1);
            return function () {
                return t.apply(this, e.concat(G.call(arguments)))
            }
        }

        function _(t) {
            return "[object Array]" === j.call(t)
        }

        function w(t) {
            return "function" == typeof t
        }

        function b(t) {
            return "[object String]" === j.call(t)
        }

        function S(t) {
            var e = typeof t;
            return "function" === e || !!t && "object" == e
        }

        function T(t) {
            return !!N[j.call(t)]
        }

        function M(t) {
            return !!H[j.call(t)]
        }

        function k(t) {
            return "object" == typeof t && "number" == typeof t.nodeType && "object" == typeof t.ownerDocument
        }

        function C(t) {
            return t !== t
        }

        function P(t) {
            for (var e = 0, r = arguments.length; e < r; e++) if (null != arguments[e]) return arguments[e]
        }

        function A(t, e) {
            return null != t ? t : e
        }

        function O(t, e, r) {
            return null != t ? t : null != e ? e : r
        }

        function D() {
            return Function.call.apply(G, arguments)
        }

        function I(t) {
            if ("number" == typeof t) return [t, t, t, t];
            var e = t.length;
            return 2 === e ? [t[0], t[1], t[0], t[1]] : 3 === e ? [t[0], t[1], t[2], t[1]] : t
        }

        function R(t, e) {
            if (!t) throw new Error(e)
        }

        function B(t) {
            return null == t ? null : "function" == typeof t.trim ? t.trim() : t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
        }

        function L(t) {
            t[J] = !0
        }

        function F(t) {
            return t[J]
        }

        function E(t) {
            function e(t, e) {
                r ? n.set(t, e) : n.set(e, t)
            }

            var r = _(t), n = this;
            t instanceof E ? t.each(e) : t && d(t, e)
        }

        function W(t) {
            return new E(t)
        }

        function z(t, e) {
            for (var r = new t.constructor(t.length + e.length), n = 0; n < t.length; n++) r[n] = t[n];
            var i = t.length;
            for (n = 0; n < e.length; n++) r[n + i] = e[n];
            return r
        }

        function q() {
        }

        var N = {
                "[object Function]": 1,
                "[object RegExp]": 1,
                "[object Date]": 1,
                "[object Error]": 1,
                "[object CanvasGradient]": 1,
                "[object CanvasPattern]": 1,
                "[object Image]": 1,
                "[object Canvas]": 1
            }, H = {
                "[object Int8Array]": 1,
                "[object Uint8Array]": 1,
                "[object Uint8ClampedArray]": 1,
                "[object Int16Array]": 1,
                "[object Uint16Array]": 1,
                "[object Int32Array]": 1,
                "[object Uint32Array]": 1,
                "[object Float32Array]": 1,
                "[object Float64Array]": 1
            }, j = Object.prototype.toString, Y = Array.prototype, U = Y.forEach, V = Y.filter, G = Y.slice, X = Y.map,
            Q = Y.reduce, Z = {}, $ = function () {
                return Z.createCanvas()
            };
        Z.createCanvas = function () {
            return document.createElement("canvas")
        };
        var K, J = "__ec_primitive__";
        E.prototype = {
            constructor: E, get: function (t) {
                return this.hasOwnProperty(t) ? this[t] : null
            }, set: function (t, e) {
                return this[t] = e
            }, each: function (t, e) {
                void 0 !== e && (t = m(t, e));
                for (var r in this) this.hasOwnProperty(r) && t(this[r], r)
            }, removeKey: function (t) {
                delete this[t]
            }
        }, e.$override = r, e.clone = n, e.merge = i, e.mergeAll = a, e.extend = o, e.defaults = s, e.createCanvas = $, e.getContext = l, e.indexOf = h, e.inherits = u, e.mixin = c, e.isArrayLike = f, e.each = d, e.map = p, e.reduce = v, e.filter = g, e.find = y, e.bind = m, e.curry = x, e.isArray = _, e.isFunction = w, e.isString = b, e.isObject = S, e.isBuiltInObject = T, e.isTypedArray = M, e.isDom = k, e.eqNaN = C, e.retrieve = P, e.retrieve2 = A, e.retrieve3 = O, e.slice = D, e.normalizeCssArray = I, e.assert = R, e.trim = B, e.setAsPrimitive = L, e.isPrimitive = F, e.createHashMap = W, e.concatArray = z, e.noop = q
    }, function (t, e, r) {
        function n(t) {
            i.call(this, t), this.path = null
        }

        var i = r(8), a = r(1), o = r(7), s = r(41), l = r(53), h = l.prototype.getCanvasPattern, u = Math.abs,
            c = new o(!0);
        n.prototype = {
            constructor: n,
            type: "path",
            __dirtyPath: !0,
            strokeContainThreshold: 5,
            brush: function (t, e) {
                var r = this.style, n = this.path || c, i = r.hasStroke(), a = r.hasFill(), o = r.fill, s = r.stroke,
                    l = a && !!o.colorStops, u = i && !!s.colorStops, f = a && !!o.image, d = i && !!s.image;
                if (r.bind(t, this, e), this.setTransform(t), this.__dirty) {
                    var p;
                    l && (p = p || this.getBoundingRect(), this._fillGradient = r.getGradient(t, o, p)), u && (p = p || this.getBoundingRect(), this._strokeGradient = r.getGradient(t, s, p))
                }
                l ? t.fillStyle = this._fillGradient : f && (t.fillStyle = h.call(o, t)), u ? t.strokeStyle = this._strokeGradient : d && (t.strokeStyle = h.call(s, t));
                var v = r.lineDash, g = r.lineDashOffset, y = !!t.setLineDash, m = this.getGlobalScale();
                n.setScale(m[0], m[1]), this.__dirtyPath || v && !y && i ? (n.beginPath(t), v && !y && (n.setLineDash(v), n.setLineDashOffset(g)), this.buildPath(n, this.shape, !1), this.path && (this.__dirtyPath = !1)) : (t.beginPath(), this.path.rebuildPath(t)), a && n.fill(t), v && y && (t.setLineDash(v), t.lineDashOffset = g), i && n.stroke(t), v && y && t.setLineDash([]), null != r.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()))
            },
            buildPath: function (t, e, r) {
            },
            createPathProxy: function () {
                this.path = new o
            },
            getBoundingRect: function () {
                var t = this._rect, e = this.style, r = !t;
                if (r) {
                    var n = this.path;
                    n || (n = this.path = new o), this.__dirtyPath && (n.beginPath(), this.buildPath(n, this.shape, !1)), t = n.getBoundingRect()
                }
                if (this._rect = t, e.hasStroke()) {
                    var i = this._rectWithStroke || (this._rectWithStroke = t.clone());
                    if (this.__dirty || r) {
                        i.copy(t);
                        var a = e.lineWidth, s = e.strokeNoScale ? this.getLineScale() : 1;
                        e.hasFill() || (a = Math.max(a, this.strokeContainThreshold || 4)), s > 1e-10 && (i.width += a / s, i.height += a / s, i.x -= a / s / 2, i.y -= a / s / 2)
                    }
                    return i
                }
                return t
            },
            contain: function (t, e) {
                var r = this.transformCoordToLocal(t, e), n = this.getBoundingRect(), i = this.style;
                if (t = r[0], e = r[1], n.contain(t, e)) {
                    var a = this.path.data;
                    if (i.hasStroke()) {
                        var o = i.lineWidth, l = i.strokeNoScale ? this.getLineScale() : 1;
                        if (l > 1e-10 && (i.hasFill() || (o = Math.max(o, this.strokeContainThreshold)), s.containStroke(a, o / l, t, e))) return !0
                    }
                    if (i.hasFill()) return s.contain(a, t, e)
                }
                return !1
            },
            dirty: function (t) {
                null == t && (t = !0), t && (this.__dirtyPath = t, this._rect = null), this.__dirty = !0, this.__zr && this.__zr.refresh(), this.__clipTarget && this.__clipTarget.dirty()
            },
            animateShape: function (t) {
                return this.animate("shape", t)
            },
            attrKV: function (t, e) {
                "shape" === t ? (this.setShape(e), this.__dirtyPath = !0, this._rect = null) : i.prototype.attrKV.call(this, t, e)
            },
            setShape: function (t, e) {
                var r = this.shape;
                if (r) {
                    if (a.isObject(t)) for (var n in t) t.hasOwnProperty(n) && (r[n] = t[n]); else r[t] = e;
                    this.dirty(!0)
                }
                return this
            },
            getLineScale: function () {
                var t = this.transform;
                return t && u(t[0] - 1) > 1e-10 && u(t[3] - 1) > 1e-10 ? Math.sqrt(u(t[0] * t[3] - t[2] * t[1])) : 1
            }
        }, n.extend = function (t) {
            var e = function (e) {
                n.call(this, e), t.style && this.style.extendFrom(t.style, !1);
                var r = t.shape;
                if (r) {
                    this.shape = this.shape || {};
                    var i = this.shape;
                    for (var a in r) !i.hasOwnProperty(a) && r.hasOwnProperty(a) && (i[a] = r[a])
                }
                t.init && t.init.call(this, e)
            };
            a.inherits(e, n);
            for (var r in t) "style" !== r && "shape" !== r && (e.prototype[r] = t[r]);
            return e
        }, a.inherits(n, i);
        var f = n;
        t.exports = f
    }, function (t, e) {
        function r(t, e) {
            var r = new S(2);
            return null == t && (t = 0), null == e && (e = 0), r[0] = t, r[1] = e, r
        }

        function n(t, e) {
            return t[0] = e[0], t[1] = e[1], t
        }

        function i(t) {
            var e = new S(2);
            return e[0] = t[0], e[1] = t[1], e
        }

        function a(t, e, r) {
            return t[0] = e, t[1] = r, t
        }

        function o(t, e, r) {
            return t[0] = e[0] + r[0], t[1] = e[1] + r[1], t
        }

        function s(t, e, r, n) {
            return t[0] = e[0] + r[0] * n, t[1] = e[1] + r[1] * n, t
        }

        function l(t, e, r) {
            return t[0] = e[0] - r[0], t[1] = e[1] - r[1], t
        }

        function h(t) {
            return Math.sqrt(u(t))
        }

        function u(t) {
            return t[0] * t[0] + t[1] * t[1]
        }

        function c(t, e, r) {
            return t[0] = e[0] * r[0], t[1] = e[1] * r[1], t
        }

        function f(t, e, r) {
            return t[0] = e[0] / r[0], t[1] = e[1] / r[1], t
        }

        function d(t, e) {
            return t[0] * e[0] + t[1] * e[1]
        }

        function p(t, e, r) {
            return t[0] = e[0] * r, t[1] = e[1] * r, t
        }

        function v(t, e) {
            var r = h(e);
            return 0 === r ? (t[0] = 0, t[1] = 0) : (t[0] = e[0] / r, t[1] = e[1] / r), t
        }

        function g(t, e) {
            return Math.sqrt((t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]))
        }

        function y(t, e) {
            return (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
        }

        function m(t, e) {
            return t[0] = -e[0], t[1] = -e[1], t
        }

        function x(t, e, r, n) {
            return t[0] = e[0] + n * (r[0] - e[0]), t[1] = e[1] + n * (r[1] - e[1]), t
        }

        function _(t, e, r) {
            var n = e[0], i = e[1];
            return t[0] = r[0] * n + r[2] * i + r[4], t[1] = r[1] * n + r[3] * i + r[5], t
        }

        function w(t, e, r) {
            return t[0] = Math.min(e[0], r[0]), t[1] = Math.min(e[1], r[1]), t
        }

        function b(t, e, r) {
            return t[0] = Math.max(e[0], r[0]), t[1] = Math.max(e[1], r[1]), t
        }

        var S = "undefined" == typeof Float32Array ? Array : Float32Array, T = h, M = u, k = g, C = y;
        e.create = r, e.copy = n, e.clone = i, e.set = a, e.add = o, e.scaleAndAdd = s, e.sub = l, e.len = h, e.length = T, e.lenSquare = u, e.lengthSquare = M, e.mul = c, e.div = f, e.dot = d, e.scale = p, e.normalize = v, e.distance = g, e.dist = k, e.distanceSquare = y, e.distSquare = C, e.negate = m, e.lerp = x, e.applyTransform = _, e.min = w, e.max = b
    }, function (t, e, r) {
        function n(t, e, r, n) {
            r < 0 && (t += r, r = -r), n < 0 && (e += n, n = -n), this.x = t, this.y = e, this.width = r, this.height = n
        }

        var i = r(3), a = r(10), o = i.applyTransform, s = Math.min, l = Math.max;
        n.prototype = {
            constructor: n, union: function (t) {
                var e = s(t.x, this.x), r = s(t.y, this.y);
                this.width = l(t.x + t.width, this.x + this.width) - e, this.height = l(t.y + t.height, this.y + this.height) - r, this.x = e, this.y = r
            }, applyTransform: function () {
                var t = [], e = [], r = [], n = [];
                return function (i) {
                    if (i) {
                        t[0] = r[0] = this.x, t[1] = n[1] = this.y, e[0] = n[0] = this.x + this.width, e[1] = r[1] = this.y + this.height, o(t, t, i), o(e, e, i), o(r, r, i), o(n, n, i), this.x = s(t[0], e[0], r[0], n[0]), this.y = s(t[1], e[1], r[1], n[1]);
                        var a = l(t[0], e[0], r[0], n[0]), h = l(t[1], e[1], r[1], n[1]);
                        this.width = a - this.x, this.height = h - this.y
                    }
                }
            }(), calculateTransform: function (t) {
                var e = this, r = t.width / e.width, n = t.height / e.height, i = a.create();
                return a.translate(i, i, [-e.x, -e.y]), a.scale(i, i, [r, n]), a.translate(i, i, [t.x, t.y]), i
            }, intersect: function (t) {
                if (!t) return !1;
                t instanceof n || (t = n.create(t));
                var e = this, r = e.x, i = e.x + e.width, a = e.y, o = e.y + e.height, s = t.x, l = t.x + t.width,
                    h = t.y, u = t.y + t.height;
                return !(i < s || l < r || o < h || u < a)
            }, contain: function (t, e) {
                var r = this;
                return t >= r.x && t <= r.x + r.width && e >= r.y && e <= r.y + r.height
            }, clone: function () {
                return new n(this.x, this.y, this.width, this.height)
            }, copy: function (t) {
                this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
            }, plain: function () {
                return {x: this.x, y: this.y, width: this.width, height: this.height}
            }
        }, n.create = function (t) {
            return new n(t.x, t.y, t.width, t.height)
        };
        var h = n;
        t.exports = h
    }, function (t, e, r) {
        function n(t) {
            return t > -b && t < b
        }

        function i(t) {
            return t > b || t < -b
        }

        function a(t, e, r, n, i) {
            var a = 1 - i;
            return a * a * (a * t + 3 * i * e) + i * i * (i * n + 3 * a * r)
        }

        function o(t, e, r, n, i) {
            var a = 1 - i;
            return 3 * (((e - t) * a + 2 * (r - e) * i) * a + (n - r) * i * i)
        }

        function s(t, e, r, i, a, o) {
            var s = i + 3 * (e - r) - t, l = 3 * (r - 2 * e + t), h = 3 * (e - t), u = t - a, c = l * l - 3 * s * h,
                f = l * h - 9 * s * u, d = h * h - 3 * l * u, p = 0;
            if (n(c) && n(f)) if (n(l)) o[0] = 0; else {
                var v = -h / l;
                v >= 0 && v <= 1 && (o[p++] = v)
            } else {
                var g = f * f - 4 * c * d;
                if (n(g)) {
                    var y = f / c, v = -l / s + y, m = -y / 2;
                    v >= 0 && v <= 1 && (o[p++] = v), m >= 0 && m <= 1 && (o[p++] = m)
                } else if (g > 0) {
                    var x = w(g), b = c * l + 1.5 * s * (-f + x), S = c * l + 1.5 * s * (-f - x);
                    b = b < 0 ? -_(-b, M) : _(b, M), S = S < 0 ? -_(-S, M) : _(S, M);
                    var v = (-l - (b + S)) / (3 * s);
                    v >= 0 && v <= 1 && (o[p++] = v)
                } else {
                    var k = (2 * c * l - 3 * s * f) / (2 * w(c * c * c)), C = Math.acos(k) / 3, P = w(c),
                        A = Math.cos(C), v = (-l - 2 * P * A) / (3 * s), m = (-l + P * (A + T * Math.sin(C))) / (3 * s),
                        O = (-l + P * (A - T * Math.sin(C))) / (3 * s);
                    v >= 0 && v <= 1 && (o[p++] = v), m >= 0 && m <= 1 && (o[p++] = m), O >= 0 && O <= 1 && (o[p++] = O)
                }
            }
            return p
        }

        function l(t, e, r, a, o) {
            var s = 6 * r - 12 * e + 6 * t, l = 9 * e + 3 * a - 3 * t - 9 * r, h = 3 * e - 3 * t, u = 0;
            if (n(l)) {
                if (i(s)) {
                    var c = -h / s;
                    c >= 0 && c <= 1 && (o[u++] = c)
                }
            } else {
                var f = s * s - 4 * l * h;
                if (n(f)) o[0] = -s / (2 * l); else if (f > 0) {
                    var d = w(f), c = (-s + d) / (2 * l), p = (-s - d) / (2 * l);
                    c >= 0 && c <= 1 && (o[u++] = c), p >= 0 && p <= 1 && (o[u++] = p)
                }
            }
            return u
        }

        function h(t, e, r, n, i, a) {
            var o = (e - t) * i + t, s = (r - e) * i + e, l = (n - r) * i + r, h = (s - o) * i + o, u = (l - s) * i + s,
                c = (u - h) * i + h;
            a[0] = t, a[1] = o, a[2] = h, a[3] = c, a[4] = c, a[5] = u, a[6] = l, a[7] = n
        }

        function u(t, e, r, n, i, o, s, l, h, u, c) {
            var f, d, p, v, g, y = .005, m = 1 / 0;
            k[0] = h, k[1] = u;
            for (var _ = 0; _ < 1; _ += .05) C[0] = a(t, r, i, s, _), C[1] = a(e, n, o, l, _), v = x(k, C), v < m && (f = _, m = v);
            m = 1 / 0;
            for (var b = 0; b < 32 && !(y < S); b++) d = f - y, p = f + y, C[0] = a(t, r, i, s, d), C[1] = a(e, n, o, l, d), v = x(C, k), d >= 0 && v < m ? (f = d, m = v) : (P[0] = a(t, r, i, s, p), P[1] = a(e, n, o, l, p), g = x(P, k), p <= 1 && g < m ? (f = p, m = g) : y *= .5);
            return c && (c[0] = a(t, r, i, s, f), c[1] = a(e, n, o, l, f)), w(m)
        }

        function c(t, e, r, n) {
            var i = 1 - n;
            return i * (i * t + 2 * n * e) + n * n * r
        }

        function f(t, e, r, n) {
            return 2 * ((1 - n) * (e - t) + n * (r - e))
        }

        function d(t, e, r, a, o) {
            var s = t - 2 * e + r, l = 2 * (e - t), h = t - a, u = 0;
            if (n(s)) {
                if (i(l)) {
                    var c = -h / l;
                    c >= 0 && c <= 1 && (o[u++] = c)
                }
            } else {
                var f = l * l - 4 * s * h;
                if (n(f)) {
                    var c = -l / (2 * s);
                    c >= 0 && c <= 1 && (o[u++] = c)
                } else if (f > 0) {
                    var d = w(f), c = (-l + d) / (2 * s), p = (-l - d) / (2 * s);
                    c >= 0 && c <= 1 && (o[u++] = c), p >= 0 && p <= 1 && (o[u++] = p)
                }
            }
            return u
        }

        function p(t, e, r) {
            var n = t + r - 2 * e;
            return 0 === n ? .5 : (t - e) / n
        }

        function v(t, e, r, n, i) {
            var a = (e - t) * n + t, o = (r - e) * n + e, s = (o - a) * n + a;
            i[0] = t, i[1] = a, i[2] = s, i[3] = s, i[4] = o, i[5] = r
        }

        function g(t, e, r, n, i, a, o, s, l) {
            var h, u = .005, f = 1 / 0;
            k[0] = o, k[1] = s;
            for (var d = 0; d < 1; d += .05) {
                C[0] = c(t, r, i, d), C[1] = c(e, n, a, d);
                var p = x(k, C);
                p < f && (h = d, f = p)
            }
            f = 1 / 0;
            for (var v = 0; v < 32 && !(u < S); v++) {
                var g = h - u, y = h + u;
                C[0] = c(t, r, i, g), C[1] = c(e, n, a, g);
                var p = x(C, k);
                if (g >= 0 && p < f) h = g, f = p; else {
                    P[0] = c(t, r, i, y), P[1] = c(e, n, a, y);
                    var m = x(P, k);
                    y <= 1 && m < f ? (h = y, f = m) : u *= .5
                }
            }
            return l && (l[0] = c(t, r, i, h), l[1] = c(e, n, a, h)), w(f)
        }

        var y = r(3), m = y.create, x = y.distSquare, _ = Math.pow, w = Math.sqrt, b = 1e-8, S = 1e-4, T = w(3),
            M = 1 / 3, k = m(), C = m(), P = m();
        e.cubicAt = a, e.cubicDerivativeAt = o, e.cubicRootAt = s, e.cubicExtrema = l, e.cubicSubdivide = h, e.cubicProjectPoint = u, e.quadraticAt = c, e.quadraticDerivativeAt = f, e.quadraticRootAt = d, e.quadraticExtremum = p, e.quadraticSubdivide = v, e.quadraticProjectPoint = g
    }, function (t, e) {
        (function (t) {
            var r;
            "undefined" != typeof window ? r = window.__DEV__ : "undefined" != typeof t && (r = t.__DEV__), "undefined" == typeof r && (r = !0);
            var n = r;
            e.__DEV__ = n
        }).call(e, function () {
            return this
        }())
    }, function (t, e, r) {
        var n = r(5), i = r(3), a = r(45), o = r(4), s = r(16), l = s.devicePixelRatio,
            h = {M: 1, L: 2, C: 3, Q: 4, A: 5, Z: 6, R: 7}, u = [], c = [], f = [], d = [], p = Math.min, v = Math.max,
            g = Math.cos, y = Math.sin, m = Math.sqrt, x = Math.abs, _ = "undefined" != typeof Float32Array,
            w = function (t) {
                this._saveData = !t, this._saveData && (this.data = []), this._ctx = null
            };
        w.prototype = {
            constructor: w,
            _xi: 0,
            _yi: 0,
            _x0: 0,
            _y0: 0,
            _ux: 0,
            _uy: 0,
            _len: 0,
            _lineDash: null,
            _dashOffset: 0,
            _dashIdx: 0,
            _dashSum: 0,
            setScale: function (t, e) {
                this._ux = x(1 / l / t) || 0, this._uy = x(1 / l / e) || 0
            },
            getContext: function () {
                return this._ctx
            },
            beginPath: function (t) {
                return this._ctx = t, t && t.beginPath(), t && (this.dpr = t.dpr), this._saveData && (this._len = 0), this._lineDash && (this._lineDash = null, this._dashOffset = 0), this
            },
            moveTo: function (t, e) {
                return this.addData(h.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this
            },
            lineTo: function (t, e) {
                var r = x(t - this._xi) > this._ux || x(e - this._yi) > this._uy || this._len < 5;
                return this.addData(h.L, t, e), this._ctx && r && (this._needsDash() ? this._dashedLineTo(t, e) : this._ctx.lineTo(t, e)), r && (this._xi = t, this._yi = e), this
            },
            bezierCurveTo: function (t, e, r, n, i, a) {
                return this.addData(h.C, t, e, r, n, i, a), this._ctx && (this._needsDash() ? this._dashedBezierTo(t, e, r, n, i, a) : this._ctx.bezierCurveTo(t, e, r, n, i, a)), this._xi = i, this._yi = a, this
            },
            quadraticCurveTo: function (t, e, r, n) {
                return this.addData(h.Q, t, e, r, n), this._ctx && (this._needsDash() ? this._dashedQuadraticTo(t, e, r, n) : this._ctx.quadraticCurveTo(t, e, r, n)), this._xi = r, this._yi = n, this
            },
            arc: function (t, e, r, n, i, a) {
                return this.addData(h.A, t, e, r, r, n, i - n, 0, a ? 0 : 1), this._ctx && this._ctx.arc(t, e, r, n, i, a), this._xi = g(i) * r + t, this._yi = y(i) * r + t, this
            },
            arcTo: function (t, e, r, n, i) {
                return this._ctx && this._ctx.arcTo(t, e, r, n, i), this
            },
            rect: function (t, e, r, n) {
                return this._ctx && this._ctx.rect(t, e, r, n), this.addData(h.R, t, e, r, n), this
            },
            closePath: function () {
                this.addData(h.Z);
                var t = this._ctx, e = this._x0, r = this._y0;
                return t && (this._needsDash() && this._dashedLineTo(e, r), t.closePath()), this._xi = e, this._yi = r, this
            },
            fill: function (t) {
                t && t.fill(), this.toStatic()
            },
            stroke: function (t) {
                t && t.stroke(), this.toStatic()
            },
            setLineDash: function (t) {
                if (t instanceof Array) {
                    this._lineDash = t, this._dashIdx = 0;
                    for (var e = 0, r = 0; r < t.length; r++) e += t[r];
                    this._dashSum = e
                }
                return this
            },
            setLineDashOffset: function (t) {
                return this._dashOffset = t, this
            },
            len: function () {
                return this._len
            },
            setData: function (t) {
                var e = t.length;
                this.data && this.data.length == e || !_ || (this.data = new Float32Array(e));
                for (var r = 0; r < e; r++) this.data[r] = t[r];
                this._len = e
            },
            appendPath: function (t) {
                t instanceof Array || (t = [t]);
                for (var e = t.length, r = 0, n = this._len, i = 0; i < e; i++) r += t[i].len();
                _ && this.data instanceof Float32Array && (this.data = new Float32Array(n + r));
                for (var i = 0; i < e; i++) for (var a = t[i].data, o = 0; o < a.length; o++) this.data[n++] = a[o];
                this._len = n
            },
            addData: function (t) {
                if (this._saveData) {
                    var e = this.data;
                    this._len + arguments.length > e.length && (this._expandData(), e = this.data);
                    for (var r = 0; r < arguments.length; r++) e[this._len++] = arguments[r];
                    this._prevCmd = t
                }
            },
            _expandData: function () {
                if (!(this.data instanceof Array)) {
                    for (var t = [], e = 0; e < this._len; e++) t[e] = this.data[e];
                    this.data = t
                }
            },
            _needsDash: function () {
                return this._lineDash
            },
            _dashedLineTo: function (t, e) {
                var r, n, i = this._dashSum, a = this._dashOffset, o = this._lineDash, s = this._ctx, l = this._xi,
                    h = this._yi, u = t - l, c = e - h, f = m(u * u + c * c), d = l, g = h, y = o.length;
                for (u /= f, c /= f, a < 0 && (a = i + a), a %= i, d -= a * u, g -= a * c; u > 0 && d <= t || u < 0 && d >= t || 0 == u && (c > 0 && g <= e || c < 0 && g >= e);) n = this._dashIdx, r = o[n], d += u * r, g += c * r, this._dashIdx = (n + 1) % y, u > 0 && d < l || u < 0 && d > l || c > 0 && g < h || c < 0 && g > h || s[n % 2 ? "moveTo" : "lineTo"](u >= 0 ? p(d, t) : v(d, t), c >= 0 ? p(g, e) : v(g, e));
                u = d - t, c = g - e, this._dashOffset = -m(u * u + c * c)
            },
            _dashedBezierTo: function (t, e, r, i, a, o) {
                var s, l, h, u, c, f = this._dashSum, d = this._dashOffset, p = this._lineDash, v = this._ctx,
                    g = this._xi, y = this._yi, x = n.cubicAt, _ = 0, w = this._dashIdx, b = p.length, S = 0;
                for (d < 0 && (d = f + d), d %= f, s = 0; s < 1; s += .1) l = x(g, t, r, a, s + .1) - x(g, t, r, a, s), h = x(y, e, i, o, s + .1) - x(y, e, i, o, s), _ += m(l * l + h * h);
                for (; w < b && (S += p[w], !(S > d)); w++) ;
                for (s = (S - d) / _; s <= 1;) u = x(g, t, r, a, s), c = x(y, e, i, o, s), w % 2 ? v.moveTo(u, c) : v.lineTo(u, c), s += p[w] / _, w = (w + 1) % b;
                w % 2 !== 0 && v.lineTo(a, o), l = a - u, h = o - c, this._dashOffset = -m(l * l + h * h)
            },
            _dashedQuadraticTo: function (t, e, r, n) {
                var i = r, a = n;
                r = (r + 2 * t) / 3, n = (n + 2 * e) / 3, t = (this._xi + 2 * t) / 3, e = (this._yi + 2 * e) / 3, this._dashedBezierTo(t, e, r, n, i, a)
            },
            toStatic: function () {
                var t = this.data;
                t instanceof Array && (t.length = this._len, _ && (this.data = new Float32Array(t)))
            },
            getBoundingRect: function () {
                u[0] = u[1] = f[0] = f[1] = Number.MAX_VALUE, c[0] = c[1] = d[0] = d[1] = -Number.MAX_VALUE;
                for (var t = this.data, e = 0, r = 0, n = 0, s = 0, l = 0; l < t.length;) {
                    var p = t[l++];
                    switch (1 == l && (e = t[l], r = t[l + 1], n = e, s = r), p) {
                        case h.M:
                            n = t[l++], s = t[l++], e = n, r = s, f[0] = n, f[1] = s, d[0] = n, d[1] = s;
                            break;
                        case h.L:
                            a.fromLine(e, r, t[l], t[l + 1], f, d), e = t[l++], r = t[l++];
                            break;
                        case h.C:
                            a.fromCubic(e, r, t[l++], t[l++], t[l++], t[l++], t[l], t[l + 1], f, d), e = t[l++], r = t[l++];
                            break;
                        case h.Q:
                            a.fromQuadratic(e, r, t[l++], t[l++], t[l], t[l + 1], f, d), e = t[l++], r = t[l++];
                            break;
                        case h.A:
                            var v = t[l++], m = t[l++], x = t[l++], _ = t[l++], w = t[l++], b = t[l++] + w,
                                S = (t[l++], 1 - t[l++]);
                            1 == l && (n = g(w) * x + v, s = y(w) * _ + m), a.fromArc(v, m, x, _, w, b, S, f, d), e = g(b) * x + v, r = y(b) * _ + m;
                            break;
                        case h.R:
                            n = e = t[l++], s = r = t[l++];
                            var T = t[l++], M = t[l++];
                            a.fromLine(n, s, n + T, s + M, f, d);
                            break;
                        case h.Z:
                            e = n, r = s
                    }
                    i.min(u, u, f), i.max(c, c, d)
                }
                return 0 === l && (u[0] = u[1] = c[0] = c[1] = 0), new o(u[0], u[1], c[0] - u[0], c[1] - u[1])
            },
            rebuildPath: function (t) {
                for (var e, r, n, i, a, o, s = this.data, l = this._ux, u = this._uy, c = this._len, f = 0; f < c;) {
                    var d = s[f++];
                    switch (1 == f && (n = s[f], i = s[f + 1], e = n, r = i), d) {
                        case h.M:
                            e = n = s[f++], r = i = s[f++], t.moveTo(n, i);
                            break;
                        case h.L:
                            a = s[f++], o = s[f++], (x(a - n) > l || x(o - i) > u || f === c - 1) && (t.lineTo(a, o), n = a, i = o);
                            break;
                        case h.C:
                            t.bezierCurveTo(s[f++], s[f++], s[f++], s[f++], s[f++], s[f++]), n = s[f - 2], i = s[f - 1];
                            break;
                        case h.Q:
                            t.quadraticCurveTo(s[f++], s[f++], s[f++], s[f++]), n = s[f - 2], i = s[f - 1];
                            break;
                        case h.A:
                            var p = s[f++], v = s[f++], m = s[f++], _ = s[f++], w = s[f++], b = s[f++], S = s[f++],
                                T = s[f++], M = m > _ ? m : _, k = m > _ ? 1 : m / _, C = m > _ ? _ / m : 1,
                                P = Math.abs(m - _) > .001, A = w + b;
                            P ? (t.translate(p, v), t.rotate(S), t.scale(k, C), t.arc(0, 0, M, w, A, 1 - T), t.scale(1 / k, 1 / C), t.rotate(-S), t.translate(-p, -v)) : t.arc(p, v, M, w, A, 1 - T), 1 == f && (e = g(w) * m + p, r = y(w) * _ + v), n = g(A) * m + p, i = y(A) * _ + v;
                            break;
                        case h.R:
                            e = n = s[f], r = i = s[f + 1], t.rect(s[f++], s[f++], s[f++], s[f++]);
                            break;
                        case h.Z:
                            t.closePath(), n = e, i = r
                    }
                }
            }
        }, w.CMD = h;
        var b = w;
        t.exports = b
    }, function (t, e, r) {
        function n(t) {
            t = t || {}, o.call(this, t);
            for (var e in t) t.hasOwnProperty(e) && "style" !== e && (this[e] = t[e]);
            this.style = new a(t.style, this), this._rect = null, this.__clipPaths = []
        }

        var i = r(1), a = r(55), o = r(15), s = r(60);
        n.prototype = {
            constructor: n,
            type: "displayable",
            __dirty: !0,
            invisible: !1,
            z: 0,
            z2: 0,
            zlevel: 0,
            draggable: !1,
            dragging: !1,
            silent: !1,
            culling: !1,
            cursor: "pointer",
            rectHover: !1,
            progressive: !1,
            incremental: !1,
            inplace: !1,
            beforeBrush: function (t) {
            },
            afterBrush: function (t) {
            },
            brush: function (t, e) {
            },
            getBoundingRect: function () {
            },
            contain: function (t, e) {
                return this.rectContain(t, e)
            },
            traverse: function (t, e) {
                t.call(e, this)
            },
            rectContain: function (t, e) {
                var r = this.transformCoordToLocal(t, e), n = this.getBoundingRect();
                return n.contain(r[0], r[1])
            },
            dirty: function () {
                this.__dirty = !0, this._rect = null, this.__zr && this.__zr.refresh()
            },
            animateStyle: function (t) {
                return this.animate("style", t)
            },
            attrKV: function (t, e) {
                "style" !== t ? o.prototype.attrKV.call(this, t, e) : this.style.set(e)
            },
            setStyle: function (t, e) {
                return this.style.set(t, e), this.dirty(!1), this
            },
            useStyle: function (t) {
                return this.style = new a(t, this), this.dirty(!1), this
            }
        }, i.inherits(n, o), i.mixin(n, s);
        var l = n;
        t.exports = l
    }, function (e, r) {
        e.exports = t
    }, function (t, e) {
        function r() {
            var t = new c(6);
            return n(t), t
        }

        function n(t) {
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
        }

        function i(t, e) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
        }

        function a(t, e, r) {
            var n = e[0] * r[0] + e[2] * r[1], i = e[1] * r[0] + e[3] * r[1], a = e[0] * r[2] + e[2] * r[3],
                o = e[1] * r[2] + e[3] * r[3], s = e[0] * r[4] + e[2] * r[5] + e[4],
                l = e[1] * r[4] + e[3] * r[5] + e[5];
            return t[0] = n, t[1] = i, t[2] = a, t[3] = o, t[4] = s, t[5] = l, t
        }

        function o(t, e, r) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4] + r[0], t[5] = e[5] + r[1], t
        }

        function s(t, e, r) {
            var n = e[0], i = e[2], a = e[4], o = e[1], s = e[3], l = e[5], h = Math.sin(r), u = Math.cos(r);
            return t[0] = n * u + o * h, t[1] = -n * h + o * u, t[2] = i * u + s * h, t[3] = -i * h + u * s, t[4] = u * a + h * l, t[5] = u * l - h * a, t
        }

        function l(t, e, r) {
            var n = r[0], i = r[1];
            return t[0] = e[0] * n, t[1] = e[1] * i, t[2] = e[2] * n, t[3] = e[3] * i, t[4] = e[4] * n, t[5] = e[5] * i, t
        }

        function h(t, e) {
            var r = e[0], n = e[2], i = e[4], a = e[1], o = e[3], s = e[5], l = r * o - a * n;
            return l ? (l = 1 / l, t[0] = o * l, t[1] = -a * l, t[2] = -n * l, t[3] = r * l, t[4] = (n * s - o * i) * l, t[5] = (a * i - r * s) * l, t) : null
        }

        function u(t) {
            var e = r();
            return i(e, t), e
        }

        var c = "undefined" == typeof Float32Array ? Array : Float32Array;
        e.create = r, e.identity = n, e.copy = i, e.mul = a, e.translate = o, e.rotate = s, e.scale = l, e.invert = h, e.clone = u
    }, function (t, e, r) {
        function n(t) {
            if ("string" == typeof t) {
                var e = l.get(t);
                return e && e.image
            }
            return t
        }

        function i(t, e, r, n, i) {
            if (t) {
                if ("string" == typeof t) {
                    if (e && e.__zrImageSrc === t || !r) return e;
                    var s = l.get(t), h = {hostEl: r, cb: n, cbPayload: i};
                    return s ? (e = s.image, !o(e) && s.pending.push(h)) : (!e && (e = new Image), e.onload = a, l.put(t, e.__cachedImgObj = {
                        image: e,
                        pending: [h]
                    }), e.src = e.__zrImageSrc = t), e
                }
                return t
            }
            return e
        }

        function a() {
            var t = this.__cachedImgObj;
            this.onload = this.__cachedImgObj = null;
            for (var e = 0; e < t.pending.length; e++) {
                var r = t.pending[e], n = r.cb;
                n && n(this, r.cbPayload), r.hostEl.dirty()
            }
            t.pending.length = 0
        }

        function o(t) {
            return t && t.width && t.height
        }

        var s = r(19), l = new s(50);
        e.findExistImage = n, e.createOrUpdateImage = i, e.isImageReady = o
    }, function (t, e, r) {
        function n(t) {
            this.fromDataset = t.fromDataset, this.data = t.data || (t.sourceFormat === p ? {} : []), this.sourceFormat = t.sourceFormat || f, this.seriesLayoutBy = t.seriesLayoutBy || c, this.dimensionsDefine = t.dimensionsDefine, this.encodeDefine = t.encodeDefine && a(t.encodeDefine), this.startIndex = t.startIndex || 0, this.dimensionsDetectCount = t.dimensionsDetectCount
        }

        var i = r(1), a = i.createHashMap, o = i.isTypedArray, s = r(31), l = s.enableClassCheck, h = r(13),
            u = h.SOURCE_FORMAT_ORIGINAL, c = h.SERIES_LAYOUT_BY_COLUMN, f = h.SOURCE_FORMAT_UNKNOWN,
            d = h.SOURCE_FORMAT_TYPED_ARRAY, p = h.SOURCE_FORMAT_KEYED_COLUMNS;
        n.seriesDataToSource = function (t) {
            return new n({data: t, sourceFormat: o(t) ? d : u, fromDataset: !1})
        }, l(n);
        var v = n;
        t.exports = v
    }, function (t, e) {
        var r = "original", n = "arrayRows", i = "objectRows", a = "keyedColumns", o = "unknown", s = "typedArray",
            l = "column", h = "row";
        e.SOURCE_FORMAT_ORIGINAL = r, e.SOURCE_FORMAT_ARRAY_ROWS = n, e.SOURCE_FORMAT_OBJECT_ROWS = i, e.SOURCE_FORMAT_KEYED_COLUMNS = a, e.SOURCE_FORMAT_UNKNOWN = o, e.SOURCE_FORMAT_TYPED_ARRAY = s, e.SERIES_LAYOUT_BY_COLUMN = l, e.SERIES_LAYOUT_BY_ROW = h
    }, function (t, e, r) {
        function n(t) {
            return t instanceof Array ? t : null == t ? [] : [t]
        }

        function i(t, e, r) {
            if (t) {
                t[e] = t[e] || {}, t.emphasis = t.emphasis || {}, t.emphasis[e] = t.emphasis[e] || {};
                for (var n = 0, i = r.length; n < i; n++) {
                    var a = r[n];
                    !t.emphasis[e].hasOwnProperty(a) && t[e].hasOwnProperty(a) && (t.emphasis[e][a] = t[e][a])
                }
            }
        }

        function a(t) {
            return !x(t) || _(t) || t instanceof Date ? t : t.value
        }

        function o(t) {
            return x(t) && !(t instanceof Array)
        }

        function s(t, e) {
            e = (e || []).slice();
            var r = y.map(t || [], function (t, e) {
                return {exist: t}
            });
            return m(e, function (t, n) {
                if (x(t)) {
                    for (var i = 0; i < r.length; i++) if (!r[i].option && null != t.id && r[i].exist.id === t.id + "") return r[i].option = t, void(e[n] = null);
                    for (var i = 0; i < r.length; i++) {
                        var a = r[i].exist;
                        if (!(r[i].option || null != a.id && null != t.id || null == t.name || h(t) || h(a) || a.name !== t.name + "")) return r[i].option = t, void(e[n] = null)
                    }
                }
            }), m(e, function (t, e) {
                if (x(t)) {
                    for (var n = 0; n < r.length; n++) {
                        var i = r[n].exist;
                        if (!r[n].option && !h(i) && null == t.id) {
                            r[n].option = t;
                            break
                        }
                    }
                    n >= r.length && r.push({option: t})
                }
            }), r
        }

        function l(t) {
            var e = y.createHashMap();
            m(t, function (t, r) {
                var n = t.exist;
                n && e.set(n.id, t)
            }), m(t, function (t, r) {
                var n = t.option;
                y.assert(!n || null == n.id || !e.get(n.id) || e.get(n.id) === t, "id duplicates: " + (n && n.id)), n && null != n.id && e.set(n.id, t), !t.keyInfo && (t.keyInfo = {})
            }), m(t, function (t, r) {
                var n = t.exist, i = t.option, a = t.keyInfo;
                if (x(i)) {
                    if (a.name = null != i.name ? i.name + "" : n ? n.name : w, n) a.id = n.id; else if (null != i.id) a.id = i.id + ""; else {
                        var o = 0;
                        do a.id = "\0" + a.name + "\0" + o++; while (e.get(a.id))
                    }
                    e.set(a.id, t)
                }
            })
        }

        function h(t) {
            return x(t) && t.id && 0 === (t.id + "").indexOf("\0_ec_\0")
        }

        function u(t, e) {
            function r(t, e, r) {
                for (var i = 0, a = t.length; i < a; i++) for (var o = t[i].seriesId, s = n(t[i].dataIndex), l = r && r[o], h = 0, u = s.length; h < u; h++) {
                    var c = s[h];
                    l && l[c] ? l[c] = null : (e[o] || (e[o] = {}))[c] = 1
                }
            }

            function i(t, e) {
                var r = [];
                for (var n in t) if (t.hasOwnProperty(n) && null != t[n]) if (e) r.push(+n); else {
                    var a = i(t[n], !0);
                    a.length && r.push({seriesId: n, dataIndex: a})
                }
                return r
            }

            var a = {}, o = {};
            return r(t || [], a), r(e || [], o, a), [i(a), i(o)]
        }

        function c(t, e) {
            return null != e.dataIndexInside ? e.dataIndexInside : null != e.dataIndex ? y.isArray(e.dataIndex) ? y.map(e.dataIndex, function (e) {
                return t.indexOfRawIndex(e)
            }) : t.indexOfRawIndex(e.dataIndex) : null != e.name ? y.isArray(e.name) ? y.map(e.name, function (e) {
                return t.indexOfName(e)
            }) : t.indexOfName(e.name) : void 0
        }

        function f() {
            var t = "__\0ec_inner_" + S++ + "_" + Math.random().toFixed(5);
            return function (e) {
                return e[t] || (e[t] = {})
            }
        }

        function d(t, e, r) {
            if (y.isString(e)) {
                var n = {};
                n[e + "Index"] = 0, e = n
            }
            var i = r && r.defaultMainType;
            !i || p(e, i + "Index") || p(e, i + "Id") || p(e, i + "Name") || (e[i + "Index"] = 0);
            var a = {};
            return m(e, function (n, i) {
                var n = e[i];
                if ("dataIndex" === i || "dataIndexInside" === i) return void(a[i] = n);
                var o = i.match(/^(\w+)(Index|Id|Name)$/) || [], s = o[1], l = (o[2] || "").toLowerCase();
                if (!(!s || !l || null == n || "index" === l && "none" === n || r && r.includeMainTypes && y.indexOf(r.includeMainTypes, s) < 0)) {
                    var h = {mainType: s};
                    "index" === l && "all" === n || (h[l] = n);
                    var u = t.queryComponents(h);
                    a[s + "Models"] = u, a[s + "Model"] = u[0]
                }
            }), a
        }

        function p(t, e) {
            return t && t.hasOwnProperty(e)
        }

        function v(t, e, r) {
            t.setAttribute ? t.setAttribute(e, r) : t[e] = r
        }

        function g(t, e) {
            return t.getAttribute ? t.getAttribute(e) : t[e]
        }

        var y = r(1), m = y.each, x = y.isObject, _ = y.isArray, w = "\0-",
            b = ["fontStyle", "fontWeight", "fontSize", "fontFamily", "rich", "tag", "color", "textBorderColor", "textBorderWidth", "width", "height", "lineHeight", "align", "verticalAlign", "baseline", "shadowColor", "shadowBlur", "shadowOffsetX", "shadowOffsetY", "textShadowColor", "textShadowBlur", "textShadowOffsetX", "textShadowOffsetY", "backgroundColor", "borderColor", "borderWidth", "borderRadius", "padding"],
            S = 0;
        e.DEFAULT_COMPONENT_NAME = w, e.normalizeToArray = n, e.defaultEmphasis = i, e.TEXT_STYLE_OPTIONS = b, e.getDataItemValue = a, e.isDataItemOption = o, e.mappingToExists = s, e.makeIdAndName = l, e.isIdInner = h, e.compressBatches = u, e.queryDataIndex = c, e.makeInner = f, e.parseFinder = d, e.setAttribute = v, e.getAttribute = g
    }, function (t, e, r) {
        var n = r(47), i = r(71), a = r(25), o = r(70), s = r(1), l = function (t) {
            a.call(this, t), i.call(this, t), o.call(this, t), this.id = t.id || n()
        };
        l.prototype = {
            type: "element",
            name: "",
            __zr: null,
            ignore: !1,
            clipPath: null,
            isGroup: !1,
            drift: function (t, e) {
                switch (this.draggable) {
                    case"horizontal":
                        e = 0;
                        break;
                    case"vertical":
                        t = 0
                }
                var r = this.transform;
                r || (r = this.transform = [1, 0, 0, 1, 0, 0]), r[4] += t, r[5] += e, this.decomposeTransform(), this.dirty(!1)
            },
            beforeUpdate: function () {
            },
            afterUpdate: function () {
            },
            update: function () {
                this.updateTransform()
            },
            traverse: function (t, e) {
            },
            attrKV: function (t, e) {
                if ("position" === t || "scale" === t || "origin" === t) {
                    if (e) {
                        var r = this[t];
                        r || (r = this[t] = []), r[0] = e[0], r[1] = e[1]
                    }
                } else this[t] = e
            },
            hide: function () {
                this.ignore = !0, this.__zr && this.__zr.refresh()
            },
            show: function () {
                this.ignore = !1, this.__zr && this.__zr.refresh()
            },
            attr: function (t, e) {
                if ("string" == typeof t) this.attrKV(t, e); else if (s.isObject(t)) for (var r in t) t.hasOwnProperty(r) && this.attrKV(r, t[r]);
                return this.dirty(!1), this
            },
            setClipPath: function (t) {
                var e = this.__zr;
                e && t.addSelfToZr(e), this.clipPath && this.clipPath !== t && this.removeClipPath(), this.clipPath = t, t.__zr = e, t.__clipTarget = this, this.dirty(!1)
            },
            removeClipPath: function () {
                var t = this.clipPath;
                t && (t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__clipTarget = null, this.clipPath = null, this.dirty(!1))
            },
            addSelfToZr: function (t) {
                this.__zr = t;
                var e = this.animators;
                if (e) for (var r = 0; r < e.length; r++) t.animation.addAnimator(e[r]);
                this.clipPath && this.clipPath.addSelfToZr(t)
            },
            removeSelfFromZr: function (t) {
                this.__zr = null;
                var e = this.animators;
                if (e) for (var r = 0; r < e.length; r++) t.animation.removeAnimator(e[r]);
                this.clipPath && this.clipPath.removeSelfFromZr(t)
            }
        }, s.mixin(l, o), s.mixin(l, a), s.mixin(l, i);
        var h = l;
        t.exports = h
    }, function (t, e) {
        var r = 1;
        "undefined" != typeof window && (r = Math.max(window.devicePixelRatio || 1, 1));
        var n = 0, i = r;
        e.debugMode = n, e.devicePixelRatio = i
    }, function (t, e, r) {
        function n(t, e) {
            B[t] = e
        }

        function i(t, e) {
            e = e || R;
            var r = t + ":" + e;
            if (A[r]) return A[r];
            for (var n = (t + "").split("\n"), i = 0, a = 0, o = n.length; a < o; a++) i = Math.max(g(n[a], e).width, i);
            return O > D && (O = 0, A = {}), O++, A[r] = i, i
        }

        function a(t, e, r, n, i, a, l) {
            return a ? s(t, e, r, n, i, a, l) : o(t, e, r, n, i, l)
        }

        function o(t, e, r, n, a, o) {
            var s = y(t, e, a, o), u = i(t, e);
            a && (u += a[1] + a[3]);
            var c = s.outerHeight, f = l(0, u, r), d = h(0, c, n), p = new w(f, d, u, c);
            return p.lineHeight = s.lineHeight, p
        }

        function s(t, e, r, n, i, a, o) {
            var s = m(t, {rich: a, truncate: o, font: e, textAlign: r, textPadding: i}), u = s.outerWidth,
                c = s.outerHeight, f = l(0, u, r), d = h(0, c, n);
            return new w(f, d, u, c)
        }

        function l(t, e, r) {
            return "right" === r ? t -= e : "center" === r && (t -= e / 2), t
        }

        function h(t, e, r) {
            return "middle" === r ? t -= e / 2 : "bottom" === r && (t -= e), t
        }

        function u(t, e, r) {
            var n = e.x, i = e.y, a = e.height, o = e.width, s = a / 2, l = "left", h = "top";
            switch (t) {
                case"left":
                    n -= r, i += s, l = "right", h = "middle";
                    break;
                case"right":
                    n += r + o, i += s, h = "middle";
                    break;
                case"top":
                    n += o / 2, i -= r, l = "center", h = "bottom";
                    break;
                case"bottom":
                    n += o / 2, i += a + r, l = "center";
                    break;
                case"inside":
                    n += o / 2, i += s, l = "center", h = "middle";
                    break;
                case"insideLeft":
                    n += r, i += s, h = "middle";
                    break;
                case"insideRight":
                    n += o - r, i += s, l = "right", h = "middle";
                    break;
                case"insideTop":
                    n += o / 2, i += r, l = "center";
                    break;
                case"insideBottom":
                    n += o / 2, i += a - r, l = "center", h = "bottom";
                    break;
                case"insideTopLeft":
                    n += r, i += r;
                    break;
                case"insideTopRight":
                    n += o - r, i += r, l = "right";
                    break;
                case"insideBottomLeft":
                    n += r, i += a - r, h = "bottom";
                    break;
                case"insideBottomRight":
                    n += o - r, i += a - r, l = "right", h = "bottom"
            }
            return {x: n, y: i, textAlign: l, textVerticalAlign: h}
        }

        function c(t, e, r, n, i) {
            if (!e) return "";
            var a = (t + "").split("\n");
            i = f(e, r, n, i);
            for (var o = 0, s = a.length; o < s; o++) a[o] = d(a[o], i);
            return a.join("\n")
        }

        function f(t, e, r, n) {
            n = M({}, n), n.font = e;
            var r = k(r, "...");
            n.maxIterations = k(n.maxIterations, 2);
            var a = n.minChar = k(n.minChar, 0);
            n.cnCharWidth = i("国", e);
            var o = n.ascCharWidth = i("a", e);
            n.placeholder = k(n.placeholder, "");
            for (var s = t = Math.max(0, t - 1), l = 0; l < a && s >= o; l++) s -= o;
            var h = i(r);
            return h > s && (r = "", h = 0), s = t - h, n.ellipsis = r, n.ellipsisWidth = h, n.contentWidth = s, n.containerWidth = t, n
        }

        function d(t, e) {
            var r = e.containerWidth, n = e.font, a = e.contentWidth;
            if (!r) return "";
            var o = i(t, n);
            if (o <= r) return t;
            for (var s = 0; ; s++) {
                if (o <= a || s >= e.maxIterations) {
                    t += e.ellipsis;
                    break
                }
                var l = 0 === s ? p(t, a, e.ascCharWidth, e.cnCharWidth) : o > 0 ? Math.floor(t.length * a / o) : 0;
                t = t.substr(0, l), o = i(t, n)
            }
            return "" === t && (t = e.placeholder), t
        }

        function p(t, e, r, n) {
            for (var i = 0, a = 0, o = t.length; a < o && i < e; a++) {
                var s = t.charCodeAt(a);
                i += 0 <= s && s <= 127 ? r : n
            }
            return a
        }

        function v(t) {
            return i("国", t)
        }

        function g(t, e) {
            return B.measureText(t, e)
        }

        function y(t, e, r, n) {
            null != t && (t += "");
            var i = v(e), a = t ? t.split("\n") : [], o = a.length * i, s = o;
            if (r && (s += r[0] + r[2]), t && n) {
                var l = n.outerHeight, h = n.outerWidth;
                if (null != l && s > l) t = "", a = []; else if (null != h) for (var u = f(h - (r ? r[1] + r[3] : 0), e, n.ellipsis, {
                    minChar: n.minChar,
                    placeholder: n.placeholder
                }), c = 0, p = a.length; c < p; c++) a[c] = d(a[c], u)
            }
            return {lines: a, height: o, outerHeight: s, lineHeight: i}
        }

        function m(t, e) {
            var r = {lines: [], width: 0, height: 0};
            if (null != t && (t += ""), !t) return r;
            for (var n, a = I.lastIndex = 0; null != (n = I.exec(t));) {
                var o = n.index;
                o > a && x(r, t.substring(a, o)), x(r, n[2], n[1]), a = I.lastIndex
            }
            a < t.length && x(r, t.substring(a, t.length));
            var s = r.lines, l = 0, h = 0, u = [], f = e.textPadding, d = e.truncate, p = d && d.outerWidth,
                g = d && d.outerHeight;
            f && (null != p && (p -= f[1] + f[3]), null != g && (g -= f[0] + f[2]));
            for (var y = 0; y < s.length; y++) {
                for (var m = s[y], _ = 0, w = 0, S = 0; S < m.tokens.length; S++) {
                    var T = m.tokens[S], M = T.styleName && e.rich[T.styleName] || {},
                        P = T.textPadding = M.textPadding, A = T.font = M.font || e.font,
                        O = T.textHeight = k(M.textHeight, v(A));
                    if (P && (O += P[0] + P[2]), T.height = O, T.lineHeight = C(M.textLineHeight, e.textLineHeight, O), T.textAlign = M && M.textAlign || e.textAlign, T.textVerticalAlign = M && M.textVerticalAlign || "middle", null != g && l + T.lineHeight > g) return {
                        lines: [],
                        width: 0,
                        height: 0
                    };
                    T.textWidth = i(T.text, A);
                    var D = M.textWidth, R = null == D || "auto" === D;
                    if ("string" == typeof D && "%" === D.charAt(D.length - 1)) T.percentWidth = D, u.push(T), D = 0; else {
                        if (R) {
                            D = T.textWidth;
                            var B = M.textBackgroundColor, L = B && B.image;
                            L && (L = b.findExistImage(L), b.isImageReady(L) && (D = Math.max(D, L.width * O / L.height)))
                        }
                        var F = P ? P[1] + P[3] : 0;
                        D += F;
                        var E = null != p ? p - w : null;
                        null != E && E < D && (!R || E < F ? (T.text = "", T.textWidth = D = 0) : (T.text = c(T.text, E - F, A, d.ellipsis, {minChar: d.minChar}), T.textWidth = i(T.text, A), D = T.textWidth + F))
                    }
                    w += T.width = D, M && (_ = Math.max(_, T.lineHeight))
                }
                m.width = w, m.lineHeight = _, l += _, h = Math.max(h, w)
            }
            r.outerWidth = r.width = k(e.textWidth, h), r.outerHeight = r.height = k(e.textHeight, l), f && (r.outerWidth += f[1] + f[3], r.outerHeight += f[0] + f[2]);
            for (var y = 0; y < u.length; y++) {
                var T = u[y], W = T.percentWidth;
                T.width = parseInt(W, 10) / 100 * h
            }
            return r
        }

        function x(t, e, r) {
            for (var n = "" === e, i = e.split("\n"), a = t.lines, o = 0; o < i.length; o++) {
                var s = i[o], l = {styleName: r, text: s, isLineHolder: !s && !n};
                if (o) a.push({tokens: [l]}); else {
                    var h = (a[a.length - 1] || (a[0] = {tokens: []})).tokens, u = h.length;
                    1 === u && h[0].isLineHolder ? h[0] = l : (s || !u || n) && h.push(l)
                }
            }
        }

        function _(t) {
            var e = (t.fontSize || t.fontFamily) && [t.fontStyle, t.fontWeight, (t.fontSize || 12) + "px", t.fontFamily || "sans-serif"].join(" ");
            return e && P(e) || t.textFont || t.font
        }

        var w = r(4), b = r(11), S = r(1), T = S.getContext, M = S.extend, k = S.retrieve2, C = S.retrieve3, P = S.trim,
            A = {}, O = 0, D = 5e3, I = /\{([a-zA-Z0-9_]+)\|([^}]*)\}/g, R = "12px sans-serif", B = {};
        B.measureText = function (t, e) {
            var r = T();
            return r.font = e || R, r.measureText(t)
        }, e.DEFAULT_FONT = R, e.$override = n, e.getWidth = i, e.getBoundingRect = a, e.adjustTextX = l, e.adjustTextY = h, e.adjustTextPositionOnRect = u, e.truncateText = c, e.getLineHeight = v, e.measureText = g, e.parsePlainText = y, e.parseRichText = m, e.makeFont = _
    }, function (t, e) {
        function r(t) {
            return t %= n, t < 0 && (t += n), t
        }

        var n = 2 * Math.PI;
        e.normalizeRadian = r
    }, function (t, e) {
        var r = function () {
            this.head = null, this.tail = null, this._len = 0
        }, n = r.prototype;
        n.insert = function (t) {
            var e = new i(t);
            return this.insertEntry(e), e
        }, n.insertEntry = function (t) {
            this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++
        }, n.remove = function (t) {
            var e = t.prev, r = t.next;
            e ? e.next = r : this.head = r, r ? r.prev = e : this.tail = e, t.next = t.prev = null, this._len--
        }, n.len = function () {
            return this._len
        }, n.clear = function () {
            this.head = this.tail = null, this._len = 0
        };
        var i = function (t) {
            this.value = t, this.next, this.prev
        }, a = function (t) {
            this._list = new r, this._map = {}, this._maxSize = t || 10, this._lastRemovedEntry = null
        }, o = a.prototype;
        o.put = function (t, e) {
            var r = this._list, n = this._map, a = null;
            if (null == n[t]) {
                var o = r.len(), s = this._lastRemovedEntry;
                if (o >= this._maxSize && o > 0) {
                    var l = r.head;
                    r.remove(l), delete n[l.key], a = l.value, this._lastRemovedEntry = l
                }
                s ? s.value = e : s = new i(e), s.key = t, r.insertEntry(s), n[t] = s
            }
            return a
        }, o.get = function (t) {
            var e = this._map[t], r = this._list;
            if (null != e) return e !== r.tail && (r.remove(e), r.insertEntry(e)), e.value
        }, o.clear = function () {
            this._list.clear(), this._map = {}
        };
        var s = a;
        t.exports = s
    }, function (t, e) {
        var r = function (t) {
            this.colorStops = t || []
        };
        r.prototype = {
            constructor: r, addColorStop: function (t, e) {
                this.colorStops.push({offset: t, color: e})
            }
        };
        var n = r;
        t.exports = n
    }, function (t, e) {
        function r(t, e, r) {
            return n.hasOwnProperty(e) ? r *= t.dpr : r
        }

        var n = {
            shadowBlur: 1,
            shadowOffsetX: 1,
            shadowOffsetY: 1,
            textShadowBlur: 1,
            textShadowOffsetX: 1,
            textShadowOffsetY: 1,
            textBoxShadowBlur: 1,
            textBoxShadowOffsetX: 1,
            textBoxShadowOffsetY: 1
        };
        t.exports = r
    }, function (t, e, r) {
        function n(t, e, r) {
            var n = e.points, o = e.smooth;
            if (n && n.length >= 2) {
                if (o && "spline" !== o) {
                    var s = a(n, o, r, e.smoothConstraint);
                    t.moveTo(n[0][0], n[0][1]);
                    for (var l = n.length, h = 0; h < (r ? l : l - 1); h++) {
                        var u = s[2 * h], c = s[2 * h + 1], f = n[(h + 1) % l];
                        t.bezierCurveTo(u[0], u[1], c[0], c[1], f[0], f[1])
                    }
                } else {
                    "spline" === o && (n = i(n, r)), t.moveTo(n[0][0], n[0][1]);
                    for (var h = 1, d = n.length; h < d; h++) t.lineTo(n[h][0], n[h][1])
                }
                r && t.closePath()
            }
        }

        var i = r(59), a = r(58);
        e.buildPath = n
    }, function (t, e) {
        function r(t, e) {
            var r, n, i, a, o = e.x, s = e.y, l = e.width, h = e.height, u = e.r;
            l < 0 && (o += l, l = -l), h < 0 && (s += h, h = -h), "number" == typeof u ? r = n = i = a = u : u instanceof Array ? 1 === u.length ? r = n = i = a = u[0] : 2 === u.length ? (r = i = u[0], n = a = u[1]) : 3 === u.length ? (r = u[0], n = a = u[1], i = u[2]) : (r = u[0], n = u[1], i = u[2], a = u[3]) : r = n = i = a = 0;
            var c;
            r + n > l && (c = r + n, r *= l / c, n *= l / c), i + a > l && (c = i + a, i *= l / c, a *= l / c), n + i > h && (c = n + i, n *= h / c, i *= h / c), r + a > h && (c = r + a, r *= h / c, a *= h / c), t.moveTo(o + r, s), t.lineTo(o + l - n, s), 0 !== n && t.quadraticCurveTo(o + l, s, o + l, s + n), t.lineTo(o + l, s + h - i), 0 !== i && t.quadraticCurveTo(o + l, s + h, o + l - i, s + h), t.lineTo(o + a, s + h), 0 !== a && t.quadraticCurveTo(o, s + h, o, s + h - a), t.lineTo(o, s + r), 0 !== r && t.quadraticCurveTo(o, s, o + r, s)
        }

        e.buildPath = r
    }, function (t, e, r) {
        function n(t) {
            return i(t), T(t.rich, i), t
        }

        function i(t) {
            if (t) {
                t.font = P.makeFont(t);
                var e = t.textAlign;
                "middle" === e && (e = "center"), t.textAlign = null == e || I[e] ? e : "left";
                var r = t.textVerticalAlign || t.textBaseline;
                "center" === r && (r = "middle"), t.textVerticalAlign = null == r || R[r] ? r : "top";
                var n = t.textPadding;
                n && (t.textPadding = M(t.textPadding))
            }
        }

        function a(t, e, r, n, i) {
            n.rich ? s(t, e, r, n, i) : o(t, e, r, n, i)
        }

        function o(t, e, r, n, i) {
            var a = v(e, "font", n.font || P.DEFAULT_FONT), o = n.textPadding, s = t.__textCotentBlock;
            s && !t.__dirty || (s = t.__textCotentBlock = P.parsePlainText(r, a, o, n.truncate));
            var l = s.outerHeight, u = s.lines, d = s.lineHeight, m = p(l, n, i), _ = m.baseX, w = m.baseY,
                b = m.textAlign, S = m.textVerticalAlign;
            h(e, n, i, _, w);
            var T = P.adjustTextY(w, l, S), M = _, k = T, C = c(n);
            if (C || o) {
                var A = P.getWidth(r, a), O = A;
                o && (O += o[1] + o[3]);
                var D = P.adjustTextX(_, O, b);
                C && f(t, e, n, D, T, O, l), o && (M = x(_, b, o), k += o[0])
            }
            v(e, "textAlign", b || "left"), v(e, "textBaseline", "middle"), v(e, "shadowBlur", n.textShadowBlur || 0), v(e, "shadowColor", n.textShadowColor || "transparent"), v(e, "shadowOffsetX", n.textShadowOffsetX || 0), v(e, "shadowOffsetY", n.textShadowOffsetY || 0), k += d / 2;
            var I = n.textStrokeWidth, R = g(n.textStroke, I), B = y(n.textFill);
            R && (v(e, "lineWidth", I), v(e, "strokeStyle", R)), B && v(e, "fillStyle", B);
            for (var L = 0; L < u.length; L++) R && e.strokeText(u[L], M, k), B && e.fillText(u[L], M, k), k += d
        }

        function s(t, e, r, n, i) {
            var a = t.__textCotentBlock;
            a && !t.__dirty || (a = t.__textCotentBlock = P.parseRichText(r, n)), l(t, e, a, n, i)
        }

        function l(t, e, r, n, i) {
            var a = r.width, o = r.outerWidth, s = r.outerHeight, l = n.textPadding, d = p(s, n, i), v = d.baseX,
                g = d.baseY, y = d.textAlign, m = d.textVerticalAlign;
            h(e, n, i, v, g);
            var x = P.adjustTextX(v, o, y), _ = P.adjustTextY(g, s, m), w = x, b = _;
            l && (w += l[3], b += l[0]);
            var S = w + a;
            c(n) && f(t, e, n, x, _, o, s);
            for (var T = 0; T < r.lines.length; T++) {
                for (var M, k = r.lines[T], C = k.tokens, A = C.length, O = k.lineHeight, D = k.width, I = 0, R = w, B = S, L = A - 1; I < A && (M = C[I], !M.textAlign || "left" === M.textAlign);) u(t, e, M, n, O, b, R, "left"), D -= M.width, R += M.width, I++;
                for (; L >= 0 && (M = C[L], "right" === M.textAlign);) u(t, e, M, n, O, b, B, "right"), D -= M.width, B -= M.width, L--;
                for (R += (a - (R - w) - (S - B) - D) / 2; I <= L;) M = C[I], u(t, e, M, n, O, b, R + M.width / 2, "center"), R += M.width, I++;
                b += O
            }
        }

        function h(t, e, r, n, i) {
            if (r && e.textRotation) {
                var a = e.textOrigin;
                "center" === a ? (n = r.width / 2 + r.x, i = r.height / 2 + r.y) : a && (n = a[0] + r.x, i = a[1] + r.y), t.translate(n, i), t.rotate(-e.textRotation), t.translate(-n, -i)
            }
        }

        function u(t, e, r, n, i, a, o, s) {
            var l = n.rich[r.styleName] || {}, h = r.textVerticalAlign, u = a + i / 2;
            "top" === h ? u = a + r.height / 2 : "bottom" === h && (u = a + i - r.height / 2), !r.isLineHolder && c(l) && f(t, e, l, "right" === s ? o - r.width : "center" === s ? o - r.width / 2 : o, u - r.height / 2, r.width, r.height);
            var d = r.textPadding;
            d && (o = x(o, s, d), u -= r.height / 2 - d[2] - r.textHeight / 2), v(e, "shadowBlur", S(l.textShadowBlur, n.textShadowBlur, 0)), v(e, "shadowColor", l.textShadowColor || n.textShadowColor || "transparent"), v(e, "shadowOffsetX", S(l.textShadowOffsetX, n.textShadowOffsetX, 0)), v(e, "shadowOffsetY", S(l.textShadowOffsetY, n.textShadowOffsetY, 0)), v(e, "textAlign", s), v(e, "textBaseline", "middle"), v(e, "font", r.font || P.DEFAULT_FONT);
            var p = g(l.textStroke || n.textStroke, _), m = y(l.textFill || n.textFill),
                _ = b(l.textStrokeWidth, n.textStrokeWidth);
            p && (v(e, "lineWidth", _), v(e, "strokeStyle", p), e.strokeText(r.text, o, u)), m && (v(e, "fillStyle", m), e.fillText(r.text, o, u))
        }

        function c(t) {
            return t.textBackgroundColor || t.textBorderWidth && t.textBorderColor
        }

        function f(t, e, r, n, i, a, o) {
            var s = r.textBackgroundColor, l = r.textBorderWidth, h = r.textBorderColor, u = k(s);
            if (v(e, "shadowBlur", r.textBoxShadowBlur || 0), v(e, "shadowColor", r.textBoxShadowColor || "transparent"), v(e, "shadowOffsetX", r.textBoxShadowOffsetX || 0), v(e, "shadowOffsetY", r.textBoxShadowOffsetY || 0), u || l && h) {
                e.beginPath();
                var c = r.textBorderRadius;
                c ? A.buildPath(e, {x: n, y: i, width: a, height: o, r: c}) : e.rect(n, i, a, o), e.closePath()
            }
            if (u) v(e, "fillStyle", s), e.fill(); else if (C(s)) {
                var f = s.image;
                f = O.createOrUpdateImage(f, null, t, d, s), f && O.isImageReady(f) && e.drawImage(f, n, i, a, o)
            }
            l && h && (v(e, "lineWidth", l), v(e, "strokeStyle", h), e.stroke())
        }

        function d(t, e) {
            e.image = t
        }

        function p(t, e, r) {
            var n = e.x || 0, i = e.y || 0, a = e.textAlign, o = e.textVerticalAlign;
            if (r) {
                var s = e.textPosition;
                if (s instanceof Array) n = r.x + m(s[0], r.width), i = r.y + m(s[1], r.height); else {
                    var l = P.adjustTextPositionOnRect(s, r, e.textDistance);
                    n = l.x, i = l.y, a = a || l.textAlign, o = o || l.textVerticalAlign
                }
                var h = e.textOffset;
                h && (n += h[0], i += h[1])
            }
            return {baseX: n, baseY: i, textAlign: a, textVerticalAlign: o}
        }

        function v(t, e, r) {
            return t[e] = D(t, e, r), t[e]
        }

        function g(t, e) {
            return null == t || e <= 0 || "transparent" === t || "none" === t ? null : t.image || t.colorStops ? "#000" : t
        }

        function y(t) {
            return null == t || "none" === t ? null : t.image || t.colorStops ? "#000" : t
        }

        function m(t, e) {
            return "string" == typeof t ? t.lastIndexOf("%") >= 0 ? parseFloat(t) / 100 * e : parseFloat(t) : t
        }

        function x(t, e, r) {
            return "right" === e ? t - r[1] : "center" === e ? t + r[3] / 2 - r[1] / 2 : t + r[3]
        }

        function _(t, e) {
            return null != t && (t || e.textBackgroundColor || e.textBorderWidth && e.textBorderColor || e.textPadding)
        }

        var w = r(1), b = w.retrieve2, S = w.retrieve3, T = w.each, M = w.normalizeCssArray, k = w.isString,
            C = w.isObject, P = r(17), A = r(23), O = r(11), D = r(21), I = {left: 1, right: 1, center: 1},
            R = {top: 1, bottom: 1, middle: 1};
        e.normalizeTextStyle = n, e.renderText = a, e.getStroke = g, e.getFill = y, e.needDrawText = _
    }, function (t, e, r) {
        function n(t) {
            return t > s || t < -s
        }

        var i = r(10), a = r(3), o = i.identity, s = 5e-5, l = function (t) {
            t = t || {}, t.position || (this.position = [0, 0]), null == t.rotation && (this.rotation = 0), t.scale || (this.scale = [1, 1]), this.origin = this.origin || null
        }, h = l.prototype;
        h.transform = null, h.needLocalTransform = function () {
            return n(this.rotation) || n(this.position[0]) || n(this.position[1]) || n(this.scale[0] - 1) || n(this.scale[1] - 1)
        }, h.updateTransform = function () {
            var t = this.parent, e = t && t.transform, r = this.needLocalTransform(), n = this.transform;
            return r || e ? (n = n || i.create(), r ? this.getLocalTransform(n) : o(n), e && (r ? i.mul(n, t.transform, n) : i.copy(n, t.transform)), this.transform = n, this.invTransform = this.invTransform || i.create(), void i.invert(this.invTransform, n)) : void(n && o(n))
        }, h.getLocalTransform = function (t) {
            return l.getLocalTransform(this, t)
        }, h.setTransform = function (t) {
            var e = this.transform, r = t.dpr || 1;
            e ? t.setTransform(r * e[0], r * e[1], r * e[2], r * e[3], r * e[4], r * e[5]) : t.setTransform(r, 0, 0, r, 0, 0)
        }, h.restoreTransform = function (t) {
            var e = t.dpr || 1;
            t.setTransform(e, 0, 0, e, 0, 0)
        };
        var u = [];
        h.decomposeTransform = function () {
            if (this.transform) {
                var t = this.parent, e = this.transform;
                t && t.transform && (i.mul(u, t.invTransform, e), e = u);
                var r = e[0] * e[0] + e[1] * e[1], a = e[2] * e[2] + e[3] * e[3], o = this.position, s = this.scale;
                n(r - 1) && (r = Math.sqrt(r)), n(a - 1) && (a = Math.sqrt(a)), e[0] < 0 && (r = -r), e[3] < 0 && (a = -a), o[0] = e[4], o[1] = e[5], s[0] = r, s[1] = a, this.rotation = Math.atan2(-e[1] / a, e[0] / r)
            }
        }, h.getGlobalScale = function () {
            var t = this.transform;
            if (!t) return [1, 1];
            var e = Math.sqrt(t[0] * t[0] + t[1] * t[1]), r = Math.sqrt(t[2] * t[2] + t[3] * t[3]);
            return t[0] < 0 && (e = -e), t[3] < 0 && (r = -r), [e, r]
        }, h.transformCoordToLocal = function (t, e) {
            var r = [t, e], n = this.invTransform;
            return n && a.applyTransform(r, r, n), r
        }, h.transformCoordToGlobal = function (t, e) {
            var r = [t, e], n = this.transform;
            return n && a.applyTransform(r, r, n), r
        }, l.getLocalTransform = function (t, e) {
            e = e || [], o(e);
            var r = t.origin, n = t.scale || [1, 1], a = t.rotation || 0, s = t.position || [0, 0];
            return r && (e[4] -= r[0], e[5] -= r[1]), i.scale(e, e, n), a && i.rotate(e, e, a), r && (e[4] += r[0], e[5] += r[1]), e[4] += s[0], e[5] += s[1], e
        };
        var c = l;
        t.exports = c
    }, function (t, e, r) {
        function n(t) {
            return t = Math.round(t), t < 0 ? 0 : t > 255 ? 255 : t
        }

        function i(t) {
            return t = Math.round(t), t < 0 ? 0 : t > 360 ? 360 : t
        }

        function a(t) {
            return t < 0 ? 0 : t > 1 ? 1 : t
        }

        function o(t) {
            return n(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 * 255 : parseInt(t, 10))
        }

        function s(t) {
            return a(t.length && "%" === t.charAt(t.length - 1) ? parseFloat(t) / 100 : parseFloat(t))
        }

        function l(t, e, r) {
            return r < 0 ? r += 1 : r > 1 && (r -= 1), 6 * r < 1 ? t + (e - t) * r * 6 : 2 * r < 1 ? e : 3 * r < 2 ? t + (e - t) * (2 / 3 - r) * 6 : t
        }

        function h(t, e, r) {
            return t + (e - t) * r
        }

        function u(t, e, r, n, i) {
            return t[0] = e, t[1] = r, t[2] = n, t[3] = i, t
        }

        function c(t, e) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
        }

        function f(t, e) {
            k && c(k, e), k = M.put(t, k || e.slice())
        }

        function d(t, e) {
            if (t) {
                e = e || [];
                var r = M.get(t);
                if (r) return c(e, r);
                t += "";
                var n = t.replace(/ /g, "").toLowerCase();
                if (n in T) return c(e, T[n]), f(t, e), e;
                if ("#" !== n.charAt(0)) {
                    var i = n.indexOf("("), a = n.indexOf(")");
                    if (i !== -1 && a + 1 === n.length) {
                        var l = n.substr(0, i), h = n.substr(i + 1, a - (i + 1)).split(","), d = 1;
                        switch (l) {
                            case"rgba":
                                if (4 !== h.length) return void u(e, 0, 0, 0, 1);
                                d = s(h.pop());
                            case"rgb":
                                return 3 !== h.length ? void u(e, 0, 0, 0, 1) : (u(e, o(h[0]), o(h[1]), o(h[2]), d), f(t, e), e);
                            case"hsla":
                                return 4 !== h.length ? void u(e, 0, 0, 0, 1) : (h[3] = s(h[3]), p(h, e), f(t, e), e);
                            case"hsl":
                                return 3 !== h.length ? void u(e, 0, 0, 0, 1) : (p(h, e), f(t, e), e);
                            default:
                                return
                        }
                    }
                    u(e, 0, 0, 0, 1)
                } else {
                    if (4 === n.length) {
                        var v = parseInt(n.substr(1), 16);
                        return v >= 0 && v <= 4095 ? (u(e, (3840 & v) >> 4 | (3840 & v) >> 8, 240 & v | (240 & v) >> 4, 15 & v | (15 & v) << 4, 1), f(t, e), e) : void u(e, 0, 0, 0, 1)
                    }
                    if (7 === n.length) {
                        var v = parseInt(n.substr(1), 16);
                        return v >= 0 && v <= 16777215 ? (u(e, (16711680 & v) >> 16, (65280 & v) >> 8, 255 & v, 1), f(t, e), e) : void u(e, 0, 0, 0, 1)
                    }
                }
            }
        }

        function p(t, e) {
            var r = (parseFloat(t[0]) % 360 + 360) % 360 / 360, i = s(t[1]), a = s(t[2]),
                o = a <= .5 ? a * (i + 1) : a + i - a * i, h = 2 * a - o;
            return e = e || [], u(e, n(255 * l(h, o, r + 1 / 3)), n(255 * l(h, o, r)), n(255 * l(h, o, r - 1 / 3)), 1), 4 === t.length && (e[3] = t[3]), e
        }

        function v(t) {
            if (t) {
                var e, r, n = t[0] / 255, i = t[1] / 255, a = t[2] / 255, o = Math.min(n, i, a), s = Math.max(n, i, a),
                    l = s - o, h = (s + o) / 2;
                if (0 === l) e = 0, r = 0; else {
                    r = h < .5 ? l / (s + o) : l / (2 - s - o);
                    var u = ((s - n) / 6 + l / 2) / l, c = ((s - i) / 6 + l / 2) / l, f = ((s - a) / 6 + l / 2) / l;
                    n === s ? e = f - c : i === s ? e = 1 / 3 + u - f : a === s && (e = 2 / 3 + c - u), e < 0 && (e += 1), e > 1 && (e -= 1)
                }
                var d = [360 * e, r, h];
                return null != t[3] && d.push(t[3]), d
            }
        }

        function g(t, e) {
            var r = d(t);
            if (r) {
                for (var n = 0; n < 3; n++) e < 0 ? r[n] = r[n] * (1 - e) | 0 : r[n] = (255 - r[n]) * e + r[n] | 0;
                return b(r, 4 === r.length ? "rgba" : "rgb")
            }
        }

        function y(t) {
            var e = d(t);
            if (e) return ((1 << 24) + (e[0] << 16) + (e[1] << 8) + +e[2]).toString(16).slice(1)
        }

        function m(t, e, r) {
            if (e && e.length && t >= 0 && t <= 1) {
                r = r || [];
                var i = t * (e.length - 1), o = Math.floor(i), s = Math.ceil(i), l = e[o], u = e[s], c = i - o;
                return r[0] = n(h(l[0], u[0], c)), r[1] = n(h(l[1], u[1], c)), r[2] = n(h(l[2], u[2], c)), r[3] = a(h(l[3], u[3], c)), r
            }
        }

        function x(t, e, r) {
            if (e && e.length && t >= 0 && t <= 1) {
                var i = t * (e.length - 1), o = Math.floor(i), s = Math.ceil(i), l = d(e[o]), u = d(e[s]), c = i - o,
                    f = b([n(h(l[0], u[0], c)), n(h(l[1], u[1], c)), n(h(l[2], u[2], c)), a(h(l[3], u[3], c))], "rgba");
                return r ? {color: f, leftIndex: o, rightIndex: s, value: i} : f
            }
        }

        function _(t, e, r, n) {
            if (t = d(t)) return t = v(t), null != e && (t[0] = i(e)), null != r && (t[1] = s(r)), null != n && (t[2] = s(n)), b(p(t), "rgba")
        }

        function w(t, e) {
            if (t = d(t), t && null != e) return t[3] = a(e), b(t, "rgba")
        }

        function b(t, e) {
            if (t && t.length) {
                var r = t[0] + "," + t[1] + "," + t[2];
                return "rgba" !== e && "hsva" !== e && "hsla" !== e || (r += "," + t[3]), e + "(" + r + ")"
            }
        }

        var S = r(19), T = {
            transparent: [0, 0, 0, 0],
            aliceblue: [240, 248, 255, 1],
            antiquewhite: [250, 235, 215, 1],
            aqua: [0, 255, 255, 1],
            aquamarine: [127, 255, 212, 1],
            azure: [240, 255, 255, 1],
            beige: [245, 245, 220, 1],
            bisque: [255, 228, 196, 1],
            black: [0, 0, 0, 1],
            blanchedalmond: [255, 235, 205, 1],
            blue: [0, 0, 255, 1],
            blueviolet: [138, 43, 226, 1],
            brown: [165, 42, 42, 1],
            burlywood: [222, 184, 135, 1],
            cadetblue: [95, 158, 160, 1],
            chartreuse: [127, 255, 0, 1],
            chocolate: [210, 105, 30, 1],
            coral: [255, 127, 80, 1],
            cornflowerblue: [100, 149, 237, 1],
            cornsilk: [255, 248, 220, 1],
            crimson: [220, 20, 60, 1],
            cyan: [0, 255, 255, 1],
            darkblue: [0, 0, 139, 1],
            darkcyan: [0, 139, 139, 1],
            darkgoldenrod: [184, 134, 11, 1],
            darkgray: [169, 169, 169, 1],
            darkgreen: [0, 100, 0, 1],
            darkgrey: [169, 169, 169, 1],
            darkkhaki: [189, 183, 107, 1],
            darkmagenta: [139, 0, 139, 1],
            darkolivegreen: [85, 107, 47, 1],
            darkorange: [255, 140, 0, 1],
            darkorchid: [153, 50, 204, 1],
            darkred: [139, 0, 0, 1],
            darksalmon: [233, 150, 122, 1],
            darkseagreen: [143, 188, 143, 1],
            darkslateblue: [72, 61, 139, 1],
            darkslategray: [47, 79, 79, 1],
            darkslategrey: [47, 79, 79, 1],
            darkturquoise: [0, 206, 209, 1],
            darkviolet: [148, 0, 211, 1],
            deeppink: [255, 20, 147, 1],
            deepskyblue: [0, 191, 255, 1],
            dimgray: [105, 105, 105, 1],
            dimgrey: [105, 105, 105, 1],
            dodgerblue: [30, 144, 255, 1],
            firebrick: [178, 34, 34, 1],
            floralwhite: [255, 250, 240, 1],
            forestgreen: [34, 139, 34, 1],
            fuchsia: [255, 0, 255, 1],
            gainsboro: [220, 220, 220, 1],
            ghostwhite: [248, 248, 255, 1],
            gold: [255, 215, 0, 1],
            goldenrod: [218, 165, 32, 1],
            gray: [128, 128, 128, 1],
            green: [0, 128, 0, 1],
            greenyellow: [173, 255, 47, 1],
            grey: [128, 128, 128, 1],
            honeydew: [240, 255, 240, 1],
            hotpink: [255, 105, 180, 1],
            indianred: [205, 92, 92, 1],
            indigo: [75, 0, 130, 1],
            ivory: [255, 255, 240, 1],
            khaki: [240, 230, 140, 1],
            lavender: [230, 230, 250, 1],
            lavenderblush: [255, 240, 245, 1],
            lawngreen: [124, 252, 0, 1],
            lemonchiffon: [255, 250, 205, 1],
            lightblue: [173, 216, 230, 1],
            lightcoral: [240, 128, 128, 1],
            lightcyan: [224, 255, 255, 1],
            lightgoldenrodyellow: [250, 250, 210, 1],
            lightgray: [211, 211, 211, 1],
            lightgreen: [144, 238, 144, 1],
            lightgrey: [211, 211, 211, 1],
            lightpink: [255, 182, 193, 1],
            lightsalmon: [255, 160, 122, 1],
            lightseagreen: [32, 178, 170, 1],
            lightskyblue: [135, 206, 250, 1],
            lightslategray: [119, 136, 153, 1],
            lightslategrey: [119, 136, 153, 1],
            lightsteelblue: [176, 196, 222, 1],
            lightyellow: [255, 255, 224, 1],
            lime: [0, 255, 0, 1],
            limegreen: [50, 205, 50, 1],
            linen: [250, 240, 230, 1],
            magenta: [255, 0, 255, 1],
            maroon: [128, 0, 0, 1],
            mediumaquamarine: [102, 205, 170, 1],
            mediumblue: [0, 0, 205, 1],
            mediumorchid: [186, 85, 211, 1],
            mediumpurple: [147, 112, 219, 1],
            mediumseagreen: [60, 179, 113, 1],
            mediumslateblue: [123, 104, 238, 1],
            mediumspringgreen: [0, 250, 154, 1],
            mediumturquoise: [72, 209, 204, 1],
            mediumvioletred: [199, 21, 133, 1],
            midnightblue: [25, 25, 112, 1],
            mintcream: [245, 255, 250, 1],
            mistyrose: [255, 228, 225, 1],
            moccasin: [255, 228, 181, 1],
            navajowhite: [255, 222, 173, 1],
            navy: [0, 0, 128, 1],
            oldlace: [253, 245, 230, 1],
            olive: [128, 128, 0, 1],
            olivedrab: [107, 142, 35, 1],
            orange: [255, 165, 0, 1],
            orangered: [255, 69, 0, 1],
            orchid: [218, 112, 214, 1],
            palegoldenrod: [238, 232, 170, 1],
            palegreen: [152, 251, 152, 1],
            paleturquoise: [175, 238, 238, 1],
            palevioletred: [219, 112, 147, 1],
            papayawhip: [255, 239, 213, 1],
            peachpuff: [255, 218, 185, 1],
            peru: [205, 133, 63, 1],
            pink: [255, 192, 203, 1],
            plum: [221, 160, 221, 1],
            powderblue: [176, 224, 230, 1],
            purple: [128, 0, 128, 1],
            red: [255, 0, 0, 1],
            rosybrown: [188, 143, 143, 1],
            royalblue: [65, 105, 225, 1],
            saddlebrown: [139, 69, 19, 1],
            salmon: [250, 128, 114, 1],
            sandybrown: [244, 164, 96, 1],
            seagreen: [46, 139, 87, 1],
            seashell: [255, 245, 238, 1],
            sienna: [160, 82, 45, 1],
            silver: [192, 192, 192, 1],
            skyblue: [135, 206, 235, 1],
            slateblue: [106, 90, 205, 1],
            slategray: [112, 128, 144, 1],
            slategrey: [112, 128, 144, 1],
            snow: [255, 250, 250, 1],
            springgreen: [0, 255, 127, 1],
            steelblue: [70, 130, 180, 1],
            tan: [210, 180, 140, 1],
            teal: [0, 128, 128, 1],
            thistle: [216, 191, 216, 1],
            tomato: [255, 99, 71, 1],
            turquoise: [64, 224, 208, 1],
            violet: [238, 130, 238, 1],
            wheat: [245, 222, 179, 1],
            white: [255, 255, 255, 1],
            whitesmoke: [245, 245, 245, 1],
            yellow: [255, 255, 0, 1],
            yellowgreen: [154, 205, 50, 1]
        }, M = new S(20), k = null, C = m, P = x;
        e.parse = d, e.lift = g, e.toHex = y, e.fastLerp = m, e.fastMapToColor = C, e.lerp = x, e.mapToColor = P, e.modifyHSL = _, e.modifyAlpha = w, e.stringify = b
    }, function (t, e, r) {
        function n(t, e, r) {
            function n(t, e, r) {
                null != _.get(e) ? t.otherDims[e] = r : (t.coordDim = e, t.coordDimIndex = r, x.set(e, !0))
            }

            m.isInstance(e) || (e = m.seriesDataToSource(e)), r = r || {}, t = (t || []).slice();
            for (var o = (r.dimsDef || []).slice(), p = s(r.encodeDef), g = s(), x = s(), w = [], b = i(e, t, o, r.dimCount), S = 0; S < b; S++) {
                var T = o[S] = c({}, f(o[S]) ? o[S] : {name: o[S]}), M = T.name, k = w[S] = {otherDims: {}};
                null != M && null == g.get(M) && (k.name = k.displayName = M, g.set(M, S)), null != T.type && (k.type = T.type), null != T.displayName && (k.displayName = T.displayName)
            }
            p.each(function (t, e) {
                t = v(t).slice();
                var r = p.set(e, []);
                l(t, function (t, i) {
                    h(t) && (t = g.get(t)), null != t && t < b && (r[i] = t, n(w[t], e, i))
                })
            });
            var C = 0;
            l(t, function (t, e) {
                var r, t, i, a;
                if (h(t)) r = t, t = {}; else {
                    r = t.name;
                    var o = t.ordinalMeta;
                    t.ordinalMeta = null, t = d(t), t.ordinalMeta = o, i = t.dimsDef, a = t.otherDims, t.name = t.coordDim = t.coordDimIndex = t.dimsDef = t.otherDims = null
                }
                var s = v(p.get(r));
                if (!s.length) for (var c = 0; c < (i && i.length || 1); c++) {
                    for (; C < w.length && null != w[C].coordDim;) C++;
                    C < w.length && s.push(C++)
                }
                l(s, function (e, o) {
                    var s = w[e];
                    n(u(s, t), r, o), null == s.name && i && (s.name = s.displayName = i[o]), s.isSysCoord = !0, a && u(s.otherDims, a)
                })
            });
            for (var P = r.extraPrefix || "value", A = 0; A < b; A++) {
                var k = w[A] = w[A] || {}, O = k.coordDim;
                null == O && (k.coordDim = a(P, x, r.extraFromZero), k.coordDimIndex = 0, k.isExtraCoord = !0), null == k.name && (k.name = a(k.coordDim, g)), null == k.type && y(e, A, k.name) && (k.type = "ordinal")
            }
            return w
        }

        function i(t, e, r, n) {
            return null == n && (n = Math.max(t.dimensionsDetectCount || 1, e.length, r.length), l(e, function (t) {
                var e = t.dimsDef;
                e && (n = Math.max(n, e.length))
            })), n
        }

        function a(t, e, r) {
            if (r || null != e.get(t)) {
                for (var n = 0; null != e.get(t + n);) n++;
                t += n
            }
            return e.set(t, !0), t
        }

        var o = r(1), s = o.createHashMap, l = o.each, h = o.isString, u = o.defaults, c = o.extend, f = o.isObject,
            d = o.clone, p = r(14), v = p.normalizeToArray, g = r(29), y = g.guessOrdinal, m = r(12), x = r(28),
            _ = x.OTHER_DIMENSIONS, w = n;
        t.exports = w
    }, function (t, e, r) {
        function n(t) {
            var e = {}, r = e.encode = {}, n = e.coordDimMap = l(), i = [];
            s(t.dimensions, function (e) {
                var o = t.getDimensionInfo(e), s = o.coordDim;
                if (s) {
                    var l = r[s];
                    r.hasOwnProperty(s) || (l = r[s] = []), l[o.coordDimIndex] = e, o.isSysCoord && a(o.type) && (i[0] = e), n.set(s, 1)
                }
                u.each(function (t, e) {
                    var n = r[e];
                    r.hasOwnProperty(e) || (n = r[e] = []);
                    var i = o.otherDims[e];
                    null != i && i !== !1 && (n[i] = o.name)
                })
            });
            var o = [];
            n.each(function (t, e) {
                o = o.concat(r[e])
            }), e.dataDimsOnCoord = o;
            var h = r.label;
            h && h.length && (i = h.slice());
            var c = i.slice(), f = r.tooltip;
            return f && f.length && (c = f.slice()), r.defaultedLabel = i, r.defaultedTooltip = c, e
        }

        function i(t) {
            return "category" === t ? "ordinal" : "time" === t ? "time" : "float"
        }

        function a(t) {
            return !("ordinal" === t || "time" === t)
        }

        var o = r(1), s = o.each, l = o.createHashMap, h = (o.assert, r(6)),
            u = (h.__DEV__, l(["tooltip", "label", "itemName", "itemId", "seriesName"]));
        e.OTHER_DIMENSIONS = u, e.summarizeDimensions = n, e.getDimensionTypeByAxis = i
    }, function (t, e, r) {
        function n(t) {
            var e = t.option.source, r = E;
            if (P(e)) r = W; else if (M(e)) for (var n = 0, i = e.length; n < i; n++) {
                var a = e[n];
                if (null != a) {
                    if (M(a)) {
                        r = B;
                        break
                    }
                    if (C(a)) {
                        r = L;
                        break
                    }
                }
            } else if (C(e)) {
                for (var o in e) if (e.hasOwnProperty(o) && A(e[o])) {
                    r = F;
                    break
                }
            } else if (null != e) throw new Error("Invalid data");
            q(t).sourceFormat = r
        }

        function i(t) {
            return q(t).source
        }

        function a(t) {
            q(t).datasetMap = b()
        }

        function o(t) {
            var e = t.option, r = e.data, n = P(r) ? W : R, i = !1, a = e.seriesLayoutBy, o = e.sourceHeader,
                l = e.dimensions, h = f(t);
            if (h) {
                var u = h.option;
                r = u.source, n = q(h).sourceFormat, i = !0, a = a || u.seriesLayoutBy, null == o && (o = u.sourceHeader), l = l || u.dimensions
            }
            var d = s(r, n, a, o, l), p = e.encode;
            !p && h && (p = c(t, h, r, n, a, d)), q(t).source = new D({
                data: r,
                fromDataset: i,
                seriesLayoutBy: a,
                sourceFormat: n,
                dimensionsDefine: d.dimensionsDefine,
                startIndex: d.startIndex,
                dimensionsDetectCount: d.dimensionsDetectCount,
                encodeDefine: p
            })
        }

        function s(t, e, r, n, i) {
            if (!t) return {dimensionsDefine: l(i)};
            var a, o, s;
            if (e === B) "auto" === n || null == n ? h(function (t) {
                null != t && "-" !== t && (k(t) ? null == o && (o = 1) : o = 0)
            }, r, t, 10) : o = n ? 1 : 0, i || 1 !== o || (i = [], h(function (t, e) {
                i[e] = null != t ? t : ""
            }, r, t)), a = i ? i.length : r === z ? t.length : t[0] ? t[0].length : null; else if (e === L) i || (i = u(t), s = !0); else if (e === F) i || (i = [], s = !0, S(t, function (t, e) {
                i.push(e)
            })); else if (e === R) {
                var c = m(t[0]);
                a = M(c) && c.length || 1
            }
            var f;
            return s && S(i, function (t, e) {
                "name" === (C(t) ? t.name : t) && (f = e)
            }), {startIndex: o, dimensionsDefine: l(i), dimensionsDetectCount: a, potentialNameDimIndex: f}
        }

        function l(t) {
            if (t) {
                var e = b();
                return T(t, function (t, r) {
                    if (t = O({}, C(t) ? t : {name: t}), null == t.name) return t;
                    t.name += "", null == t.displayName && (t.displayName = t.name);
                    var n = e.get(t.name);
                    return n ? t.name += "-" + n.count++ : e.set(t.name, {count: 1}), t
                })
            }
        }

        function h(t, e, r, n) {
            if (null == n && (n = 1 / 0), e === z) for (var i = 0; i < r.length && i < n; i++) t(r[i] ? r[i][0] : null, i); else for (var a = r[0] || [], i = 0; i < a.length && i < n; i++) t(a[i], i)
        }

        function u(t) {
            for (var e, r = 0; r < t.length && !(e = t[r++]);) ;
            if (e) {
                var n = [];
                return S(e, function (t, e) {
                    n.push(e)
                }), n
            }
        }

        function c(t, e, r, n, i, a) {
            var o = _(t), s = {}, l = [], h = [], u = t.subType, c = b(["pie", "map", "funnel"]),
                f = b(["line", "bar", "pictorialBar", "scatter", "effectScatter", "candlestick", "boxplot"]);
            if (o && null != f.get(u)) {
                var d = t.ecModel, v = q(d).datasetMap, g = e.uid + "_" + i,
                    y = v.get(g) || v.set(g, {categoryWayDim: 1, valueWayDim: 0});
                S(o.coordSysDims, function (t) {
                    if (null == o.firstCategoryDimIndex) {
                        var e = y.valueWayDim++;
                        s[t] = e, h.push(e)
                    } else if (o.categoryAxisMap.get(t)) s[t] = 0, l.push(0); else {
                        var e = y.categoryWayDim++;
                        s[t] = e, h.push(e)
                    }
                })
            } else if (null != c.get(u)) {
                for (var m, x = 0; x < 5 && null == m; x++) p(r, n, i, a.dimensionsDefine, a.startIndex, x) || (m = x);
                if (null != m) {
                    s.value = m;
                    var w = a.potentialNameDimIndex || Math.max(m - 1, 0);
                    h.push(w), l.push(w)
                }
            }
            return l.length && (s.itemName = l), h.length && (s.seriesName = h), s
        }

        function f(t) {
            var e = t.option, r = e.data;
            if (!r) return t.ecModel.getComponent("dataset", e.datasetIndex || 0)
        }

        function d(t, e) {
            return p(t.data, t.sourceFormat, t.seriesLayoutBy, t.dimensionsDefine, t.startIndex, e)
        }

        function p(t, e, r, n, i, a) {
            function o(t) {
                return (null == t || !isFinite(t) || "" === t) && (!(!k(t) || "-" === t) || void 0)
            }

            var s, l = 5;
            if (P(t)) return !1;
            var h;
            if (n && (h = n[a], h = C(h) ? h.name : h), e === B) if (r === z) {
                for (var u = t[a], c = 0; c < (u || []).length && c < l; c++) if (null != (s = o(u[i + c]))) return s
            } else for (var c = 0; c < t.length && c < l; c++) {
                var f = t[i + c];
                if (f && null != (s = o(f[a]))) return s
            } else if (e === L) {
                if (!h) return;
                for (var c = 0; c < t.length && c < l; c++) {
                    var d = t[c];
                    if (d && null != (s = o(d[h]))) return s
                }
            } else if (e === F) {
                if (!h) return;
                var u = t[h];
                if (!u || P(u)) return !1;
                for (var c = 0; c < u.length && c < l; c++) if (null != (s = o(u[c]))) return s
            } else if (e === R) for (var c = 0; c < t.length && c < l; c++) {
                var d = t[c], p = m(d);
                if (!M(p)) return !1;
                if (null != (s = o(p[a]))) return s
            }
            return !1
        }

        var v = r(6), g = (v.__DEV__, r(14)), y = g.makeInner, m = g.getDataItemValue, x = r(30),
            _ = x.getCoordSysDefineBySeries, w = r(1), b = w.createHashMap, S = w.each, T = w.map, M = w.isArray,
            k = w.isString, C = w.isObject, P = w.isTypedArray, A = w.isArrayLike, O = w.extend, D = (w.assert, r(12)),
            I = r(13), R = I.SOURCE_FORMAT_ORIGINAL, B = I.SOURCE_FORMAT_ARRAY_ROWS, L = I.SOURCE_FORMAT_OBJECT_ROWS,
            F = I.SOURCE_FORMAT_KEYED_COLUMNS, E = I.SOURCE_FORMAT_UNKNOWN, W = I.SOURCE_FORMAT_TYPED_ARRAY,
            z = I.SERIES_LAYOUT_BY_ROW, q = y();
        e.detectSourceFormat = n, e.getSource = i, e.resetSourceDefaulter = a, e.prepareSource = o, e.guessOrdinal = d
    }, function (t, e, r) {
        function n(t) {
            var e = t.get("coordinateSystem"),
                r = {coordSysName: e, coordSysDims: [], axisMap: s(), categoryAxisMap: s()}, n = h[e];
            if (n) return n(t, r, r.axisMap, r.categoryAxisMap), r
        }

        function i(t) {
            return "category" === t.get("type")
        }

        var a = r(6), o = (a.__DEV__, r(1)), s = o.createHashMap, l = (o.retrieve, o.each), h = {
            cartesian2d: function (t, e, r, n) {
                var a = t.getReferringComponents("xAxis")[0], o = t.getReferringComponents("yAxis")[0];
                e.coordSysDims = ["x", "y"], r.set("x", a), r.set("y", o), i(a) && (n.set("x", a), e.firstCategoryDimIndex = 0), i(o) && (n.set("y", o), e.firstCategoryDimIndex = 1)
            }, singleAxis: function (t, e, r, n) {
                var a = t.getReferringComponents("singleAxis")[0];
                e.coordSysDims = ["single"], r.set("single", a), i(a) && (n.set("single", a), e.firstCategoryDimIndex = 0)
            }, polar: function (t, e, r, n) {
                var a = t.getReferringComponents("polar")[0], o = a.findAxisModel("radiusAxis"),
                    s = a.findAxisModel("angleAxis");
                e.coordSysDims = ["radius", "angle"], r.set("radius", o), r.set("angle", s), i(o) && (n.set("radius", o), e.firstCategoryDimIndex = 0), i(s) && (n.set("angle", s), e.firstCategoryDimIndex = 1)
            }, geo: function (t, e, r, n) {
                e.coordSysDims = ["lng", "lat"]
            }, parallel: function (t, e, r, n) {
                var a = t.ecModel, o = a.getComponent("parallel", t.get("parallelIndex")),
                    s = e.coordSysDims = o.dimensions.slice();
                l(o.parallelAxisIndex, function (t, o) {
                    var l = a.getComponent("parallelAxis", t), h = s[o];
                    r.set(h, l), i(l) && null == e.firstCategoryDimIndex && (n.set(h, l), e.firstCategoryDimIndex = o)
                })
            }
        };
        e.getCoordSysDefineBySeries = n
    }, function (t, e, r) {
        function n(t) {
            var e = {main: "", sub: ""};
            return t && (t = t.split(d), e.main = t[0] || "", e.sub = t[1] || ""), e
        }

        function i(t) {
            f.assert(/^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(t), 'componentType "' + t + '" illegal')
        }

        function a(t, e) {
            t.$constructor = t, t.extend = function (t) {
                var e = this, r = function () {
                    t.$constructor ? t.$constructor.apply(this, arguments) : e.apply(this, arguments)
                };
                return f.extend(r.prototype, t), r.extend = this.extend, r.superCall = s, r.superApply = l, f.inherits(r, this), r.superClass = e, r
            }
        }

        function o(t) {
            var e = ["__\0is_clz", v++, Math.random().toFixed(3)].join("_");
            t.prototype[e] = !0, t.isInstance = function (t) {
                return !(!t || !t[e])
            }
        }

        function s(t, e) {
            var r = f.slice(arguments, 2);
            return this.superClass.prototype[e].apply(t, r)
        }

        function l(t, e, r) {
            return this.superClass.prototype[e].apply(t, r)
        }

        function h(t, e) {
            function r(t) {
                var e = a[t.main];
                return e && e[p] || (e = a[t.main] = {}, e[p] = !0), e
            }

            e = e || {};
            var a = {};
            if (t.registerClass = function (t, e) {
                    if (e) if (i(e), e = n(e), e.sub) {
                        if (e.sub !== p) {
                            var o = r(e);
                            o[e.sub] = t
                        }
                    } else a[e.main] = t;
                    return t
                }, t.getClass = function (t, e, r) {
                    var n = a[t];
                    if (n && n[p] && (n = e ? n[e] : null), r && !n) throw new Error(e ? "Component " + t + "." + (e || "") + " not exists. Load it first." : t + ".type should be specified.");
                    return n
                }, t.getClassesByMainType = function (t) {
                    t = n(t);
                    var e = [], r = a[t.main];
                    return r && r[p] ? f.each(r, function (t, r) {
                        r !== p && e.push(t)
                    }) : e.push(r), e
                }, t.hasClass = function (t) {
                    return t = n(t), !!a[t.main]
                }, t.getAllClassMainTypes = function () {
                    var t = [];
                    return f.each(a, function (e, r) {
                        t.push(r)
                    }), t
                }, t.hasSubTypes = function (t) {
                    t = n(t);
                    var e = a[t.main];
                    return e && e[p]
                }, t.parseClassType = n, e.registerWhenExtend) {
                var o = t.extend;
                o && (t.extend = function (e) {
                    var r = o.call(this, e);
                    return t.registerClass(r, e.type)
                })
            }
            return t
        }

        function u(t, e) {
        }

        var c = r(6), f = (c.__DEV__, r(1)), d = ".", p = "___EC__COMPONENT__CONTAINER___", v = 0;
        e.parseClassType = n, e.enableClassExtend = a, e.enableClassCheck = o, e.enableClassManagement = h, e.setReadOnly = u
    }, function (t, e, r) {
        function n(t) {
            return Z.extend(t)
        }

        function i(t, e) {
            return V.extendFromString(t, e)
        }

        function a(t, e, r, n) {
            var i = V.createFromString(t, e), a = i.getBoundingRect();
            return r && ("center" === n && (r = s(r, a)), l(i, r)), i
        }

        function o(t, e, r) {
            var n = new K({
                style: {image: t, x: e.x, y: e.y, width: e.width, height: e.height}, onload: function (t) {
                    if ("center" === r) {
                        var i = {width: t.width, height: t.height};
                        n.setStyle(s(e, i))
                    }
                }
            });
            return n
        }

        function s(t, e) {
            var r, n = e.width / e.height, i = t.height * n;
            i <= t.width ? r = t.height : (i = t.width, r = i / n);
            var a = t.x + t.width / 2, o = t.y + t.height / 2;
            return {x: a - i / 2, y: o - r / 2, width: i, height: r}
        }

        function l(t, e) {
            if (t.applyTransform) {
                var r = t.getBoundingRect(), n = r.calculateTransform(e);
                t.applyTransform(n)
            }
        }

        function h(t) {
            var e = t.shape, r = t.style.lineWidth;
            return vt(2 * e.x1) === vt(2 * e.x2) && (e.x1 = e.x2 = c(e.x1, r, !0)), vt(2 * e.y1) === vt(2 * e.y2) && (e.y1 = e.y2 = c(e.y1, r, !0)), t
        }

        function u(t) {
            var e = t.shape, r = t.style.lineWidth, n = e.x, i = e.y, a = e.width, o = e.height;
            return e.x = c(e.x, r, !0), e.y = c(e.y, r, !0), e.width = Math.max(c(n + a, r, !1) - e.x, 0 === a ? 0 : 1), e.height = Math.max(c(i + o, r, !1) - e.y, 0 === o ? 0 : 1), t
        }

        function c(t, e, r) {
            var n = vt(2 * t);
            return (n + vt(e)) % 2 === 0 ? n / 2 : (n + (r ? 1 : -1)) / 2
        }

        function f(t) {
            return null != t && "none" != t
        }

        function d(t) {
            return "string" == typeof t ? G.lift(t, -.1) : t
        }

        function p(t) {
            if (t.__hoverStlDirty) {
                var e = t.style.stroke, r = t.style.fill, n = t.__hoverStl;
                n.fill = n.fill || (f(r) ? d(r) : null), n.stroke = n.stroke || (f(e) ? d(e) : null);
                var i = {};
                for (var a in n) null != n[a] && (i[a] = t.style[a]);
                t.__normalStl = i, t.__hoverStlDirty = !1
            }
        }

        function v(t) {
            if (!t.__isHover) {
                if (p(t), t.useHoverLayer) t.__zr && t.__zr.addHover(t, t.__hoverStl); else {
                    var e = t.style, r = e.insideRollbackOpt;
                    r && R(e), e.extendFrom(t.__hoverStl), r && (I(e, e.insideOriginalTextPosition, r), null == e.textFill && (e.textFill = r.autoColor)), t.dirty(!1), t.z2 += 1
                }
                t.__isHover = !0
            }
        }

        function g(t) {
            if (t.__isHover) {
                var e = t.__normalStl;
                t.useHoverLayer ? t.__zr && t.__zr.removeHover(t) : (e && t.setStyle(e), t.z2 -= 1), t.__isHover = !1
            }
        }

        function y(t) {
            "group" === t.type ? t.traverse(function (t) {
                "group" !== t.type && v(t)
            }) : v(t)
        }

        function m(t) {
            "group" === t.type ? t.traverse(function (t) {
                "group" !== t.type && g(t)
            }) : g(t)
        }

        function x(t, e) {
            t.__hoverStl = t.hoverStyle || e || {}, t.__hoverStlDirty = !0, t.__isHover && p(t)
        }

        function _(t) {
            this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasis && y(this)
        }

        function w(t) {
            this.__hoverSilentOnTouch && t.zrByTouch || !this.__isEmphasis && m(this)
        }

        function b() {
            this.__isEmphasis = !0, y(this)
        }

        function S() {
            this.__isEmphasis = !1, m(this)
        }

        function T(t, e, r) {
            t.__hoverSilentOnTouch = r && r.hoverSilentOnTouch, "group" === t.type ? t.traverse(function (t) {
                "group" !== t.type && x(t, e)
            }) : x(t, e), t.on("mouseover", _).on("mouseout", w), t.on("emphasis", b).on("normal", S)
        }

        function M(t, e, r, n, i, a, o) {
            i = i || mt;
            var s, l = i.labelFetcher, h = i.labelDataIndex, u = i.labelDimIndex, c = r.getShallow("show"),
                f = n.getShallow("show");
            (c || f) && (l && (s = l.getFormattedLabel(h, "normal", null, u)), null == s && (s = U.isFunction(i.defaultText) ? i.defaultText(h, i) : i.defaultText));
            var d = c ? s : null, p = f ? U.retrieve2(l ? l.getFormattedLabel(h, "emphasis", null, u) : null, s) : null;
            null == d && null == p || (k(t, r, a, i), k(e, n, o, i, !0)), t.text = d, e.text = p
        }

        function k(t, e, r, n, i) {
            return P(t, e, n, i), r && U.extend(t, r), t.host && t.host.dirty && t.host.dirty(!1), t
        }

        function C(t, e, r) {
            var n, i = {isRectText: !0};
            r === !1 ? n = !0 : i.autoColor = r, P(t, e, i, n), t.host && t.host.dirty && t.host.dirty(!1)
        }

        function P(t, e, r, n) {
            if (r = r || mt, r.isRectText) {
                var i = e.getShallow("position") || (n ? null : "inside");
                "outside" === i && (i = "top"), t.textPosition = i, t.textOffset = e.getShallow("offset");
                var a = e.getShallow("rotate");
                null != a && (a *= Math.PI / 180), t.textRotation = a, t.textDistance = U.retrieve2(e.getShallow("distance"), n ? null : 5)
            }
            var o, s = e.ecModel, l = s && s.option.textStyle, h = A(e);
            if (h) {
                o = {};
                for (var u in h) if (h.hasOwnProperty(u)) {
                    var c = e.getModel(["rich", u]);
                    O(o[u] = {}, c, l, r, n)
                }
            }
            return t.rich = o, O(t, e, l, r, n, !0), r.forceRich && !r.textStyle && (r.textStyle = {}), t
        }

        function A(t) {
            for (var e; t && t !== t.ecModel;) {
                var r = (t.option || mt).rich;
                if (r) {
                    e = e || {};
                    for (var n in r) r.hasOwnProperty(n) && (e[n] = 1)
                }
                t = t.parentModel
            }
            return e
        }

        function O(t, e, r, n, i, a) {
            if (r = !i && r || mt, t.textFill = D(e.getShallow("color"), n) || r.color, t.textStroke = D(e.getShallow("textBorderColor"), n) || r.textBorderColor, t.textStrokeWidth = U.retrieve2(e.getShallow("textBorderWidth"), r.textBorderWidth), !i) {
                if (a) {
                    var o = t.textPosition;
                    t.insideRollback = I(t, o, n), t.insideOriginalTextPosition = o, t.insideRollbackOpt = n
                }
                null == t.textFill && (t.textFill = n.autoColor)
            }
            t.fontStyle = e.getShallow("fontStyle") || r.fontStyle, t.fontWeight = e.getShallow("fontWeight") || r.fontWeight, t.fontSize = e.getShallow("fontSize") || r.fontSize, t.fontFamily = e.getShallow("fontFamily") || r.fontFamily, t.textAlign = e.getShallow("align"), t.textVerticalAlign = e.getShallow("verticalAlign") || e.getShallow("baseline"), t.textLineHeight = e.getShallow("lineHeight"), t.textWidth = e.getShallow("width"), t.textHeight = e.getShallow("height"), t.textTag = e.getShallow("tag"), a && n.disableBox || (t.textBackgroundColor = D(e.getShallow("backgroundColor"), n), t.textPadding = e.getShallow("padding"), t.textBorderColor = D(e.getShallow("borderColor"), n), t.textBorderWidth = e.getShallow("borderWidth"), t.textBorderRadius = e.getShallow("borderRadius"), t.textBoxShadowColor = e.getShallow("shadowColor"), t.textBoxShadowBlur = e.getShallow("shadowBlur"), t.textBoxShadowOffsetX = e.getShallow("shadowOffsetX"), t.textBoxShadowOffsetY = e.getShallow("shadowOffsetY")), t.textShadowColor = e.getShallow("textShadowColor") || r.textShadowColor, t.textShadowBlur = e.getShallow("textShadowBlur") || r.textShadowBlur, t.textShadowOffsetX = e.getShallow("textShadowOffsetX") || r.textShadowOffsetX, t.textShadowOffsetY = e.getShallow("textShadowOffsetY") || r.textShadowOffsetY
        }

        function D(t, e) {
            return "auto" !== t ? t : e && e.autoColor ? e.autoColor : null
        }

        function I(t, e, r) {
            var n, i = r.useInsideStyle;
            return null == t.textFill && i !== !1 && (i === !0 || r.isRectText && e && "string" == typeof e && e.indexOf("inside") >= 0) && (n = {
                textFill: null,
                textStroke: t.textStroke,
                textStrokeWidth: t.textStrokeWidth
            }, t.textFill = "#fff", null == t.textStroke && (t.textStroke = r.autoColor, null == t.textStrokeWidth && (t.textStrokeWidth = 2))), n
        }

        function R(t) {
            var e = t.insideRollback;
            e && (t.textFill = e.textFill, t.textStroke = e.textStroke, t.textStrokeWidth = e.textStrokeWidth)
        }

        function B(t, e) {
            var r = e || e.getModel("textStyle");
            return U.trim([t.fontStyle || r && r.getShallow("fontStyle") || "", t.fontWeight || r && r.getShallow("fontWeight") || "", (t.fontSize || r && r.getShallow("fontSize") || 12) + "px", t.fontFamily || r && r.getShallow("fontFamily") || "sans-serif"].join(" "))
        }

        function L(t, e, r, n, i, a) {
            "function" == typeof i && (a = i, i = null);
            var o = n && n.isAnimationEnabled();
            if (o) {
                var s = t ? "Update" : "", l = n.getShallow("animationDuration" + s),
                    h = n.getShallow("animationEasing" + s), u = n.getShallow("animationDelay" + s);
                "function" == typeof u && (u = u(i, n.getAnimationDelayParams ? n.getAnimationDelayParams(e, i) : null)), "function" == typeof l && (l = l(i)), l > 0 ? e.animateTo(r, l, u || 0, h, a, !!a) : (e.stopAnimation(), e.attr(r), a && a())
            } else e.stopAnimation(), e.attr(r), a && a()
        }

        function F(t, e, r, n, i) {
            L(!0, t, e, r, n, i)
        }

        function E(t, e, r, n, i) {
            L(!1, t, e, r, n, i)
        }

        function W(t, e) {
            for (var r = X.identity([]); t && t !== e;) X.mul(r, t.getLocalTransform(), r), t = t.parent;
            return r
        }

        function z(t, e, r) {
            return e && !U.isArrayLike(e) && (e = $.getLocalTransform(e)), r && (e = X.invert([], e)), Q.applyTransform([], t, e)
        }

        function q(t, e, r) {
            var n = 0 === e[4] || 0 === e[5] || 0 === e[0] ? 1 : Math.abs(2 * e[4] / e[0]),
                i = 0 === e[4] || 0 === e[5] || 0 === e[2] ? 1 : Math.abs(2 * e[4] / e[2]),
                a = ["left" === t ? -n : "right" === t ? n : 0, "top" === t ? -i : "bottom" === t ? i : 0];
            return a = z(a, e, r), Math.abs(a[0]) > Math.abs(a[1]) ? a[0] > 0 ? "right" : "left" : a[1] > 0 ? "bottom" : "top"
        }

        function N(t, e, r, n) {
            function i(t) {
                var e = {};
                return t.traverse(function (t) {
                    !t.isGroup && t.anid && (e[t.anid] = t)
                }), e
            }

            function a(t) {
                var e = {position: Q.clone(t.position), rotation: t.rotation};
                return t.shape && (e.shape = U.extend({}, t.shape)), e
            }

            if (t && e) {
                var o = i(t);
                e.traverse(function (t) {
                    if (!t.isGroup && t.anid) {
                        var e = o[t.anid];
                        if (e) {
                            var n = a(t);
                            t.attr(a(e)), F(t, n, r, t.dataIndex)
                        }
                    }
                })
            }
        }

        function H(t, e) {
            return U.map(t, function (t) {
                var r = t[0];
                r = gt(r, e.x), r = yt(r, e.x + e.width);
                var n = t[1];
                return n = gt(n, e.y), n = yt(n, e.y + e.height), [r, n]
            })
        }

        function j(t, e) {
            var r = gt(t.x, e.x), n = yt(t.x + t.width, e.x + e.width), i = gt(t.y, e.y),
                a = yt(t.y + t.height, e.y + e.height);
            if (n >= r && a >= i) return {x: r, y: i, width: n - r, height: a - i}
        }

        function Y(t, e, r) {
            e = U.extend({rectHover: !0}, e);
            var n = e.style = {strokeNoScale: !0};
            if (r = r || {
                    x: -1,
                    y: -1,
                    width: 2,
                    height: 2
                }, t) return 0 === t.indexOf("image://") ? (n.image = t.slice(8), U.defaults(n, r), new K(e)) : a(t.replace("path://", ""), e, r, "center")
        }

        var U = r(1), V = r(72), G = r(26), X = r(10), Q = r(3), Z = r(2), $ = r(25), K = r(50);
        e.Image = K;
        var J = r(44);
        e.Group = J;
        var tt = r(56);
        e.Text = tt;
        var et = r(63);
        e.Circle = et;
        var rt = r(69);
        e.Sector = rt;
        var nt = r(68);
        e.Ring = nt;
        var it = r(65);
        e.Polygon = it;
        var at = r(66);
        e.Polyline = at;
        var ot = r(67);
        e.Rect = ot;
        var st = r(64);
        e.Line = st;
        var lt = r(62);
        e.BezierCurve = lt;
        var ht = r(61);
        e.Arc = ht;
        var ut = r(49);
        e.CompoundPath = ut;
        var ct = r(52);
        e.LinearGradient = ct;
        var ft = r(54);
        e.RadialGradient = ft;
        var dt = r(4);
        e.BoundingRect = dt;
        var pt = r(51);
        e.IncrementalDisplayable = pt;
        var vt = Math.round, gt = Math.max, yt = Math.min, mt = {}, xt = V.mergePath;
        e.extendShape = n, e.extendPath = i, e.makePath = a, e.makeImage = o, e.mergePath = xt, e.resizePath = l, e.subPixelOptimizeLine = h, e.subPixelOptimizeRect = u, e.subPixelOptimize = c, e.setHoverStyle = T, e.setLabelStyle = M, e.setTextStyle = k, e.setText = C, e.getFont = B, e.updateProps = F, e.initProps = E, e.getTransform = W, e.applyTransform = z, e.transformDirection = q, e.groupTransition = N, e.clipPointsByRect = H, e.clipRectByRect = j, e.createIcon = Y
    }, function (t, e, r) {
        function n(t, e) {
            if ("image" !== this.type) {
                var r = this.style, n = this.shape;
                n && "line" === n.symbolType ? r.stroke = t : this.__isEmptyBrush ? (r.stroke = t, r.fill = e || "#fff") : (r.fill && (r.fill = t), r.stroke && (r.stroke = t)), this.dirty(!1)
            }
        }

        function i(t, e, r, i, a, l, h) {
            var u = 0 === t.indexOf("empty");
            u && (t = t.substr(5, 1).toLowerCase() + t.substr(6));
            var c;
            return c = 0 === t.indexOf("image://") ? o.makeImage(t.slice(8), new s(e, r, i, a), h ? "center" : "cover") : 0 === t.indexOf("path://") ? o.makePath(t.slice(7), {}, new s(e, r, i, a), h ? "center" : "cover") : new v({
                shape: {
                    symbolType: t,
                    x: e,
                    y: r,
                    width: i,
                    height: a
                }
            }), c.__isEmptyBrush = u, c.setColor = n, c.setColor(l), c
        }

        var a = r(1), o = r(32), s = r(4), l = o.extendShape({
            type: "triangle",
            shape: {cx: 0, cy: 0, width: 0, height: 0},
            buildPath: function (t, e) {
                var r = e.cx, n = e.cy, i = e.width / 2, a = e.height / 2;
                t.moveTo(r, n - a), t.lineTo(r + i, n + a), t.lineTo(r - i, n + a), t.closePath()
            }
        }), h = o.extendShape({
            type: "diamond", shape: {cx: 0, cy: 0, width: 0, height: 0}, buildPath: function (t, e) {
                var r = e.cx, n = e.cy, i = e.width / 2, a = e.height / 2;
                t.moveTo(r, n - a), t.lineTo(r + i, n), t.lineTo(r, n + a), t.lineTo(r - i, n), t.closePath()
            }
        }), u = o.extendShape({
            type: "pin", shape: {x: 0, y: 0, width: 0, height: 0}, buildPath: function (t, e) {
                var r = e.x, n = e.y, i = e.width / 5 * 3, a = Math.max(i, e.height), o = i / 2, s = o * o / (a - o),
                    l = n - a + o + s, h = Math.asin(s / o), u = Math.cos(h) * o, c = Math.sin(h), f = Math.cos(h),
                    d = .6 * o, p = .7 * o;
                t.moveTo(r - u, l + s), t.arc(r, l, o, Math.PI - h, 2 * Math.PI + h), t.bezierCurveTo(r + u - c * d, l + s + f * d, r, n - p, r, n), t.bezierCurveTo(r, n - p, r - u + c * d, l + s + f * d, r - u, l + s), t.closePath()
            }
        }), c = o.extendShape({
            type: "arrow", shape: {x: 0, y: 0, width: 0, height: 0}, buildPath: function (t, e) {
                var r = e.height, n = e.width, i = e.x, a = e.y, o = n / 3 * 2;
                t.moveTo(i, a), t.lineTo(i + o, a + r), t.lineTo(i, a + r / 4 * 3), t.lineTo(i - o, a + r), t.lineTo(i, a), t.closePath()
            }
        }), f = {
            line: o.Line,
            rect: o.Rect,
            roundRect: o.Rect,
            square: o.Rect,
            circle: o.Circle,
            diamond: h,
            pin: u,
            arrow: c,
            triangle: l
        }, d = {
            line: function (t, e, r, n, i) {
                i.x1 = t, i.y1 = e + n / 2, i.x2 = t + r, i.y2 = e + n / 2
            }, rect: function (t, e, r, n, i) {
                i.x = t, i.y = e, i.width = r, i.height = n
            }, roundRect: function (t, e, r, n, i) {
                i.x = t, i.y = e, i.width = r, i.height = n, i.r = Math.min(r, n) / 4
            }, square: function (t, e, r, n, i) {
                var a = Math.min(r, n);
                i.x = t, i.y = e, i.width = a, i.height = a
            }, circle: function (t, e, r, n, i) {
                i.cx = t + r / 2, i.cy = e + n / 2, i.r = Math.min(r, n) / 2
            }, diamond: function (t, e, r, n, i) {
                i.cx = t + r / 2, i.cy = e + n / 2, i.width = r, i.height = n
            }, pin: function (t, e, r, n, i) {
                i.x = t + r / 2, i.y = e + n / 2, i.width = r, i.height = n
            }, arrow: function (t, e, r, n, i) {
                i.x = t + r / 2, i.y = e + n / 2, i.width = r, i.height = n
            }, triangle: function (t, e, r, n, i) {
                i.cx = t + r / 2, i.cy = e + n / 2, i.width = r, i.height = n
            }
        }, p = {};
        a.each(f, function (t, e) {
            p[e] = new t
        });
        var v = o.extendShape({
            type: "symbol",
            shape: {symbolType: "", x: 0, y: 0, width: 0, height: 0},
            beforeBrush: function () {
                var t = this.style, e = this.shape;
                "pin" === e.symbolType && "inside" === t.textPosition && (t.textPosition = ["50%", "40%"], t.textAlign = "center", t.textVerticalAlign = "middle")
            },
            buildPath: function (t, e, r) {
                var n = e.symbolType, i = p[n];
                "none" !== e.symbolType && (i || (n = "rect", i = p[n]), d[n](e.x, e.y, e.width, e.height, i.shape), i.buildPath(t, i.shape, r))
            }
        });
        e.createSymbol = i
    }, function (t, e, r) {
        function n(t) {
            return {
                getTargetSeries: function (e) {
                    var r = {}, n = a();
                    return e.eachSeriesByType(t, function (t) {
                        t.__paletteScope = r, n.set(t.uid, t)
                    }), n
                }, reset: function (t, e) {
                    var r = t.getRawData(), n = {}, i = t.getData();
                    i.each(function (t) {
                        var e = i.getRawIndex(t);
                        n[e] = t
                    }), r.each(function (e) {
                        var a = n[e], o = null != a && i.getItemVisual(a, "color", !0);
                        if (o) r.setItemVisual(e, "color", o); else {
                            var s = r.getItemModel(e),
                                l = s.get("itemStyle.color") || t.getColorFromPalette(r.getName(e), t.__paletteScope, r.count());
                            r.setItemVisual(e, "color", l), null != a && i.setItemVisual(a, "color", l)
                        }
                    })
                }
            }
        }

        var i = r(1), a = i.createHashMap;
        t.exports = n
    }, function (t, e, r) {
        function n(t, e) {
            return t[e]
        }

        function i(t, e, r) {
            t[e] = r
        }

        function a(t, e, r) {
            return (e - t) * r + t
        }

        function o(t, e, r) {
            return r > .5 ? e : t
        }

        function s(t, e, r, n, i) {
            var o = t.length;
            if (1 == i) for (var s = 0; s < o; s++) n[s] = a(t[s], e[s], r); else for (var l = o && t[0].length, s = 0; s < o; s++) for (var h = 0; h < l; h++) n[s][h] = a(t[s][h], e[s][h], r)
        }

        function l(t, e, r) {
            var n = t.length, i = e.length;
            if (n !== i) {
                var a = n > i;
                if (a) t.length = i; else for (var o = n; o < i; o++) t.push(1 === r ? e[o] : _.call(e[o]))
            }
            for (var s = t[0] && t[0].length, o = 0; o < t.length; o++) if (1 === r) isNaN(t[o]) && (t[o] = e[o]); else for (var l = 0; l < s; l++) isNaN(t[o][l]) && (t[o][l] = e[o][l])
        }

        function h(t, e, r) {
            if (t === e) return !0;
            var n = t.length;
            if (n !== e.length) return !1;
            if (1 === r) {
                for (var i = 0; i < n; i++) if (t[i] !== e[i]) return !1
            } else for (var a = t[0].length, i = 0; i < n; i++) for (var o = 0; o < a; o++) if (t[i][o] !== e[i][o]) return !1;
            return !0
        }

        function u(t, e, r, n, i, a, o, s, l) {
            var h = t.length;
            if (1 == l) for (var u = 0; u < h; u++) s[u] = c(t[u], e[u], r[u], n[u], i, a, o); else for (var f = t[0].length, u = 0; u < h; u++) for (var d = 0; d < f; d++) s[u][d] = c(t[u][d], e[u][d], r[u][d], n[u][d], i, a, o)
        }

        function c(t, e, r, n, i, a, o) {
            var s = .5 * (r - t), l = .5 * (n - e);
            return (2 * (e - r) + s + l) * o + (-3 * (e - r) - 2 * s - l) * a + s * i + e
        }

        function f(t) {
            if (x(t)) {
                var e = t.length;
                if (x(t[0])) {
                    for (var r = [], n = 0; n < e; n++) r.push(_.call(t[n]));
                    return r
                }
                return _.call(t)
            }
            return t
        }

        function d(t) {
            return t[0] = Math.floor(t[0]), t[1] = Math.floor(t[1]), t[2] = Math.floor(t[2]), "rgba(" + t.join(",") + ")"
        }

        function p(t) {
            var e = t[t.length - 1].value;
            return x(e && e[0]) ? 2 : 1
        }

        function v(t, e, r, n, i, f) {
            var v = t._getter, m = t._setter, _ = "spline" === e, w = n.length;
            if (w) {
                var b, S = n[0].value, T = x(S), M = !1, k = !1, C = T ? p(n) : 0;
                n.sort(function (t, e) {
                    return t.time - e.time
                }), b = n[w - 1].time;
                for (var P = [], A = [], O = n[0].value, D = !0, I = 0; I < w; I++) {
                    P.push(n[I].time / b);
                    var R = n[I].value;
                    if (T && h(R, O, C) || !T && R === O || (D = !1), O = R, "string" == typeof R) {
                        var B = y.parse(R);
                        B ? (R = B, M = !0) : k = !0
                    }
                    A.push(R)
                }
                if (f || !D) {
                    for (var L = A[w - 1], I = 0; I < w - 1; I++) T ? l(A[I], L, C) : !isNaN(A[I]) || isNaN(L) || k || M || (A[I] = L);
                    T && l(v(t._target, i), L, C);
                    var F, E, W, z, q, N, H = 0, j = 0;
                    if (M) var Y = [0, 0, 0, 0];
                    var U = function (t, e) {
                        var r;
                        if (e < 0) r = 0; else if (e < j) {
                            for (F = Math.min(H + 1, w - 1), r = F; r >= 0 && !(P[r] <= e); r--) ;
                            r = Math.min(r, w - 2)
                        } else {
                            for (r = H; r < w && !(P[r] > e); r++) ;
                            r = Math.min(r - 1, w - 2)
                        }
                        H = r, j = e;
                        var n = P[r + 1] - P[r];
                        if (0 !== n) if (E = (e - P[r]) / n, _) if (z = A[r], W = A[0 === r ? r : r - 1], q = A[r > w - 2 ? w - 1 : r + 1], N = A[r > w - 3 ? w - 1 : r + 2], T) u(W, z, q, N, E, E * E, E * E * E, v(t, i), C); else {
                            var l;
                            if (M) l = u(W, z, q, N, E, E * E, E * E * E, Y, 1), l = d(Y); else {
                                if (k) return o(z, q, E);
                                l = c(W, z, q, N, E, E * E, E * E * E)
                            }
                            m(t, i, l)
                        } else if (T) s(A[r], A[r + 1], E, v(t, i), C); else {
                            var l;
                            if (M) s(A[r], A[r + 1], E, Y, 1), l = d(Y); else {
                                if (k) return o(A[r], A[r + 1], E);
                                l = a(A[r], A[r + 1], E)
                            }
                            m(t, i, l)
                        }
                    }, V = new g({
                        target: t._target,
                        life: b,
                        loop: t._loop,
                        delay: t._delay,
                        onframe: U,
                        ondestroy: r
                    });
                    return e && "spline" !== e && (V.easing = e), V
                }
            }
        }

        var g = r(36), y = r(26), m = r(1), x = m.isArrayLike, _ = Array.prototype.slice, w = function (t, e, r, a) {
            this._tracks = {}, this._target = t, this._loop = e || !1, this._getter = r || n, this._setter = a || i, this._clipCount = 0, this._delay = 0, this._doneList = [], this._onframeList = [], this._clipList = []
        };
        w.prototype = {
            when: function (t, e) {
                var r = this._tracks;
                for (var n in e) if (e.hasOwnProperty(n)) {
                    if (!r[n]) {
                        r[n] = [];
                        var i = this._getter(this._target, n);
                        if (null == i) continue;
                        0 !== t && r[n].push({time: 0, value: f(i)})
                    }
                    r[n].push({time: t, value: e[n]})
                }
                return this
            }, during: function (t) {
                return this._onframeList.push(t), this
            }, pause: function () {
                for (var t = 0; t < this._clipList.length; t++) this._clipList[t].pause();
                this._paused = !0
            }, resume: function () {
                for (var t = 0; t < this._clipList.length; t++) this._clipList[t].resume();
                this._paused = !1
            }, isPaused: function () {
                return !!this._paused
            }, _doneCallback: function () {
                this._tracks = {}, this._clipList.length = 0;
                for (var t = this._doneList, e = t.length, r = 0; r < e; r++) t[r].call(this)
            }, start: function (t, e) {
                var r, n = this, i = 0, a = function () {
                    i--, i || n._doneCallback()
                };
                for (var o in this._tracks) if (this._tracks.hasOwnProperty(o)) {
                    var s = v(this, t, a, this._tracks[o], o, e);
                    s && (this._clipList.push(s), i++, this.animation && this.animation.addClip(s), r = s)
                }
                if (r) {
                    var l = r.onframe;
                    r.onframe = function (t, e) {
                        l(t, e);
                        for (var r = 0; r < n._onframeList.length; r++) n._onframeList[r](t, e)
                    }
                }
                return i || this._doneCallback(), this
            }, stop: function (t) {
                for (var e = this._clipList, r = this.animation, n = 0; n < e.length; n++) {
                    var i = e[n];
                    t && i.onframe(this._target, 1), r && r.removeClip(i)
                }
                e.length = 0
            }, delay: function (t) {
                return this._delay = t, this
            }, done: function (t) {
                return t && this._doneList.push(t), this
            }, getClips: function () {
                return this._clipList
            }
        };
        var b = w;
        t.exports = b
    }, function (t, e, r) {
        function n(t) {
            this._target = t.target, this._life = t.life || 1e3, this._delay = t.delay || 0, this._initialized = !1, this.loop = null != t.loop && t.loop, this.gap = t.gap || 0, this.easing = t.easing || "Linear", this.onframe = t.onframe, this.ondestroy = t.ondestroy, this.onrestart = t.onrestart, this._pausedTime = 0, this._paused = !1
        }

        var i = r(37);
        n.prototype = {
            constructor: n, step: function (t, e) {
                if (this._initialized || (this._startTime = t + this._delay, this._initialized = !0), this._paused) return void(this._pausedTime += e);
                var r = (t - this._startTime - this._pausedTime) / this._life;
                if (!(r < 0)) {
                    r = Math.min(r, 1);
                    var n = this.easing, a = "string" == typeof n ? i[n] : n, o = "function" == typeof a ? a(r) : r;
                    return this.fire("frame", o), 1 == r ? this.loop ? (this.restart(t), "restart") : (this._needsRemove = !0, "destroy") : null
                }
            }, restart: function (t) {
                var e = (t - this._startTime - this._pausedTime) % this._life;
                this._startTime = t - e + this.gap, this._pausedTime = 0, this._needsRemove = !1
            }, fire: function (t, e) {
                t = "on" + t, this[t] && this[t](this._target, e)
            }, pause: function () {
                this._paused = !0
            }, resume: function () {
                this._paused = !1
            }
        };
        var a = n;
        t.exports = a
    }, function (t, e) {
        var r = {
            linear: function (t) {
                return t
            }, quadraticIn: function (t) {
                return t * t
            }, quadraticOut: function (t) {
                return t * (2 - t)
            }, quadraticInOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1)
            }, cubicIn: function (t) {
                return t * t * t
            }, cubicOut: function (t) {
                return --t * t * t + 1
            }, cubicInOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
            }, quarticIn: function (t) {
                return t * t * t * t
            }, quarticOut: function (t) {
                return 1 - --t * t * t * t
            }, quarticInOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2)
            }, quinticIn: function (t) {
                return t * t * t * t * t
            }, quinticOut: function (t) {
                return --t * t * t * t * t + 1
            }, quinticInOut: function (t) {
                return (t *= 2) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
            }, sinusoidalIn: function (t) {
                return 1 - Math.cos(t * Math.PI / 2)
            }, sinusoidalOut: function (t) {
                return Math.sin(t * Math.PI / 2)
            }, sinusoidalInOut: function (t) {
                return .5 * (1 - Math.cos(Math.PI * t))
            }, exponentialIn: function (t) {
                return 0 === t ? 0 : Math.pow(1024, t - 1)
            }, exponentialOut: function (t) {
                return 1 === t ? 1 : 1 - Math.pow(2, -10 * t)
            }, exponentialInOut: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : (t *= 2) < 1 ? .5 * Math.pow(1024, t - 1) : .5 * (-Math.pow(2, -10 * (t - 1)) + 2)
            }, circularIn: function (t) {
                return 1 - Math.sqrt(1 - t * t)
            }, circularOut: function (t) {
                return Math.sqrt(1 - --t * t)
            }, circularInOut: function (t) {
                return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
            }, elasticIn: function (t) {
                var e, r = .1, n = .4;
                return 0 === t ? 0 : 1 === t ? 1 : (!r || r < 1 ? (r = 1, e = n / 4) : e = n * Math.asin(1 / r) / (2 * Math.PI), -(r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n)))
            }, elasticOut: function (t) {
                var e, r = .1, n = .4;
                return 0 === t ? 0 : 1 === t ? 1 : (!r || r < 1 ? (r = 1, e = n / 4) : e = n * Math.asin(1 / r) / (2 * Math.PI), r * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / n) + 1)
            }, elasticInOut: function (t) {
                var e, r = .1, n = .4;
                return 0 === t ? 0 : 1 === t ? 1 : (!r || r < 1 ? (r = 1, e = n / 4) : e = n * Math.asin(1 / r) / (2 * Math.PI), (t *= 2) < 1 ? -.5 * (r * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n)) : r * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n) * .5 + 1)
            }, backIn: function (t) {
                var e = 1.70158;
                return t * t * ((e + 1) * t - e)
            }, backOut: function (t) {
                var e = 1.70158;
                return --t * t * ((e + 1) * t + e) + 1
            }, backInOut: function (t) {
                var e = 2.5949095;
                return (t *= 2) < 1 ? .5 * (t * t * ((e + 1) * t - e)) : .5 * ((t -= 2) * t * ((e + 1) * t + e) + 2)
            }, bounceIn: function (t) {
                return 1 - r.bounceOut(1 - t)
            }, bounceOut: function (t) {
                return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
            }, bounceInOut: function (t) {
                return t < .5 ? .5 * r.bounceIn(2 * t) : .5 * r.bounceOut(2 * t - 1) + .5
            }
        }, n = r;
        t.exports = n
    }, function (t, e, r) {
        function n(t, e, r, n, i, s, l, h, u) {
            if (0 === l) return !1;
            var c = l;
            h -= t, u -= e;
            var f = Math.sqrt(h * h + u * u);
            if (f - c > r || f + c < r) return !1;
            if (Math.abs(n - i) % o < 1e-4) return !0;
            if (s) {
                var d = n;
                n = a(i), i = a(d)
            } else n = a(n), i = a(i);
            n > i && (i += o);
            var p = Math.atan2(u, h);
            return p < 0 && (p += o), p >= n && p <= i || p + o >= n && p + o <= i
        }

        var i = r(18), a = i.normalizeRadian, o = 2 * Math.PI;
        e.containStroke = n
    }, function (t, e, r) {
        function n(t, e, r, n, a, o, s, l, h, u, c) {
            if (0 === h) return !1;
            var f = h;
            if (c > e + f && c > n + f && c > o + f && c > l + f || c < e - f && c < n - f && c < o - f && c < l - f || u > t + f && u > r + f && u > a + f && u > s + f || u < t - f && u < r - f && u < a - f && u < s - f) return !1;
            var d = i.cubicProjectPoint(t, e, r, n, a, o, s, l, u, c, null);
            return d <= f / 2
        }

        var i = r(5);
        e.containStroke = n
    }, function (t, e) {
        function r(t, e, r, n, i, a, o) {
            if (0 === i) return !1;
            var s = i, l = 0, h = t;
            if (o > e + s && o > n + s || o < e - s && o < n - s || a > t + s && a > r + s || a < t - s && a < r - s) return !1;
            if (t === r) return Math.abs(a - t) <= s / 2;
            l = (e - n) / (t - r), h = (t * n - r * e) / (t - r);
            var u = l * a - o + h, c = u * u / (l * l + 1);
            return c <= s / 2 * s / 2
        }

        e.containStroke = r
    }, function (t, e, r) {
        function n(t, e) {
            return Math.abs(t - e) < b
        }

        function i() {
            var t = T[0];
            T[0] = T[1], T[1] = t
        }

        function a(t, e, r, n, a, o, s, l, h, u) {
            if (u > e && u > n && u > o && u > l || u < e && u < n && u < o && u < l) return 0;
            var c = m.cubicRootAt(e, n, o, l, u, S);
            if (0 === c) return 0;
            for (var f, d, p = 0, v = -1, g = 0; g < c; g++) {
                var y = S[g], x = 0 === y || 1 === y ? .5 : 1, _ = m.cubicAt(t, r, a, s, y);
                _ < h || (v < 0 && (v = m.cubicExtrema(e, n, o, l, T), T[1] < T[0] && v > 1 && i(), f = m.cubicAt(e, n, o, l, T[0]), v > 1 && (d = m.cubicAt(e, n, o, l, T[1]))), p += 2 == v ? y < T[0] ? f < e ? x : -x : y < T[1] ? d < f ? x : -x : l < d ? x : -x : y < T[0] ? f < e ? x : -x : l < f ? x : -x)
            }
            return p
        }

        function o(t, e, r, n, i, a, o, s) {
            if (s > e && s > n && s > a || s < e && s < n && s < a) return 0;
            var l = m.quadraticRootAt(e, n, a, s, S);
            if (0 === l) return 0;
            var h = m.quadraticExtremum(e, n, a);
            if (h >= 0 && h <= 1) {
                for (var u = 0, c = m.quadraticAt(e, n, a, h), f = 0; f < l; f++) {
                    var d = 0 === S[f] || 1 === S[f] ? .5 : 1, p = m.quadraticAt(t, r, i, S[f]);
                    p < o || (u += S[f] < h ? c < e ? d : -d : a < c ? d : -d)
                }
                return u
            }
            var d = 0 === S[0] || 1 === S[0] ? .5 : 1, p = m.quadraticAt(t, r, i, S[0]);
            return p < o ? 0 : a < e ? d : -d
        }

        function s(t, e, r, n, i, a, o, s) {
            if (s -= e, s > r || s < -r) return 0;
            var l = Math.sqrt(r * r - s * s);
            S[0] = -l, S[1] = l;
            var h = Math.abs(n - i);
            if (h < 1e-4) return 0;
            if (h % w < 1e-4) {
                n = 0, i = w;
                var u = a ? 1 : -1;
                return o >= S[0] + t && o <= S[1] + t ? u : 0
            }
            if (a) {
                var l = n;
                n = y(i), i = y(l)
            } else n = y(n), i = y(i);
            n > i && (i += w);
            for (var c = 0, f = 0; f < 2; f++) {
                var d = S[f];
                if (d + t > o) {
                    var p = Math.atan2(s, d), u = a ? 1 : -1;
                    p < 0 && (p = w + p), (p >= n && p <= i || p + w >= n && p + w <= i) && (p > Math.PI / 2 && p < 1.5 * Math.PI && (u = -u), c += u)
                }
            }
            return c
        }

        function l(t, e, r, i, l) {
            for (var h = 0, u = 0, c = 0, g = 0, y = 0, m = 0; m < t.length;) {
                var w = t[m++];
                switch (w === _.M && m > 1 && (r || (h += x(u, c, g, y, i, l))), 1 == m && (u = t[m], c = t[m + 1], g = u, y = c), w) {
                    case _.M:
                        g = t[m++], y = t[m++], u = g, c = y;
                        break;
                    case _.L:
                        if (r) {
                            if (f.containStroke(u, c, t[m], t[m + 1], e, i, l)) return !0
                        } else h += x(u, c, t[m], t[m + 1], i, l) || 0;
                        u = t[m++], c = t[m++];
                        break;
                    case _.C:
                        if (r) {
                            if (d.containStroke(u, c, t[m++], t[m++], t[m++], t[m++], t[m], t[m + 1], e, i, l)) return !0
                        } else h += a(u, c, t[m++], t[m++], t[m++], t[m++], t[m], t[m + 1], i, l) || 0;
                        u = t[m++], c = t[m++];
                        break;
                    case _.Q:
                        if (r) {
                            if (p.containStroke(u, c, t[m++], t[m++], t[m], t[m + 1], e, i, l)) return !0
                        } else h += o(u, c, t[m++], t[m++], t[m], t[m + 1], i, l) || 0;
                        u = t[m++], c = t[m++];
                        break;
                    case _.A:
                        var b = t[m++], S = t[m++], T = t[m++], M = t[m++], k = t[m++], C = t[m++],
                            P = (t[m++], 1 - t[m++]), A = Math.cos(k) * T + b, O = Math.sin(k) * M + S;
                        m > 1 ? h += x(u, c, A, O, i, l) : (g = A, y = O);
                        var D = (i - b) * M / T + b;
                        if (r) {
                            if (v.containStroke(b, S, M, k, k + C, P, e, D, l)) return !0
                        } else h += s(b, S, M, k, k + C, P, D, l);
                        u = Math.cos(k + C) * T + b, c = Math.sin(k + C) * M + S;
                        break;
                    case _.R:
                        g = u = t[m++], y = c = t[m++];
                        var I = t[m++], R = t[m++], A = g + I, O = y + R;
                        if (r) {
                            if (f.containStroke(g, y, A, y, e, i, l) || f.containStroke(A, y, A, O, e, i, l) || f.containStroke(A, O, g, O, e, i, l) || f.containStroke(g, O, g, y, e, i, l)) return !0
                        } else h += x(A, y, A, O, i, l), h += x(g, O, g, y, i, l);
                        break;
                    case _.Z:
                        if (r) {
                            if (f.containStroke(u, c, g, y, e, i, l)) return !0
                        } else h += x(u, c, g, y, i, l);
                        u = g, c = y
                }
            }
            return r || n(c, y) || (h += x(u, c, g, y, i, l) || 0), 0 !== h
        }

        function h(t, e, r) {
            return l(t, 0, !1, e, r)
        }

        function u(t, e, r, n) {
            return l(t, e, !0, r, n)
        }

        var c = r(7), f = r(40), d = r(39), p = r(42), v = r(38), g = r(18), y = g.normalizeRadian, m = r(5), x = r(43),
            _ = c.CMD, w = 2 * Math.PI, b = 1e-4, S = [-1, -1, -1], T = [-1, -1];
        e.contain = h, e.containStroke = u
    }, function (t, e, r) {
        function n(t, e, r, n, i, o, s, l, h) {
            if (0 === s) return !1;
            var u = s;
            if (h > e + u && h > n + u && h > o + u || h < e - u && h < n - u && h < o - u || l > t + u && l > r + u && l > i + u || l < t - u && l < r - u && l < i - u) return !1;
            var c = a(t, e, r, n, i, o, l, h, null);
            return c <= u / 2
        }

        var i = r(5), a = i.quadraticProjectPoint;
        e.containStroke = n
    }, function (t, e) {
        function r(t, e, r, n, i, a) {
            if (a > e && a > n || a < e && a < n) return 0;
            if (n === e) return 0;
            var o = n < e ? 1 : -1, s = (a - e) / (n - e);
            1 !== s && 0 !== s || (o = n < e ? .5 : -.5);
            var l = s * (r - t) + t;
            return l > i ? o : 0
        }

        t.exports = r
    }, function (t, e, r) {
        var n = r(1), i = r(15), a = r(4), o = function (t) {
            t = t || {}, i.call(this, t);
            for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
            this._children = [], this.__storage = null, this.__dirty = !0
        };
        o.prototype = {
            constructor: o, isGroup: !0, type: "group", silent: !1, children: function () {
                return this._children.slice()
            }, childAt: function (t) {
                return this._children[t]
            }, childOfName: function (t) {
                for (var e = this._children, r = 0; r < e.length; r++) if (e[r].name === t) return e[r]
            }, childCount: function () {
                return this._children.length
            }, add: function (t) {
                return t && t !== this && t.parent !== this && (this._children.push(t), this._doAdd(t)), this
            }, addBefore: function (t, e) {
                if (t && t !== this && t.parent !== this && e && e.parent === this) {
                    var r = this._children, n = r.indexOf(e);
                    n >= 0 && (r.splice(n, 0, t), this._doAdd(t))
                }
                return this
            }, _doAdd: function (t) {
                t.parent && t.parent.remove(t), t.parent = this;
                var e = this.__storage, r = this.__zr;
                e && e !== t.__storage && (e.addToStorage(t), t instanceof o && t.addChildrenToStorage(e)), r && r.refresh()
            }, remove: function (t) {
                var e = this.__zr, r = this.__storage, i = this._children, a = n.indexOf(i, t);
                return a < 0 ? this : (i.splice(a, 1), t.parent = null, r && (r.delFromStorage(t), t instanceof o && t.delChildrenFromStorage(r)), e && e.refresh(), this)
            }, removeAll: function () {
                var t, e, r = this._children, n = this.__storage;
                for (e = 0; e < r.length; e++) t = r[e], n && (n.delFromStorage(t), t instanceof o && t.delChildrenFromStorage(n)), t.parent = null;
                return r.length = 0, this
            }, eachChild: function (t, e) {
                for (var r = this._children, n = 0; n < r.length; n++) {
                    var i = r[n];
                    t.call(e, i, n)
                }
                return this
            }, traverse: function (t, e) {
                for (var r = 0; r < this._children.length; r++) {
                    var n = this._children[r];
                    t.call(e, n), "group" === n.type && n.traverse(t, e)
                }
                return this
            }, addChildrenToStorage: function (t) {
                for (var e = 0; e < this._children.length; e++) {
                    var r = this._children[e];
                    t.addToStorage(r), r instanceof o && r.addChildrenToStorage(t)
                }
            }, delChildrenFromStorage: function (t) {
                for (var e = 0; e < this._children.length; e++) {
                    var r = this._children[e];
                    t.delFromStorage(r), r instanceof o && r.delChildrenFromStorage(t)
                }
            }, dirty: function () {
                return this.__dirty = !0, this.__zr && this.__zr.refresh(), this
            }, getBoundingRect: function (t) {
                for (var e = null, r = new a(0, 0, 0, 0), n = t || this._children, i = [], o = 0; o < n.length; o++) {
                    var s = n[o];
                    if (!s.ignore && !s.invisible) {
                        var l = s.getBoundingRect(), h = s.getLocalTransform(i);
                        h ? (r.copy(l), r.applyTransform(h), e = e || r.clone(), e.union(r)) : (e = e || l.clone(), e.union(l))
                    }
                }
                return e || r
            }
        }, n.inherits(o, i);
        var s = o;
        t.exports = s
    }, function (t, e, r) {
        function n(t, e, r) {
            if (0 !== t.length) {
                var n, i = t[0], a = i[0], o = i[0], s = i[1], l = i[1];
                for (n = 1; n < t.length; n++) i = t[n], a = u(a, i[0]), o = c(o, i[0]), s = u(s, i[1]), l = c(l, i[1]);
                e[0] = a, e[1] = s, r[0] = o, r[1] = l
            }
        }

        function i(t, e, r, n, i, a) {
            i[0] = u(t, r), i[1] = u(e, n), a[0] = c(t, r), a[1] = c(e, n)
        }

        function a(t, e, r, n, i, a, o, s, l, f) {
            var d, p = h.cubicExtrema, v = h.cubicAt, g = p(t, r, i, o, m);
            for (l[0] = 1 / 0, l[1] = 1 / 0, f[0] = -(1 / 0), f[1] = -(1 / 0), d = 0; d < g; d++) {
                var y = v(t, r, i, o, m[d]);
                l[0] = u(y, l[0]), f[0] = c(y, f[0])
            }
            for (g = p(e, n, a, s, x), d = 0; d < g; d++) {
                var _ = v(e, n, a, s, x[d]);
                l[1] = u(_, l[1]), f[1] = c(_, f[1])
            }
            l[0] = u(t, l[0]), f[0] = c(t, f[0]), l[0] = u(o, l[0]), f[0] = c(o, f[0]), l[1] = u(e, l[1]), f[1] = c(e, f[1]), l[1] = u(s, l[1]), f[1] = c(s, f[1])
        }

        function o(t, e, r, n, i, a, o, s) {
            var l = h.quadraticExtremum, f = h.quadraticAt, d = c(u(l(t, r, i), 1), 0), p = c(u(l(e, n, a), 1), 0),
                v = f(t, r, i, d), g = f(e, n, a, p);
            o[0] = u(t, i, v), o[1] = u(e, a, g), s[0] = c(t, i, v), s[1] = c(e, a, g)
        }

        function s(t, e, r, n, i, a, o, s, h) {
            var u = l.min, c = l.max, m = Math.abs(i - a);
            if (m % p < 1e-4 && m > 1e-4) return s[0] = t - r, s[1] = e - n, h[0] = t + r, void(h[1] = e + n);
            if (v[0] = d(i) * r + t, v[1] = f(i) * n + e, g[0] = d(a) * r + t, g[1] = f(a) * n + e, u(s, v, g), c(h, v, g), i %= p, i < 0 && (i += p), a %= p, a < 0 && (a += p), i > a && !o ? a += p : i < a && o && (i += p), o) {
                var x = a;
                a = i, i = x
            }
            for (var _ = 0; _ < a; _ += Math.PI / 2) _ > i && (y[0] = d(_) * r + t, y[1] = f(_) * n + e, u(s, y, s), c(h, y, h))
        }

        var l = r(3), h = r(5), u = Math.min, c = Math.max, f = Math.sin, d = Math.cos, p = 2 * Math.PI, v = l.create(),
            g = l.create(), y = l.create(), m = [], x = [];
        e.fromPoints = n, e.fromLine = i, e.fromCubic = a, e.fromQuadratic = o, e.fromArc = s
    }, function (t, e) {
        function r(t) {
            var e = {}, r = {}, n = t.match(/Firefox\/([\d.]+)/),
                i = t.match(/MSIE\s([\d.]+)/) || t.match(/Trident\/.+?rv:(([\d.]+))/), a = t.match(/Edge\/([\d.]+)/),
                o = /micromessenger/i.test(t);
            return n && (r.firefox = !0, r.version = n[1]), i && (r.ie = !0, r.version = i[1]), a && (r.edge = !0, r.version = a[1]), o && (r.weChat = !0), {
                browser: r,
                os: e,
                node: !1,
                canvasSupported: !!document.createElement("canvas").getContext,
                svgSupported: "undefined" != typeof SVGRect,
                touchEventsSupported: "ontouchstart" in window && !r.ie && !r.edge,
                pointerEventsSupported: "onpointerdown" in window && (r.edge || r.ie && r.version >= 11)
            }
        }

        var n = {};
        n = "undefined" != typeof wx ? {
            browser: {},
            os: {},
            node: !1,
            wxa: !0,
            canvasSupported: !0,
            svgSupported: !1,
            touchEventsSupported: !0
        } : "undefined" == typeof document && "undefined" != typeof self ? {
            browser: {},
            os: {},
            node: !1,
            worker: !0,
            canvasSupported: !0
        } : "undefined" == typeof navigator ? {
            browser: {},
            os: {},
            node: !0,
            worker: !1,
            canvasSupported: !0,
            svgSupported: !0
        } : r(navigator.userAgent);
        var i = n;
        t.exports = i
    }, function (t, e) {
        function r() {
            return n++
        }

        var n = 2311;
        t.exports = r
    }, function (t, e, r) {
        var n = r(16), i = n.debugMode, a = function () {
        };
        1 === i ? a = function () {
            for (var t in arguments) throw new Error(arguments[t])
        } : i > 1 && (a = function () {
            for (var t in arguments) console.log(arguments[t])
        });
        var o = a;
        t.exports = o
    }, function (t, e, r) {
        var n = r(2), i = n.extend({
            type: "compound", shape: {paths: null}, _updatePathDirty: function () {
                for (var t = this.__dirtyPath, e = this.shape.paths, r = 0; r < e.length; r++) t = t || e[r].__dirtyPath;
                this.__dirtyPath = t, this.__dirty = this.__dirty || t
            }, beforeBrush: function () {
                this._updatePathDirty();
                for (var t = this.shape.paths || [], e = this.getGlobalScale(), r = 0; r < t.length; r++) t[r].path || t[r].createPathProxy(), t[r].path.setScale(e[0], e[1])
            }, buildPath: function (t, e) {
                for (var r = e.paths || [], n = 0; n < r.length; n++) r[n].buildPath(t, r[n].shape, !0)
            }, afterBrush: function () {
                for (var t = this.shape.paths || [], e = 0; e < t.length; e++) t[e].__dirtyPath = !1
            }, getBoundingRect: function () {
                return this._updatePathDirty(), n.prototype.getBoundingRect.call(this)
            }
        });
        t.exports = i
    }, function (t, e, r) {
        function n(t) {
            i.call(this, t)
        }

        var i = r(8), a = r(4), o = r(1), s = r(11);
        n.prototype = {
            constructor: n, type: "image", brush: function (t, e) {
                var r = this.style, n = r.image;
                r.bind(t, this, e);
                var i = this._image = s.createOrUpdateImage(n, this._image, this, this.onload);
                if (i && s.isImageReady(i)) {
                    var a = r.x || 0, o = r.y || 0, l = r.width, h = r.height, u = i.width / i.height;
                    if (null == l && null != h ? l = h * u : null == h && null != l ? h = l / u : null == l && null == h && (l = i.width, h = i.height), this.setTransform(t), r.sWidth && r.sHeight) {
                        var c = r.sx || 0, f = r.sy || 0;
                        t.drawImage(i, c, f, r.sWidth, r.sHeight, a, o, l, h)
                    } else if (r.sx && r.sy) {
                        var c = r.sx, f = r.sy, d = l - c, p = h - f;
                        t.drawImage(i, c, f, d, p, a, o, l, h)
                    } else t.drawImage(i, a, o, l, h);
                    null != r.text && (this.restoreTransform(t), this.drawRectText(t, this.getBoundingRect()))
                }
            }, getBoundingRect: function () {
                var t = this.style;
                return this._rect || (this._rect = new a(t.x || 0, t.y || 0, t.width || 0, t.height || 0)), this._rect
            }
        }, o.inherits(n, i);
        var l = n;
        t.exports = l
    }, function (t, e, r) {
        function n(t) {
            o.call(this, t), this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.notClear = !0
        }

        var i = r(1), a = i.inherits, o = r(8), s = r(4);
        n.prototype.incremental = !0, n.prototype.clearDisplaybles = function () {
            this._displayables = [], this._temporaryDisplayables = [], this._cursor = 0, this.dirty(), this.notClear = !1
        }, n.prototype.addDisplayable = function (t, e) {
            e ? this._temporaryDisplayables.push(t) : this._displayables.push(t), this.dirty()
        }, n.prototype.addDisplayables = function (t, e) {
            e = e || !1;
            for (var r = 0; r < t.length; r++) this.addDisplayable(t[r], e)
        }, n.prototype.eachPendingDisplayable = function (t) {
            for (var e = this._cursor; e < this._displayables.length; e++) t && t(this._displayables[e]);
            for (var e = 0; e < this._temporaryDisplayables.length; e++) t && t(this._temporaryDisplayables[e])
        }, n.prototype.update = function () {
            this.updateTransform();
            for (var t = this._cursor; t < this._displayables.length; t++) {
                var e = this._displayables[t];
                e.parent = this, e.update(), e.parent = null
            }
            for (var t = 0; t < this._temporaryDisplayables.length; t++) {
                var e = this._temporaryDisplayables[t];
                e.parent = this, e.update(), e.parent = null
            }
        }, n.prototype.brush = function (t, e) {
            for (var r = this._cursor; r < this._displayables.length; r++) {
                var n = this._temporaryDisplayables[r];
                n.beforeBrush && n.beforeBrush(t), n.brush(t, r === this._cursor ? null : this._displayables[r - 1]), n.afterBrush && n.afterBrush(t)
            }
            this._cursor = r;
            for (var r = 0; r < this._temporaryDisplayables.length; r++) {
                var n = this._temporaryDisplayables[r];
                n.beforeBrush && n.beforeBrush(t), n.brush(t, 0 === r ? null : this._temporaryDisplayables[r - 1]), n.afterBrush && n.afterBrush(t)
            }
            this._temporaryDisplayables = [], this.notClear = !0
        };
        var l = [];
        n.prototype.getBoundingRect = function () {
            if (!this._rect) {
                for (var t = new s(1 / 0, 1 / 0, -(1 / 0), -(1 / 0)), e = 0; e < this._displayables.length; e++) {
                    var r = this._displayables[e], n = r.getBoundingRect().clone();
                    r.needLocalTransform() && n.applyTransform(r.getLocalTransform(l)), t.union(n)
                }
                this._rect = t
            }
            return this._rect
        }, n.prototype.contain = function (t, e) {
            var r = this.transformCoordToLocal(t, e), n = this.getBoundingRect();
            if (n.contain(r[0], r[1])) for (var i = 0; i < this._displayables.length; i++) {
                var a = this._displayables[i];
                if (a.contain(t, e)) return !0
            }
            return !1
        }, a(n, o);
        var h = n;
        t.exports = h
    }, function (t, e, r) {
        var n = r(1), i = r(20), a = function (t, e, r, n, a, o) {
            this.x = null == t ? 0 : t, this.y = null == e ? 0 : e, this.x2 = null == r ? 1 : r, this.y2 = null == n ? 0 : n, this.type = "linear", this.global = o || !1, i.call(this, a)
        };
        a.prototype = {constructor: a}, n.inherits(a, i);
        var o = a;
        t.exports = o
    }, function (t, e) {
        var r = function (t, e) {
            this.image = t, this.repeat = e, this.type = "pattern"
        };
        r.prototype.getCanvasPattern = function (t) {
            return t.createPattern(this.image, this.repeat || "repeat")
        };
        var n = r;
        t.exports = n
    }, function (t, e, r) {
        var n = r(1), i = r(20), a = function (t, e, r, n, a) {
            this.x = null == t ? .5 : t, this.y = null == e ? .5 : e, this.r = null == r ? .5 : r, this.type = "radial", this.global = a || !1, i.call(this, n)
        };
        a.prototype = {constructor: a}, n.inherits(a, i);
        var o = a;
        t.exports = o
    }, function (t, e, r) {
        function n(t, e, r) {
            var n = null == e.x ? 0 : e.x, i = null == e.x2 ? 1 : e.x2, a = null == e.y ? 0 : e.y,
                o = null == e.y2 ? 0 : e.y2;
            e.global || (n = n * r.width + r.x, i = i * r.width + r.x, a = a * r.height + r.y, o = o * r.height + r.y);
            var s = t.createLinearGradient(n, a, i, o);
            return s
        }

        function i(t, e, r) {
            var n = r.width, i = r.height, a = Math.min(n, i), o = null == e.x ? .5 : e.x, s = null == e.y ? .5 : e.y,
                l = null == e.r ? .5 : e.r;
            e.global || (o = o * n + r.x, s = s * i + r.y, l *= a);
            var h = t.createRadialGradient(o, s, 0, o, s, l);
            return h
        }

        var a = r(21),
            o = [["shadowBlur", 0], ["shadowOffsetX", 0], ["shadowOffsetY", 0], ["shadowColor", "#000"], ["lineCap", "butt"], ["lineJoin", "miter"], ["miterLimit", 10]],
            s = function (t, e) {
                this.extendFrom(t, !1), this.host = e
            };
        s.prototype = {
            constructor: s,
            host: null,
            fill: "#000",
            stroke: null,
            opacity: 1,
            lineDash: null,
            lineDashOffset: 0,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            lineWidth: 1,
            strokeNoScale: !1,
            text: null,
            font: null,
            textFont: null,
            fontStyle: null,
            fontWeight: null,
            fontSize: null,
            fontFamily: null,
            textTag: null,
            textFill: "#000",
            textStroke: null,
            textWidth: null,
            textHeight: null,
            textStrokeWidth: 0,
            textLineHeight: null,
            textPosition: "inside",
            textRect: null,
            textOffset: null,
            textAlign: null,
            textVerticalAlign: null,
            textDistance: 5,
            textShadowColor: "transparent",
            textShadowBlur: 0,
            textShadowOffsetX: 0,
            textShadowOffsetY: 0,
            textBoxShadowColor: "transparent",
            textBoxShadowBlur: 0,
            textBoxShadowOffsetX: 0,
            textBoxShadowOffsetY: 0,
            transformText: !1,
            textRotation: 0,
            textOrigin: null,
            textBackgroundColor: null,
            textBorderColor: null,
            textBorderWidth: 0,
            textBorderRadius: 0,
            textPadding: null,
            rich: null,
            truncate: null,
            blend: null,
            bind: function (t, e, r) {
                for (var n = this, i = r && r.style, s = !i, l = 0; l < o.length; l++) {
                    var h = o[l], u = h[0];
                    (s || n[u] !== i[u]) && (t[u] = a(t, u, n[u] || h[1]))
                }
                if ((s || n.fill !== i.fill) && (t.fillStyle = n.fill), (s || n.stroke !== i.stroke) && (t.strokeStyle = n.stroke), (s || n.opacity !== i.opacity) && (t.globalAlpha = null == n.opacity ? 1 : n.opacity), (s || n.blend !== i.blend) && (t.globalCompositeOperation = n.blend || "source-over"), this.hasStroke()) {
                    var c = n.lineWidth;
                    t.lineWidth = c / (this.strokeNoScale && e && e.getLineScale ? e.getLineScale() : 1)
                }
            },
            hasFill: function () {
                var t = this.fill;
                return null != t && "none" !== t
            },
            hasStroke: function () {
                var t = this.stroke;
                return null != t && "none" !== t && this.lineWidth > 0
            },
            extendFrom: function (t, e) {
                if (t) for (var r in t) !t.hasOwnProperty(r) || e !== !0 && (e === !1 ? this.hasOwnProperty(r) : null == t[r]) || (this[r] = t[r])
            },
            set: function (t, e) {
                "string" == typeof t ? this[t] = e : this.extendFrom(t, !0)
            },
            clone: function () {
                var t = new this.constructor;
                return t.extendFrom(this, !0), t
            },
            getGradient: function (t, e, r) {
                for (var a = "radial" === e.type ? i : n, o = a(t, e, r), s = e.colorStops, l = 0; l < s.length; l++) o.addColorStop(s[l].offset, s[l].color);
                return o
            }
        };
        for (var l = s.prototype, h = 0; h < o.length; h++) {
            var u = o[h];
            u[0] in l || (l[u[0]] = u[1])
        }
        s.getGradient = l.getGradient;
        var c = s;
        t.exports = c
    }, function (t, e, r) {
        var n = r(8), i = r(1), a = r(17), o = r(24), s = function (t) {
            n.call(this, t)
        };
        s.prototype = {
            constructor: s, type: "text", brush: function (t, e) {
                var r = this.style;
                this.__dirty && o.normalizeTextStyle(r, !0), r.fill = r.stroke = r.shadowBlur = r.shadowColor = r.shadowOffsetX = r.shadowOffsetY = null;
                var n = r.text;
                null != n && (n += ""), r.bind(t, this, e), o.needDrawText(n, r) && (this.setTransform(t), o.renderText(this, t, n, r), this.restoreTransform(t))
            }, getBoundingRect: function () {
                var t = this.style;
                if (this.__dirty && o.normalizeTextStyle(t, !0), !this._rect) {
                    var e = t.text;
                    null != e ? e += "" : e = "";
                    var r = a.getBoundingRect(t.text + "", t.font, t.textAlign, t.textVerticalAlign, t.textPadding, t.rich);
                    if (r.x += t.x || 0, r.y += t.y || 0, o.getStroke(t.textStroke, t.textStrokeWidth)) {
                        var n = t.textStrokeWidth;
                        r.x -= n / 2, r.y -= n / 2, r.width += n, r.height += n
                    }
                    this._rect = r
                }
                return this._rect
            }
        }, i.inherits(s, n);
        var l = s;
        t.exports = l
    }, function (t, e, r) {
        function n(t) {
            return i.browser.ie && i.browser.version >= 11 ? function () {
                var e, r = this.__clipPaths, n = this.style;
                if (r) for (var i = 0; i < r.length; i++) {
                    var o = r[i], s = o && o.shape, l = o && o.type;
                    if (s && ("sector" === l && s.startAngle === s.endAngle || "rect" === l && (!s.width || !s.height))) {
                        for (var h = 0; h < a.length; h++) a[h][2] = n[a[h][0]], n[a[h][0]] = a[h][1];
                        e = !0;
                        break
                    }
                }
                if (t.apply(this, arguments), e) for (var h = 0; h < a.length; h++) n[a[h][0]] = a[h][2]
            } : t
        }

        var i = r(46), a = [["shadowBlur", 0], ["shadowColor", "#000"], ["shadowOffsetX", 0], ["shadowOffsetY", 0]];
        t.exports = n
    }, function (t, e, r) {
        function n(t, e, r, n) {
            var i, f, d, p, v = [], g = [], y = [], m = [];
            if (n) {
                d = [1 / 0, 1 / 0], p = [-(1 / 0), -(1 / 0)];
                for (var x = 0, _ = t.length; x < _; x++) a(d, d, t[x]), o(p, p, t[x]);
                a(d, d, n[0]), o(p, p, n[1])
            }
            for (var x = 0, _ = t.length; x < _; x++) {
                var w = t[x];
                if (r) i = t[x ? x - 1 : _ - 1], f = t[(x + 1) % _]; else {
                    if (0 === x || x === _ - 1) {
                        v.push(u(t[x]));
                        continue
                    }
                    i = t[x - 1], f = t[x + 1]
                }
                c(g, f, i), s(g, g, e);
                var b = l(w, i), S = l(w, f), T = b + S;
                0 !== T && (b /= T, S /= T), s(y, g, -b), s(m, g, S);
                var M = h([], w, y), k = h([], w, m);
                n && (o(M, M, d), a(M, M, p), o(k, k, d), a(k, k, p)), v.push(M), v.push(k)
            }
            return r && v.push(v.shift()), v
        }

        var i = r(3), a = i.min, o = i.max, s = i.scale, l = i.distance, h = i.add, u = i.clone, c = i.sub;
        t.exports = n
    }, function (t, e, r) {
        function n(t, e, r, n, i, a, o) {
            var s = .5 * (r - t), l = .5 * (n - e);
            return (2 * (e - r) + s + l) * o + (-3 * (e - r) - 2 * s - l) * a + s * i + e
        }

        function i(t, e) {
            for (var r = t.length, i = [], a = 0, s = 1; s < r; s++) a += o(t[s - 1], t[s]);
            var l = a / 2;
            l = l < r ? r : l;
            for (var s = 0; s < l; s++) {
                var h, u, c, f = s / (l - 1) * (e ? r : r - 1), d = Math.floor(f), p = f - d, v = t[d % r];
                e ? (h = t[(d - 1 + r) % r], u = t[(d + 1) % r], c = t[(d + 2) % r]) : (h = t[0 === d ? d : d - 1], u = t[d > r - 2 ? r - 1 : d + 1], c = t[d > r - 3 ? r - 1 : d + 2]);
                var g = p * p, y = p * g;
                i.push([n(h[0], v[0], u[0], c[0], p, g, y), n(h[1], v[1], u[1], c[1], p, g, y)])
            }
            return i
        }

        var a = r(3), o = a.distance;
        t.exports = i
    }, function (t, e, r) {
        var n = r(24), i = r(4), a = new i, o = function () {
        };
        o.prototype = {
            constructor: o, drawRectText: function (t, e) {
                var r = this.style;
                e = r.textRect || e, this.__dirty && n.normalizeTextStyle(r, !0);
                var i = r.text;
                if (null != i && (i += ""), n.needDrawText(i, r)) {
                    t.save();
                    var o = this.transform;
                    r.transformText ? this.setTransform(t) : o && (a.copy(e), a.applyTransform(o), e = a), n.renderText(this, t, i, r, e), t.restore()
                }
            }
        };
        var s = o;
        t.exports = s
    }, function (t, e, r) {
        var n = r(2), i = n.extend({
            type: "arc",
            shape: {cx: 0, cy: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0},
            style: {stroke: "#000", fill: null},
            buildPath: function (t, e) {
                var r = e.cx, n = e.cy, i = Math.max(e.r, 0), a = e.startAngle, o = e.endAngle, s = e.clockwise,
                    l = Math.cos(a), h = Math.sin(a);
                t.moveTo(l * i + r, h * i + n), t.arc(r, n, i, a, o, !s)
            }
        });
        t.exports = i
    }, function (t, e, r) {
        function n(t, e, r) {
            var n = t.cpx2, i = t.cpy2;
            return null === n || null === i ? [(r ? f : u)(t.x1, t.cpx1, t.cpx2, t.x2, e), (r ? f : u)(t.y1, t.cpy1, t.cpy2, t.y2, e)] : [(r ? c : h)(t.x1, t.cpx1, t.x2, e), (r ? c : h)(t.y1, t.cpy1, t.y2, e)]
        }

        var i = r(2), a = r(3), o = r(5), s = o.quadraticSubdivide, l = o.cubicSubdivide, h = o.quadraticAt,
            u = o.cubicAt, c = o.quadraticDerivativeAt, f = o.cubicDerivativeAt, d = [], p = i.extend({
                type: "bezier-curve",
                shape: {x1: 0, y1: 0, x2: 0, y2: 0, cpx1: 0, cpy1: 0, percent: 1},
                style: {stroke: "#000", fill: null},
                buildPath: function (t, e) {
                    var r = e.x1, n = e.y1, i = e.x2, a = e.y2, o = e.cpx1, h = e.cpy1, u = e.cpx2, c = e.cpy2,
                        f = e.percent;
                    0 !== f && (t.moveTo(r, n), null == u || null == c ? (f < 1 && (s(r, o, i, f, d), o = d[1], i = d[2], s(n, h, a, f, d), h = d[1], a = d[2]), t.quadraticCurveTo(o, h, i, a)) : (f < 1 && (l(r, o, u, i, f, d), o = d[1], u = d[2], i = d[3], l(n, h, c, a, f, d), h = d[1], c = d[2], a = d[3]), t.bezierCurveTo(o, h, u, c, i, a)))
                },
                pointAt: function (t) {
                    return n(this.shape, t, !1)
                },
                tangentAt: function (t) {
                    var e = n(this.shape, t, !0);
                    return a.normalize(e, e)
                }
            });
        t.exports = p
    }, function (t, e, r) {
        var n = r(2), i = n.extend({
            type: "circle", shape: {cx: 0, cy: 0, r: 0}, buildPath: function (t, e, r) {
                r && t.moveTo(e.cx + e.r, e.cy), t.arc(e.cx, e.cy, e.r, 0, 2 * Math.PI, !0)
            }
        });
        t.exports = i
    }, function (t, e, r) {
        var n = r(2), i = n.extend({
            type: "line",
            shape: {x1: 0, y1: 0, x2: 0, y2: 0, percent: 1},
            style: {stroke: "#000", fill: null},
            buildPath: function (t, e) {
                var r = e.x1, n = e.y1, i = e.x2, a = e.y2, o = e.percent;
                0 !== o && (t.moveTo(r, n), o < 1 && (i = r * (1 - o) + i * o, a = n * (1 - o) + a * o), t.lineTo(i, a))
            },
            pointAt: function (t) {
                var e = this.shape;
                return [e.x1 * (1 - t) + e.x2 * t, e.y1 * (1 - t) + e.y2 * t]
            }
        });
        t.exports = i
    }, function (t, e, r) {
        var n = r(2), i = r(22), a = n.extend({
            type: "polygon",
            shape: {points: null, smooth: !1, smoothConstraint: null},
            buildPath: function (t, e) {
                i.buildPath(t, e, !0)
            }
        });
        t.exports = a
    }, function (t, e, r) {
        var n = r(2), i = r(22), a = n.extend({
            type: "polyline",
            shape: {points: null, smooth: !1, smoothConstraint: null},
            style: {stroke: "#000", fill: null},
            buildPath: function (t, e) {
                i.buildPath(t, e, !1)
            }
        });
        t.exports = a
    }, function (t, e, r) {
        var n = r(2), i = r(23), a = n.extend({
            type: "rect", shape: {r: 0, x: 0, y: 0, width: 0, height: 0}, buildPath: function (t, e) {
                var r = e.x, n = e.y, a = e.width, o = e.height;
                e.r ? i.buildPath(t, e) : t.rect(r, n, a, o), t.closePath()
            }
        });
        t.exports = a
    }, function (t, e, r) {
        var n = r(2), i = n.extend({
            type: "ring", shape: {cx: 0, cy: 0, r: 0, r0: 0}, buildPath: function (t, e) {
                var r = e.cx, n = e.cy, i = 2 * Math.PI;
                t.moveTo(r + e.r, n), t.arc(r, n, e.r, 0, i, !1), t.moveTo(r + e.r0, n), t.arc(r, n, e.r0, 0, i, !0)
            }
        });
        t.exports = i
    }, function (t, e, r) {
        var n = r(2), i = r(57), a = n.extend({
            type: "sector",
            shape: {cx: 0, cy: 0, r0: 0, r: 0, startAngle: 0, endAngle: 2 * Math.PI, clockwise: !0},
            brush: i(n.prototype.brush),
            buildPath: function (t, e) {
                var r = e.cx, n = e.cy, i = Math.max(e.r0 || 0, 0), a = Math.max(e.r, 0), o = e.startAngle,
                    s = e.endAngle, l = e.clockwise, h = Math.cos(o), u = Math.sin(o);
                t.moveTo(h * i + r, u * i + n), t.lineTo(h * a + r, u * a + n), t.arc(r, n, a, o, s, !l), t.lineTo(Math.cos(s) * i + r, Math.sin(s) * i + n), 0 !== i && t.arc(r, n, i, s, o, l), t.closePath()
            }
        });
        t.exports = a
    }, function (t, e, r) {
        var n = r(35), i = r(48), a = r(1), o = a.isString, s = a.isFunction, l = a.isObject, h = a.isArrayLike,
            u = a.indexOf, c = function () {
                this.animators = []
            };
        c.prototype = {
            constructor: c, animate: function (t, e) {
                var r, a = !1, o = this, s = this.__zr;
                if (t) {
                    var l = t.split("."), h = o;
                    a = "shape" === l[0];
                    for (var c = 0, f = l.length; c < f; c++) h && (h = h[l[c]]);
                    h && (r = h)
                } else r = o;
                if (!r) return void i('Property "' + t + '" is not existed in element ' + o.id);
                var d = o.animators, p = new n(r, e);
                return p.during(function (t) {
                    o.dirty(a)
                }).done(function () {
                    d.splice(u(d, p), 1)
                }), d.push(p), s && s.animation.addAnimator(p), p
            }, stopAnimation: function (t) {
                for (var e = this.animators, r = e.length, n = 0; n < r; n++) e[n].stop(t);
                return e.length = 0, this
            }, animateTo: function (t, e, r, n, i, a) {
                function l() {
                    u--, u || i && i()
                }

                o(r) ? (i = n, n = r, r = 0) : s(n) ? (i = n, n = "linear", r = 0) : s(r) ? (i = r, r = 0) : s(e) ? (i = e, e = 500) : e || (e = 500), this.stopAnimation(), this._animateToShallow("", this, t, e, r);
                var h = this.animators.slice(), u = h.length;
                u || i && i();
                for (var c = 0; c < h.length; c++) h[c].done(l).start(n, a)
            }, _animateToShallow: function (t, e, r, n, i) {
                var a = {}, o = 0;
                for (var s in r) if (r.hasOwnProperty(s)) if (null != e[s]) l(r[s]) && !h(r[s]) ? this._animateToShallow(t ? t + "." + s : s, e[s], r[s], n, i) : (a[s] = r[s], o++); else if (null != r[s]) if (t) {
                    var u = {};
                    u[t] = {}, u[t][s] = r[s], this.attr(u)
                } else this.attr(s, r[s]);
                return o > 0 && this.animate(t, !1).when(null == n ? 500 : n, a).delay(i || 0), this
            }
        };
        var f = c;
        t.exports = f
    }, function (t, e) {
        var r = Array.prototype.slice, n = function () {
            this._$handlers = {}
        };
        n.prototype = {
            constructor: n, one: function (t, e, r) {
                var n = this._$handlers;
                if (!e || !t) return this;
                n[t] || (n[t] = []);
                for (var i = 0; i < n[t].length; i++) if (n[t][i].h === e) return this;
                return n[t].push({h: e, one: !0, ctx: r || this}), this
            }, on: function (t, e, r) {
                var n = this._$handlers;
                if (!e || !t) return this;
                n[t] || (n[t] = []);
                for (var i = 0; i < n[t].length; i++) if (n[t][i].h === e) return this;
                return n[t].push({h: e, one: !1, ctx: r || this}), this
            }, isSilent: function (t) {
                var e = this._$handlers;
                return e[t] && e[t].length
            }, off: function (t, e) {
                var r = this._$handlers;
                if (!t) return this._$handlers = {}, this;
                if (e) {
                    if (r[t]) {
                        for (var n = [], i = 0, a = r[t].length; i < a; i++) r[t][i].h != e && n.push(r[t][i]);
                        r[t] = n
                    }
                    r[t] && 0 === r[t].length && delete r[t]
                } else delete r[t];
                return this
            }, trigger: function (t) {
                if (this._$handlers[t]) {
                    var e = arguments, n = e.length;
                    n > 3 && (e = r.call(e, 1));
                    for (var i = this._$handlers[t], a = i.length, o = 0; o < a;) {
                        switch (n) {
                            case 1:
                                i[o].h.call(i[o].ctx);
                                break;
                            case 2:
                                i[o].h.call(i[o].ctx, e[1]);
                                break;
                            case 3:
                                i[o].h.call(i[o].ctx, e[1], e[2]);
                                break;
                            default:
                                i[o].h.apply(i[o].ctx, e)
                        }
                        i[o].one ? (i.splice(o, 1), a--) : o++
                    }
                }
                return this
            }, triggerWithContext: function (t) {
                if (this._$handlers[t]) {
                    var e = arguments, n = e.length;
                    n > 4 && (e = r.call(e, 1, e.length - 1));
                    for (var i = e[e.length - 1], a = this._$handlers[t], o = a.length, s = 0; s < o;) {
                        switch (n) {
                            case 1:
                                a[s].h.call(i);
                                break;
                            case 2:
                                a[s].h.call(i, e[1]);
                                break;
                            case 3:
                                a[s].h.call(i, e[1], e[2]);
                                break;
                            default:
                                a[s].h.apply(i, e)
                        }
                        a[s].one ? (a.splice(s, 1), o--) : s++
                    }
                }
                return this
            }
        };
        var i = n;
        t.exports = i
    }, function (t, e, r) {
        function n(t, e, r, n, i, a, o, s, l, h, u) {
            var c = l * (g / 180), f = v(c) * (t - r) / 2 + p(c) * (e - n) / 2,
                y = -1 * p(c) * (t - r) / 2 + v(c) * (e - n) / 2, _ = f * f / (o * o) + y * y / (s * s);
            _ > 1 && (o *= d(_), s *= d(_));
            var w = (i === a ? -1 : 1) * d((o * o * (s * s) - o * o * (y * y) - s * s * (f * f)) / (o * o * (y * y) + s * s * (f * f))) || 0,
                b = w * o * y / s, S = w * -s * f / o, T = (t + r) / 2 + v(c) * b - p(c) * S,
                M = (e + n) / 2 + p(c) * b + v(c) * S, k = x([1, 0], [(f - b) / o, (y - S) / s]),
                C = [(f - b) / o, (y - S) / s], P = [(-1 * f - b) / o, (-1 * y - S) / s], A = x(C, P);
            m(C, P) <= -1 && (A = g), m(C, P) >= 1 && (A = 0), 0 === a && A > 0 && (A -= 2 * g), 1 === a && A < 0 && (A += 2 * g), u.addData(h, T, M, o, s, k, A, c, a)
        }

        function i(t) {
            if (!t) return [];
            var e, r = t.replace(/-/g, " -").replace(/  /g, " ").replace(/ /g, ",").replace(/,,/g, ",");
            for (e = 0; e < f.length; e++) r = r.replace(new RegExp(f[e], "g"), "|" + f[e]);
            var i, a = r.split("|"), o = 0, s = 0, l = new u, h = u.CMD;
            for (e = 1; e < a.length; e++) {
                var c, d = a[e], p = d.charAt(0), v = 0, g = d.slice(1).replace(/e,-/g, "e-").split(",");
                g.length > 0 && "" === g[0] && g.shift();
                for (var y = 0; y < g.length; y++) g[y] = parseFloat(g[y]);
                for (; v < g.length && !isNaN(g[v]) && !isNaN(g[0]);) {
                    var m, x, _, w, b, S, T, M = o, k = s;
                    switch (p) {
                        case"l":
                            o += g[v++], s += g[v++], c = h.L, l.addData(c, o, s);
                            break;
                        case"L":
                            o = g[v++], s = g[v++], c = h.L, l.addData(c, o, s);
                            break;
                        case"m":
                            o += g[v++], s += g[v++], c = h.M, l.addData(c, o, s), p = "l";
                            break;
                        case"M":
                            o = g[v++], s = g[v++], c = h.M, l.addData(c, o, s), p = "L";
                            break;
                        case"h":
                            o += g[v++], c = h.L, l.addData(c, o, s);
                            break;
                        case"H":
                            o = g[v++], c = h.L, l.addData(c, o, s);
                            break;
                        case"v":
                            s += g[v++], c = h.L, l.addData(c, o, s);
                            break;
                        case"V":
                            s = g[v++], c = h.L, l.addData(c, o, s);
                            break;
                        case"C":
                            c = h.C, l.addData(c, g[v++], g[v++], g[v++], g[v++], g[v++], g[v++]), o = g[v - 2], s = g[v - 1];
                            break;
                        case"c":
                            c = h.C, l.addData(c, g[v++] + o, g[v++] + s, g[v++] + o, g[v++] + s, g[v++] + o, g[v++] + s), o += g[v - 2], s += g[v - 1];
                            break;
                        case"S":
                            m = o, x = s;
                            var C = l.len(), P = l.data;
                            i === h.C && (m += o - P[C - 4], x += s - P[C - 3]), c = h.C, M = g[v++], k = g[v++], o = g[v++], s = g[v++], l.addData(c, m, x, M, k, o, s);
                            break;
                        case"s":
                            m = o, x = s;
                            var C = l.len(), P = l.data;
                            i === h.C && (m += o - P[C - 4], x += s - P[C - 3]), c = h.C, M = o + g[v++], k = s + g[v++], o += g[v++], s += g[v++], l.addData(c, m, x, M, k, o, s);
                            break;
                        case"Q":
                            M = g[v++], k = g[v++], o = g[v++], s = g[v++], c = h.Q, l.addData(c, M, k, o, s);
                            break;
                        case"q":
                            M = g[v++] + o, k = g[v++] + s, o += g[v++], s += g[v++], c = h.Q, l.addData(c, M, k, o, s);
                            break;
                        case"T":
                            m = o, x = s;
                            var C = l.len(), P = l.data;
                            i === h.Q && (m += o - P[C - 4], x += s - P[C - 3]), o = g[v++], s = g[v++], c = h.Q, l.addData(c, m, x, o, s);
                            break;
                        case"t":
                            m = o, x = s;
                            var C = l.len(), P = l.data;
                            i === h.Q && (m += o - P[C - 4], x += s - P[C - 3]), o += g[v++], s += g[v++], c = h.Q, l.addData(c, m, x, o, s);
                            break;
                        case"A":
                            _ = g[v++], w = g[v++], b = g[v++], S = g[v++], T = g[v++], M = o, k = s, o = g[v++], s = g[v++], c = h.A, n(M, k, o, s, S, T, _, w, b, c, l);
                            break;
                        case"a":
                            _ = g[v++], w = g[v++], b = g[v++], S = g[v++], T = g[v++], M = o, k = s, o += g[v++], s += g[v++], c = h.A, n(M, k, o, s, S, T, _, w, b, c, l)
                    }
                }
                "z" !== p && "Z" !== p || (c = h.Z, l.addData(c)), i = c
            }
            return l.toStatic(), l
        }

        function a(t, e) {
            var r = i(t);
            return e = e || {}, e.buildPath = function (t) {
                if (t.setData) {
                    t.setData(r.data);
                    var e = t.getContext();
                    e && t.rebuildPath(e)
                } else {
                    var e = t;
                    r.rebuildPath(e)
                }
            }, e.applyTransform = function (t) {
                c(r, t), this.dirty(!0)
            }, e
        }

        function o(t, e) {
            return new h(a(t, e))
        }

        function s(t, e) {
            return h.extend(a(t, e))
        }

        function l(t, e) {
            for (var r = [], n = t.length, i = 0; i < n; i++) {
                var a = t[i];
                a.path || a.createPathProxy(), a.__dirtyPath && a.buildPath(a.path, a.shape, !0), r.push(a.path)
            }
            var o = new h(e);
            return o.createPathProxy(), o.buildPath = function (t) {
                t.appendPath(r);
                var e = t.getContext();
                e && t.rebuildPath(e)
            }, o
        }

        var h = r(2), u = r(7), c = r(73),
            f = ["m", "M", "l", "L", "v", "V", "h", "H", "z", "Z", "c", "C", "q", "Q", "t", "T", "s", "S", "a", "A"],
            d = Math.sqrt, p = Math.sin, v = Math.cos, g = Math.PI, y = function (t) {
                return Math.sqrt(t[0] * t[0] + t[1] * t[1])
            }, m = function (t, e) {
                return (t[0] * e[0] + t[1] * e[1]) / (y(t) * y(e))
            }, x = function (t, e) {
                return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(m(t, e))
            };
        e.createFromString = o, e.extendFromString = s, e.mergePath = l
    }, function (t, e, r) {
        function n(t, e) {
            var r, n, i, a, c, f, d = t.data, p = s.M, v = s.C, g = s.L, y = s.R, m = s.A, x = s.Q;
            for (i = 0, a = 0; i < d.length;) {
                switch (r = d[i++], a = i, n = 0, r) {
                    case p:
                        n = 1;
                        break;
                    case g:
                        n = 1;
                        break;
                    case v:
                        n = 3;
                        break;
                    case x:
                        n = 2;
                        break;
                    case m:
                        var _ = e[4], w = e[5], b = h(e[0] * e[0] + e[1] * e[1]), S = h(e[2] * e[2] + e[3] * e[3]),
                            T = u(-e[1] / S, e[0] / b);
                        d[i] *= b, d[i++] += _, d[i] *= S, d[i++] += w, d[i++] *= b, d[i++] *= S, d[i++] += T, d[i++] += T, i += 2, a = i;
                        break;
                    case y:
                        f[0] = d[i++], f[1] = d[i++], o(f, f, e), d[a++] = f[0], d[a++] = f[1], f[0] += d[i++], f[1] += d[i++], o(f, f, e), d[a++] = f[0], d[a++] = f[1]
                }
                for (c = 0; c < n; c++) {
                    var f = l[c];
                    f[0] = d[i++], f[1] = d[i++], o(f, f, e), d[a++] = f[0], d[a++] = f[1]
                }
            }
        }

        var i = r(7), a = r(3), o = a.applyTransform, s = i.CMD, l = [[], [], []], h = Math.sqrt, u = Math.atan2;
        t.exports = n
    }, function (t, e, r) {
        var n = r(9);
        r(76), r(77), n.registerVisual(n.util.curry(r(34), "liquidFill"))
    }, function (t, e, r) {
        function n(t, e, r, n) {
            return 0 === e ? [[t + .5 * r / Math.PI / 2, n / 2], [t + .5 * r / Math.PI, n], [t + r / 4, n]] : 1 === e ? [[t + .5 * r / Math.PI / 2 * (Math.PI - 2), n], [t + .5 * r / Math.PI / 2 * (Math.PI - 1), n / 2], [t + r / 4, 0]] : 2 === e ? [[t + .5 * r / Math.PI / 2, -n / 2], [t + .5 * r / Math.PI, -n], [t + r / 4, -n]] : [[t + .5 * r / Math.PI / 2 * (Math.PI - 2), -n], [t + .5 * r / Math.PI / 2 * (Math.PI - 1), -n / 2], [t + r / 4, 0]]
        }

        var i = r(9);
        t.exports = i.graphic.extendShape({
            type: "ec-liquid-fill",
            shape: {waveLength: 0, radius: 0, cx: 0, cy: 0, waterLevel: 0, amplitude: 0, phase: 0, inverse: !1},
            buildPath: function (t, e) {
                for (var r = Math.max(2 * Math.ceil(2 * e.radius / e.waveLength * 4), 8); e.phase < 2 * -Math.PI;) e.phase += 2 * Math.PI;
                for (; e.phase > 0;) e.phase -= 2 * Math.PI;
                var i = e.phase / Math.PI / 2 * e.waveLength, a = e.cx - e.radius + i - 2 * e.radius;
                t.moveTo(a, e.waterLevel);
                for (var o = 0, s = 0; s < r; ++s) {
                    var l = s % 4, h = n(s * e.waveLength / 4, l, e.waveLength, e.amplitude);
                    t.bezierCurveTo(h[0][0] + a, -h[0][1] + e.waterLevel, h[1][0] + a, -h[1][1] + e.waterLevel, h[2][0] + a, -h[2][1] + e.waterLevel), s === r - 1 && (o = h[2][0])
                }
                e.inverse ? (t.lineTo(o + a, e.cy - e.radius), t.lineTo(a, e.cy - e.radius), t.lineTo(a, e.waterLevel)) : (t.lineTo(o + a, e.cy + e.radius), t.lineTo(a, e.cy + e.radius), t.lineTo(a, e.waterLevel)), t.closePath()
            }
        })
    }, function (t, e, r) {
        var n = r(27), i = r(9);
        i.extendSeriesModel({
            type: "series.liquidFill",
            visualColorAccessPath: "textStyle.normal.color",
            optionUpdated: function () {
                var t = this.option;
                t.gridSize = Math.max(Math.floor(t.gridSize), 4)
            },
            getInitialData: function (t, e) {
                var r = n(["value"], t.data), a = new i.List(r, this);
                return a.initData(t.data), a
            },
            defaultOption: {
                color: ["#294D99", "#156ACF", "#1598ED", "#45BDFF"],
                center: ["50%", "50%"],
                radius: "50%",
                amplitude: "8%",
                waveLength: "80%",
                phase: "auto",
                period: "auto",
                direction: "right",
                shape: "circle",
                waveAnimation: !0,
                animationEasing: "linear",
                animationEasingUpdate: "linear",
                animationDuration: 2e3,
                animationDurationUpdate: 1e3,
                outline: {
                    show: !0,
                    borderDistance: 8,
                    itemStyle: {
                        color: "none",
                        borderColor: "#294D99",
                        borderWidth: 8,
                        shadowBlur: 20,
                        shadowColor: "rgba(0, 0, 0, 0.25)"
                    }
                },
                backgroundStyle: {color: "#E3F7FF"},
                itemStyle: {opacity: .95, shadowBlur: 50, shadowColor: "rgba(0, 0, 0, 0.4)"},
                label: {
                    show: !0,
                    color: "#294D99",
                    insideColor: "#fff",
                    fontSize: 50,
                    fontWeight: "bold",
                    align: "center",
                    baseline: "middle",
                    position: "inside"
                },
                emphasis: {itemStyle: {opacity: .8}}
            }
        })
    }, function (t, e, r) {
        var n = r(9), i = n.number, a = r(33), o = i.parsePercent, s = r(75);
        n.extendChartView({
            type: "liquidFill", render: function (t, e, r) {
                function i(t, e) {
                    if (O) {
                        if (0 === O.indexOf("path://")) {
                            var r = n.graphic.makePath(O.slice(7), {}), i = r.getBoundingRect(), o = i.width,
                                s = i.height;
                            o > s ? (s *= 2 * t / o, o = 2 * t) : (o *= 2 * t / s, s = 2 * t);
                            var l = e ? 0 : C - o / 2, h = e ? 0 : P - s / 2;
                            return r = n.graphic.makePath(O.slice(7), {}, new n.graphic.BoundingRect(l, h, o, s)), e && (r.position = [-o / 2, -s / 2]), r
                        }
                        if (A) {
                            var u = e ? -t[0] : C - t[0], c = e ? -t[1] : P - t[1];
                            return a.createSymbol("rect", u, c, 2 * t[0], 2 * t[1])
                        }
                        var u = e ? -t : C - t, c = e ? -t : P - t;
                        return "pin" === O ? c += t : "arrow" === O && (c -= t), a.createSymbol(O, u, c, 2 * t, 2 * t)
                    }
                    return new n.graphic.Circle({shape: {cx: e ? 0 : C, cy: e ? 0 : P, r: t}})
                }

                function l() {
                    var e = i(T);
                    return e.style.fill = null, e.setStyle(t.getModel("outline.itemStyle").getItemStyle()), e
                }

                function h() {
                    var e = i(y);
                    e.setStyle(t.getModel("backgroundStyle").getItemStyle()), e.style.fill = null, e.z2 = 5;
                    var r = i(y);
                    r.setStyle(t.getModel("backgroundStyle").getItemStyle()), r.style.stroke = null;
                    var a = new n.graphic.Group;
                    return a.add(e), a.add(r), a
                }

                function u(e, r, a) {
                    var l = A ? y[0] : y, h = A ? y[1] : y, u = p.getItemModel(e), c = u.getModel("itemStyle"),
                        f = u.get("phase"), d = o(u.get("amplitude"), 2 * h), v = o(u.get("waveLength"), 2 * l),
                        g = p.get("value", e), m = h - g * h * 2;
                    f = a ? a.shape.phase : "auto" === f ? e * Math.PI / 4 : f;
                    var x = c.getItemStyle();
                    if (!x.fill) {
                        var _ = t.get("color"), w = e % _.length;
                        x.fill = _[w]
                    }
                    var b = 2 * l, S = new s({
                        shape: {
                            waveLength: v,
                            radius: l,
                            cx: b,
                            cy: 0,
                            waterLevel: m,
                            amplitude: d,
                            phase: f,
                            inverse: r
                        }, style: x, position: [C, P]
                    });
                    S.shape._waterLevel = m;
                    var T = u.getModel("emphasis.itemStyle").getItemStyle();
                    T.lineWidth = 0, n.graphic.setHoverStyle(S, T);
                    var M = i(y, !0);
                    return M.setStyle({fill: "white"}), S.setClipPath(M), S
                }

                function c(t, e, r) {
                    var n = p.getItemModel(t), i = n.get("period"), a = n.get("direction"), o = p.get("value", t),
                        s = n.get("phase");
                    s = r ? r.shape.phase : "auto" === s ? t * Math.PI / 4 : s;
                    var l = function (e) {
                        var r = p.count();
                        return 0 === r ? e : e * (.2 + (r - t) / r * .8)
                    }, h = 0;
                    h = "auto" === i ? l(5e3) : "function" == typeof i ? i(o, t) : i;
                    var u = 0;
                    "right" === a || null == a ? u = Math.PI : "left" === a ? u = -Math.PI : "none" === a ? u = 0 : console.error("Illegal direction value for liquid fill."), "none" !== a && n.get("waveAnimation") && e.animate("shape", !0).when(0, {phase: s}).when(h / 2, {phase: u + s}).when(h, {phase: 2 * u + s}).during(function () {
                        B && B.dirty(!0)
                    }).start()
                }

                function f(e) {
                    function r() {
                        var e = t.getFormattedLabel(0, "normal"), r = 100 * p.get("value", 0),
                            n = p.getName(0) || t.name;
                        return isNaN(r) || (n = r.toFixed(0) + "%"), null == e ? n : e
                    }

                    var a = v.getModel("label"), o = {
                        z2: 10,
                        shape: {x: I, y: R, width: 2 * (A ? y[0] : y), height: 2 * (A ? y[1] : y)},
                        style: {
                            fill: "transparent",
                            text: r(),
                            textAlign: a.get("align"),
                            textVerticalAlign: a.get("baseline")
                        },
                        silent: !0
                    }, s = new n.graphic.Rect(o), l = a.get("color");
                    n.graphic.setText(s.style, a, l);
                    var h = new n.graphic.Rect(o), u = a.get("insideColor");
                    n.graphic.setText(h.style, a, u), h.style.textFill = u;
                    var c = new n.graphic.Group;
                    c.add(s), c.add(h);
                    var f = i(y, !0);
                    return B = new n.graphic.CompoundPath({
                        shape: {paths: e},
                        position: [C, P]
                    }), B.setClipPath(f), h.setClipPath(B), c
                }

                var d = this.group;
                d.removeAll();
                var p = t.getData(), v = p.getItemModel(0), g = v.get("center"), y = v.get("radius"), m = r.getWidth(),
                    x = r.getHeight(), _ = Math.min(m, x), w = 0, b = 0, S = t.get("outline.show");
                S && (w = t.get("outline.borderDistance"), b = o(t.get("outline.itemStyle.borderWidth"), _));
                var T, M, k, C = o(g[0], m), P = o(g[1], x), A = !1, O = t.get("shape");
                if ("container" === O ? (A = !0, T = [m / 2, x / 2], M = [T[0] - b / 2, T[1] - b / 2], k = [o(w, m), o(w, x)], y = [M[0] - k[0], M[1] - k[1]]) : (T = o(y, _) / 2, M = T - b / 2, k = o(w, _), y = M - k), S) {
                    var D = l();
                    D.style.lineWidth = b, d.add(l())
                }
                var I = A ? 0 : C - y, R = A ? 0 : P - y, B = null;
                d.add(h());
                var L = this._data, F = [];
                p.diff(L).add(function (e) {
                    var r = u(e, !1), i = r.shape.waterLevel;
                    r.shape.waterLevel = A ? y[1] : y, n.graphic.initProps(r, {shape: {waterLevel: i}}, t), r.z2 = 2, c(e, r, null), d.add(r), p.setItemGraphicEl(e, r), F.push(r)
                }).update(function (e, r) {
                    var i = L.getItemGraphicEl(r), a = u(e, !1, i), o = Object.assign({}, a.shape),
                        s = Object.assign({}, a.style);
                    s.host = null, n.graphic.updateProps(i, {
                        shape: o,
                        style: s
                    }, t), i.position = a.position, i.setClipPath(a.clipPath), c(e, i, i), d.add(i), p.setItemGraphicEl(e, i), F.push(i)
                }).remove(function (t) {
                    var e = L.getItemGraphicEl(t);
                    d.remove(e)
                }).execute(), v.get("label.show") && d.add(f(F)), this._data = p
            }, dispose: function () {
            }
        })
    }])
});
//# sourceMappingURL=echarts-liquidfill.min.js.map