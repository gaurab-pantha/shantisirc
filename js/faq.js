/* FAQs: built from js/data.js */
(() => {
  const S = window.SSIRC, box = document.getElementById("faqList"); if (!box) return;
  S.faqs.forEach(f => {
    const d = document.createElement("details"); d.className = "faq rv";
    const s = document.createElement("summary"); s.textContent = f.q;
    const p = document.createElement("div"); p.className = "ans"; p.innerHTML = f.a;
    d.append(s, p); box.append(d);
  });
  S.wire(); S.reveal(box);
})();
