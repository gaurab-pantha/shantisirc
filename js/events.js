/* News and events: carousel, filter grid, details pop-up. Data = js/data.js + .txt files in the news/ folder */
(() => {
  const S = window.SSIRC, { el, enc, IMG, list, base, text, fmtDate, $ } = S.u;
  let cache;

  S.loadEvents = () => cache || (cache = (async () => {
    const built = S.events.map((e, i) => ({ ...e, order: i }));
    const files = await list("news");
    const names = files.filter(f => /\.txt$/i.test(f));
    const bodies = await Promise.all(names.map(n => text(`news/${enc(n)}`)));
    const extra = names.map((n, i) => {
      let title = base(n).replace(/_/g, " "), date = "";
      const m = base(n).match(/^(\d{4}-\d{2}-\d{2})[ _-]+(.+)$/);
      if (m) { date = m[1]; title = m[2].replace(/_/g, " "); }
      const pic = files.find(f => IMG.test(f) && base(f) === base(n));
      return { date: date || "2000-01-01", nodate: !date, title, tag: "News", text: bodies[i], img: pic ? `news/${enc(pic)}` : "", order: -1 };
    });
    return [...extra, ...built].sort((a, b) => b.date.localeCompare(a.date) || a.order - b.order);
  })());

  const when = e => e.nodate ? "" : (e.when || fmtDate(e.date));

  /* ---- details pop-up ---- */
  const dlg = document.getElementById("evm");
  function open(e) {
    if (!dlg) return;
    dlg.querySelector(".evm-tag").textContent = e.tag; dlg.querySelector(".evm-tag").dataset.tag = e.tag;
    dlg.querySelector("time").textContent = when(e);
    dlg.querySelector("h2").textContent = e.title;
    dlg.querySelector(".evm-text").textContent = e.text || "";
    const img = dlg.querySelector(".evm-img"); img.hidden = !e.img; if (e.img) { img.src = e.img; img.alt = e.title; }
    const dl = dlg.querySelector("dl"); dl.replaceChildren(); dl.hidden = !e.facts;
    (e.facts || []).forEach(([k, v]) => { const d = el("div"); d.append(el("dt", null, k), el("dd", null, v)); dl.append(d); });
    const a = dlg.querySelector(".evm-link"); a.href = e.link || S.FB_URL; a.textContent = e.linkText || "View on Facebook";
    if (!e.link || /^https?:/.test(e.link)) { a.target = "_blank"; a.rel = "noopener"; } else { a.removeAttribute("target"); }
    dlg.showModal();
  }
  if (dlg) {
    dlg.querySelector(".evm-close").onclick = () => dlg.close();
    dlg.addEventListener("click", ev => { if (ev.target === dlg) dlg.close(); });
  }

  /* ---- card ---- */
  function card(e) {
    const b = el("button", "ev rv"); b.type = "button"; b.dataset.tag = e.tag;
    const t = el("span", "ev-tag", e.tag); t.dataset.tag = e.tag;
    const d = el("time", null, when(e));
    b.append(t, d, el("h3", null, e.title), el("p", null, e.text || ""), el("span", "ev-more", "Details →"));
    b.addEventListener("click", () => open(e));
    return b;
  }

  /* ---- filter grid ---- */
  S.renderEvents = (items, { grid, filters, limit }) => {
    const draw = tag => {
      let v = tag && tag !== "All" ? items.filter(e => e.tag === tag) : items;
      if (limit) v = v.slice(0, limit);
      grid.replaceChildren(...v.map(card)); S.reveal(grid);
    };
    if (filters) {
      const tags = ["All", ...new Set(items.map(e => e.tag))];
      filters.replaceChildren(...tags.map((t, i) => {
        const c = el("button", "chip", t); c.type = "button"; c.setAttribute("aria-pressed", i === 0);
        c.addEventListener("click", () => { filters.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === c)); draw(t); });
        return c;
      }));
    }
    draw("All");
  };

  /* ---- carousel ---- */
  S.carousel = (root, items) => {
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const track = el("div", "track"), dots = el("div", "dots");
    items.forEach((e, i) => {
      const s = el("article", "slide"); s.dataset.tag = e.tag; s.setAttribute("aria-label", `${i + 1} of ${items.length}`);
      const inn = el("div", "slide-in"), t = el("span", "ev-tag", e.tag); t.dataset.tag = e.tag;
      const btn = el("button", "btn sm", "View details"); btn.type = "button"; btn.addEventListener("click", () => open(e));
      inn.append(t, el("time", null, when(e)), el("h3", null, e.title), el("p", null, e.text || ""), btn);
      s.append(inn); track.append(s);
      const d = el("button", "dot"); d.type = "button"; d.setAttribute("aria-label", "Show slide " + (i + 1)); d.addEventListener("click", () => go(i)); dots.append(d);
    });
    const prev = el("button", "nav pv", "‹"), next = el("button", "nav nx", "›");
    prev.type = next.type = "button"; prev.setAttribute("aria-label", "Previous"); next.setAttribute("aria-label", "Next");
    root.replaceChildren(track, prev, next, dots); root.setAttribute("role", "region"); root.setAttribute("aria-roledescription", "carousel");
    let at = 0, timer, hold = false;
    function go(i) {
      at = (i + items.length) % items.length; track.style.transform = `translateX(-${at * 100}%)`;
      dots.childNodes.forEach((d, k) => d.setAttribute("aria-current", k === at));
      track.childNodes.forEach((s, k) => s.inert = k !== at);
    }
    prev.onclick = () => go(at - 1); next.onclick = () => go(at + 1);
    const play = () => { clearInterval(timer); if (!calm) timer = setInterval(() => { if (!hold && !document.hidden) go(at + 1); }, 6500); };
    root.addEventListener("pointerenter", () => hold = true); root.addEventListener("pointerleave", () => hold = false);
    root.addEventListener("focusin", () => hold = true); root.addEventListener("focusout", () => hold = false);
    let x0 = null;
    root.addEventListener("pointerdown", e => { x0 = e.clientX; });
    root.addEventListener("pointerup", e => { if (x0 != null && Math.abs(e.clientX - x0) > 50) go(at + (e.clientX < x0 ? 1 : -1)); x0 = null; });
    root.addEventListener("keydown", e => { if (e.key === "ArrowLeft") go(at - 1); if (e.key === "ArrowRight") go(at + 1); });
    go(0); play();
  };

  /* ---- Facebook live feed (events page) ---- */
  const fb = $("#fbFeed");
  if (fb) {
    const w = Math.min(500, Math.max(280, fb.clientWidth || 340));
    const f = el("iframe"); f.loading = "lazy"; f.title = "SSIRC on Facebook"; f.height = 760; f.style.cssText = "border:0;width:100%;max-width:500px;display:block;margin:0 auto";
    f.src = `https://www.facebook.com/plugins/page.php?href=${enc(S.FB_URL)}&tabs=timeline&width=${w}&height=760&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false`;
    f.allow = "encrypted-media"; fb.append(f);
  }

  /* ---- auto-start on the events page ---- */
  const car = $("#eventsCar"), grid = $("#eventsGrid");
  if (car && grid) S.loadEvents().then(items => {
    S.carousel(car, items.slice(0, 7));
    S.renderEvents(items, { grid, filters: $("#eventFilters") });
  });
})();
