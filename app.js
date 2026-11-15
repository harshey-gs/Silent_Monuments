/* Local Images Edition — 100% Offline & Direct */

const DATA = [
  // --- THE MOON ---
  {
    name: "Apollo 11 'Eagle' Descent Stage",
    category: "moon",
    location: "Mare Tranquillitatis (Sea of Tranquility)",
    coordinates: "0.67408 N, 23.47297 E",
    launchYear: "1969",
    status: "Historic Lunar Monument",
    imageUrl: "./images/ap11.jpg",
    tagline: "The foundation of humanity's first footsteps on another world.",
    story: "On July 20, 1969, Neil Armstrong and Buzz Aldrin landed the Eagle in the Sea of Tranquility. The descent stage remained behind as their launch pad and bears the stainless steel commemorative plaque.",
    relicType: "Lunar Module Descent Stage",
    notableArtifacts: ["Commemorative Plaque", "Descent Engine", "Laser Retroreflector"]
  },
  {
    name: "Apollo 15 Lunar Roving Vehicle (LRV)",
    category: "moon",
    location: "Hadley Rille, Moon",
    coordinates: "26.1322 N, 3.6338 E",
    launchYear: "1971",
    status: "Parked Permanently",
    imageUrl: "./images/AP15.png",
    tagline: "The original electric buggy driven across lunar mountains and rilles.",
    story: "Traveled 17.5 miles across Hadley Rille. Its color TV camera was parked to broadcast the liftoff of the ascent stage before running out of battery.",
    relicType: "Manned Surface Rover",
    notableArtifacts: ["Wire Mesh Wheels", "TV Antenna", "Sample Carrier Deck"]
  },
  {
    name: "Apollo 12 ALSEP Station",
    category: "moon",
    location: "Oceanus Procellarum",
    coordinates: "3.0124 S, 23.4216 W",
    launchYear: "1969",
    status: "Decommissioned 1977",
    imageUrl: "./images/apollo12.webp",
    tagline: "Plutonium-powered laboratory that listened to deep moonquakes for 8 years.",
    story: "Deployed by Pete Conrad and Alan Bean, powered by a SNAP-27 nuclear generator. Transmitted science data until NASA powered down the network in 1977.",
    relicType: "Surface Science Observatory",
    notableArtifacts: ["SNAP-27 Generator", "Passive Seismometer", "Solar Wind Spectrometer"]
  },
  {
    name: "Surveyor 3 Soft Lander",
    category: "moon",
    location: "Oceanus Procellarum",
    coordinates: "3.0163 S, 23.4180 W",
    launchYear: "1967",
    status: "Examined by Apollo 12",
    imageUrl: "./images/surveyor3.jpg",
    tagline: "The robotic scout that proved Apollo boots would not sink into lunar dust.",
    story: "Surveyor 3 proved the lunar surface was firm. Apollo 12 landed 600 feet away in 1969 and retrieved its camera to analyze long term space exposure.",
    relicType: "Uncrewed Soft Lander",
    notableArtifacts: ["Soil Scoop", "TV Camera", "Radar Altimeter"]
  },

  // --- MARS ---
  {
    name: "Sojourner Rover & Pathfinder Base",
    category: "mars",
    location: "Ares Vallis (Carl Sagan Station)",
    coordinates: "19.33 N, 33.55 W",
    launchYear: "1996",
    status: "Silent Since October 1997",
    imageUrl: "./images/mars-pathfinder.jpg",
    tagline: "The small rover that proved robotic wheels could roam Martian soil.",
    story: "Weighing 23 pounds, Sojourner was the first wheeled vehicle on Mars. It explored for 83 Martian days until Pathfinder's primary battery depleted.",
    relicType: "Micro-Rover & Surface Station",
    notableArtifacts: ["Rocker-Bogie Suspension", "APXS Unit", "Solar Panel Deck"]
  },
  {
    name: "Spirit & Opportunity Twin Rovers",
    category: "mars",
    location: "Gusev & Endeavour Craters",
    coordinates: "Spirit: 14.57 S | Oppy: 2.34 S",
    launchYear: "2003",
    status: "Missions Ended 2010 / 2018",
    imageUrl: "./images/exploraton-rover.jpeg",
    tagline: "Designed for 90 days, Opportunity explored Mars for 14.5 marathons.",
    story: "Spirit uncovered silica evidence of ancient hot springs. Opportunity roved 28 miles until a global dust storm starved its solar panels in 2018.",
    relicType: "Exploration Rovers",
    notableArtifacts: ["Rock Abrasion Tool", "Pancam Mast", "Spectrometers"]
  },
  {
    name: "Viking 1 Lander",
    category: "mars",
    location: "Chryse Planitia, Mars",
    coordinates: "22.48 N, 48.0 W",
    launchYear: "1975",
    status: "Operational for 6 Years (Silent 1982)",
    imageUrl: "./images/viking1.jpg",
    tagline: "The first US spacecraft to successfully touch down and breathe Martian air.",
    story: "Transmitted the first clear color panoramic photos of red Martian bedrock. Operated for 6 years until an antenna uplink command error severed communication.",
    relicType: "Nuclear-Powered Lander",
    notableArtifacts: ["Collector Arm", "Gas Chromatograph", "Seismometer"]
  },
  {
    name: "InSight Geophysical Lander",
    category: "mars",
    location: "Elysium Planitia, Mars",
    coordinates: "4.502 N, 135.623 E",
    launchYear: "2018",
    status: "Dust Covered (December 2022)",
    imageUrl: "./images/insight-lander.jpg",
    tagline: "The seismic ear that recorded over 1,300 marsquakes.",
    story: "Set the most sensitive seismometer ever made onto Martian bedrock. Recorded meteorite strikes and mapped Mars' liquid core until dust covered its panels.",
    relicType: "Geophysical Planetary Laboratory",
    notableArtifacts: ["SEIS Seismometer", "Heat Flow Probe", "Robotic Arm"]
  },
  {
    name: "Ingenuity Mars Helicopter",
    category: "mars",
    location: "Valinor Hills, Jezero Crater",
    coordinates: "18.4447 N, 77.4508 E",
    launchYear: "2020",
    status: "Rotor Damaged (Flight 72, Jan 2024)",
    imageUrl: "./images/mars-helicopter.jpg",
    tagline: "The first powered aircraft to fly in the atmosphere of another planet.",
    story: "Designed for 5 flights, Ingenuity flew 72 times across three years. Following rotor tip damage, it remains as a stationary telemetry station in Jezero.",
    relicType: "Autonomous Aerial Rotorcraft",
    notableArtifacts: ["Carbon Fiber Rotors", "Wright Flyer Wing Swatch", "Avionics Core"]
  },

  // --- DEEP SPACE & ASTEROIDS ---
  {
    name: "Dawn Asteroid Explorer",
    category: "deep-space",
    location: "Orbit of Dwarf Planet Ceres",
    coordinates: "Perpetual Stable Ceres Orbit",
    launchYear: "2007",
    status: "Hydrazine Depleted 2018",
    imageUrl: "./images/dawn.jpg",
    tagline: "The only spacecraft to orbit two different celestial bodies beyond Earth.",
    story: "Explored Vesta and Ceres using blue xenon ion engines. Placed into a perpetual orbit around Ceres where it will circle for centuries.",
    relicType: "Ion Propulsion Deep Space Orbiter",
    notableArtifacts: ["Xenon Thrusters", "Framing Cameras", "High Gain Dish"]
  },
  {
    name: "NEAR Shoemaker Probe",
    category: "deep-space",
    location: "Surface of Asteroid 433 Eros",
    coordinates: "South Tip of Asteroid Eros",
    launchYear: "1996",
    status: "Resting on Asteroid Surface (2001)",
    imageUrl: "./images/nearshoemaker.jpg",
    tagline: "The probe never built to land that completed an asteroid touchdown.",
    story: "After orbiting asteroid Eros, engineers commanded NEAR to execute a slow descent. It survived touchdown at 4 mph and transmitted gamma-ray readings.",
    relicType: "Asteroid Exploration Lander",
    notableArtifacts: ["Laser Rangefinder", "X-Ray Spectrometer", "Solar Panels"]
  },
  {
    name: "Pioneer 10 Spacecraft",
    category: "deep-space",
    location: "Interstellar Space (Heading to Aldebaran)",
    coordinates: ">130 AU from the Sun",
    launchYear: "1972",
    status: "Silent Interstellar Messenger",
    imageUrl: "./images/jupiter_pioneer.webp",
    tagline: "Carrying humanity's golden plaque out into the galactic deep.",
    story: "First probe to cross the Asteroid Belt and visit Jupiter. Carries Carl Sagan's gold-anodized plaque drifting silently toward the star Aldebaran.",
    relicType: "Interstellar Voyager",
    notableArtifacts: ["Gold Pioneer Plaque", "2.74m Parabolic Dish", "Nuclear RTG Booms"]
  },
  {
    name: "Kepler Space Telescope",
    category: "deep-space",
    location: "Earth-Trailing Heliocentric Orbit",
    coordinates: "~94 Million Miles Behind Earth",
    launchYear: "2009",
    status: "Retired / Drifting in Orbit (2018)",
    imageUrl: "./images/k2.jpg",
    tagline: "The telescope that proved planets outnumber the stars in our galaxy.",
    story: "Monitored 150,000 stars and discovered over 2,600 exoplanets. After running out of fuel in 2018, NASA sent its final shutdown signal.",
    relicType: "Exoplanet Space Observatory",
    notableArtifacts: ["Schmidt Telescope", "42-CCD Photometer", "Solar Shield"]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("relicsGrid");
  const tabButtons = document.querySelectorAll(".tab-pill");
  const searchInput = document.getElementById("searchInput");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalDismissBtn = document.getElementById("modalDismissBtn");
  const modalDetails = document.getElementById("modalDetails");

  if (!grid) return;

  let currentCategory = "all";
  let searchFilter = "";

  function getSvg(category, name) {
    const isMoon = category === "moon";
    const isMars = category === "mars";
    const accent = isMoon ? "#94a3b8" : isMars ? "#f97316" : "#38bdf8";

    return `
      <svg viewBox="0 0 400 220" width="100%" height="100%" style="background:#0b1120; display:block;">
        <circle cx="200" cy="115" r="60" fill="none" stroke="${accent}" stroke-opacity="0.25"/>
        <rect x="175" y="85" width="50" height="50" rx="8" fill="#1e293b" stroke="${accent}" stroke-width="2"/>
        <line x1="140" y1="110" x2="175" y2="110" stroke="${accent}" stroke-width="3"/>
        <line x1="225" y1="110" x2="260" y2="110" stroke="${accent}" stroke-width="3"/>
        <text x="200" y="180" text-anchor="middle" fill="${accent}" font-family="monospace" font-size="11">IMAGE PENDING</text>
      </svg>
    `;
  }

  function renderCards() {
    grid.innerHTML = "";

    const filtered = DATA.filter(item => {
      const matchCat = currentCategory === "all" || item.category === currentCategory;
      const matchSearch = item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          item.story.toLowerCase().includes(searchFilter.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; color: #94a3b8;">
          <h3 class="title-1">No matching spacecraft found</h3>
        </div>
      `;
      return;
    }

    filtered.forEach(artifact => {
      const card = document.createElement("article");
      card.className = "relic-card";
      card.setAttribute("tabindex", "0");

      card.innerHTML = `
        <div class="relic-image-box">
          <span class="category-tag">${artifact.category}</span>
          <img 
            src="${artifact.imageUrl}" 
            alt="${artifact.name}" 
            loading="lazy"
            style="width:100%; height:100%; object-fit:cover; display:block;"
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

      // If a specific photo hasn't been added into images/ yet, show clean placeholder
      const img = card.querySelector("img");
      img.onerror = function() {
        this.parentElement.innerHTML = `
          <span class="category-tag">${artifact.category}</span>
          ${getSvg(artifact.category, artifact.name)}
        `;
      };

      card.addEventListener("click", () => openModal(artifact));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter") openModal(artifact);
      });

      grid.appendChild(card);
    });
  }

  function openModal(artifact) {
    if (!modalDetails || !modalBackdrop) return;
    modalDetails.innerHTML = `
      <div style="margin-bottom: 16px;">
        <span class="caption-3" style="color: var(--accent-cyan); text-transform: uppercase;">// NASA ARCHIVAL RECORD</span>
        <h2 class="heading-4" style="margin-top: 4px;">${artifact.name}</h2>
        <div class="caption-1" style="color: var(--text-secondary); margin-top: 4px;">📍 ${artifact.location} (${artifact.coordinates})</div>
      </div>

      <div style="margin-bottom: 24px; border-radius: 8px; overflow: hidden; height: 260px; background-color: var(--bg-surface-elevated);">
        <img 
          src="${artifact.imageUrl}" 
          alt="${artifact.name}" 
          style="width: 100%; height: 100%; object-fit: cover; display: block;"
          onerror="this.style.display='none'"
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
        <p class="body-3" style="color: var(--text-secondary); line-height: 1.7;">${artifact.story}</p>
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

  if (modalDismissBtn && modalBackdrop) {
    modalDismissBtn.addEventListener("click", () => modalBackdrop.classList.remove("open"));
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove("open");
    });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-filter");
      renderCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchFilter = e.target.value;
      renderCards();
    });
  }

  renderCards();
});