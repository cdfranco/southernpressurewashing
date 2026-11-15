/* Athena Boards film — timeline.
   A tiny keyframe engine drives every element from one clock, so the film can
   be scrubbed, looped in a browser, or rendered frame by frame (see render.mjs).

   URL options:  film.html            plays in a loop, scaled to the window
                 film.html?t=12.5     holds a single frame
                 film.html?render     waits for window.__seek(t) calls        */
(function () {
  const DUR = 41;
  const CH = { one: 0, two: 10, three: 19.5, four: 29.5, end: 37.5 };

  const EASE = {
    lin: (t) => t,
    out: (t) => 1 - Math.pow(1 - t, 3),
    in: (t) => t * t * t,
    io: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    back: (t) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2),
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ── Engine ── */
  const items = [];
  function A(target, props) {
    const els = typeof target === "string" ? $$(target) : [].concat(target);
    if (!els.length) console.warn("film: nothing matches", target);
    els.forEach((el) => {
      let it = items.find((i) => i.el === el);
      if (!it) items.push((it = { el, props: {} }));
      for (const [k, keys] of Object.entries(props)) {
        it.props[k] = (it.props[k] || []).concat(keys).sort((a, b) => a[0] - b[0]);
      }
    });
  }
  function val(keys, t) {
    if (t <= keys[0][0]) return keys[0][1];
    const last = keys[keys.length - 1];
    if (t >= last[0]) return last[1];
    for (let i = 0; i < keys.length - 1; i++) {
      const a = keys[i];
      const b = keys[i + 1];
      if (t >= a[0] && t < b[0]) {
        const p = (t - a[0]) / (b[0] - a[0] || 1);
        return a[1] + (b[1] - a[1]) * EASE[b[2] || "out"](p);
      }
    }
    return last[1];
  }
  const blobs = [];
  function seek(t) {
    for (const it of items) {
      const p = it.props;
      const s = it.el.style;
      const g = (k) => (k in p ? val(p[k], t) : null);
      const o = g("opacity");
      if (o !== null) {
        s.opacity = o;
        s.visibility = o <= 0.001 ? "hidden" : "visible";
      }
      const x = g("x"), y = g("y"), sc = g("s"), sx = g("sx"), sy = g("sy"), r = g("r"), rx = g("rx");
      let tf = "";
      if (x !== null || y !== null) tf += `translate3d(${x || 0}px,${y || 0}px,0) `;
      if (rx !== null) tf += `rotateX(${rx}deg) `;
      if (r !== null) tf += `rotate(${r}deg) `;
      if (sc !== null) tf += `scale(${sc}) `;
      if (sx !== null || sy !== null) tf += `scale(${sx === null ? 1 : sx},${sy === null ? 1 : sy}) `;
      if (tf) s.transform = tf;
      if ("text" in p) {
        const full = it.el.dataset.text;
        const n = Math.round(val(p.text, t));
        if (it.el._n !== n) {
          it.el.textContent = full.slice(0, n);
          it.el._n = n;
        }
      }
    }
    // Backdrop drift: sine paths so the last frame meets the first.
    const w = (2 * Math.PI * t) / DUR;
    blobs.forEach((b, i) => {
      const dx = Math.sin(w * (1 + (i % 2)) + i * 1.7) * (90 + i * 30);
      const dy = Math.cos(w + i * 2.3) * (70 + i * 20);
      b.style.transform = `translate3d(${dx}px,${dy}px,0)`;
    });
  }

  /* ── Helpers ── */
  const show = (sel, t0, t1, d = 0.4) => A(sel, { opacity: [[t0, 0], [t0 + d, 1], [t1 - d, 1], [t1, 0]] });
  const fadeIn = (sel, t, d = 0.5, dy = 34) => A(sel, { opacity: [[t, 0], [t + d, 1]], y: [[t, dy], [t + d, 0]] });
  const pop = (sel, t, d = 0.5) => A(sel, { opacity: [[t, 0], [t + d * 0.5, 1]], s: [[t, 0.5], [t + d, 1, "back"]] });
  const hide = (sel) => A(sel, { opacity: [[0, 0]] });
  const each = (sel, fn) => $$(sel).forEach(fn);

  let stage, scale = 1;
  function pt(sel, fx = 0.5, fy = 0.5) {
    const el = typeof sel === "string" ? $(sel) : sel;
    const r = el.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    return [(r.left - s.left + r.width * fx) / scale, (r.top - s.top + r.height * fy) / scale];
  }
  function box(sel) {
    const el = typeof sel === "string" ? $(sel) : sel;
    const r = el.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    return { x: (r.left - s.left) / scale, y: (r.top - s.top) / scale, w: r.width / scale, h: r.height / scale };
  }
  function cursorPath(keys) {
    A("#cursor", { x: keys.map(([t, p, e]) => [t, p[0], e || "io"]), y: keys.map(([t, p, e]) => [t, p[1], e || "io"]) });
  }
  function click(t) {
    A("#cursor svg", { s: [[t - 0.08, 1], [t + 0.04, 0.8, "out"], [t + 0.26, 1, "out"]] });
    A("#cursor .ring", { opacity: [[t, 0], [t + 0.02, 0.95, "lin"], [t + 0.55, 0, "out"]], s: [[t, 0.25], [t + 0.55, 1.35, "out"]] });
  }

  /* ── Timeline ── */
  function build() {
    // Chapter chips and captions
    show("#ch1", 0.3, 9.8);
    show("#ch2", CH.two + 0.25, 19.3);
    show("#ch3", CH.three + 0.3, 29.3);
    show("#ch4", CH.four + 0.3, 37.3);
    const cap = (id, t0, t1) => A(id, { opacity: [[t0, 0], [t0 + 0.35, 1], [t1 - 0.3, 1], [t1, 0]], y: [[t0, 26], [t0 + 0.35, 0]] });
    cap("#c1a", 0.9, 4.25);
    cap("#c1b", 5.1, 9.6);
    cap("#c2a", 10.5, 12.2);
    cap("#c2b", 12.35, 14.9);
    cap("#c2c", 15.2, 19.2);
    cap("#c3a", 20.1, 25.5);
    cap("#c3b", 26.0, 29.25);
    cap("#c4a", 30.3, 37.1);

    /* 1 · Request (0 – 4.6) */
    A("#s1", { opacity: [[0, 1], [4.25, 1], [4.6, 0]] });
    A("#s1 .cam", { s: [[4.2, 1], [4.6, 1.07, "in"]] });
    A("#s1 .card", { opacity: [[0.35, 0], [0.8, 1]], y: [[0.35, 110], [1.05, 0]], rx: [[0.35, 26], [1.1, 0]], s: [[0.35, 0.9], [1.05, 1]] });
    A("#s1 .typed", { text: [[1.1, 0], [2.0, 14, "lin"]] });
    A("#s1 .caret", { opacity: [[0, 1], [2.15, 1], [2.2, 0]] });
    const paper = pt("#s1 .paper");
    const drop = pt("#s1 .drop");
    A("#s1 .paper", {
      opacity: [[1.25, 0], [1.5, 1], [3.2, 1], [3.36, 0]],
      s: [[1.25, 0.55], [1.75, 1, "back"], [2.6, 1], [3.3, 0.4, "io"]],
      x: [[2.6, 0], [3.3, drop[0] - paper[0], "io"]],
      y: [[2.6, 0], [3.3, drop[1] - paper[1], "io"]],
      r: [[2.6, 0], [3.3, -7, "io"]],
    });
    A("#s1 .drop .done", { opacity: [[3.26, 0], [3.46, 1]], s: [[3.26, 0.94], [3.5, 1, "back"]] });
    const sendBtn = pt("#s1 .btn-primary", 0.62, 0.55);
    A("#cursor", { opacity: [[1.75, 0], [2.0, 1], [4.25, 1], [4.5, 0]] });
    cursorPath([
      [1.75, [1500, 900]],
      [2.5, [paper[0] + 18, paper[1] + 30]],
      [2.6, [paper[0] + 18, paper[1] + 30]],
      [3.3, [drop[0] + 14, drop[1] + 16]],
      [3.45, [drop[0] + 14, drop[1] + 16]],
      [3.95, sendBtn],
    ]);
    A("#cursor svg", { s: [[2.5, 1], [2.6, 0.84], [3.3, 0.84], [3.42, 1]] });
    click(4.02);
    A("#s1 .btn-primary", { s: [[4.0, 1], [4.1, 0.965], [4.3, 1]] });

    /* 2 · Design (4.4 – 10) */
    A("#s2", { opacity: [[4.4, 0], [4.8, 1], [9.6, 1], [10, 0]] });
    A("#s2 .cam", { s: [[4.4, 1], [10, 1.035, "lin"]] });
    A("#s2 .rail", { opacity: [[4.5, 0], [4.95, 1]], x: [[4.5, -70], [5.0, 0]] });
    each("#s2 .row", (el, i) => fadeIn(el, 4.95 + i * 0.3, 0.4, 20));
    each("#s2 .swatches i", (el, i) => A(el, { s: [[5.05 + i * 0.08, 0], [5.45 + i * 0.08, 1, "back"]] }));
    A("#s2 .frame", { opacity: [[4.5, 0], [5.0, 1]], y: [[4.5, 70], [5.1, 0]], s: [[4.5, 0.95], [5.1, 1]] });
    const b2 = "#s2 .board ";
    A(b2, { opacity: [[5.0, 0.0], [5.5, 1]] });
    each("#s2 .wire", (el, i) => A(el, { opacity: [[4.8, 0], [5.1, 1], [5.6 + i * 0.5, 1], [6.0 + i * 0.5, 0]] }));
    A(b2 + ".b-header", { y: [[5.25, -112], [5.75, 0]] });
    A(b2 + ".b-feature", { opacity: [[5.6, 0], [5.95, 1]], s: [[5.6, 0.9], [6.05, 1]] });
    A(b2 + ".b-photo", { opacity: [[5.9, 0], [6.15, 1]], s: [[5.9, 0.3], [6.55, 1, "back"]], r: [[5.9, -40], [6.55, 0]] });
    [".b-kicker", ".b-title", ".b-desc"].forEach((c, i) => fadeIn(b2 + c, 6.1 + i * 0.16, 0.4, 26));
    A(b2 + ".b-price", { s: [[6.7, 0], [7.1, 1, "back"]] });
    A(b2 + ".b-dots", { opacity: [[6.9, 0], [7.2, 1]] });
    A(b2 + ".b-menu", { opacity: [[6.2, 0], [6.55, 1]], x: [[6.2, 130], [6.7, 0]] });
    each(b2 + ".b-row", (el, i) => A(el, { opacity: [[6.6 + i * 0.085, 0], [6.9 + i * 0.085, 1]], x: [[6.6 + i * 0.085, 34], [6.95 + i * 0.085, 0]] }));
    A(b2 + ".b-menu-foot", { opacity: [[7.4, 0], [7.7, 1]] });
    A(b2 + ".b-week", { opacity: [[7.3, 0], [7.6, 1]], y: [[7.3, 60], [7.75, 0]] });
    each(b2 + ".b-day", (el, i) => A(el, { s: [[7.5 + i * 0.07, 0.6], [7.85 + i * 0.07, 1, "back"]], opacity: [[7.5 + i * 0.07, 0], [7.7 + i * 0.07, 1]] }));
    A(b2 + ".b-ticker", { y: [[7.8, 76], [8.15, 0]] });
    A(b2 + ".b-ticker span", { x: [[7.8, 0], [10, -60, "lin"]] });
    hide(b2 + ".b-price .new");
    hide(b2 + ".swap.new");
    pop("#s2 .badge", 8.4);
    pop("#s2 .badge2", 8.65);

    /* 3 · Approve (10 – 19.5) */
    A("#s3", { opacity: [[CH.two, 0], [CH.two + 0.45, 1], [19.1, 1], [19.5, 0]] });
    A("#s3 .phone", { opacity: [[10.05, 0], [10.5, 1]], y: [[10.05, 150], [10.75, 0]] });
    A("#s3 .frame", { opacity: [[10.1, 0], [10.55, 1]], x: [[10.1, 130], [10.8, 0]] });
    const b3 = "#s3 .frame .board ";
    const price = box(b3 + ".b-price");
    const pricePt = [price.x + price.w * 0.6, price.y + price.h * 0.6];
    hide("#s3 .board .swap.new");
    Object.assign($("#s3-halo").style, { left: price.x - 12 + "px", top: price.y - 12 + "px", width: price.w + 24 + "px", height: price.h + 24 + "px" });
    A("#s3-halo", { opacity: [[11.85, 0], [12.05, 1], [13.9, 1], [14.25, 0]], s: [[11.85, 1.25], [12.15, 1]] });
    const pinPos = [price.x + price.w + 6, price.y - 4];
    ["#s3-pin", "#s3-pin-ok"].forEach((id) => Object.assign($(id).style, { left: pinPos[0] + "px", top: pinPos[1] + "px" }));
    Object.assign($("#s3-note").style, { left: pinPos[0] + 44 + "px", top: pinPos[1] - 96 + "px" });
    A("#s3-pin", { opacity: [[11.9, 0], [12.1, 1], [13.7, 1], [13.85, 0]], s: [[11.9, 0.3], [12.3, 1, "back"]], y: [[11.9, -46], [12.25, 0]] });
    A("#s3-pin-ok", { opacity: [[13.7, 0], [13.9, 1], [15.0, 1], [15.3, 0]], s: [[13.7, 0.5], [14.1, 1, "back"]] });
    A("#s3-note", { opacity: [[12.05, 0], [12.25, 1], [14.3, 1], [14.6, 0]], s: [[12.05, 0.8], [12.35, 1, "back"]] });
    A("#s3-note .typed", { text: [[12.2, 0], [13.05, 20, "lin"]] });
    // The price changes on the big board and on the phone thumbnail together.
    A("#s3 .board .b-price .old", { y: [[13.2, 0], [13.6, -70, "io"]], opacity: [[13.2, 1], [13.6, 0]] });
    A("#s3 .board .b-price .new", { y: [[13.2, 70], [13.6, 0, "io"]], opacity: [[13.2, 0], [13.45, 1]] });
    A(b3 + ".b-price", { s: [[13.55, 1], [13.75, 1.12], [14.05, 1, "io"]] });
    A("#s3 .corr", { opacity: [[13.85, 0], [14.1, 1]], y: [[13.85, 14], [14.15, 0]] });
    A("#s3 .p-btn .b", { opacity: [[15.5, 0], [15.7, 1]] });
    A("#s3 .p-btn", { s: [[15.45, 1], [15.55, 0.95], [15.85, 1, "back"]] });
    each("#s3 .sum-ok", (el, i) => A(el, { opacity: [[16.15 + i * 0.45, 0], [16.4 + i * 0.45, 1]], s: [[16.15 + i * 0.45, 0.6], [16.55 + i * 0.45, 1, "back"]] }));
    pop("#s3 .toast", 17.2);
    const approve = pt("#s3 .p-btn", 0.6, 0.6);
    A("#cursor", { opacity: [[10.85, 0], [11.1, 1], [15.9, 1], [16.2, 0]] });
    cursorPath([
      [10.85, [1620, 960]],
      [11.75, pricePt],
      [14.35, pricePt],
      [15.3, approve],
    ]);
    click(11.85);
    click(15.45);

    /* 4 · Install (19.5 – 25.8) */
    A("#s4", { opacity: [[CH.three, 0], [CH.three + 0.45, 1], [25.55, 1], [25.85, 0]] });
    $("#s4 .cam").style.transformOrigin = "50% 0%";
    A("#s4 .cam", { s: [[19.5, 1.26], [23.0, 1.22, "lin"], [25.7, 1.0, "io"]] });
    A("#s4 .mount", { opacity: [[19.5, 0], [19.95, 0], [20.25, 1]] });
    each("#s4 .mount i", (el, i) => A(el, { s: [[20.2 + i * 0.08, 0], [20.5 + i * 0.08, 1, "back"]] }));
    A("#s4 .tv", { y: [[20.65, -820], [21.25, 10, "out"], [21.45, 0, "io"]] });
    A("#s4 .tv .off", { opacity: [[0, 1], [23.0, 1], [23.4, 0]] });
    A("#s4 .tv .flash", { opacity: [[22.95, 0], [23.06, 0.9, "lin"], [23.6, 0]] });
    A("#s4 .h-live", { opacity: [[24.05, 0], [24.3, 1], [25.3, 1], [25.55, 0]], s: [[24.05, 0.6], [24.5, 1, "back"]] });
    A("#s4 .raceway", { sy: [[21.6, 0], [22.2, 1, "io"]] });
    A("#s4 .tv .spill", { opacity: [[0, 0], [23.0, 0], [23.5, 1]] });
    A("#s4 .h-level", { opacity: [[21.5, 0], [21.75, 1], [23.4, 1], [23.7, 0]], s: [[21.5, 0.6], [21.95, 1, "back"]] });
    A("#s4 .h-wifi", { opacity: [[22.3, 0], [22.55, 1], [23.7, 1], [24.0, 0]], s: [[22.3, 0.6], [22.75, 1, "back"]] });
    hide("#s4 .board .b-price .old");
    hide("#s4 .board .swap.new");
    A("#s4 .board .b-ticker span", { x: [[23, 0], [26, -90, "lin"]] });

    /* 5 · Venues (25.6 – 29.5) */
    A("#s5", { opacity: [[25.55, 0], [25.85, 1], [29.2, 1], [29.5, 0]] });
    // Each room pushes in slowly on its screen.
    $("#v-taq").style.transformOrigin = "50% 0%";
    $("#v-roast").style.transformOrigin = "50% 12%";
    $("#v-lobby").style.transformOrigin = "49.4% 0%";
    A("#v-taq", { opacity: [[25.5, 1], [26.95, 1], [27.2, 0]], s: [[25.5, 1.1], [27.2, 1.17, "lin"]] });
    A("#v-roast", { opacity: [[26.95, 0], [27.2, 1], [28.2, 1], [28.45, 0]], s: [[26.9, 1.1], [28.45, 1.18, "lin"]] });
    A("#v-lobby", { opacity: [[28.2, 0], [28.45, 1]], s: [[28.2, 1.32], [29.5, 1.42, "lin"]] });
    $("#s5").insertBefore($("#v-lobby"), $("#v-taq")); // lobby under, taquería on top
    $("#s5").insertBefore($("#v-roast"), $("#v-taq"));
    A("#s5 .label5", { opacity: [[26.0, 0], [26.3, 1], [29.0, 1], [29.25, 0]], y: [[26.0, -20], [26.35, 0]] });

    /* 6 · Keep it fresh (29.5 – 37.5) */
    A("#s6", { opacity: [[CH.four, 0], [CH.four + 0.45, 1], [37.1, 1], [37.5, 0]] });
    A("#s6 .phone", { opacity: [[29.6, 0], [30.05, 1]], y: [[29.6, 170], [30.3, 0]] });
    hide("#s6 .board .b-price .old");
    A("#m-me", { opacity: [[30.45, 0], [30.65, 1]], s: [[30.45, 0.7], [30.8, 1, "back"]] });
    $("#m-me").style.transformOrigin = "100% 100%";
    A("#m-me .typed", { text: [[30.6, 0], [32.0, 39, "lin"]] });
    A("#m-pic", { opacity: [[32.2, 0], [32.4, 1]], s: [[32.2, 0.5], [32.65, 1, "back"]] });
    $("#m-pic").style.transformOrigin = "100% 100%";
    A("#m-them1", { opacity: [[33.0, 0], [33.2, 1]], s: [[33.0, 0.6], [33.4, 1, "back"]] });
    $("#m-them1").style.transformOrigin = "0 100%";
    A("#m-them2", { opacity: [[34.7, 0], [34.9, 1]], s: [[34.7, 0.6], [35.1, 1, "back"]] });
    $("#m-them2").style.transformOrigin = "0 100%";
    // Friday's special flips on the screen.
    A("#s6 .board .swap.old", { y: [[33.7, 0], [34.15, -78, "io"]], opacity: [[33.7, 1], [34.15, 0]] });
    A("#s6 .board .swap.new", { y: [[33.7, 78], [34.15, 0, "io"]], opacity: [[33.7, 0], [34.0, 1]] });
    A("#s6 .board .b-day.today", { s: [[34.1, 1], [34.35, 1.14], [34.8, 1, "io"]] });
    A("#s6 .board .b-ticker span", { x: [[29.5, 0], [37.5, -200, "lin"]] });
    pop("#s6 .toast6", 34.35);
    each("#s6 .care .chip", (el, i) => A(el, { opacity: [[35.3 + i * 0.14, 0], [35.55 + i * 0.14, 1]], y: [[35.3 + i * 0.14, 30], [35.7 + i * 0.14, 0]] }));

    /* 7 · End card (37.5 – 41) */
    A("#s7", { opacity: [[CH.end, 0], [CH.end + 0.4, 1], [40.35, 1], [40.8, 0]] });
    pop("#s7 .lockup", 37.7, 0.6);
    fadeIn("#s7 .l1", 37.95, 0.5, 44);
    fadeIn("#s7 .l2", 38.12, 0.5, 44);
    fadeIn("#s7 .row", 38.5, 0.5, 30);
    fadeIn("#s7 .fine", 38.75, 0.5, 20);
  }

  /* ── Boot ── */
  function fit() {
    const params = new URLSearchParams(location.search);
    if (params.has("render")) return;
    scale = Math.min(innerWidth / 1920, innerHeight / 1080);
    $("#fit").style.transform = `scale(${scale})`;
    $("#fit").style.left = (innerWidth - 1920 * scale) / 2 + "px";
    $("#fit").style.top = (innerHeight - 1080 * scale) / 2 + "px";
  }

  async function boot() {
    stage = $("#stage");
    await document.fonts.ready;
    await Promise.all($$("img").map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))));
    window.buildStage(document);
    await Promise.all($$("img").map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))));
    $$("#bg .blob").forEach((b) => blobs.push(b));
    build();
    fit();
    addEventListener("resize", fit);

    const params = new URLSearchParams(location.search);
    window.__DUR = DUR;
    window.__CH = CH;
    window.__seek = seek;
    if (params.has("t")) {
      seek(parseFloat(params.get("t")));
    } else if (!params.has("render")) {
      const start = performance.now();
      const loop = (now) => {
        seek(((now - start) / 1000) % DUR);
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    } else {
      seek(0);
    }
    window.__ready = true;
  }
  boot();
})();
