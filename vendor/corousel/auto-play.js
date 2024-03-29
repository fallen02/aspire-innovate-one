!(function (n, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((n =
        "undefined" != typeof globalThis
          ? globalThis
          : n || self).EmblaCarouselAutoplay = t());
})(this, function () {
  "use strict";
  const n = {
    active: !0,
    breakpoints: {},
    delay: 4e3,
    jump: !1,
    playOnInit: !0,
    stopOnFocusIn: !0,
    stopOnInteraction: !0,
    stopOnMouseEnter: !1,
    stopOnLastSnap: !1,
    rootNode: null,
  };
  function t(o = {}) {
    let e,
      i,
      r,
      a = !1,
      s = !0,
      l = !1,
      c = 0,
      u = 0;
    function p() {
      if (r) return;
      if (!s) return;
      a || i.emit("autoplay:play");
      const { ownerWindow: n } = i.internalEngine();
      n.clearInterval(u), (u = n.setInterval(y, e.delay)), (a = !0);
    }
    function f() {
      if (r) return;
      a && i.emit("autoplay:stop");
      const { ownerWindow: n } = i.internalEngine();
      n.clearInterval(u), (u = 0), (a = !1);
    }
    function d() {
      const { ownerDocument: n } = i.internalEngine();
      if ("hidden" === n.visibilityState) return (s = a), f();
      s && p();
    }
    function m(n) {
      void 0 !== n && (l = n), (s = !0), p();
    }
    function y() {
      c = requestAnimationFrame(() => {
        const { index: n } = i.internalEngine(),
          t = n.clone().add(1).get(),
          o = i.scrollSnapList().length - 1;
        e.stopOnLastSnap && t === o && f(),
          i.canScrollNext() ? i.scrollNext(l) : i.scrollTo(0, l);
      });
    }
    return {
      name: "autoplay",
      options: o,
      init: function (a, c) {
        i = a;
        const { mergeOptions: u, optionsAtMedia: m } = c,
          y = u(n, t.globalOptions),
          g = u(y, o);
        if (((e = m(g)), i.scrollSnapList().length <= 1)) return;
        (l = e.jump), (r = !1);
        const { eventStore: O, ownerDocument: I } = i.internalEngine(),
          v = i.rootNode(),
          b = (e.rootNode && e.rootNode(v)) || v,
          w = i.containerNode();
        i.on("pointerDown", f),
          e.stopOnInteraction || i.on("pointerUp", p),
          e.stopOnMouseEnter &&
            (O.add(b, "mouseenter", () => {
              (s = !1), f();
            }),
            e.stopOnInteraction ||
              O.add(b, "mouseleave", () => {
                (s = !0), p();
              })),
          e.stopOnFocusIn &&
            (O.add(w, "focusin", f),
            e.stopOnInteraction || O.add(w, "focusout", p)),
          O.add(I, "visibilitychange", d),
          e.playOnInit && i.on("init", p).on("reInit", p);
      },
      destroy: function () {
        (r = !0),
          (a = !1),
          i
            .off("init", p)
            .off("reInit", p)
            .off("pointerDown", f)
            .off("pointerUp", p),
          f(),
          cancelAnimationFrame(c),
          (c = 0);
      },
      play: m,
      stop: function () {
        a && f();
      },
      reset: function () {
        a && m();
      },
      isPlaying: function () {
        return a;
      },
    };
  }
  return (t.globalOptions = void 0), t;
});
