# 🛰️ Silent Monuments: Abandoned But Not Forgotten
> **NASA Space Apps Challenge 2026**  
> **Challenge**: *Abandoned but not Forgotten: Storytelling about NASA's Discarded Equipment on the Moon and Mars*  
> **Team Name**: **NightFury**  

---

## 🌌 Overview

Across the craters of the Moon, the dusty plains of Mars, and the silent void between the stars, humanity has left behind monuments of its greatest scientific ambitions. When a lunar descent stage serves as a launchpad, or when a rover's solar panels are finally engulfed by Martian sand, these machines do not cease to matter. They become the **archaeological heritage of humankind**.

**Silent Monuments** is an interactive digital exhibition, telemetry archive, and storytelling platform developed by **Team NightFury**. Built with official NASA Planetary Data System (PDS) records, the project honors thirteen historic spacecraft, rovers, and scientific stations left to rest in silence across the cosmos.

---

## ✨ Key Features

- 🪐 **Interactive Terra Dusk 3D Orbit Engine**: A custom WebGL shader simulating Earth from orbit—complete with realistic atmospheric scattering, day/night city lights, drifting cloud shadows, and fluid pointer-momentum interaction.
- 📍 **Precision Telemetry & Coordinates**: Exact surface coordinates cross-referenced with orbital survey data from the Lunar Reconnaissance Orbiter (LRO) and Mars Reconnaissance Orbiter (MRO).
- 📡 **Deep-Dive Mission Dossiers**: Clickable archives detailing mission timelines, causes of retirement, physical hardware remaining on site, and official NASA archive links.
- ⚡ **Dynamic Celestial Filtering & Search**: Instant client-side filtering between **The Moon**, **Mars**, and **Deep Space**, with real-time text query capabilities.
- 🎨 **Editorial Visual System**: Built strictly adhering to professional design tokens (Manrope typography, Geist Mono telemetry data, high-contrast cosmic dark mode `#000000` / `#181818`).
- 🛡️ **Offline & Resilient Architecture**: Fully self-contained local architecture with automatic technical blueprint vector fallbacks.

---

## 🚀 Cataloged Artifacts

| Celestial Body | Spacecraft / Hardware | Launch | Resting Location | Status / Mission Outcome |
| :--- | :--- | :--- | :--- | :--- |
| **The Moon** | Apollo 11 *Eagle* Descent Stage | 1969 | Mare Tranquillitatis | Permanent Lunar Monument & Historic Plaque |
| **The Moon** | Apollo 15 Lunar Roving Vehicle (LRV) | 1971 | Hadley Rille | Parked permanently; filmed ascent liftoff |
| **The Moon** | Apollo 12 ALSEP Science Station | 1969 | Oceanus Procellarum | Plutonium-powered seismic lab (deactivated 1977) |
| **The Moon** | Surveyor 3 Soft Lander | 1967 | Oceanus Procellarum | First robot visited by humans on another world (Apollo 12) |
| **Mars** | Sojourner Rover & Pathfinder Base | 1996 | Ares Vallis | First mobile rover on Martian bedrock |
| **Mars** | Spirit & Opportunity Twin Rovers | 2003 | Gusev & Endeavour Craters | Covered 28+ miles; monuments to Martian exploration |
| **Mars** | Viking 1 Lander | 1975 | Chryse Planitia | First US spacecraft to operate long-term on Mars |
| **Mars** | InSight Geophysical Lander | 2018 | Elysium Planitia | Ultra-sensitive seismic station; recorded 1,300+ marsquakes |
| **Mars** | Ingenuity Mars Helicopter (*Ginny*) | 2020 | Jezero Crater | First powered flight on another planet; 72 historic sorties |
| **Deep Space** | Dawn Asteroid Explorer | 2007 | Orbit of Dwarf Planet Ceres | First spacecraft in perpetual orbit around two extraterrestrial bodies |
| **Deep Space** | NEAR Shoemaker Probe | 1996 | Asteroid 433 Eros | First spacecraft to orbit and touch down on an asteroid |
| **Deep Space** | Pioneer 10 Voyager | 1972 | Interstellar Void (>130 AU) | Carrying Carl Sagan's Golden Plaque toward Aldebaran |
| **Deep Space** | Kepler Space Telescope | 2009 | Earth-Trailing Heliocentric Orbit | Discovered 2,600+ exoplanets; drifting in Earth's orbital wake |

---

## 🛠️ Technology Stack

- **Markup**: Semantic HTML5 with accessibility standards (ARIA landmarks, keyboard skip links).
- **Styling**: Modern responsive CSS3 with strict design tokens, fluid clamp sizing, and no external UI framework overhead.
- **Application Logic**: Vanilla JavaScript (ES6+) with zero external runtime dependencies.
- **Graphics & Shaders**: WebGL (GLSL Vertex and Fragment Shaders) rendering real-time planetary illumination, specular water glint, and starfield parallax.
- **Data Integration**: Standardized JSON datasets drawn directly from NASA PDS logs.

---

## 📂 Project Structure

```text
space-nasa/
├── index.html         # Main web application & semantic structure
├── style.css          # Design-token stylesheet & responsive layout
├── app.js             # Client-side catalog rendering, search, & modal logic
├── terra-dusk.js      # WebGL 3D rotating planetary background engine
├── README.md          # Project documentation & mission parameters
└── images/            # Local directory for high-resolution NASA archival photography
    ├── apollo-11.jpg
    ├── apollo-15-lrv.jpg
    ├── apollo-12-alsep.jpg
    ├── surveyor-3.jpg
    ├── sojourner.jpg
    ├── spirit-opportunity.jpg
    ├── viking-1.jpg
    ├── insight.jpg
    ├── ingenuity.jpg
    ├── dawn.jpg
    ├── near-shoemaker.jpg
    ├── pioneer-10.jpg
    └── kepler.jpg
```

---

## ⚡ How to Run Locally

1. Clone or download this repository to your computer.
2. Ensure all project files (`index.html`, `style.css`, `app.js`, `terra-dusk.js`, and the `images/` directory) are in the same folder.
3. **Double-click `index.html`** to open it directly in any modern browser (Chrome, Edge, Firefox, or Safari).
4. No node modules, npm builds, or local servers are required!

---

## 🛰️ NASA Data & Resource Citations

All historical parameters, coordinates, and images utilized in this application are sourced from public domain NASA resources:
- **NASA Space Science Data Coordinated Archive (NSSDC)**:
  - [Apollo 11 LM Descent Stage (1969-059C)](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C)
  - [Apollo 15 Lunar Roving Vehicle (1971-063C)](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C)
  - [Apollo 12 ALSEP / Lunar Module (1969-099C)](https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C)
- **NASA Science Missions & JPL Archives**:
  - [NASA Surveyor 3 Mission](https://science.nasa.gov/mission/surveyor-3/)
  - [NASA Mars Pathfinder & Sojourner](https://science.nasa.gov/mission/mars-pathfinder/)
  - [NASA Mars Exploration Rovers: Spirit & Opportunity](https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/)
  - [NASA Viking 1 Mission](https://science.nasa.gov/mission/viking-1/)
  - [NASA InSight Mars Lander](https://science.nasa.gov/mission/insight/)
  - [NASA Mars 2020 / Ingenuity Helicopter](https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/)
  - [NASA Dawn Mission to Vesta & Ceres](https://science.nasa.gov/mission/dawn/)
  - [NASA NEAR Shoemaker Mission](https://science.nasa.gov/mission/near-shoemaker/)
  - [NASA Pioneer 10 Mission](https://science.nasa.gov/mission/pioneer-10/)
  - [NASA Kepler Space Telescope](https://science.nasa.gov/mission/kepler/)

---

## 👥 Team NightFury

Developed with pride for the **NASA Space Apps Challenge 2026**.  
*Honoring the machines that dared to explore the unknown on behalf of all humankind.*