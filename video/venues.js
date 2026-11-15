/* Rooms used by the film and by the hero stills.
   Each room is a photograph in video/rooms (generated images, not real places) with the TV
   drawn on top in CSS, so whatever is on the screen is always exact. The same markup works
   on the 16:9 film stage ("wide") and in a 4:5 still (class "tall"). */
(function () {
  /* Where the drawn TV sits in each photo, in percent of the photo:
       x = centre of the TV, top = its top edge, w = its width.
     Most photos already show a blank TV; these numbers make the drawn one cover it exactly.
     The wide café has a bare wall instead, because the film shows the screen being installed. */
  const ROOMS = {
    cafe: {
      wide: { src: "rooms/cafe-wide.jpg", x: 50, top: 12.6, w: 40.5, racewayEnd: 64 },
      tall: { src: "rooms/cafe-tall.jpg", x: 52.05, top: 12.73, w: 54.59 },
    },
    taqueria: {
      wide: { src: "rooms/taqueria-wide.jpg", x: 50.03, top: 11.78, w: 38.8 },
      tall: { src: "rooms/taqueria-tall.jpg", x: 49.9, top: 16.94, w: 65.72 },
    },
    roastery: {
      wide: { src: "rooms/roastery-wide.jpg", x: 49.84, top: 5.57, w: 17.45 },
      tall: { src: "rooms/roastery-tall.jpg", x: 49.8, top: 8.01, w: 33.69 },
    },
    lobby: {
      wide: { src: "rooms/lobby-wide.jpg", x: 49.38, top: 15.56, w: 30.08 },
      tall: { src: "rooms/lobby-tall.jpg", x: 50.15, top: 17.79, w: 60.55 },
    },
  };

  /* The TV: light spill on the wall, bezel, screen content, room light on the glass,
     and two layers the film animates (screen off, power-on flash). */
  const tv = (o) => {
    const screen = o.tv === "board" ? `<div class="board-wrap" data-board></div>` : `<img src="${o.tv}" alt="">`;
    return `<div class="tv${o.up ? " up" : ""}"><div class="spill"></div><div class="bezel"><div class="screen">${screen}<div class="sheen"></div><div class="off"></div><div class="flash"></div></div></div></div>`;
  };

  // Wall bracket and paintable cable cover, used where the film shows the install.
  const hardware = `<div class="mount"><i></i><i></i><i></i><i></i></div><div class="raceway"></div>`;

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

  /** Fill every [data-venue] and [data-board] placeholder, then size the boards.
      A scene can move the TV with data-tvpos="x,top,w" (same units as ROOMS). */
  window.buildStage = function buildStage(root = document) {
    root.querySelectorAll("[data-venue]").forEach((el) => {
      const tall = el.classList.contains("tall");
      const room = ROOMS[el.dataset.venue][tall ? "tall" : "wide"];
      const [x, top, w] = el.dataset.tvpos ? el.dataset.tvpos.split(",").map(Number) : [room.x, room.top, room.w];
      el.style.setProperty("--tv-x", x + "%");
      el.style.setProperty("--tv-top", top + "cqh");
      el.style.setProperty("--tv-w", w + "cqw");
      if (room.racewayEnd) el.style.setProperty("--rw-end", room.racewayEnd + "cqh");
      el.innerHTML =
        `<div class="photo" style="background-image:url('${room.src}')"></div>` +
        (room.racewayEnd ? hardware : "") +
        tv({ tv: el.dataset.tv, up: "up" in el.dataset });
    });
    root.querySelectorAll("[data-board]").forEach((el) => {
      el.innerHTML = boardHTML;
    });
    root.querySelectorAll(".board-wrap").forEach((el) => {
      el.style.setProperty("--bs", el.clientWidth / 1600);
    });
  };
})();
