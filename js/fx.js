/* Visual effects: loading screen, circuit background, scroll reveal, counters */
(() => {
  const S = window.SSIRC, calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || "#2fe3cc";

  /* ---- loading screen (home page, first visit of a session) ---- */
  let seen = false; try { seen = sessionStorage.getItem("ssirc-boot"); } catch (e) {}
  if (!calm && !seen && document.body.dataset.page === "home") {
    const b = document.createElement("div");
    b.className = "boot"; b.setAttribute("role", "status");
    b.innerHTML = `<div class="boot-in"><div class="boot-logo"><img src="logo.png" alt=""><i></i><i></i></div>
      <h2>SSIRC</h2><p id="bootLine">Initialising…</p><div class="boot-bar"><i id="bootFill"></i></div><b id="bootPct">0%</b></div>`;
    document.body.append(b); document.documentElement.classList.add("booting");
    const lines = [[0, "Initialising SSIRC"], [25, "Loading science module"], [50, "Calibrating robotics"], [75, "Connecting the ICT lab"], [96, "Ready"]];
    const t0 = performance.now(), D = 1900;
    const done = () => { b.classList.add("done"); document.documentElement.classList.remove("booting"); setTimeout(() => b.remove(), 700); try { sessionStorage.setItem("ssirc-boot", "1"); } catch (e) {} };
    (function tick(t) {
      const p = Math.min(1, (t - t0) / D), v = Math.round(100 * (1 - Math.pow(1 - p, 2.2)));
      document.getElementById("bootPct").textContent = v + "%";
      document.getElementById("bootFill").style.width = v + "%";
      const l = lines.filter(x => v >= x[0]).pop(); document.getElementById("bootLine").textContent = l[1] + "…";
      if (p < 1) requestAnimationFrame(tick); else setTimeout(done, 250);
    })(t0);
    setTimeout(() => { if (b.isConnected) done(); }, 5000);
  }

  /* ---- circuit network background ---- */
  const cv = document.createElement("canvas"); cv.id = "bg"; cv.setAttribute("aria-hidden", "true"); document.body.prepend(cv);
  const ctx = cv.getContext("2d"); let W, H, dots = [], col = css("--teal");
  const size = () => {
    const r = devicePixelRatio || 1; W = innerWidth; H = innerHeight; cv.width = W * r; cv.height = H * r; ctx.setTransform(r, 0, 0, r, 0, 0);
    const n = Math.min(70, Math.floor(W / 20));
    dots = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25 }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    for (const a of dots) {
      if (!calm) { a.x += a.vx; a.y += a.vy; if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1; }
      ctx.globalAlpha = .9; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(a.x, a.y, 1.8, 0, 6.3); ctx.fill();
    }
    for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
      const a = dots[i], b = dots[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 150) { ctx.globalAlpha = (1 - d / 150) * .5; ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
  };
  let raf; const loop = () => { draw(); raf = requestAnimationFrame(loop); };
  size(); addEventListener("resize", () => { size(); if (calm) draw(); });
  new MutationObserver(() => { col = css("--teal"); if (calm) draw(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  if (calm) draw(); else loop();
  document.addEventListener("visibilitychange", () => { if (document.hidden) cancelAnimationFrame(raf); else if (!calm) loop(); });

  /* ---- scroll reveal ---- */
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 }) : null;
  S.reveal = (root = document) => root.querySelectorAll(".rv:not(.in)").forEach((n, i) => { if (!io) n.classList.add("in"); else io.observe(n); });
  S.reveal();

  /* ---- number count-up ---- */
  S.count = (node, n) => {
    if (calm || n < 2) { node.textContent = n; return; }
    const t0 = performance.now();
    (function tick(t) { const p = Math.min(1, (t - t0) / 1200); node.textContent = Math.round(n * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(tick); })(t0);
  };
})();
