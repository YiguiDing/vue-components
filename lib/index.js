import { defineComponent as le, mergeModels as ve, useModel as pe, ref as K, watchEffect as me, onMounted as X, onUpdated as ce, resolveComponent as ye, openBlock as L, createElementBlock as E, createElementVNode as C, toDisplayString as U, createCommentVNode as re, normalizeStyle as ne, unref as ae, Fragment as G, renderList as te, normalizeClass as ge, createVNode as $e, withCtx as ie, renderSlot as de, pushScopeId as Me, popScopeId as be, createStaticVNode as we, onBeforeUnmount as se } from "vue";
function De(p) {
  return p && p.__esModule && Object.prototype.hasOwnProperty.call(p, "default") ? p.default : p;
}
var Se = { exports: {} };
const ue = De(Se.exports = function() {
  var p = 1e3, M = 6e4, T = 36e5, g = "millisecond", u = "second", y = "minute", b = "hour", S = "day", h = "week", f = "month", x = "quarter", m = "year", v = "date", _ = "Invalid Date", A = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, Y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, F = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(r) {
    var n = ["th", "st", "nd", "rd"], e = r % 100;
    return "[" + r + (n[(e - 20) % 10] || n[e] || n[0]) + "]";
  } }, R = function(r, n, e) {
    var a = String(r);
    return !a || a.length >= n ? r : "" + Array(n + 1 - a.length).join(e) + r;
  }, J = { s: R, z: function(r) {
    var n = -r.utcOffset(), e = Math.abs(n), a = Math.floor(e / 60), t = e % 60;
    return (n <= 0 ? "+" : "-") + R(a, 2, "0") + ":" + R(t, 2, "0");
  }, m: function r(n, e) {
    if (n.date() < e.date())
      return -r(e, n);
    var a = 12 * (e.year() - n.year()) + (e.month() - n.month()), t = n.clone().add(a, f), i = e - t < 0, s = n.clone().add(a + (i ? -1 : 1), f);
    return +(-(a + (e - t) / (i ? t - s : s - t)) || 0);
  }, a: function(r) {
    return r < 0 ? Math.ceil(r) || 0 : Math.floor(r);
  }, p: function(r) {
    return { M: f, y: m, w: h, d: S, D: v, h: b, m: y, s: u, ms: g, Q: x }[r] || String(r || "").toLowerCase().replace(/s$/, "");
  }, u: function(r) {
    return r === void 0;
  } }, H = "en", w = {};
  w[H] = F;
  var q = "$isDayjsObject", W = function(r) {
    return r instanceof B || !(!r || !r[q]);
  }, O = function r(n, e, a) {
    var t;
    if (!n)
      return H;
    if (typeof n == "string") {
      var i = n.toLowerCase();
      w[i] && (t = i), e && (w[i] = e, t = i);
      var s = n.split("-");
      if (!t && s.length > 1)
        return r(s[0]);
    } else {
      var l = n.name;
      w[l] = n, t = l;
    }
    return !a && t && (H = t), t || !a && H;
  }, d = function(r, n) {
    if (W(r))
      return r.clone();
    var e = typeof n == "object" ? n : {};
    return e.date = r, e.args = arguments, new B(e);
  }, o = J;
  o.l = O, o.i = W, o.w = function(r, n) {
    return d(r, { locale: n.$L, utc: n.$u, x: n.$x, $offset: n.$offset });
  };
  var B = function() {
    function r(e) {
      this.$L = O(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[q] = !0;
    }
    var n = r.prototype;
    return n.parse = function(e) {
      this.$d = function(a) {
        var t = a.date, i = a.utc;
        if (t === null)
          return /* @__PURE__ */ new Date(NaN);
        if (o.u(t))
          return /* @__PURE__ */ new Date();
        if (t instanceof Date)
          return new Date(t);
        if (typeof t == "string" && !/Z$/i.test(t)) {
          var s = t.match(A);
          if (s) {
            var l = s[2] - 1 || 0, c = (s[7] || "0").substring(0, 3);
            return i ? new Date(Date.UTC(s[1], l, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, c)) : new Date(s[1], l, s[3] || 1, s[4] || 0, s[5] || 0, s[6] || 0, c);
          }
        }
        return new Date(t);
      }(e), this.init();
    }, n.init = function() {
      var e = this.$d;
      this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
    }, n.$utils = function() {
      return o;
    }, n.isValid = function() {
      return this.$d.toString() !== _;
    }, n.isSame = function(e, a) {
      var t = d(e);
      return this.startOf(a) <= t && t <= this.endOf(a);
    }, n.isAfter = function(e, a) {
      return d(e) < this.startOf(a);
    }, n.isBefore = function(e, a) {
      return this.endOf(a) < d(e);
    }, n.$g = function(e, a, t) {
      return o.u(e) ? this[a] : this.set(t, e);
    }, n.unix = function() {
      return Math.floor(this.valueOf() / 1e3);
    }, n.valueOf = function() {
      return this.$d.getTime();
    }, n.startOf = function(e, a) {
      var t = this, i = !!o.u(a) || a, s = o.p(e), l = function(V, k) {
        var z = o.w(t.$u ? Date.UTC(t.$y, k, V) : new Date(t.$y, k, V), t);
        return i ? z : z.endOf(S);
      }, c = function(V, k) {
        return o.w(t.toDate()[V].apply(t.toDate("s"), (i ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(k)), t);
      }, $ = this.$W, D = this.$M, N = this.$D, j = "set" + (this.$u ? "UTC" : "");
      switch (s) {
        case m:
          return i ? l(1, 0) : l(31, 11);
        case f:
          return i ? l(1, D) : l(0, D + 1);
        case h:
          var P = this.$locale().weekStart || 0, Z = ($ < P ? $ + 7 : $) - P;
          return l(i ? N - Z : N + (6 - Z), D);
        case S:
        case v:
          return c(j + "Hours", 0);
        case b:
          return c(j + "Minutes", 1);
        case y:
          return c(j + "Seconds", 2);
        case u:
          return c(j + "Milliseconds", 3);
        default:
          return this.clone();
      }
    }, n.endOf = function(e) {
      return this.startOf(e, !1);
    }, n.$set = function(e, a) {
      var t, i = o.p(e), s = "set" + (this.$u ? "UTC" : ""), l = (t = {}, t[S] = s + "Date", t[v] = s + "Date", t[f] = s + "Month", t[m] = s + "FullYear", t[b] = s + "Hours", t[y] = s + "Minutes", t[u] = s + "Seconds", t[g] = s + "Milliseconds", t)[i], c = i === S ? this.$D + (a - this.$W) : a;
      if (i === f || i === m) {
        var $ = this.clone().set(v, 1);
        $.$d[l](c), $.init(), this.$d = $.set(v, Math.min(this.$D, $.daysInMonth())).$d;
      } else
        l && this.$d[l](c);
      return this.init(), this;
    }, n.set = function(e, a) {
      return this.clone().$set(e, a);
    }, n.get = function(e) {
      return this[o.p(e)]();
    }, n.add = function(e, a) {
      var t, i = this;
      e = Number(e);
      var s = o.p(a), l = function(D) {
        var N = d(i);
        return o.w(N.date(N.date() + Math.round(D * e)), i);
      };
      if (s === f)
        return this.set(f, this.$M + e);
      if (s === m)
        return this.set(m, this.$y + e);
      if (s === S)
        return l(1);
      if (s === h)
        return l(7);
      var c = (t = {}, t[y] = M, t[b] = T, t[u] = p, t)[s] || 1, $ = this.$d.getTime() + e * c;
      return o.w($, this);
    }, n.subtract = function(e, a) {
      return this.add(-1 * e, a);
    }, n.format = function(e) {
      var a = this, t = this.$locale();
      if (!this.isValid())
        return t.invalidDate || _;
      var i = e || "YYYY-MM-DDTHH:mm:ssZ", s = o.z(this), l = this.$H, c = this.$m, $ = this.$M, D = t.weekdays, N = t.months, j = t.meridiem, P = function(k, z, Q, ee) {
        return k && (k[z] || k(a, i)) || Q[z].slice(0, ee);
      }, Z = function(k) {
        return o.s(l % 12 || 12, k, "0");
      }, V = j || function(k, z, Q) {
        var ee = k < 12 ? "AM" : "PM";
        return Q ? ee.toLowerCase() : ee;
      };
      return i.replace(Y, function(k, z) {
        return z || function(Q) {
          switch (Q) {
            case "YY":
              return String(a.$y).slice(-2);
            case "YYYY":
              return o.s(a.$y, 4, "0");
            case "M":
              return $ + 1;
            case "MM":
              return o.s($ + 1, 2, "0");
            case "MMM":
              return P(t.monthsShort, $, N, 3);
            case "MMMM":
              return P(N, $);
            case "D":
              return a.$D;
            case "DD":
              return o.s(a.$D, 2, "0");
            case "d":
              return String(a.$W);
            case "dd":
              return P(t.weekdaysMin, a.$W, D, 2);
            case "ddd":
              return P(t.weekdaysShort, a.$W, D, 3);
            case "dddd":
              return D[a.$W];
            case "H":
              return String(l);
            case "HH":
              return o.s(l, 2, "0");
            case "h":
              return Z(1);
            case "hh":
              return Z(2);
            case "a":
              return V(l, c, !0);
            case "A":
              return V(l, c, !1);
            case "m":
              return String(c);
            case "mm":
              return o.s(c, 2, "0");
            case "s":
              return String(a.$s);
            case "ss":
              return o.s(a.$s, 2, "0");
            case "SSS":
              return o.s(a.$ms, 3, "0");
            case "Z":
              return s;
          }
          return null;
        }(k) || s.replace(":", "");
      });
    }, n.utcOffset = function() {
      return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
    }, n.diff = function(e, a, t) {
      var i, s = this, l = o.p(a), c = d(e), $ = (c.utcOffset() - this.utcOffset()) * M, D = this - c, N = function() {
        return o.m(s, c);
      };
      switch (l) {
        case m:
          i = N() / 12;
          break;
        case f:
          i = N();
          break;
        case x:
          i = N() / 3;
          break;
        case h:
          i = (D - $) / 6048e5;
          break;
        case S:
          i = (D - $) / 864e5;
          break;
        case b:
          i = D / T;
          break;
        case y:
          i = D / M;
          break;
        case u:
          i = D / p;
          break;
        default:
          i = D;
      }
      return t ? i : o.a(i);
    }, n.daysInMonth = function() {
      return this.endOf(f).$D;
    }, n.$locale = function() {
      return w[this.$L];
    }, n.locale = function(e, a) {
      if (!e)
        return this.$L;
      var t = this.clone(), i = O(e, a, !0);
      return i && (t.$L = i), t;
    }, n.clone = function() {
      return o.w(this.$d, this);
    }, n.toDate = function() {
      return new Date(this.valueOf());
    }, n.toJSON = function() {
      return this.isValid() ? this.toISOString() : null;
    }, n.toISOString = function() {
      return this.$d.toISOString();
    }, n.toString = function() {
      return this.$d.toUTCString();
    }, r;
  }(), I = B.prototype;
  return d.prototype = I, [["$ms", g], ["$s", u], ["$m", y], ["$H", b], ["$W", S], ["$M", f], ["$y", m], ["$D", v]].forEach(function(r) {
    I[r[1]] = function(n) {
      return this.$g(n, r[0], r[1]);
    };
  }), d.extend = function(r, n) {
    return r.$i || (r(n, B, d), r.$i = !0), d;
  }, d.locale = O, d.isDayjs = W, d.unix = function(r) {
    return d(1e3 * r);
  }, d.en = w[H], d.Ls = w, d.p = {}, d;
}()), fe = (p) => (Me("data-v-71fb554a"), p = p(), be(), p), xe = { class: "calendar" }, _e = { key: 0, class: "titleName" }, ke = { class: "yearName" }, Oe = { class: "brick" }, Ne = [fe(() => C("div", { style: { opacity: "0" } }, "_", -1))], Le = ["id"], Ee = { key: 0, class: "monthName" }, Ce = { class: "content" }, We = { class: "title" }, Te = { class: "slot-box-wrapper" }, Ye = { class: "box" }, He = { class: "text" }, Ae = { class: "brick" }, ze = [fe(() => C("div", { style: { opacity: "0" } }, "_", -1))], he = (p, M) => {
  const T = p.__vccOpts || p;
  for (const [g, u] of M)
    T[g] = u;
  return T;
}, Pe = he(le({ __name: "Calendar", props: ve({ enableAutoResize: { type: Boolean, default: !1, required: !1 } }, { modelValue: { required: !1, local: !0 } }), emits: ["update:modelValue"], setup(p) {
  const M = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"], T = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], g = pe(p, "modelValue", { local: !0 }), u = K({ fullYear: 0, bricksDivColNum: 0, calendarDivColNum: 0, prefixWiteSpaceNum: 0, suffixWiteSpaceNum: 0, map: /* @__PURE__ */ new Map() });
  let y = K(18);
  me(function() {
    var h;
    document.body.style.setProperty("--brick-box-width", y.value + "px"), document.body.style.setProperty("--brick-box-fntsz", 0.8 * y.value + "px"), function(f) {
      let x = f ? ue().set("year", f) : ue(), m = x.startOf("year").startOf("day"), v = x.endOf("year").startOf("day");
      u.value.map = /* @__PURE__ */ new Map();
      for (let Y = m; Y.isBefore(v) || Y.isSame(v); Y = Y.add(1, "day")) {
        let F = Y.toDate();
        u.value.map.set(F.toLocaleDateString(), { date: F });
      }
      u.value.fullYear = x.get("year");
      let _ = (m.get("day") == 0 ? 7 : m.get("day")) - 1, A = 7 - (v.get("day") == 0 ? 7 : v.get("day"));
      u.value.prefixWiteSpaceNum = _, u.value.suffixWiteSpaceNum = A, u.value.bricksDivColNum = Math.ceil((u.value.map.size + _ + A) / 7), u.value.calendarDivColNum = u.value.bricksDivColNum + 4 + 1;
    }((h = g == null ? void 0 : g.value) == null ? void 0 : h.year), function() {
      var f;
      if ((f = g.value) != null && f.styleMap)
        for (let { 0: x, 1: m } of g.value.styleMap.entries())
          u.value.map.has(x) && (u.value.map.get(x).style = m);
    }();
  });
  let b = K(void 0);
  function S() {
    if (b.value) {
      let h = 0;
      h = b.value.clientWidth / u.value.calendarDivColNum, h = Math.max(15, Math.min(20, h)), y.value = Math.floor(h);
    }
  }
  return p.enableAutoResize && (X(S), X(() => window.addEventListener("resize", S)), ce(() => window.addEventListener("resize", S))), (h, f) => {
    var m;
    const x = ye("lay-tooltip");
    return L(), E("div", { class: "calendar-wrapper", ref_key: "calWrpElRef", ref: b }, [C("div", xe, [(m = g.value) != null && m.title ? (L(), E("h2", _e, U(g.value.title), 1)) : re("", !0), C("div", { class: "bricks", style: ne({ minWidth: u.value.bricksDivColNum * ae(y) + "px", minHeight: 7 * ae(y) + "px" }) }, [C("div", ke, U(u.value.fullYear + "年"), 1), (L(), E(G, null, te(7, (v) => C("div", { class: "weekName", style: ne({ top: (v - 1) * ae(y) + "px" }) }, U(M[v - 1]), 5)), 64)), (L(!0), E(G, null, te(u.value.prefixWiteSpaceNum, (v) => (L(), E("div", Oe, Ne))), 256)), (L(!0), E(G, null, te(u.value.map, ({ 0: v, 1: _ }, A) => (L(), E("div", { class: ge(["brick", { differentMonth: _.date.getMonth() % 2 == 1 }]), id: v }, [_.date.getDate() == 1 ? (L(), E("div", Ee, U(T[_.date.getMonth()]), 1)) : re("", !0), $e(x, { position: "bottom", enterable: !1 }, { content: ie(() => [C("div", Ce, [C("span", We, U(_.date.toLocaleDateString()), 1), C("div", Te, [de(h.$slots, "default", { date: v }, void 0, !0)])])]), default: ie(() => [C("div", Ye, [C("div", { class: "style", style: ne(_.style) }, null, 4), C("div", He, U(_.date.getDate()), 1)])]), _: 2 }, 1024)], 10, Le))), 256)), (L(!0), E(G, null, te(u.value.suffixWiteSpaceNum, (v) => (L(), E("div", Ae, ze))), 256))], 4)])], 512);
  };
} }), [["__scopeId", "data-v-71fb554a"]]), Be = we('<div class="test-item" style="height:200px;" data-v-7b4bca99>1</div><div class="test-item" style="height:400px;" data-v-7b4bca99>2</div><div class="test-item" style="height:300px;" data-v-7b4bca99>3</div><div class="test-item" style="height:300px;" data-v-7b4bca99>4</div><div class="test-item" style="height:200px;" data-v-7b4bca99>5</div><div class="test-item" style="height:100px;" data-v-7b4bca99>6</div>', 6), oe = "jsFluidLayout:Refresh", Ve = he(le({ __name: "WaterFlowLayout", props: { equalEachMargin: { type: Boolean }, minEqualEachMargin: {}, verticalLeftAlign: { type: Boolean }, childMarginBottom: {}, childMarginRight: {}, parentPaddingTop: {}, parentPaddingLef: {}, parentPaddingBot: {}, testing: { type: Boolean } }, setup(p) {
  const M = p;
  let T, g = 0, u = 0, y = 0, b = 0, S = K("100%"), h = [0], f = [0], x = M.childMarginBottom || 0, m = M.childMarginRight || 0, v = M.minEqualEachMargin || 0, _ = M.parentPaddingTop || 0, A = M.parentPaddingLef || 0, Y = M.parentPaddingBot || 0, F = M.equalEachMargin || !1, R = M.verticalLeftAlign || !1, J = 0, H = 0, w = K();
  function q() {
    var o;
    b = w.value.clientWidth, y = ((o = w.value.firstElementChild) == null ? void 0 : o.clientWidth) || b, g = Math.max(1, Math.floor(b / y)), u = Math.min(g, w.value.childElementCount);
    let O = (b - u * y) / (u + 1);
    F && (g > 1 && O <= v && (u -= 1, O = (b - u * y) / (u + 1)), H = O - m, J = O - A, R && g > w.value.childElementCount && (H = 0, J = 0)), h = new Array(u).fill(0), f = new Array(u).fill(0);
    let d = 0;
    w.value.childNodes.forEach((B) => {
      if (B.nodeType != Node.ELEMENT_NODE)
        return;
      let I = B, r = 0, n = h[r];
      for (let l = 0; l < h.length; l++) {
        const c = h[l];
        n > c && (r = l, n = c);
      }
      let e = r, a = f[e], t = h[e], i = _ + t + a * x, s = A + e * y + e * m + (J + e * H);
      I.style.top = i + "px", I.style.left = s + "px", h[e] += I.offsetHeight, f[e] += 1, d = Math.max(d, i + I.offsetHeight + x);
    }), S.value = d + Y + "px";
  }
  function W() {
    clearTimeout(T), setTimeout(() => {
      requestAnimationFrame(function() {
        q();
      });
    }, 100);
  }
  return X(() => {
    w.value.addEventListener(oe, q);
  }), se(() => {
    w.value.removeEventListener(oe, q);
  }), X(() => {
    window.addEventListener("resize", W);
  }), se(() => {
    window.removeEventListener("resize", W);
  }), X(W), ce(W), (O, d) => (L(), E("div", { ref_key: "parent", ref: w, class: "fluid-wrapper common-scrollbar", style: ne({ height: ae(S) }), onMouseenter: W, onMouseleave: W, onInput: W }, [O.testing ? (L(), E(G, { key: 1 }, [Be], 64)) : de(O.$slots, "default", { key: 0 }, void 0, !0)], 36));
} }), [["__scopeId", "data-v-7b4bca99"]]);
export {
  Pe as Calendar,
  Ve as WaterFlowLayout
};
