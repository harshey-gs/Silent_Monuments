// Application logic with robust SVG fallback for images
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("relicsGrid");
  const tabButtons = document.querySelectorAll(".tab-pill");
  const searchInput = document.getElementById("searchInput");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalDismissBtn = document.getElementById("modalDismissBtn");
  const modalDetails = document.getElementById("modalDetails");

  let currentCategory = "all";
  let searchFilter = "";

  // Helper to create an SVG fallback when an external photo fails to load
  function getFallbackSvg(name, category) {
    const symbol = category === "moon" ? "🌕" : category === "mars" ? "🪐" : "🌌";
    return `
      <div class="relic-placeholder">
        <div style="font-size: 32px;">${symbol}</div>
        <div class="caption-3" style="color: var(--text-secondary);">${name}</div>
        <div class="caption-3" style="color: var(--text-muted);">NASA Archival Diagram</div>
      </div>
    `;
  }

  // Render cards
  function renderCards() {
    grid.innerHTML = "";

    const filtered = ARTIFACTS.filter(item => {
      const matchCat = currentCategory === "all" || item.category === currentCategory;
      const matchSearch = item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          item.story.toLowerCase().includes(searchFilter.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: var(--text-secondary);">
          <h3 class="title-1">No matching spacecraft found</h3>
          <p class="body-3" style="margin-top: 8px;">Try searching for Apollo, Opportunity, or Mars.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(artifact => {
      const card = document.createElement("article");
      card.className = "relic-card";
      card.setAttribute("tabindex", "0");

      card.innerHTML = `
        <div class="relic-image-box" id="img-box-${artifact.id}">
          <span class="category-tag">${artifact.category}</span>
          <img 
            src="${artifact.imageUrl}" 
            alt="${artifact.name}" 
            loading="lazy" 
            referrerpolicy="no-referrer"
            onerror="this.parentElement.innerHTML = '<span class=\\'category-tag\\'>${artifact.category}</span>' + \`${getFallbackSvg(artifact.name, artifact.category)}\`"
          >
        </div>
        <div class="relic-card-body">
          <h3 class="title-2 card-title-text">${artifact.name}</h3>
          <div class="card-coordinates">📍 ${artifact.coordinates}</div>
          <p class="body-5 card-summary-text">${artifact.tagline}</p>
          <div class="card-action-bar">
            <span class="caption-3" style="color: var(--text-muted);">${artifact.launchYear}</span>
            <span class="action-label caption-1">Inspect dossier &rarr;</span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => openModal(artifact));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") openModal(artifact);
      });

      grid.appendChild(card);
    });
  }

  // Open modal
  function openModal(artifact) {
    modalDetails.innerHTML = `
      <div style="margin-bottom: 16px;">
        <span class="caption-3" style="color: var(--accent-cyan); text-transform: uppercase;">// RECORD DOSSIER</span>
        <h2 class="heading-4" style="margin-top: 4px;">${artifact.name}</h2>
        <div class="caption-1" style="color: var(--text-secondary); margin-top: 4px;">📍 ${artifact.location} (${artifact.coordinates})</div>
      </div>

      <div style="margin-bottom: 24px; border-radius: 8px; overflow: hidden; height: 260px; background-color: var(--bg-surface-elevated); display: flex; align-items: center; justify-content: center;">
        <img 
          src="${artifact.imageUrl}" 
          alt="${artifact.name}" 
          style="width: 100%; height: 100%; object-fit: cover;"
          referrerpolicy="no-referrer"
          onerror="this.parentElement.innerHTML = \`${getFallbackSvg(artifact.name, artifact.category)}\`"
        >
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px; padding: 16px; background-color: var(--bg-surface-elevated); border-radius: 8px; border: 1px solid var(--border-card);">
        <div>
          <div class="caption-3" style="color: var(--text-muted);">CLASSIFICATION</div>
          <div class="body-5" style="margin-top: 4px;">${artifact.relicType}</div>
        </div>
        <div>
          <div class="caption-3" style="color: var(--text-muted);">DEPLOYMENT</div>
          <div class="body-5" style="margin-top: 4px;">${artifact.launchYear}</div>
        </div>
        <div>
          <div class="caption-3" style="color: var(--text-muted);">STATUS</div>
          <div class="body-5" style="margin-top: 4px;">${artifact.status}</div>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 class="title-3" style="margin-bottom: 8px;">Mission outcome & resting log</h3>
        <p class="body-3" style="color: var(--text-secondary);">${artifact.story}</p>
      </div>

      <div>
        <h3 class="title-3" style="margin-bottom: 8px;">Equipment left on site</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${artifact.notableArtifacts.map(item => `
            <span class="caption-3" style="background-color: var(--bg-surface-elevated); border: 1px solid var(--border-card); padding: 4px 8px; border-radius: 4px; color: var(--text-primary);">${item}</span>
          `).join("")}
        </div>
      </div>
    `;

    modalBackdrop.classList.add("open");
  }

  modalDismissBtn.addEventListener("click", () => modalBackdrop.classList.remove("open"));
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) modalBackdrop.classList.remove("open");
  });

  // Filter tabs
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-filter");
      renderCards();
    });
  });

  // Search input
  searchInput.addEventListener("input", (e) => {
    searchFilter = e.target.value;
    renderCards();
  });

  // B11 Tagline Reveal Animation on scroll using IntersectionObserver
  const revealWords = document.querySelectorAll(".reveal-word");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealWords.forEach((word, index) => {
            setTimeout(() => {
              word.classList.add("revealed");
            }, index * 90);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });

    const revealSection = document.getElementById("revealPhrase");
    if (revealSection) observer.observe(revealSection);
  } else {
    revealWords.forEach(word => word.classList.add("revealed"));
  }

  // Initial render
  renderCards();
});