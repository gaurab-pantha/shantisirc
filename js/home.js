/* Home page: numbers, latest events carousel, team strip, gallery preview */
(() => {
  const S = window.SSIRC, { el, $ } = S.u;
  const setStat = (id, n) => { const li = $(id); if (!li || !n) return; li.hidden = false; S.count(li.querySelector("b"), n); };
  S.count($("#stBoard b"), S.board.length);

  S.loadEvents().then(items => {
    S.carousel($("#homeCar"), items.slice(0, 5)); setStat("#stEvents", items.length);
  });
  S.loadProjects().then(p => setStat("#stProj", p.length));

  const strip = $("#teamStrip");
  S.board.slice(0, 6).forEach(m => {
    const a = el("a", "face rv"); a.href = "team/?card=" + m.slug;
    const i = el("img"); i.src = m.photo; i.alt = m.name; i.loading = "lazy"; i.width = i.height = 96;
    a.append(i, el("b", null, m.name), el("span", null, m.role)); strip.append(a);
  });

  S.loadPhotos().then(p => {
    setStat("#stPhotos", p.length); if (!p.length) return;
    const box = $("#galPrev"); $("#gallerySec").hidden = false;
    p.slice(0, 6).forEach(s => { const a = el("a", "pv rv"); a.href = "gallery/"; const i = el("img"); i.src = s.src; i.alt = s.cap; i.loading = "lazy"; a.append(i); box.append(a); });
    S.reveal(box);
  });
  S.reveal();
})();
