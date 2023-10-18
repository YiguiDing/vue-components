import { defineComponent as j, ref as A, onMounted as M, onUpdated as D, openBlock as F, createElementBlock as N, normalizeStyle as V, unref as $, renderSlot as G, Fragment as J, createStaticVNode as K, onBeforeUnmount as C } from "vue";
const Q = K('<div class="test-item" style="height:200px;" data-v-d2809885>1</div><div class="test-item" style="height:400px;" data-v-d2809885>2</div><div class="test-item" style="height:300px;" data-v-d2809885>3</div><div class="test-item" style="height:300px;" data-v-d2809885>4</div><div class="test-item" style="height:200px;" data-v-d2809885>5</div><div class="test-item" style="height:100px;" data-v-d2809885>6</div>', 6), R = "jsFluidLayout:Refresh", Y = ((c, e) => {
  const v = c.__vccOpts || c;
  for (const [o, t] of e)
    v[o] = t;
  return v;
})(j({ __name: "WaterFlowLayout", props: { equalEachMargin: { type: Boolean }, minEqualEachMargin: {}, verticalLeftAlign: { type: Boolean }, childMarginBottom: {}, childMarginRight: {}, parentPaddingTop: {}, parentPaddingLef: {}, parentPaddingBot: {}, testing: { type: Boolean } }, setup(c) {
  const e = c;
  let v, o = 0, t = 0, d = 0, r = 0, x = A("100%"), s = [0], m = [0], L = e.childMarginBottom || 0, B = e.childMarginRight || 0, W = e.minEqualEachMargin || 0, z = e.parentPaddingTop || 0, w = e.parentPaddingLef || 0, S = e.parentPaddingBot || 0, H = e.equalEachMargin || !1, I = e.verticalLeftAlign || !1, g = 0, f = 0, a = A();
  function y() {
    var _;
    r = a.value.clientWidth, d = ((_ = a.value.firstElementChild) == null ? void 0 : _.clientWidth) || r, o = Math.max(1, Math.floor(r / d)), t = Math.min(o, a.value.childElementCount);
    let n = (r - t * d) / (t + 1);
    H && (o > 1 && n <= W && (t -= 1, n = (r - t * d) / (t + 1)), f = n - B, g = n - w, I && o > a.value.childElementCount && (f = 0, g = 0)), s = new Array(t).fill(0), m = new Array(t).fill(0);
    let h = 0;
    a.value.childNodes.forEach((P) => {
      if (P.nodeType != Node.ELEMENT_NODE)
        return;
      let u = P, E = 0, T = s[E];
      for (let p = 0; p < s.length; p++) {
        const q = s[p];
        T > q && (E = p, T = q);
      }
      let l = E, O = m[l], U = s[l], k = z + U + O * L, b = w + l * d + l * B + (g + l * f);
      u.style.top = k + "px", u.style.left = b + "px", s[l] += u.scrollHeight, m[l] += 1, h = Math.max(h, k + u.scrollHeight + L);
    }), x.value = h + S + "px";
  }
  function i() {
    clearTimeout(v), setTimeout(() => {
      requestAnimationFrame(function() {
        y();
      });
    }, 100);
  }
  return M(() => {
    a.value.addEventListener(R, y);
  }), C(() => {
    a.value.removeEventListener(R, y);
  }), M(() => {
    window.addEventListener("resize", i);
  }), C(() => {
    window.removeEventListener("resize", i);
  }), M(i), D(i), (n, h) => (F(), N("div", { ref_key: "parent", ref: a, class: "fluid-wrapper common-scrollbar", style: V({ height: $(x) }), onMouseenter: i, onMouseleave: i, onInput: i }, [n.testing ? (F(), N(J, { key: 1 }, [Q], 64)) : G(n.$slots, "default", { key: 0 }, void 0, !0)], 36));
} }), [["__scopeId", "data-v-d2809885"]]);
export {
  Y as WaterFlowLayout
};
