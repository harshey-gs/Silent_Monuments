document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("relicsGrid");
  const tabButtons = document.querySelectorAll(".tab-pill");
  const searchInput = document.getElementById("searchInput");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalDismissBtn = document.getElementById("modalDismissBtn");
  const modalDetails = document.getElementById("modalDetails");

  let currentCategory = "all";
  let searchFilter = "";

  // Helper to create a crisp NASA HUD Telemetry blueprint if an image is blocked or offline
  function createBlueprintCanvas(name, category, coordinates) {
    const symbol = category === "moon" ? "LUNAR SURFACE RELIC" : category === "mars" ? "MARTIAN SOIL MONUMENT" : "DEEP SPACE DRIFTER";
    return `
      <div class="blueprint-box">
        <div class="blueprint-grid"></div>
        <div class="blueprint-badge">${symbol}</div>
        <div class="blueprint-title">${name}</div>
        <div class="blueprint-coords">COORDS: ${coordinates}</div>
        <div class="blueprint-status">TELEMETRY ARCHIVED // NASA PDS</div>
      </div>
    `;
  }

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

      const imageContainer = document.createElement("div");
      imageContainer.className = "relic-image-box";

      const tag = document.createElement("span");
      tag.className = "category-tag";
      tag.textContent = artifact.category;
      imageContainer.appendChild(tag);

      // Robust image loader with event listener (prevents HTML escaping bugs)
      const img = new Image();
      img.alt = artifact.name;
      img.loading = "lazy";
      //img.crossOrigin = "anonymous";
      img.referrerPolicy = "no-referrer";

      img.onload = () => {
        imageContainer.appendChild(img);
      };

      img.onerror = () => {
        imageContainer.innerHTML = `
          <span class="category-tag">${artifact.category}</span>
          ${createBlueprintCanvas(artifact.name, artifact.category, artifact.coordinates)}
        `;
      };

      img.src = artifact.imageUrl;

      const body = document.createElement("div");
      body.className = "relic-card-body";
      body.innerHTML = `
        <h3 class="title-2 card-title-text">${artifact.name}</h3>
        <div class="card-coordinates">📍 ${artifact.coordinates}</div>
        <p class="body-5 card-summary-text">${artifact.tagline}</p>
        <div class="card-action-bar">
          <span class="caption-3" style="color: var(--text-muted);">${artifact.launchYear}</span>
          <span class="action-label caption-1">Inspect dossier &rarr;</span>
        </div>
      `;

      card.appendChild(imageContainer);
      card.appendChild(body);

      card.addEventListener("click", () => openModal(artifact));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") openModal(artifact);
      });

      grid.appendChild(card);
    });
  }

    function openModal(artifact) {
    modalDetails.innerHTML = `
      <div style="margin-bottom: 16px;">
        <span class="caption-3" style="color: var(--accent-cyan); text-transform: uppercase;">// OFFICIAL MISSION DOSSIER</span>
        <h2 class="heading-4" style="margin-top: 4px;">${artifact.name}</h2>
        <div class="caption-1" style="color: var(--text-secondary); margin-top: 4px;">📍 ${artifact.location} (${artifact.coordinates})</div>
      </div>

      <div style="margin-bottom: 24px; border-radius: 8px; overflow: hidden; height: 320px; background-color: var(--bg-surface-elevated); display: flex; align-items: center; justify-content: center;">
        <img 
          src="${artifact.imageUrl}" 
          alt="${artifact.name}" 
          style="width: 100%; height: 100%; object-fit: cover;"
          referrerpolicy="no-referrer"
          onerror="this.parentElement.innerHTML = \`${createBlueprintCanvas(artifact.name, artifact.category, artifact.coordinates)}\`"
        >
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 24px; padding: 16px; background-color: var(--bg-surface-elevated); border-radius: 8px; border: 1px solid var(--border-card);">
        <div>
          <div class="caption-3" style="color: var(--text-muted);">CLASSIFICATION</div>
          <div class="body-5" style="margin-top: 4px;">${artifact.relicType}</div>
        </div>
        <div>
          <div class="caption-3" style="color: var(--text-muted);">LAUNCH / DEPLOYMENT</div>
          <div class="body-5" style="margin-top: 4px;">${artifact.launchYear}</div>
        </div>
        <div>
          <div class="caption-3" style="color: var(--text-muted);">STATUS</div>
          <div class="body-5" style="margin-top: 4px;">${artifact.status}</div>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 class="title-2" style="margin-bottom: 12px; color: #FFFFFF;">Mission Story & Final Telemetry Log</h3>
        <p class="modal-story-text">${artifact.story}</p>
      </div>

      <div style="margin-bottom: 28px;">
        <h3 class="title-3" style="margin-bottom: 10px; color: #FFFFFF;">Documented Hardware Left Behind</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${artifact.notableArtifacts.map(item => `
            <span class="caption-3" style="background-color: var(--bg-surface-elevated); border: 1px solid var(--border-card); padding: 6px 12px; border-radius: 6px; color: var(--text-primary);">${item}</span>
          `).join("")}
        </div>
      </div>

      <div>
        <a href="${artifact.nasaUrl}" target="_blank" rel="noopener noreferrer" class="button-md button-primary" style="font-size: 14px;">
          View Official NASA Science Record &rarr;
        </a>
      </div>
    `;

    modalBackdrop.classList.add("open");
  }

  modalDismissBtn.addEventListener("click", () => modalBackdrop.classList.remove("open"));
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) modalBackdrop.classList.remove("open");
  });

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-filter");
      renderCards();
    });
  });

  searchInput.addEventListener("input", (e) => {
    searchFilter = e.target.value;
    renderCards();
  });

  // Reveal words on scroll
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

  renderCards();
});