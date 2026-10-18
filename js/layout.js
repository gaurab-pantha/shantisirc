/* Header, footer, light/dark switch and mobile menu (shared by every page) */
(() => {
  /* hide "index.html" from the address bar (e.g. in Live Server) */
  try { if (/\/index\.html$/.test(location.pathname)) history.replaceState(null, "", location.pathname.replace(/index\.html$/, "") + location.search + location.hash); } catch (e) {}
  const S = window.SSIRC, page = document.body.dataset.page || "";
  const nav = [["home","Home","./"],["about","About","about/"],["team","Team","team/"],["events","Events","events/"],["projects","Projects","projects/"],["gallery","Gallery","gallery/"],["faqs","FAQs","faqs/"],["partners","Partners","partners/"]];
  const link = ([k, t, h]) => `<a href="${h}"${k === page ? ' aria-current="page"' : ""}>${t}</a>`;

  const hdr = document.getElementById("hdr");
  if (hdr) hdr.outerHTML = `
  <header class="top"><div class="wrap bar">
    <a class="brand" href="./"><img src="logo.png" alt="" width="40" height="40"><span>SSIRC</span></a>
    <nav id="links" aria-label="Main">${nav.map(link).join("")}<a class="pill" href="${S.JOIN_URL}" target="_blank" rel="noopener">Join now</a></nav>
    <div class="right">
      <button class="theme" id="theme" aria-label="Switch light or dark mode"></button>
      <button class="menu" aria-expanded="false" aria-controls="links" aria-label="Open menu">Menu</button>
    </div>
  </div></header>`;

  const ftr = document.getElementById("ftr");
  if (ftr) ftr.outerHTML = `
  <footer class="foot"><div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="brand" href="./"><img src="logo.png" alt="" width="46" height="46"><span>Shanti Science, ICT &amp; Robotics Club</span></a>
        <p class="small">Innovate. Create. Inspire.<br>${S.school.name}<br>${S.school.address}</p>
      </div>
      <div><h4>Explore</h4><ul class="fl"><li><a href="about/">About us</a></li><li><a href="team/">Team</a></li><li><a href="events/">Events</a></li><li><a href="projects/">Projects</a></li><li><a href="gallery/">Gallery</a></li><li><a href="faqs/">FAQs</a></li><li><a href="partners/">Partners</a></li></ul></div>
      <div><h4>Connect</h4><ul class="fl">
        <li><a href="${S.JOIN_URL}" target="_blank" rel="noopener">Join the club</a></li>
        <li><a href="${S.FB_URL}" target="_blank" rel="noopener">Facebook</a></li>
        <li><a href="${S.IG_URL}" target="_blank" rel="noopener">Instagram @shanti_sirc</a></li>
        <li><a href="mailto:${S.EMAIL}">${S.EMAIL}</a></li></ul></div>
    </div>
    <p class="small copy">© 2026 Shanti Science, ICT &amp; Robotics Club · Tilottama-5, Manigram, Rupandehi, Nepal</p>
  </div></footer>`;

  /* light / dark */
  const root = document.documentElement, tbtn = document.getElementById("theme");
  const cur = () => root.dataset.theme || "dark";
  const label = () => { tbtn.textContent = cur() === "dark" ? "Light" : "Dark"; };
  label();
  tbtn.addEventListener("click", () => {
    root.dataset.theme = cur() === "dark" ? "light" : "dark";
    try { localStorage.setItem("ssirc-theme", root.dataset.theme); } catch (e) {}
    label();
  });

  /* mobile menu */
  const menu = document.querySelector(".menu"), links = document.getElementById("links");
  menu.addEventListener("click", () => menu.setAttribute("aria-expanded", links.classList.toggle("open")));
  links.addEventListener("click", e => { if (e.target.tagName === "A") { links.classList.remove("open"); menu.setAttribute("aria-expanded", false); } });

  /* any element with data-join opens the Google Form; data-fb opens Facebook */
  const wire = () => {
    document.querySelectorAll("[data-join]").forEach(a => { a.href = S.JOIN_URL; a.target = "_blank"; a.rel = "noopener"; });
    document.querySelectorAll("[data-fb]").forEach(a => { a.href = S.FB_URL; a.target = "_blank"; a.rel = "noopener"; });
  };
  wire(); S.wire = wire;
})();
