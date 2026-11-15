/* Illustrated interiors used by the film and by the hero stills.
   Every venue is drawn with CSS inside a size container, so the same markup
   works on the 16:9 film stage and in a 4:5 still (class "tall"). */
(function () {
  const pendant = (pos, drop) =>
    `<div class="pendant" style="${pos};--drop:${drop}"><div class="lit"></div><div class="cord"></div><div class="shade" style="background:linear-gradient(#dcae56,#ad7b29)"></div><div class="bulb"></div></div>`;

  const edison = (pos, drop) =>
    `<div class="edison" style="${pos};--drop:${drop}"><div class="cord"></div><div class="cap"></div><div class="bulb"></div></div>`;

  const plant = (pos, pot, greens = ["#2a5f41", "#357a52", "#4c9c6a", "#3d8a5c", "#2f6b4a"]) => {
    const angles = [-44, -21, 1, 23, 45];
    const heights = [12.5, 16.5, 18.5, 16, 12.5];
    return `<div class="plant" style="${pos}">${angles
      .map((a, i) => `<div class="leaf" style="height:${heights[i]}cqh;background:${greens[i]};transform:rotate(${a}deg)"></div>`)
      .join("")}<div class="pot" style="background:${pot}"></div></div>`;
  };

  const stool = (pos, color) =>
    `<div class="stool" style="${pos};bottom:0"><div class="seat" style="background:${color}"></div><div class="leg" style="left:1.8cqh"></div><div class="leg" style="right:1.8cqh"></div><div class="bar"></div></div>`;

  const chair = (pos, color) =>
    `<div class="chair" style="${pos};bottom:0"><div class="back" style="background:${color}"></div><div class="post" style="left:1.2cqh"></div><div class="post" style="right:1.2cqh"></div></div>`;

  const tv = (o) => {
    const screen = o.tv === "board" ? `<div class="board-wrap" data-board></div>` : `<img src="${o.tv}" alt="">`;
    return `<div class="tv${o.up ? " up" : ""}"><div class="bezel"><div class="screen">${screen}<div class="off"></div><div class="flash"></div><div class="livebadge"><i></i>LIVE</div></div></div></div>`;
  };

  const shelf = (pos, items) =>
    `<div class="shelf" style="${pos};background:linear-gradient(#b07c45,#8a5c30);box-shadow:0 .8cqh 1.4cqh rgba(0,0,0,.4)"><div class="shelf-items">${items}</div></div>`;

  const bag = (lbl) => `<div class="bag" style="--lbl:${lbl}"></div>`;
  const cups = (h = 6.5) => `<div class="cupstack" style="height:${h}cqh"></div>`;
  const jar = (c) => `<div class="jar" style="background:${c}"></div>`;

  const venues = {
    cafe: (o) => `
      <div class="wall" style="background:radial-gradient(80% 60% at 50% 30%,#fbf3e4,transparent 70%),linear-gradient(180deg,#f6ebd8,#eadabd)"></div>
      <div class="wains" style="background:repeating-linear-gradient(90deg,#5f816d 0 6cqh,#54745f 6cqh 6.35cqh)"></div>
      <div class="rail-line" style="background:linear-gradient(#fbf1de,#e3d2b3);box-shadow:0 .5cqh 1cqh rgba(0,0,0,.22)"></div>
      ${pendant("left:12%", "9cqh")}${pendant("left:88%", "13cqh")}
      <div class="mount"><i></i><i></i><i></i><i></i></div>
      <div class="raceway" style="top:calc(var(--tv-top) + var(--tv-h) - .5cqh);height:26cqh;background:linear-gradient(90deg,#dccdb0,#f6ecd9 45%,#d9c9a9)"></div>
      ${tv(o)}
      ${plant("left:2.5%;bottom:13.4cqh", "linear-gradient(#cf7245,#a9532f)")}
      <div class="counter" style="background:linear-gradient(#9c6638,#7b4d27)"><div class="top" style="background:linear-gradient(#d6a068,#b98049);box-shadow:0 .7cqh 1.3cqh rgba(0,0,0,.28)"></div></div>
      <div style="right:14%;bottom:14.9cqh;width:9.4cqh;height:6.2cqh;border-radius:6.2cqh 6.2cqh 0 0;background:linear-gradient(135deg,rgba(255,255,255,.8),rgba(255,255,255,.22));border:.3cqh solid rgba(255,255,255,.9)"></div>
      <div style="right:calc(14% + 2.6cqh);bottom:14.9cqh;width:4.2cqh;height:2.6cqh;border-radius:2.2cqh 2.2cqh .4cqh .4cqh;background:#c98a44"></div>
      <div style="right:calc(14% - .7cqh);bottom:14.3cqh;width:10.8cqh;height:.9cqh;border-radius:.5cqh;background:#fbf4e6"></div>
      <div class="cupstack" style="right:calc(14% + 15cqh);bottom:14.9cqh"></div>
      <div class="cupstack" style="right:calc(14% + 20.4cqh);bottom:14.9cqh;height:4.6cqh"></div>
      ${stool("left:15%", "#2f6b4a")}${stool("left:calc(15% + 16cqh)", "#2f6b4a")}
      <div class="vignette"></div>`,

    taqueria: (o) => `
      <div class="wall" style="background:radial-gradient(70% 60% at 30% 22%,#e08a5e,transparent 72%),linear-gradient(180deg,#d0704a,#b85733)"></div>
      <div class="wains" style="height:30cqh;background:
        radial-gradient(circle at 50% 50%,#1f8f8f 0 17%,transparent 18%) 0 0/7.5cqh 7.5cqh,
        radial-gradient(circle at 0 0,#e9a23b 0 31%,transparent 32%) 0 0/7.5cqh 7.5cqh,
        radial-gradient(circle at 100% 0,#e9a23b 0 31%,transparent 32%) 0 0/7.5cqh 7.5cqh,
        radial-gradient(circle at 0 100%,#e9a23b 0 31%,transparent 32%) 0 0/7.5cqh 7.5cqh,
        radial-gradient(circle at 100% 100%,#e9a23b 0 31%,transparent 32%) 0 0/7.5cqh 7.5cqh,
        #f6ecd8"></div>
      <div class="rail-line" style="bottom:30cqh;height:1.9cqh;background:linear-gradient(#8a4628,#6e3319);box-shadow:0 .5cqh 1cqh rgba(0,0,0,.25)"></div>
      <div style="left:0;right:0;top:2.6cqh;height:.3cqh;background:#3a1f14"></div>
      <div class="flags" style="top:2.8cqh;justify-content:center;gap:1.3cqh;overflow:hidden">${["#e84a7f", "#1aa6a6", "#f4b43c", "#f07a3a", "#7c4bc0", "#3fa35c"]
        .concat(["#e84a7f", "#1aa6a6", "#f4b43c", "#f07a3a", "#7c4bc0", "#3fa35c"], ["#e84a7f", "#1aa6a6", "#f4b43c", "#f07a3a", "#7c4bc0", "#3fa35c"], ["#e84a7f", "#1aa6a6", "#f4b43c", "#f07a3a"])
        .map((c) => `<i style="background:${c};flex:none"></i>`)
        .join("")}</div>
      ${tv(o)}
      <div class="cactus" style="right:3%;bottom:11cqh"><i style="left:4cqh;bottom:7cqh;width:8cqh;height:16cqh"></i><i style="left:0;bottom:14cqh;width:6cqh;height:10cqh;transform:rotate(-24deg)"></i><i style="right:0;bottom:16cqh;width:6.4cqh;height:11cqh;transform:rotate(22deg)"></i>
        <b style="position:absolute;left:2.6cqh;bottom:0;width:10.8cqh;height:9cqh;border-radius:.8cqh .8cqh 2.4cqh 2.4cqh;background:linear-gradient(#2a8f96,#1c6b72)"></b></div>
      <div class="counter" style="height:12cqh;background:linear-gradient(#6b3d22,#4f2b16)"><div class="top" style="background:linear-gradient(#9a5f38,#7c4827);box-shadow:0 .7cqh 1.3cqh rgba(0,0,0,.3)"></div></div>
      ${chair("left:20%", "#1aa6a6")}${chair("left:calc(20% + 20cqh)", "#f4b43c")}
      <div class="vignette" style="background:radial-gradient(120% 90% at 50% 34%,transparent 52%,rgba(40,10,0,.34))"></div>`,

    roastery: (o) => `
      <div class="wall" style="background:radial-gradient(70% 60% at 50% 34%,#3a4046,transparent 72%),linear-gradient(180deg,#2b2f34,#1a1d21)"></div>
      <div class="wall" style="background:repeating-linear-gradient(0deg,transparent 0 5.6cqh,rgba(255,255,255,.04) 5.6cqh 5.9cqh),repeating-linear-gradient(90deg,transparent 0 11.6cqh,rgba(255,255,255,.035) 11.6cqh 11.9cqh)"></div>
      ${edison("left:11%", "9cqh")}${edison("left:28%", "16cqh")}${edison("left:73%", "13cqh")}${edison("left:90%", "7cqh")}
      ${shelf("left:var(--sh-l);width:var(--sh-w);top:36cqh", bag("#e2553a") + bag("#1c2421") + cups() + bag("#14b8d4") + jar("#d9b98a") + cups(4.8))}
      ${shelf("left:var(--sh-l);width:var(--sh-w);top:54cqh", cups(5.2) + jar("#8a5c30") + bag("#f4b43c") + bag("#e2553a") + jar("#d9b98a") + bag("#1c2421"))}
      ${shelf("right:var(--sh-l);width:var(--sh-w);top:36cqh", jar("#d9b98a") + bag("#f4b43c") + bag("#1c2421") + cups(5.6) + bag("#e2553a") + jar("#8a5c30"))}
      ${shelf("right:var(--sh-l);width:var(--sh-w);top:54cqh", bag("#14b8d4") + cups() + bag("#e2553a") + jar("#d9b98a") + bag("#f4b43c") + cups(4.6))}
      ${tv(Object.assign({}, o, { up: true }))}
      <div class="counter" style="height:17cqh;background:linear-gradient(#4a3020,#2e1d12)"><div class="top" style="height:3cqh;background:linear-gradient(#7b5234,#5d3c24);box-shadow:0 .7cqh 1.3cqh rgba(0,0,0,.4)"></div></div>
      <div class="machine wide-only" style="left:9%;bottom:16.8cqh;width:27cqh;height:14cqh;background:linear-gradient(#eef1f4,#b3bbc5);box-shadow:0 1cqh 2cqh rgba(0,0,0,.4)">
        <div style="position:absolute;left:-.6cqh;right:-.6cqh;top:0;height:2.4cqh;border-radius:1.2cqh 1.2cqh .3cqh .3cqh;background:#23272e"></div>
        <div style="position:absolute;left:3cqh;bottom:100%;width:3.4cqh;height:2.6cqh;border-radius:.3cqh .3cqh 1cqh 1cqh;background:#fff"></div>
        <div style="position:absolute;left:7.2cqh;bottom:100%;width:3.4cqh;height:2.6cqh;border-radius:.3cqh .3cqh 1cqh 1cqh;background:#f1ece2"></div>
        <div style="position:absolute;left:11.4cqh;bottom:100%;width:3.4cqh;height:2.6cqh;border-radius:.3cqh .3cqh 1cqh 1cqh;background:#fff"></div>
        <div style="position:absolute;left:3cqh;top:4.2cqh;width:2.6cqh;height:2.6cqh;border-radius:50%;background:#fff;border:.45cqh solid #5d6672"></div>
        <div style="position:absolute;left:7cqh;top:4.2cqh;width:2.6cqh;height:2.6cqh;border-radius:50%;background:#fff;border:.45cqh solid #5d6672"></div>
        <div style="position:absolute;right:3cqh;top:4.6cqh;width:7cqh;height:1.8cqh;border-radius:1cqh;background:#14b8d4;opacity:.85"></div>
        <div style="position:absolute;left:4cqh;top:8.4cqh;width:6cqh;height:2cqh;border-radius:.4cqh .4cqh 1cqh 1cqh;background:#23272e"></div>
        <div style="position:absolute;left:8.6cqh;top:9.4cqh;width:5cqh;height:.9cqh;border-radius:.5cqh;background:#23272e;transform:rotate(12deg)"></div>
        <div style="position:absolute;right:5cqh;top:8.4cqh;width:6cqh;height:2cqh;border-radius:.4cqh .4cqh 1cqh 1cqh;background:#23272e"></div>
        <div style="position:absolute;right:1.4cqh;top:9.4cqh;width:5cqh;height:.9cqh;border-radius:.5cqh;background:#23272e;transform:rotate(12deg)"></div>
        <div style="position:absolute;left:1.2cqh;right:1.2cqh;bottom:0;height:1.5cqh;border-radius:.3cqh;background:#59616d"></div></div>
      <div class="wide-only" style="right:11%;bottom:16.8cqh;width:8cqh;height:13cqh;border-radius:1cqh 1cqh .4cqh .4cqh;background:linear-gradient(#3a3f47,#1f2227)">
        <div style="position:absolute;left:.8cqh;right:.8cqh;bottom:100%;height:6cqh;clip-path:polygon(0 0,100% 0,82% 100%,18% 100%);background:linear-gradient(rgba(255,214,130,.55),rgba(160,100,40,.75))"></div></div>
      <div class="vignette" style="background:radial-gradient(120% 90% at 50% 36%,transparent 46%,rgba(0,0,0,.5))"></div>`,

    lobby: (o) => `
      <div class="wall" style="background:radial-gradient(80% 60% at 50% 30%,#ffffff,transparent 70%),linear-gradient(180deg,#f0f5f8,#dde7ee)"></div>
      <div class="wains" style="height:31cqh;background:linear-gradient(180deg,#cfdbe4,#bfcdd8)"></div>
      <div class="rail-line" style="bottom:31cqh;height:3.2cqh;background:linear-gradient(#218099,#17627a)"></div>
      <div class="floor" style="background:linear-gradient(#cbb796,#b6a07c)"></div>
      <div class="doorway wide-only" style="right:5%;background:#33404f"><div style="position:absolute;inset:1.2cqh 1.2cqh 0 1.2cqh;background:linear-gradient(160deg,#c3d6e3,#8fa9bd)"></div><div style="position:absolute;right:3cqh;top:48%;width:1cqh;height:5cqh;border-radius:.5cqh;background:#eef2f6"></div></div>
      <div class="wclock wide-only" style="left:10%;top:24cqh"></div>
      ${tv(o)}
      <div class="bench" style="left:50%;translate:-50% 0;bottom:7cqh;width:60cqh;max-width:80cqw"><div class="slab" style="background:linear-gradient(#cf9a5f,#a87441);box-shadow:0 .8cqh 1.4cqh rgba(0,0,0,.2)"></div><div class="leg" style="left:6cqh"></div><div class="leg" style="right:6cqh"></div></div>
      ${plant("left:3%;bottom:7cqh", "linear-gradient(#fbfcfd,#d3dbe3)")}
      <div class="vignette" style="background:radial-gradient(120% 90% at 50% 34%,transparent 55%,rgba(20,45,70,.22))"></div>`,
  };

  const boardHTML = `
    <div class="board">
      <div class="b-header">
        <div class="b-brand"><span class="b-logo"><svg><use href="#i-bird"/></svg></span><div><div class="b-name">Goldfinch Café</div><div class="b-tag">Breakfast &amp; lunch · made from scratch</div></div></div>
        <div class="b-meta"><div class="b-weather"><svg><use href="#i-sun"/></svg><b>72°</b><span>Sunny</span></div><div class="b-clock"><b>9:30</b><i>AM</i><span>Friday</span></div></div>
      </div>
      <div class="b-feature">
        <div class="b-photo"><svg viewBox="0 0 600 600"><use href="#dish-pancakes"/></svg></div>
        <div class="b-copy">
          <div class="b-kicker">The one everyone orders</div>
          <div class="b-title">Lemon Ricotta Pancakes</div>
          <div class="b-desc">Whipped ricotta, blueberries and warm maple syrup.</div>
          <div class="b-price"><span class="old">$11.50</span><span class="new">$12.00</span></div>
        </div>
        <div class="b-dots"><i class="on"></i><i></i><i></i><i></i></div>
      </div>
      <div class="b-menu">
        <div class="b-menu-head"><span>Breakfast Favorites</span><em><i></i>Open · closes 3 PM</em></div>
        <div class="b-row"><span>Classic Two-Egg Plate</span><b>$9.50</b></div>
        <div class="b-row"><span>Biscuits &amp; Sausage Gravy</span><b>$8.75</b></div>
        <div class="b-row"><span>Avocado Toast, Soft Egg</span><b>$10.25</b></div>
        <div class="b-row"><span>Shrimp &amp; Stone-Ground Grits</span><b>$13.50</b></div>
        <div class="b-row"><span>Garden Veggie Omelet</span><b>$10.75</b></div>
        <div class="b-row"><span>Buttermilk Short Stack</span><b>$7.50</b></div>
        <div class="b-row"><span>Granola, Yogurt &amp; Fruit</span><b>$6.95</b></div>
        <div class="b-row"><span>Drip Coffee · Free Refills</span><b>$2.95</b></div>
        <div class="b-menu-foot">Ask about gluten-free pancakes and oat milk.</div>
      </div>
      <div class="b-week">
        <div class="b-week-head">This week at Goldfinch</div>
        <div class="b-days">
          <div class="b-day"><small>MON</small><b>Biscuit day</b></div>
          <div class="b-day"><small>TUE</small><b>2-for-1 tea</b></div>
          <div class="b-day"><small>WED</small><b>Soup combo</b></div>
          <div class="b-day"><small>THU</small><b>Pie slices $4</b></div>
          <div class="b-day today"><div class="swap old"><small>FRI · TODAY</small><b>Quiche $10</b></div><div class="swap new"><small>FRI · TODAY</small><b>Fish tacos $12</b></div></div>
        </div>
      </div>
      <div class="b-ticker"><span>Welcome to Goldfinch · Catering for 10 to 200 · Now hiring weekend line cooks · Order ahead at the counter · Welcome to Goldfinch · Catering for 10 to 200</span></div>
    </div>`;

  /** Fill every [data-venue] and [data-board] placeholder, then size the boards. */
  window.buildStage = function buildStage(root = document) {
    root.querySelectorAll("[data-venue]").forEach((el) => {
      const kind = el.dataset.venue;
      el.innerHTML = venues[kind]({ tv: el.dataset.tv, up: "up" in el.dataset });
    });
    root.querySelectorAll("[data-board]").forEach((el) => {
      el.innerHTML = boardHTML;
    });
    root.querySelectorAll(".board-wrap").forEach((el) => {
      el.style.setProperty("--bs", el.clientWidth / 1600);
    });
  };
})();
