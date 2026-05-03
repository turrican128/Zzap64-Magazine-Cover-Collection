(function () {
  "use strict";

  const grid = document.getElementById("grid");
  const countEl = document.getElementById("count");
  const sortSel = document.getElementById("sort");
  const yearSel = document.getElementById("year");

  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  const lbCaption = document.getElementById("lb-caption");
  const lbClose = document.getElementById("lb-close");
  const lbPrev = document.getElementById("lb-prev");
  const lbNext = document.getElementById("lb-next");

  if (typeof COVERS === "undefined" || !Array.isArray(COVERS)) {
    grid.textContent = "Could not load covers.js — run extract_covers.py first.";
    return;
  }

  countEl.textContent = COVERS.length;

  // Populate year dropdown from manifest
  const years = Array.from(new Set(COVERS.map(c => c.year))).sort((a, b) => a - b);
  for (const y of years) {
    const opt = document.createElement("option");
    opt.value = String(y);
    opt.textContent = String(y);
    yearSel.appendChild(opt);
  }

  // ---------- state ----------
  const state = {
    sort: "issue-asc",
    year: "all",
    visible: COVERS.slice(),
    lightboxIndex: -1,
  };

  function applyFilterSort() {
    const yr = state.year;
    let list = yr === "all" ? COVERS.slice() : COVERS.filter(c => String(c.year) === yr);
    const dateKey = (c) => c.year * 100 + c.monthNum;
    switch (state.sort) {
      case "issue-asc":  list.sort((a, b) => a.issue - b.issue); break;
      case "issue-desc": list.sort((a, b) => b.issue - a.issue); break;
      case "date-asc":   list.sort((a, b) => dateKey(a) - dateKey(b) || a.issue - b.issue); break;
      case "date-desc":  list.sort((a, b) => dateKey(b) - dateKey(a) || b.issue - a.issue); break;
    }
    state.visible = list;
    render();
  }

  function render() {
    grid.innerHTML = "";
    grid.classList.toggle("empty", state.visible.length === 0);
    const frag = document.createDocumentFragment();
    state.visible.forEach((c, i) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "card";
      card.dataset.index = String(i);
      card.setAttribute("aria-label", `Open ${c.label}`);
      card.innerHTML = `
        <div class="frame">
          <img src="covers/${encodeURIComponent(c.file)}" alt="${c.label}" loading="lazy" decoding="async">
        </div>
        <div class="meta">
          <span class="issue">#${String(c.issue).padStart(3, "0")}</span>
          <span class="date">${c.month} ${c.year}</span>
        </div>
      `;
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  // ---------- events ----------
  sortSel.addEventListener("change", () => { state.sort = sortSel.value; applyFilterSort(); });
  yearSel.addEventListener("change", () => { state.year = yearSel.value; applyFilterSort(); });

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    const idx = Number(card.dataset.index);
    if (Number.isInteger(idx)) openLightbox(idx);
  });

  // ---------- lightbox ----------
  function openLightbox(index) {
    if (index < 0 || index >= state.visible.length) return;
    state.lightboxIndex = index;
    showCurrent();
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    state.lightboxIndex = -1;
  }
  function step(delta) {
    if (state.visible.length === 0) return;
    state.lightboxIndex = (state.lightboxIndex + delta + state.visible.length) % state.visible.length;
    showCurrent();
  }
  function showCurrent() {
    const c = state.visible[state.lightboxIndex];
    if (!c) return;
    lbImg.src = `covers/${encodeURIComponent(c.file)}`;
    lbImg.alt = c.label;
    lbCaption.innerHTML =
      `<span class="issue">#${String(c.issue).padStart(3, "0")}</span>` +
      `<span class="date">${c.month} ${c.year}</span>`;
  }

  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", () => step(-1));
  lbNext.addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });

  // ---------- init ----------
  applyFilterSort();
})();
