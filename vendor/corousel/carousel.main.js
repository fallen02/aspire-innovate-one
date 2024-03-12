!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((n =
        "undefined" != typeof globalThis
          ? globalThis
          : n || self).EmblaCarousel = t());
})(this, function () {
  "use strict";
  function n(n) {
    return "number" == typeof n;
  }
  function t(n) {
    return "string" == typeof n;
  }
  function e(n) {
    return "boolean" == typeof n;
  }
  function r(n) {
    return "[object Object]" === Object.prototype.toString.call(n);
  }
  function o(n) {
    return Math.abs(n);
  }
  function i(n) {
    return Math.sign(n);
  }
  function c(n, t) {
    return o(n - t);
  }
  function u(n) {
    return f(n).map(Number);
  }
  function s(n) {
    return n[a(n)];
  }
  function a(n) {
    return Math.max(0, n.length - 1);
  }
  function l(n, t) {
    return t === a(n);
  }
  function d(n, t = 0) {
    return Array.from(Array(n), (n, e) => t + e);
  }
  function f(n) {
    return Object.keys(n);
  }
  function p(n, t) {
    return [n, t].reduce(
      (n, t) => (
        f(t).forEach((e) => {
          const o = n[e],
            i = t[e],
            c = r(o) && r(i);
          n[e] = c ? p(o, i) : i;
        }),
        n
      ),
      {}
    );
  }
  function m(n, t) {
    return void 0 !== t.MouseEvent && n instanceof t.MouseEvent;
  }
  function g() {
    let n = [];
    const t = {
      add: function (e, r, o, i = { passive: !0 }) {
        let c;
        if ("addEventListener" in e)
          e.addEventListener(r, o, i),
            (c = () => e.removeEventListener(r, o, i));
        else {
          const n = e;
          n.addListener(o), (c = () => n.removeListener(o));
        }
        return n.push(c), t;
      },
      clear: function () {
        n = n.filter((n) => n());
      },
    };
    return t;
  }
  function h(n, t, e, r) {
    const i = g(),
      c = 1e3 / 60;
    let u = null,
      s = 0,
      a = 0;
    function l(n) {
      u || (u = n);
      const i = n - u;
      for (u = n, s += i; s >= c; ) e(), (s -= c);
      const d = o(s / c);
      r(d), a && t.requestAnimationFrame(l);
    }
    function d() {
      t.cancelAnimationFrame(a), (u = null), (s = 0), (a = 0);
    }
    return {
      init: function () {
        i.add(n, "visibilitychange", () => {
          n.hidden && ((u = null), (s = 0));
        });
      },
      destroy: function () {
        d(), i.clear();
      },
      start: function () {
        a || (a = t.requestAnimationFrame(l));
      },
      stop: d,
      update: e,
      render: r,
    };
  }
  function x(n = 0, t = 0) {
    const e = o(n - t);
    function r(t) {
      return t < n;
    }
    function i(n) {
      return n > t;
    }
    function c(n) {
      return r(n) || i(n);
    }
    return {
      length: e,
      max: t,
      min: n,
      constrain: function (e) {
        return c(e) ? (r(e) ? n : t) : e;
      },
      reachedAny: c,
      reachedMax: i,
      reachedMin: r,
      removeOffset: function (n) {
        return e ? n - e * Math.ceil((n - t) / e) : n;
      },
    };
  }
  function y(n, t, e) {
    const { constrain: r } = x(0, n),
      i = n + 1;
    let c = u(t);
    function u(n) {
      return e ? o((i + n) % i) : r(n);
    }
    function s() {
      return c;
    }
    function a() {
      return y(n, s(), e);
    }
    const l = {
      get: s,
      set: function (n) {
        return (c = u(n)), l;
      },
      add: function (n) {
        return a().set(s() + n);
      },
      clone: a,
    };
    return l;
  }
  function v(n, t, r, u, s, a, l, d, f, p, h, y, v, b, S, w, E, L, D, I) {
    const { cross: A } = n,
      M = ["INPUT", "SELECT", "TEXTAREA"],
      T = { passive: !1 },
      O = g(),
      F = g(),
      P = x(50, 225).constrain(S.measure(20)),
      z = { mouse: 300, touch: 400 },
      H = { mouse: 500, touch: 600 },
      k = w ? 43 : 25;
    let V = !1,
      B = 0,
      N = 0,
      R = !1,
      C = !1,
      j = !1,
      G = !1;
    function q(n) {
      const e = l.readPoint(n),
        r = l.readPoint(n, A),
        o = c(e, B),
        i = c(r, N);
      if (!C && !G) {
        if (!n.cancelable) return U(n);
        if (((C = o > i), !C)) return U(n);
      }
      const u = l.pointerMove(n);
      o > E && (j = !0),
        h.useFriction(0.3).useDuration(1),
        f.start(),
        a.add(t.apply(u)),
        n.preventDefault();
    }
    function U(n) {
      const e = y.byDistance(0, !1).index !== v.get(),
        r = l.pointerUp(n) * (w ? H : z)[G ? "mouse" : "touch"],
        u = (function (n, t) {
          const e = v.add(-1 * i(n)),
            r = y.byDistance(n, !w).distance;
          return w || o(n) < P
            ? r
            : L && t
            ? 0.5 * r
            : y.byIndex(e.get(), 0).distance;
        })(t.apply(r), e),
        s = (function (n, t) {
          if (0 === n || 0 === t) return 0;
          if (o(n) <= o(t)) return 0;
          const e = c(o(n), o(t));
          return o(e / n);
        })(r, u),
        a = k - 10 * s,
        d = D + s / 50;
      (C = !1),
        (R = !1),
        F.clear(),
        h.useDuration(a).useFriction(d),
        p.distance(u, !w),
        (G = !1),
        b.emit("pointerUp");
    }
    function W(n) {
      j && (n.stopPropagation(), n.preventDefault());
    }
    return {
      init: function (n) {
        if (!I) return;
        function t(t) {
          (e(I) || I(n, t)) &&
            (function (n) {
              const t = m(n, s);
              if (((G = t), t && 0 !== n.button)) return;
              if (
                (function (n) {
                  const t = n.nodeName || "";
                  return M.includes(t);
                })(n.target)
              )
                return;
              (j = w && t && !n.buttons && V),
                (V = c(a.get(), d.get()) >= 2),
                (R = !0),
                l.pointerDown(n),
                h.useFriction(0).useDuration(0),
                a.set(d),
                (function () {
                  const n = G ? u : r;
                  F.add(n, "touchmove", q, T)
                    .add(n, "touchend", U)
                    .add(n, "mousemove", q, T)
                    .add(n, "mouseup", U);
                })(),
                (B = l.readPoint(n)),
                (N = l.readPoint(n, A)),
                b.emit("pointerDown");
            })(t);
        }
        const o = r;
        O.add(o, "dragstart", (n) => n.preventDefault(), T)
          .add(o, "touchmove", () => {}, T)
          .add(o, "touchend", () => {})
          .add(o, "touchstart", t)
          .add(o, "mousedown", t)
          .add(o, "touchcancel", U)
          .add(o, "contextmenu", U)
          .add(o, "click", W, !0);
      },
      pointerDown: function () {
        return R;
      },
      destroy: function () {
        O.clear(), F.clear();
      },
    };
  }
  function b(n, t) {
    let e, r;
    function i(n) {
      return n.timeStamp;
    }
    function c(e, r) {
      const o = "client" + ("x" === (r || n.scroll) ? "X" : "Y");
      return (m(e, t) ? e : e.touches[0])[o];
    }
    return {
      pointerDown: function (n) {
        return (e = n), (r = n), c(n);
      },
      pointerMove: function (n) {
        const t = c(n) - c(r),
          o = i(n) - i(e) > 170;
        return (r = n), o && (e = n), t;
      },
      pointerUp: function (n) {
        if (!e || !r) return 0;
        const t = c(r) - c(e),
          u = i(n) - i(e),
          s = i(n) - i(r) > 170,
          a = t / u;
        return u && !s && o(a) > 0.1 ? a : 0;
      },
      readPoint: c,
    };
  }
  function S(n, t, r, i, c, u, s) {
    let a,
      l,
      d = [],
      f = !1;
    function p(n) {
      return c.measureSize(s.measure(n));
    }
    return {
      init: function (c) {
        if (!u) return;
        (l = p(n)),
          (d = i.map(p)),
          (a = new ResizeObserver((s) => {
            f ||
              ((e(u) || u(c, s)) &&
                (function (e) {
                  for (const u of e) {
                    const e = u.target === n,
                      s = i.indexOf(u.target),
                      a = e ? l : d[s];
                    if (o(p(e ? n : i[s]) - a) >= 0.5) {
                      r.requestAnimationFrame(() => {
                        c.reInit(), t.emit("resize");
                      });
                      break;
                    }
                  }
                })(s));
          })),
          [n].concat(i).forEach((n) => a.observe(n));
      },
      destroy: function () {
        a && a.disconnect(), (f = !0);
      },
    };
  }
  function w(n, t, e, r, i) {
    const c = i.measure(10),
      u = i.measure(50),
      s = x(0.1, 0.99);
    let a = !1;
    return {
      constrain: function (i) {
        if (a || !n.reachedAny(e.get()) || !n.reachedAny(t.get())) return;
        const l = n.reachedMin(t.get()) ? "min" : "max",
          d = o(n[l] - t.get()),
          f = e.get() - t.get(),
          p = s.constrain(d / u);
        e.subtract(f * p),
          !i &&
            o(f) < c &&
            (e.set(n.constrain(e.get())), r.useDuration(25).useBaseFriction());
      },
      toggleActive: function (n) {
        a = !n;
      },
    };
  }
  function E(n, t, e, r) {
    const o = t.min + 0.1,
      i = t.max + 0.1,
      { reachedMin: c, reachedMax: u } = x(o, i);
    return {
      loop: function (t) {
        if (
          !(function (n) {
            return 1 === n ? u(e.get()) : -1 === n && c(e.get());
          })(t)
        )
          return;
        const o = n * (-1 * t);
        r.forEach((n) => n.add(o));
      },
    };
  }
  function L(n, t, e, r, c) {
    const { reachedAny: u, removeOffset: a, constrain: l } = r;
    function d(n) {
      return n.concat().sort((n, t) => o(n) - o(t))[0];
    }
    function f(t, r) {
      const o = [t, t + e, t - e];
      if (!n) return o[0];
      if (!r) return d(o);
      const c = o.filter((n) => i(n) === r);
      return c.length ? d(c) : s(o) - e;
    }
    return {
      byDistance: function (e, r) {
        const i = c.get() + e,
          { index: s, distance: d } = (function (e) {
            const r = n ? a(e) : l(e),
              i = t
                .map((n) => n - r)
                .map((n) => f(n, 0))
                .map((n, t) => ({ diff: n, index: t }))
                .sort((n, t) => o(n.diff) - o(t.diff)),
              { index: c } = i[0];
            return { index: c, distance: r };
          })(i),
          p = !n && u(i);
        return !r || p
          ? { index: s, distance: e }
          : { index: s, distance: e + f(t[s] - d, 0) };
      },
      byIndex: function (n, e) {
        return { index: n, distance: f(t[n] - c.get(), e) };
      },
      shortcut: f,
    };
  }
  function D(t) {
    let e = t;
    function r(t) {
      return n(t) ? t : t.get();
    }
    return {
      get: function () {
        return e;
      },
      set: function (n) {
        e = r(n);
      },
      add: function (n) {
        e += r(n);
      },
      subtract: function (n) {
        e -= r(n);
      },
    };
  }
  function I(n, t, e) {
    const r =
        "x" === n.scroll
          ? function (n) {
              return `translate3d(${n}px,0px,0px)`;
            }
          : function (n) {
              return `translate3d(0px,${n}px,0px)`;
            },
      o = e.style;
    let i = !1;
    return {
      clear: function () {
        i ||
          ((o.transform = ""),
          e.getAttribute("style") || e.removeAttribute("style"));
      },
      to: function (n) {
        i || (o.transform = r(t.apply(n)));
      },
      toggleActive: function (n) {
        i = !n;
      },
    };
  }
  function A(n, t, e, r, o, i, c, s, a, l) {
    const d = 0.5,
      f = u(i),
      p = u(i).reverse(),
      m = (function () {
        const n = s[0];
        return x(h(p, n), r, !1);
      })().concat(
        (function () {
          const n = e - s[0] - 1;
          return x(h(f, n), -r, !0);
        })()
      );
    function g(n, t) {
      return n.reduce((n, t) => n - i[t], t);
    }
    function h(n, t) {
      return n.reduce((n, e) => (g(n, t) > 0 ? n.concat([e]) : n), []);
    }
    function x(i, u, s) {
      const f = (function (n) {
        return c.map((t, r) => ({
          start: t - o[r] + d + n,
          end: t + e - d + n,
        }));
      })(u);
      return i.map((e) => {
        const o = s ? 0 : -r,
          i = s ? r : 0,
          c = s ? "end" : "start",
          u = f[e][c];
        return {
          index: e,
          loopPoint: u,
          slideLocation: D(-1),
          translate: I(n, t, l[e]),
          target: () => (a.get() > u ? o : i),
        };
      });
    }
    return {
      canLoop: function () {
        return m.every(
          ({ index: n }) =>
            g(
              f.filter((t) => t !== n),
              e
            ) <= 0.1
        );
      },
      clear: function () {
        m.forEach((n) => n.translate.clear());
      },
      loop: function () {
        m.forEach((n) => {
          const { target: t, translate: e, slideLocation: r } = n,
            o = t();
          o !== r.get() && (e.to(o), r.set(o));
        });
      },
      loopPoints: m,
    };
  }
  function M(n, t, r) {
    let o,
      i = !1;
    return {
      init: function (c) {
        r &&
          ((o = new MutationObserver((n) => {
            i ||
              ((e(r) || r(c, n)) &&
                (function (n) {
                  for (const e of n)
                    if ("childList" === e.type) {
                      c.reInit(), t.emit("slidesChanged");
                      break;
                    }
                })(n));
          })),
          o.observe(n, { childList: !0 }));
      },
      destroy: function () {
        o && o.disconnect(), (i = !0);
      },
    };
  }
  function T(n, t, e, r) {
    const o = {};
    let i,
      c = null,
      u = null,
      s = !1;
    return {
      init: function () {
        (i = new IntersectionObserver(
          (n) => {
            s ||
              (n.forEach((n) => {
                const e = t.indexOf(n.target);
                o[e] = n;
              }),
              (c = null),
              (u = null),
              e.emit("slidesInView"));
          },
          { root: n.parentElement, threshold: r }
        )),
          t.forEach((n) => i.observe(n));
      },
      destroy: function () {
        i && i.disconnect(), (s = !0);
      },
      get: function (n = !0) {
        if (n && c) return c;
        if (!n && u) return u;
        const t = (function (n) {
          return f(o).reduce((t, e) => {
            const r = parseInt(e),
              { isIntersecting: i } = o[r];
            return ((n && i) || (!n && !i)) && t.push(r), t;
          }, []);
        })(n);
        return n && (c = t), n || (u = t), t;
      },
    };
  }
  function O(t, e, r, i, c, l, d, f, p, m) {
    const { startEdge: g, endEdge: h } = t,
      x = n(i);
    return {
      groupSlides: function (n) {
        return x
          ? (function (n, t) {
              return u(n)
                .filter((n) => n % t == 0)
                .map((e) => n.slice(e, e + t));
            })(n, i)
          : (function (n) {
              return n.length
                ? u(n)
                    .reduce((t, i) => {
                      const u = s(t) || 0,
                        x = 0 === u,
                        y = i === a(n),
                        v = l[g] - d[u][g],
                        b = l[g] - d[i][h],
                        S = !c && x ? e.apply(f) : 0;
                      return (
                        o(b - (!c && y ? e.apply(p) : 0) - (v + S)) > r + m &&
                          t.push(i),
                        y && t.push(n.length),
                        t
                      );
                    }, [])
                    .map((t, e, r) => {
                      const o = Math.max(r[e - 1] || 0);
                      return n.slice(o, t);
                    })
                : [];
            })(n);
      },
    };
  }
  function F(e, r, f, p, m, F, P) {
    const {
        align: z,
        axis: H,
        direction: k,
        startIndex: V,
        loop: B,
        duration: N,
        dragFree: R,
        dragThreshold: C,
        inViewThreshold: j,
        slidesToScroll: G,
        skipSnaps: q,
        containScroll: U,
        watchResize: W,
        watchSlides: $,
        watchDrag: Q,
      } = F,
      X = {
        measure: function (n) {
          const {
            offsetTop: t,
            offsetLeft: e,
            offsetWidth: r,
            offsetHeight: o,
          } = n;
          return {
            top: t,
            right: e + r,
            bottom: t + o,
            left: e,
            width: r,
            height: o,
          };
        },
      },
      Y = X.measure(r),
      J = f.map(X.measure),
      K = (function (n) {
        const t = "rtl" === n ? -1 : 1;
        return {
          apply: function (n) {
            return n * t;
          },
        };
      })(k),
      Z = (function (n, t) {
        const e = "y" === n ? "y" : "x";
        return {
          scroll: e,
          cross: "y" === n ? "x" : "y",
          startEdge: "y" === e ? "top" : "rtl" === t ? "right" : "left",
          endEdge: "y" === e ? "bottom" : "rtl" === t ? "left" : "right",
          measureSize: function (n) {
            const { width: t, height: r } = n;
            return "x" === e ? t : r;
          },
        };
      })(H, k),
      _ = Z.measureSize(Y),
      nn = (function (n) {
        return {
          measure: function (t) {
            return n * (t / 100);
          },
        };
      })(_),
      tn = (function (n, e) {
        const r = {
          start: function () {
            return 0;
          },
          center: function (n) {
            return o(n) / 2;
          },
          end: o,
        };
        function o(n) {
          return e - n;
        }
        return {
          measure: function (o, i) {
            return t(n) ? r[n](o) : n(e, o, i);
          },
        };
      })(z, _),
      en = !B && !!U,
      rn = B || !!U,
      {
        slideSizes: on,
        slideSizesWithGaps: cn,
        startGap: un,
        endGap: sn,
      } = (function (n, t, e, r, i, c) {
        const { measureSize: u, startEdge: a, endEdge: d } = n,
          f = e[0] && i,
          p = (function () {
            if (!f) return 0;
            const n = e[0];
            return o(t[a] - n[a]);
          })(),
          m = (function () {
            if (!f) return 0;
            const n = c.getComputedStyle(s(r));
            return parseFloat(n.getPropertyValue(`margin-${d}`));
          })(),
          g = e.map(u),
          h = e
            .map((n, t, e) => {
              const r = !t,
                o = l(e, t);
              return r ? g[t] + p : o ? g[t] + m : e[t + 1][a] - n[a];
            })
            .map(o);
        return { slideSizes: g, slideSizesWithGaps: h, startGap: p, endGap: m };
      })(Z, Y, J, f, rn, m),
      an = O(Z, K, _, G, B, Y, J, un, sn, 2),
      { snaps: ln, snapsAligned: dn } = (function (n, t, e, r, i) {
        const { startEdge: c, endEdge: u } = n,
          { groupSlides: a } = i,
          l = a(r)
            .map((n) => s(n)[u] - n[0][c])
            .map(o)
            .map(t.measure),
          d = r.map((n) => e[c] - n[c]).map((n) => -o(n)),
          f = a(d)
            .map((n) => n[0])
            .map((n, t) => n + l[t]);
        return { snaps: d, snapsAligned: f };
      })(Z, tn, Y, J, an),
      fn = -s(ln) + s(cn),
      { snapsContained: pn, scrollContainLimit: mn } = (function (
        n,
        t,
        e,
        r,
        o
      ) {
        const i = x(-t + n, 0),
          u = e
            .map((n, t) => {
              const { min: r, max: o } = i,
                c = i.constrain(n),
                u = !t,
                s = l(e, t);
              return u ? o : s || d(r, c) ? r : d(o, c) ? o : c;
            })
            .map((n) => parseFloat(n.toFixed(3))),
          a = (function () {
            const n = u[0],
              t = s(u);
            return x(u.lastIndexOf(n), u.indexOf(t) + 1);
          })();
        function d(n, t) {
          return c(n, t) < 1;
        }
        return {
          snapsContained: (function () {
            if (t <= n + o) return [i.max];
            if ("keepSnaps" === r) return u;
            const { min: e, max: c } = a;
            return u.slice(e, c);
          })(),
          scrollContainLimit: a,
        };
      })(_, fn, dn, U, 2),
      gn = en ? pn : dn,
      { limit: hn } = (function (n, t, e) {
        const r = t[0];
        return { limit: x(e ? r - n : s(t), r) };
      })(fn, gn, B),
      xn = y(a(gn), V, B),
      yn = xn.clone(),
      vn = u(f),
      bn = h(
        p,
        m,
        () =>
          (({
            dragHandler: n,
            scrollBody: t,
            scrollBounds: e,
            options: { loop: r },
          }) => {
            r || e.constrain(n.pointerDown()), t.seek();
          })(zn),
        (n) =>
          ((
            {
              scrollBody: n,
              translate: t,
              location: e,
              offsetLocation: r,
              scrollLooper: o,
              slideLooper: i,
              dragHandler: c,
              animation: u,
              eventHandler: s,
              options: { loop: a },
            },
            l
          ) => {
            const d = n.velocity(),
              f = n.settled();
            f && !c.pointerDown() && (u.stop(), s.emit("settle")),
              f || s.emit("scroll"),
              r.set(e.get() - d + d * l),
              a && (o.loop(n.direction()), i.loop()),
              t.to(r.get());
          })(zn, n)
      ),
      Sn = gn[xn.get()],
      wn = D(Sn),
      En = D(Sn),
      Ln = D(Sn),
      Dn = (function (n, t, e, r, c) {
        let u = 0,
          s = 0,
          a = r,
          l = c,
          d = n.get(),
          f = 0;
        function p(n) {
          return (a = n), g;
        }
        function m(n) {
          return (l = n), g;
        }
        const g = {
          direction: function () {
            return s;
          },
          duration: function () {
            return a;
          },
          velocity: function () {
            return u;
          },
          seek: function () {
            const t = e.get() - n.get();
            let r = 0;
            return (
              a
                ? ((u += t / a), (u *= l), (d += u), n.add(u), (r = d - f))
                : ((u = 0), n.set(e), (r = t)),
              (s = i(r)),
              (f = d),
              g
            );
          },
          settled: function () {
            return o(e.get() - t.get()) < 0.001;
          },
          useBaseFriction: function () {
            return m(c);
          },
          useBaseDuration: function () {
            return p(r);
          },
          useFriction: m,
          useDuration: p,
        };
        return g;
      })(wn, En, Ln, N, 0.68),
      In = L(B, gn, fn, hn, Ln),
      An = (function (n, t, e, r, o, i, c) {
        function u(o) {
          const u = o.distance,
            s = o.index !== t.get();
          i.add(u),
            u &&
              (r.duration()
                ? n.start()
                : (n.update(), n.render(1), n.update())),
            s && (e.set(t.get()), t.set(o.index), c.emit("select"));
        }
        return {
          distance: function (n, t) {
            u(o.byDistance(n, t));
          },
          index: function (n, e) {
            const r = t.clone().set(n);
            u(o.byIndex(r.get(), e));
          },
        };
      })(bn, xn, yn, Dn, In, Ln, P),
      Mn = (function (n) {
        const { max: t, length: e } = n;
        return {
          get: function (n) {
            return e ? (n - t) / -e : 0;
          },
        };
      })(hn),
      Tn = g(),
      On = T(r, f, P, j),
      { slideRegistry: Fn } = (function (n, t, e, r, o, i) {
        const { groupSlides: c } = o,
          { min: u, max: f } = r;
        return {
          slideRegistry: (function () {
            const r = c(i),
              o = !n || "keepSnaps" === t;
            return 1 === e.length
              ? [i]
              : o
              ? r
              : r.slice(u, f).map((n, t, e) => {
                  const r = !t,
                    o = l(e, t);
                  return r
                    ? d(s(e[0]) + 1)
                    : o
                    ? d(a(i) - s(e)[0] + 1, s(e)[0])
                    : n;
                });
          })(),
        };
      })(en, U, gn, mn, an, vn),
      Pn = (function (t, e, r, o, i, c) {
        let u = 0;
        function s(n) {
          "Tab" === n.code && (u = new Date().getTime());
        }
        function a(s) {
          c.add(
            s,
            "focus",
            () => {
              if (new Date().getTime() - u > 10) return;
              t.scrollLeft = 0;
              const c = e.indexOf(s),
                a = r.findIndex((n) => n.includes(c));
              n(a) && (i.useDuration(0), o.index(a, 0));
            },
            { passive: !0, capture: !0 }
          );
        }
        return {
          init: function () {
            c.add(document, "keydown", s, !1), e.forEach(a);
          },
        };
      })(e, f, Fn, An, Dn, Tn),
      zn = {
        ownerDocument: p,
        ownerWindow: m,
        eventHandler: P,
        containerRect: Y,
        slideRects: J,
        animation: bn,
        axis: Z,
        direction: K,
        dragHandler: v(
          Z,
          K,
          e,
          p,
          m,
          Ln,
          b(Z, m),
          wn,
          bn,
          An,
          Dn,
          In,
          xn,
          P,
          nn,
          R,
          C,
          q,
          0.68,
          Q
        ),
        eventStore: Tn,
        percentOfView: nn,
        index: xn,
        indexPrevious: yn,
        limit: hn,
        location: wn,
        offsetLocation: En,
        options: F,
        resizeHandler: S(r, P, m, f, Z, W, X),
        scrollBody: Dn,
        scrollBounds: w(hn, wn, Ln, Dn, nn),
        scrollLooper: E(fn, hn, En, [wn, En, Ln]),
        scrollProgress: Mn,
        scrollSnapList: gn.map(Mn.get),
        scrollSnaps: gn,
        scrollTarget: In,
        scrollTo: An,
        slideLooper: A(Z, K, _, fn, on, cn, ln, gn, En, f),
        slideFocus: Pn,
        slidesHandler: M(r, P, $),
        slidesInView: On,
        slideIndexes: vn,
        slideRegistry: Fn,
        slidesToScroll: an,
        target: Ln,
        translate: I(Z, K, r),
      };
    return zn;
  }
  const P = {
    align: "center",
    axis: "x",
    container: null,
    slides: null,
    containScroll: "trimSnaps",
    direction: "ltr",
    slidesToScroll: 1,
    inViewThreshold: 0,
    breakpoints: {},
    dragFree: !1,
    dragThreshold: 10,
    loop: !1,
    skipSnaps: !1,
    duration: 25,
    startIndex: 0,
    active: !0,
    watchDrag: !0,
    watchResize: !0,
    watchSlides: !0,
  };
  function z(n) {
    function t(n, t) {
      return p(n, t || {});
    }
    const e = {
      mergeOptions: t,
      optionsAtMedia: function (e) {
        const r = e.breakpoints || {},
          o = f(r)
            .filter((t) => n.matchMedia(t).matches)
            .map((n) => r[n])
            .reduce((n, e) => t(n, e), {});
        return t(e, o);
      },
      optionsMediaQueries: function (t) {
        return t
          .map((n) => f(n.breakpoints || {}))
          .reduce((n, t) => n.concat(t), [])
          .map(n.matchMedia);
      },
    };
    return e;
  }
  function H(n, e, r) {
    const o = n.ownerDocument,
      i = o.defaultView,
      c = z(i),
      u = (function (n) {
        let t = [];
        return {
          init: function (e, r) {
            return (
              (t = r.filter(
                ({ options: t }) => !1 !== n.optionsAtMedia(t).active
              )),
              t.forEach((t) => t.init(e, n)),
              r.reduce((n, t) => Object.assign(n, { [t.name]: t }), {})
            );
          },
          destroy: function () {
            t = t.filter((n) => n.destroy());
          },
        };
      })(c),
      s = g(),
      a = (function () {
        const n = {};
        let t;
        function e(t) {
          return n[t] || [];
        }
        const r = {
          init: function (n) {
            t = n;
          },
          emit: function (n) {
            return e(n).forEach((e) => e(t, n)), r;
          },
          off: function (t, o) {
            return (n[t] = e(t).filter((n) => n !== o)), r;
          },
          on: function (t, o) {
            return (n[t] = e(t).concat([o])), r;
          },
        };
        return r;
      })(),
      { mergeOptions: l, optionsAtMedia: d, optionsMediaQueries: f } = c,
      { on: p, off: m, emit: h } = a,
      x = M;
    let y,
      v,
      b,
      S,
      w = !1,
      E = l(P, H.globalOptions),
      L = l(E),
      D = [];
    function I(t) {
      const e = F(n, b, S, o, i, t, a);
      if (t.loop && !e.slideLooper.canLoop()) {
        return I(Object.assign({}, t, { loop: !1 }));
      }
      return e;
    }
    function A(e, r) {
      w ||
        ((E = l(E, e)),
        (L = d(E)),
        (D = r || D),
        (function () {
          const { container: e, slides: r } = L,
            o = t(e) ? n.querySelector(e) : e;
          b = o || n.children[0];
          const i = t(r) ? b.querySelectorAll(r) : r;
          S = [].slice.call(i || b.children);
        })(),
        (y = I(L)),
        f([E, ...D.map(({ options: n }) => n)]).forEach((n) =>
          s.add(n, "change", M)
        ),
        L.active &&
          (y.translate.to(y.location.get()),
          y.animation.init(),
          y.slidesInView.init(),
          y.slideFocus.init(),
          y.eventHandler.init(V),
          y.resizeHandler.init(V),
          y.slidesHandler.init(V),
          y.options.loop && y.slideLooper.loop(),
          b.offsetParent && S.length && y.dragHandler.init(V),
          (v = u.init(V, D))));
    }
    function M(n, t) {
      const e = k();
      T(), A(l({ startIndex: e }, n), t), a.emit("reInit");
    }
    function T() {
      y.dragHandler.destroy(),
        y.eventStore.clear(),
        y.translate.clear(),
        y.slideLooper.clear(),
        y.resizeHandler.destroy(),
        y.slidesHandler.destroy(),
        y.slidesInView.destroy(),
        y.animation.destroy(),
        u.destroy(),
        s.clear();
    }
    function O(n, t, e) {
      L.active &&
        !w &&
        (y.scrollBody.useBaseFriction().useDuration(!0 === t ? 0 : L.duration),
        y.scrollTo.index(n, e || 0));
    }
    function k() {
      return y.index.get();
    }
    const V = {
      canScrollNext: function () {
        return y.index.add(1).get() !== k();
      },
      canScrollPrev: function () {
        return y.index.add(-1).get() !== k();
      },
      containerNode: function () {
        return b;
      },
      internalEngine: function () {
        return y;
      },
      destroy: function () {
        w || ((w = !0), s.clear(), T(), a.emit("destroy"));
      },
      off: m,
      on: p,
      emit: h,
      plugins: function () {
        return v;
      },
      previousScrollSnap: function () {
        return y.indexPrevious.get();
      },
      reInit: x,
      rootNode: function () {
        return n;
      },
      scrollNext: function (n) {
        O(y.index.add(1).get(), n, -1);
      },
      scrollPrev: function (n) {
        O(y.index.add(-1).get(), n, 1);
      },
      scrollProgress: function () {
        return y.scrollProgress.get(y.location.get());
      },
      scrollSnapList: function () {
        return y.scrollSnapList;
      },
      scrollTo: O,
      selectedScrollSnap: k,
      slideNodes: function () {
        return S;
      },
      slidesInView: function () {
        return y.slidesInView.get();
      },
      slidesNotInView: function () {
        return y.slidesInView.get(!1);
      },
    };
    return A(e, r), setTimeout(() => a.emit("init"), 0), V;
  }
  return (H.globalOptions = void 0), H;
});
