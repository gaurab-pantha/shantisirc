/* Projects: each .txt file in the projects/ folder is one project (optional photo with the same name) */
(() => {
  const S = window.SSIRC, { el, enc, IMG, list, base, text, $ } = S.u;
  let cache;
  S.loadProjects = () => cache || (cache = (async () => {
    const files = await list("projects"), names = files.filter(f => /\.txt$/i.test(f));
    const bodies = await Promise.all(names.map(n => text(`projects/${enc(n)}`)));
    return names.map((n, i) => ({ title: base(n).replace(/_/g, " "), text: bodies[i], img: (files.find(f => IMG.test(f) && base(f) === base(n)) || "") && `projects/${enc(files.find(f => IMG.test(f) && base(f) === base(n)))}` }));
  })());
  const g = $("#projGrid"); if (!g) return;
  S.loadProjects().then(p => {
    if (!p.length) return; $("#projEmpty").hidden = true;
    p.forEach(x => {
      const a = el("article", "card proj rv");
      if (x.img) { const i = el("img"); i.src = x.img; i.alt = x.title; i.loading = "lazy"; a.append(i); }
      const d = el("div", "in"); d.append(el("h3", null, x.title), el("p", null, x.text)); a.append(d); g.append(a);
    });
    S.reveal(g);
  });
})();
