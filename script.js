/* SSIRC website script
   ONE-TIME SETUP: if your GitHub repository is not "shantisirc/shantisirc.github.io",
   change the owner and repo below. Leave branch empty to use the default branch. */
const CONFIG = { owner: "shantisirc", repo: "shantisirc.github.io", branch: "" };

(() => {
  const $ = s => document.querySelector(s);
  const enc = encodeURIComponent;
  const IMG = /\.(jpe?g|png|webp|gif|avif)$/i;

  /* ---- light / dark switch ---- */
  const root = document.documentElement, tbtn = $('#theme');
  const cur = () => root.dataset.theme || 'dark';
  const label = () => { tbtn.textContent = cur() === 'dark' ? 'Light mode' : 'Dark mode'; };
  label();
  tbtn.addEventListener('click', () => {
    root.dataset.theme = cur() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('ssirc-theme', root.dataset.theme); } catch (e) {}
    label();
  });

  /* ---- mobile menu ---- */
  const menu = $('.menu'), links = $('#links');
  menu.addEventListener('click', () => menu.setAttribute('aria-expanded', links.classList.toggle('open')));
  links.addEventListener('click', e => { if (e.target.tagName === 'A') { links.classList.remove('open'); menu.setAttribute('aria-expanded', false); } });

  /* ---- join form (opens the visitor's email app) ---- */
  $('#joinForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const body = `Name: ${f.get('name')}\nClass: ${f.get('class')}\nContact: ${f.get('contact')}\nInterest: ${f.get('interest')}\n\n${f.get('msg') || ''}`;
    location.href = 'mailto:ssirc.club@gmail.com?subject=' + enc('SSIRC join application: ' + f.get('name')) + '&body=' + enc(body);
  });

  /* ---- find the GitHub repo (auto-detects *.github.io addresses) ---- */
  let { owner, repo, branch } = CONFIG;
  if (location.hostname.endsWith('.github.io')) {
    owner = location.hostname.split('.')[0];
    const seg = location.pathname.split('/')[1];
    repo = seg && !/^(about|team|events|projects|gallery|faqs|partners|join|id-cards)$/.test(seg) ? seg : location.hostname;
  }

  /* ---- list the files in a folder of the repo ---- */
  async function list(path) {
    const key = 'ssirc:' + path;
    try { const c = JSON.parse(sessionStorage.getItem(key)); if (c && Date.now() - c.t < 3e5) return c.d; } catch (e) {}
    try {
      const r = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}` + (branch ? '?ref=' + branch : ''));
      if (!r.ok) return [];
      const d = (await r.json()).filter(f => f.type === 'file' && !f.name.startsWith('_')).map(f => f.name);
      try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), d })); } catch (e) {}
      return d;
    } catch (e) { return []; }
  }
  const base = n => n.replace(/\.[^.]+$/, '');
  const pretty = n => { const s = base(n).replace(/[-_]+/g, ' ').trim(); return s.charAt(0).toUpperCase() + s.slice(1); };
  const el = (tag, cls, text) => { const x = document.createElement(tag); if (cls) x.className = cls; if (text != null) x.textContent = text; return x; };
  const text = async p => { try { const r = await fetch(p); return r.ok ? (await r.text()).trim() : ''; } catch (e) { return ''; } };
  const fmtDate = s => new Date(s + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  function card(folder, name, files, title, date, body) {
    const a = el('article', 'card'), pic = files.find(f => IMG.test(f) && base(f) === base(name));
    if (pic) { const i = el('img'); i.src = `${folder}/${enc(pic)}`; i.alt = title; i.loading = 'lazy'; a.append(i); }
    const d = el('div', 'in');
    if (date) d.append(Object.assign(el('time', null, fmtDate(date)), { dateTime: date }));
    d.append(el('h3', null, title));
    if (body) d.append(el('p', null, body));
    a.append(d); return a;
  }

  /* ---- news and projects: simple .txt files in the news/ and projects/ folders ---- */
  async function loadCards(folder, listEl, emptyEl, stat, dated) {
    const files = await list(folder);
    let names = files.filter(f => /\.txt$/i.test(f));
    if (dated) names.sort().reverse();
    if (!names.length) return 0;
    const bodies = await Promise.all(names.map(n => text(`${folder}/${enc(n)}`)));
    listEl.replaceChildren();
    names.forEach((n, i) => {
      let title = base(n).replace(/_/g, ' '), date = '';
      const m = dated && base(n).match(/^(\d{4}-\d{2}-\d{2})[ _-]+(.+)$/);
      if (m) { date = m[1]; title = m[2].replace(/_/g, ' '); }
      listEl.append(card(folder, n, files, title, date, bodies[i]));
    });
    if (emptyEl) emptyEl.hidden = true;
    return names.length;
  }

  /* ---- gallery with photo viewer ---- */
  const lb = $('#lb'); let shots = [], at = 0;
  function show(i) {
    at = (i + shots.length) % shots.length;
    $('#lbImg').src = shots[at].src; $('#lbImg').alt = shots[at].cap; $('#lbCap').textContent = shots[at].cap;
  }
  async function loadGallery() {
    const names = (await list('gallery')).filter(f => IMG.test(f)).sort().reverse();
    if (!names.length) return 0;
    const g = $('#gal'); $('#galEmpty').hidden = true;
    shots = names.map(n => ({ src: `gallery/${enc(n)}`, cap: pretty(n) }));
    shots.forEach((s, i) => {
      const b = el('button', 'shot'), im = el('img'); im.src = s.src; im.alt = s.cap; im.loading = 'lazy';
      b.append(im, el('span', null, s.cap)); b.addEventListener('click', () => { show(i); lb.showModal(); }); g.append(b);
    });
    return names.length;
  }
  $('#lbClose').onclick = () => lb.close();
  $('#lbPrev').onclick = () => show(at - 1);
  $('#lbNext').onclick = () => show(at + 1);
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') show(at - 1); if (e.key === 'ArrowRight') show(at + 1); });

  /* ---- numbers (count up) ---- */
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function count(b, n) {
    if (calm || n < 2) { b.textContent = n; return; }
    const t0 = performance.now();
    (function tick(t) { const p = Math.min(1, (t - t0) / 1100); b.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); })(t0);
  }
  function stat(id, n) { const li = $(id); if (!n) return; li.hidden = false; count(li.querySelector('b'), n); }

  count($('#stats li b'), 10);
  Promise.all([
    loadCards('projects', $('#projList'), $('#projEmpty'), null, false),
    loadCards('news', $('#newsList'), null, null, true),
    loadGallery()
  ]).then(([p, n, g]) => {
    stat('#stProj', p);
    stat('#stNews', n || $('#newsList').children.length);
    stat('#stPhoto', g);
  });
})();
