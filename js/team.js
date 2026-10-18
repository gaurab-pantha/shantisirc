/* Team page: board grid with department filter, ID card pop-up, advisors */
(() => {
  const S = window.SSIRC, { el, $ } = S.u;
  const grid = $("#teamGrid"); if (!grid) return;
  const member = (m, i) => {
    const li = el("li"), b = el("button", "member rv"); b.type = "button"; b.dataset.dept = m.dept;
    const ph = el("span", "ph"), img = el("img"); img.src = m.photo; img.alt = m.name; img.loading = "lazy"; img.width = img.height = 150; ph.append(img);
    b.append(ph, el("b", null, m.name), el("span", "role", m.role), el("span", "idlink", "View ID card"));
    b.addEventListener("click", () => S.openCard(i)); li.append(b); return li;
  };
  const draw = dept => { grid.replaceChildren(...S.board.map((m, i) => [m, i]).filter(([m]) => dept === "All" || m.dept === dept).map(([m, i]) => member(m, i))); S.reveal(grid); };
  const filters = $("#teamFilters");
  ["All", ...new Set(S.board.map(m => m.dept))].forEach((d, i) => {
    const c = el("button", "chip", d); c.type = "button"; c.setAttribute("aria-pressed", i === 0);
    c.addEventListener("click", () => { filters.querySelectorAll(".chip").forEach(x => x.setAttribute("aria-pressed", x === c)); draw(d); });
    filters.append(c);
  });
  draw("All");

  const adv = $("#advisors");
  if (S.advisors.length) {
    const g = $("#advGrid");
    S.advisors.forEach(a => { const li = el("li", "member static rv"), ph = el("span", "ph"), img = el("img"); img.src = a.photo; img.alt = a.name; ph.append(img); li.append(ph, el("b", null, a.name), el("span", "role", a.role)); g.append(li); });
    adv.hidden = false; S.reveal(g);
  }
  const want = new URLSearchParams(location.search).get("card"), k = S.board.findIndex(m => m.slug === want);
  if (k >= 0) S.openCard(k);
})();
