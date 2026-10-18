/* Fills shared text blocks (mission, vision, values, programs, what to expect, timeline) from js/data.js */
(() => {
  const S = window.SSIRC, { el } = S.u, $ = id => document.getElementById(id);
  const card = (t, d) => { const c = el("article", "card rv"); c.append(el("h3", null, t), el("p", null, d)); return c; };
  if ($("mission")) $("mission").textContent = S.about.mission;
  if ($("vision")) $("vision").textContent = S.about.vision;
  if ($("values")) S.about.values.forEach(v => { const li = el("li"); li.append(el("b", null, v.t + ": "), document.createTextNode(v.d)); $("values").append(li); });
  if ($("programs")) S.programs.forEach(p => $("programs").append(card(p.t, p.d)));
  if ($("expect")) S.expect.forEach(([t, d]) => $("expect").append(card(t, d)));
  if ($("timeline") && S.loadEvents) S.loadEvents().then(items => {
    items.filter(e => e.tag !== "Observance" && !e.nodate).slice(0, 8).reverse().forEach(e => {
      const li = el("li"); li.append(el("time", null, e.when || S.u.fmtDate(e.date)), el("h3", null, e.title), el("p", null, e.text || "")); $("timeline").append(li);
    });
  });
  S.reveal();
})();
