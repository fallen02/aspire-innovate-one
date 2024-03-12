!(function (t, n) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
    ? define(n)
    : ((t =
        "undefined" != typeof globalThis
          ? globalThis
          : t || self).EmblaCarouselAutoScroll = n());
})(this, function () {
  "use strict";
  const t = {
    direction: "forward",
    speed: 2,
    startDelay: 1e3,
    active: !0,
    breakpoints: {},
    playOnInit: !0,
    stopOnFocusIn: !0,
    stopOnInteraction: !0,
    stopOnMouseEnter: !1,
    rootNode: null,
  };
  function n(o = {}) {
    let e,
      i,
      r,
      s,
      c,
      l = !1,
      a = !0,
      u = 0;
    function d() {
      if (r || l) return;
      if (!a) return;
      i.emit("autoScroll:play");
      const t = i.internalEngine(),
        { ownerWindow: n } = t;
      (u = n.setTimeout(() => {
        (t.scrollBody = (function (t) {
          const {
              location: n,
              target: o,
              scrollTarget: r,
              index: s,
              indexPrevious: c,
              limit: { reachedMin: l, reachedMax: a, constrain: u },
              options: { loop: d },
            } = t,
            p = "forward" === e.direction ? -1 : 1,
            g = () => S;
          let y = 0,
            m = 0,
            O = n.get(),
            I = 0,
            w = !1;
          function b() {
            let t = 0;
            (y = p * e.speed),
              (O += y),
              n.add(y),
              o.set(n),
              (t = O - I),
              (m = Math.sign(t)),
              (I = O);
            const g = r.byDistance(0, !1).index;
            s.get() !== g && (c.set(s.get()), s.set(g), i.emit("select"));
            const b = "forward" === e.direction ? l(n.get()) : a(n.get());
            if (!d && b) {
              w = !0;
              const t = u(n.get());
              n.set(t), o.set(n), f();
            }
            return S;
          }
          const S = {
            direction: () => m,
            duration: () => -1,
            velocity: () => y,
            settled: () => w,
            seek: b,
            useBaseFriction: g,
            useBaseDuration: g,
            useFriction: g,
            useDuration: g,
          };
          return S;
        })(t)),
          t.animation.start();
      }, s)),
        (l = !0);
    }
    function f() {
      if (r || !l) return;
      i.emit("autoScroll:stop");
      const t = i.internalEngine(),
        { ownerWindow: n } = t;
      (t.scrollBody = c), n.clearTimeout(u), (u = 0), (l = !1);
    }
    function p() {
      a && d(), i.off("settle", p);
    }
    function g() {
      i.on("settle", p);
    }
    return {
      name: "autoScroll",
      options: o,
      init: function (l, u) {
        i = l;
        const { mergeOptions: p, optionsAtMedia: y } = u,
          m = p(t, n.globalOptions),
          O = p(m, o);
        if (((e = y(O)), i.scrollSnapList().length <= 1)) return;
        (s = e.startDelay), (r = !1), (c = i.internalEngine().scrollBody);
        const { eventStore: I } = i.internalEngine(),
          w = i.rootNode(),
          b = (e.rootNode && e.rootNode(w)) || w,
          S = i.containerNode();
        i.on("pointerDown", f),
          e.stopOnInteraction || i.on("pointerUp", g),
          e.stopOnMouseEnter &&
            (I.add(b, "mouseenter", () => {
              (a = !1), f();
            }),
            e.stopOnInteraction ||
              I.add(b, "mouseleave", () => {
                (a = !0), d();
              })),
          e.stopOnFocusIn &&
            (I.add(S, "focusin", () => {
              f(), i.scrollTo(i.selectedScrollSnap(), !0);
            }),
            e.stopOnInteraction || I.add(S, "focusout", d)),
          e.playOnInit && i.on("init", d).on("reInit", d);
      },
      destroy: function () {
        (r = !0),
          (l = !1),
          i
            .off("init", d)
            .off("reInit", d)
            .off("pointerDown", f)
            .off("pointerUp", g)
            .off("settle", p),
          f();
      },
      play: function (t) {
        void 0 !== t && (s = t), (a = !0), d();
      },
      stop: function () {
        l && f();
      },
      reset: function () {
        l && (f(), g());
      },
      isPlaying: function () {
        return l;
      },
    };
  }
  return (n.globalOptions = void 0), n;
});
