// Detailed NASA Hardware Storytelling Catalog
// Sourced from NASA Planetary Data System, NSSDC, and Science Mission Directorate

const ARTIFACTS = [
  // ==================== THE MOON ====================
  {
    id: "apollo-11-descent",
    name: "Apollo 11 'Eagle' Descent Stage",
    category: "moon",
    location: "Mare Tranquillitatis (Sea of Tranquility), Moon",
    coordinates: "0.67408° N, 23.47297° E",
    launchYear: "July 16, 1969",
    status: "Permanent Lunar Monument",
    tagline: "The historic launch platform where human boots first pressed extraterrestrial soil.",
    nasaUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C",
    imageUrl: "https://images-assets.nasa.gov/image/as11-40-5922/as11-40-5922~medium.jpg",
    relicType: "Lunar Module Descent Propulsion Stage",
    notableArtifacts: ["Commemorative Stainless Plaque", "Laser Ranging Retroreflector (LRRR)", "Early Apollo Scientific Experiments Package (EASEP)", "Gold Mylar Thermal Insulation", "Descent Engine Nozzle"],
    story: `On July 20, 1969, Neil Armstrong and Buzz Aldrin piloted the Lunar Module 'Eagle' through computer alarms and boulder-strewn terrain, touching down with fewer than thirty seconds of fuel remaining. The four-legged descent stage functioned as an autonomous landing craft, absorbing touchdown shock through crushable aluminum honeycomb cartridges inside its footpads.

When Armstrong and Aldrin concluded their 21-hour stay on the lunar surface, the descent stage served a secondary, critical role: a launch pad. The ascent engine fired directly downward against the top deck of the descent stage, blasting the upper cabin back into lunar orbit to rendezvous with Michael Collins aboard the Command Module Columbia.

Left behind in the Sea of Tranquility, the descent stage remains in pristine preservation within the vacuum of space. Bolted to its front landing gear strut is the famous commemorative stainless steel plaque depicting Earth's hemispheres, engraved with the words: 'Here men from the planet Earth first set foot upon the Moon, July 1969 A.D. We came in peace for all mankind.' Nearby sits the passive Laser Ranging Retroreflector, an array of corner-cube quartz prisms that scientists on Earth still fire observatory lasers at today to measure the Moon's orbital drift with millimeter precision.`
  },
  {
    id: "apollo-15-lrv",
    name: "Apollo 15 Lunar Roving Vehicle (LRV-1) & Falcon",
    category: "moon",
    location: "Hadley-Apennine Basin, Moon",
    coordinates: "26.1322° N, 3.6338° E",
    launchYear: "July 26, 1971",
    status: "Parked Permanently at Hadley Rille",
    tagline: "The original cosmic dune buggy that expanded human surface exploration by miles.",
    nasaUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C",
    imageUrl: "https://images-assets.nasa.gov/image/as15-88-11901/as15-88-11901~medium.jpg",
    relicType: "Electric Manned Surface Rover & Descent Stage",
    notableArtifacts: ["Boeing Electric Chassis", "Zinc-Silver Oxide 36V Batteries", "Chevron Mesh Woven Wire Tires", "Lunar Communications Relay Unit", "Color RCA Video Camera"],
    story: `Before Apollo 15, astronauts were restricted to walking distances of less than one mile from their landing craft. The arrival of the Lunar Roving Vehicle (LRV-1), developed by Boeing and Delco Electronics, revolutionized lunar exploration. Unfolded from the side quadrant of the 'Falcon' descent stage, the rover featured four independent quarter-horsepower electric wheel motors and tires woven from zinc-coated piano wire with titanium chevron treads.

Astronauts David Scott and James Irwin drove LRV-1 for 17.3 miles across the towering Apennine mountain range and along the precipice of the Hadley Rille canyon, collecting the famous 4-billion-year-old 'Genesis Rock'. 

At the conclusion of their final EVA, Commander Scott drove the rover 300 feet east of the Falcon lander and parked it precisely aimed at the launch platform. Mission Control in Houston remotely commanded the rover's color television camera, tracking the ascent stage as it fired its engine and vaulted into orbit. Parked silently in the dust, the rover's batteries eventually depleted into eternal quiet, its seat belts still open as if waiting for the crew to return.`
  },
  {
    id: "alsep-apollo-12",
    name: "Apollo 12 ALSEP Nuclear Science Station",
    category: "moon",
    location: "Oceanus Procellarum (Ocean of Storms), Moon",
    coordinates: "3.0124° S, 23.4216° W",
    launchYear: "November 14, 1969",
    status: "Transmitted for 8 Years; Decommissioned 1977",
    tagline: "Nuclear-powered sentinels that listened to the Moon ringing like a bell.",
    nasaUrl: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C",
    imageUrl: "https://images-assets.nasa.gov/image/as12-46-6813/as12-46-6813~medium.jpg",
    relicType: "Autonomous Nuclear Geophysical Laboratory",
    notableArtifacts: ["SNAP-27 Radioisotope Thermoelectric Generator", "Passive Seismic Experiment", "Solar Wind Spectrometer", "Suprathermal Ion Detector", "Lunar Atmosphere Detector"],
    story: `When Apollo 12 touched down in the Ocean of Storms following a lightning strike during launch from Kennedy Space Center, astronauts Pete Conrad and Alan Bean unpacked humanity's first comprehensive autonomous extraterrestrial scientific laboratory: the Apollo Lunar Surface Experiments Package (ALSEP).

Powered by a SNAP-27 Radioisotope Thermoelectric Generator fueled by 8.3 pounds of Plutonium-238, the station produced 73 watts of continuous electrical power unaffected by the freezing two-week lunar nights. When the crew jettisoned the Apollo 12 ascent stage to crash deliberately into the lunar surface 45 miles away, the ALSEP seismometers recorded reverberations that lasted for more than an hour, prompting scientists to declare that the Moon 'rang like a bell.'

Designed to operate for just one year, the Apollo 12 ALSEP station continued broadcasting invaluable measurements of moonquakes, meteorite impacts, solar wind, and lunar atmospheric gases back to Earth for nearly eight straight years. On September 30, 1977, NASA formally terminated telemetry signals due to budgetary constraints, leaving the nuclear core to cool silently on the basalt plains.`
  },
  {
    id: "surveyor-3",
    name: "Surveyor 3 Soft Lander",
    category: "moon",
    location: "Oceanus Procellarum, Moon",
    coordinates: "3.0163° S, 23.4180° W",
    launchYear: "April 17, 1967",
    status: "Inspected by Apollo 12; Permanent Historical Artifact",
    tagline: "The robotic pioneer that confirmed lunar soil bearing strength before human arrival.",
    nasaUrl: "https://science.nasa.gov/mission/surveyor-3/",
    imageUrl: "https://images-assets.nasa.gov/image/as12-48-7136/as12-48-7136~medium.jpg",
    relicType: "Uncrewed Lunar Soft Lander",
    notableArtifacts: ["Soil Mechanics Surface Sampler", "Surveyor Scanning Television Camera", "Radar Altimeter Velocity Sensors", "Aluminum Tubular Spaceframe"],
    story: `In early 1967, scientists genuinely feared that the lunar maria were vast oceans of powdery dust so deep that any landing spacecraft would sink without a trace. Surveyor 3 was launched to settle the question. Utilizing solid-propellant deceleration motors and vernier thrusters, it made a soft landing on April 20, 1967 inside a 650-foot crater in the Ocean of Storms.

Using a mechanized scoop arm, Surveyor 3 excavated trenches up to 7 inches deep, proving that lunar regolith had cohesive bearing strength capable of supporting Apollo landing pads. It beamed 6,315 high-resolution television photographs of the terrain, rocks, and an eclipse of the Sun by the Earth.

Thirty-one months later, on November 19, 1969, Apollo 12 executed a pinpoint navigational touchdown within 600 feet of Surveyor 3. Astronauts Pete Conrad and Alan Bean walked down the slope of the crater to inspect the robot. Conrad clipped off its television camera, sampling scoop, and electrical cables, returning them to Earth to determine how micro-meteoroids, cosmic rays, and solar radiation degrade human-made metals over years of direct exposure.`
  },

  // ==================== MARS ====================
  {
    id: "sojourner-pathfinder",
    name: "Sojourner Rover & Pathfinder Base",
    category: "mars",
    location: "Ares Vallis (Carl Sagan Memorial Station), Mars",
    coordinates: "19.33° N, 33.55° W",
    launchYear: "December 4, 1996",
    status: "Silent Since October 7, 1997",
    tagline: "The 25-pound robotic pioneer that proved rovers could navigate another world.",
    nasaUrl: "https://science.nasa.gov/mission/mars-pathfinder/",
    imageUrl: "https://images-assets.nasa.gov/image/PIA01122/PIA01122~medium.jpg",
    relicType: "Micro-Rover & Pyramid Landing Base Station",
    notableArtifacts: ["Rocker-Bogie 6-Wheel Chassis", "Alpha Proton X-Ray Spectrometer (APXS)", "Airbag Deceleration Bladders", "Stereo Imager for Mars (IMP)", "Solar Panel Array"],
    story: `On July 4, 1997, NASA's Mars Pathfinder bounced onto the ancient flood plains of Ares Vallis cushioned by giant clusters of airbags. When the triangular petals of the lander unfurled, they released the historic 25-pound, six-wheeled Sojourner rover—the very first robotic vehicle to roll across the surface of Mars.

Equipped with an ingenious Rocker-Bogie suspension system that allowed its six spiked aluminum wheels to climb obstacles larger than its own diameter, Sojourner crawled down the egress ramp and approached Martian rocks dubbed 'Barnacle Bill' and 'Yogi'. Using its Alpha Proton X-Ray Spectrometer (APXS), it analyzed their chemical composition, confirming ancient water-worn conglomerates and silica-rich rocks.

Originally designed to survive for just 7 days, Sojourner explored for 83 Martian days (sols), returning 550 images while the parent Pathfinder base station relayed 16,500 photos and 8.5 million atmospheric readings. On October 7, 1997, Pathfinder's rechargeable silver-zinc battery suffered terminal cell failure. Unable to contact Earth without the base station, Sojourner's contingency software commanded it to begin circling the silent lander, where it remains stationed among the ancient boulders.`
  },
  {
    id: "opportunity-spirit",
    name: "Spirit & Opportunity Twin Rovers (MER)",
    category: "mars",
    location: "Gusev Crater (Spirit) & Endeavour Crater (Oppy), Mars",
    coordinates: "Spirit: 14.57° S, 175.47° E | Oppy: 2.34° S, 354.76° E",
    launchYear: "June & July 2003",
    status: "Decommissioned 2010 (Spirit) & 2018 (Opportunity)",
    tagline: "Twin explorers engineered for 90 days that drove for 14 years across the Red Planet.",
    nasaUrl: "https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/",
    imageUrl: "https://images-assets.nasa.gov/image/PIA18608/PIA18608~medium.jpg",
    relicType: "Long-Range Autonomous Exploration Rovers",
    notableArtifacts: ["Panoramic Camera (Pancam) Mast", "Mini-TES Thermal Infrared Spectrometer", "Rock Abrasion Tool (RAT)", "Mössbauer Spectrometer", "Triple-Junction Solar Wings"],
    story: `The Mars Exploration Rovers, Spirit (MER-A) and Opportunity (MER-B), touched down on opposite sides of Mars in January 2004. Both robots carried a mission warranty of only 90 Martian sols (days) and a driving expectation of 600 meters. What followed became the greatest endurance saga in planetary science.

Spirit landed in Gusev Crater and climbed the rugged Columbia Hills. When its right front wheel seized up in 2006, engineers drove the rover backward, dragging the disabled wheel like an anchor. This dragging accidentally scraped away the surface crust, exposing bright white deposits of pure 90% silica, conclusive proof that ancient volcanic hot springs or steam vents once existed on Mars. In May 2009, Spirit broke through a crust of soil into a hidden sand trap of soft iron-sulfate soil dubbed 'Troy'. Immobilized as winter approached, its solar panels could not be angled toward the sun, and its systems froze into silence in March 2010.

Meanwhile, Opportunity touched down inside Eagle Crater on Meridiani Planum, immediately spotting tiny hematite spheres dubbed 'blueberries' that had precipitated inside ancient groundwater. Opportunity drove an astonishing 28.06 miles—completing humanity's first extraterrestrial marathon. It climbed into Victoria and Endeavour Craters, examining clay minerals formed in neutral-pH, life-friendly water. In June 2018, a catastrophic global dust storm blanketed Mars, turning day into night. Opportunity's final transmission carried telemetry indicating that its battery voltage was crashing and atmospheric opacity was at record highs. After transmitting over a thousand recovery commands, NASA officially concluded the mission in February 2019.`
  },
  {
    id: "viking-1",
    name: "Viking 1 Lander",
    category: "mars",
    location: "Chryse Planitia (Plains of Gold), Mars",
    coordinates: "22.48° N, 48.0° W",
    launchYear: "August 20, 1975",
    status: "Decommissioned November 1982",
    tagline: "The first spacecraft to successfully land on Mars and operate for over six years.",
    nasaUrl: "https://science.nasa.gov/mission/viking-1/",
    imageUrl: "https://images-assets.nasa.gov/image/PIA00567/PIA00567~medium.jpg",
    relicType: "Nuclear-Powered Stationary Planetary Laboratory",
    notableArtifacts: ["Snap-19 Radioisotope Thermoelectric Generators", "Surface Sampler Collector Arm", "Gas Chromatograph Mass Spectrometer (GCMS)", "Biology Experiment Instrument", "Dual Facsimile Cameras"],
    story: `On July 20, 1976—the seventh anniversary of the Apollo 11 lunar landing—the Viking 1 Lander touched down smoothly on the golden plains of Chryse Planitia. Minutes after touchdown, its mechanical facsimile camera began scanning the terrain, returning the very first clear photograph ever taken from the surface of Mars, showing a footpad resting in reddish-orange soil alongside volcanic rocks.

Powered by twin Plutonium-238 SNAP-19 Radioisotope Thermoelectric Generators, Viking 1 was an engineering marvel. It deployed an eight-foot motorized scoop that dug trenches in the soil, delivering samples into an onboard biological laboratory designed to detect metabolic microbial activity. While results sparked decades of scientific debate, its gas chromatograph mass spectrometer revealed soil that was sterile and intensely oxidized by ultraviolet light.

Viking 1 operated continuously for 2,245 Martian sols (over 6 Earth years), transmitting 4,500 pictures, continuous weather reports, and seismic readings. Its mission ended tragically not through mechanical breakdown, but through human error: on November 13, 1982, a routine ground software command uploaded to update battery charging parameters accidentally overwrote the lander's high-gain antenna orientation algorithms, severing communication with Earth forever.`
  },
  {
    id: "insight-lander",
    name: "InSight Geophysical Lander",
    category: "mars",
    location: "Elysium Planitia, Mars",
    coordinates: "4.502° N, 135.623° E",
    launchYear: "May 5, 2018",
    status: "Smothered by Dust; Decommissioned December 2022",
    tagline: "The robotic station that listened to the pulse and seismic heartbeat of Mars.",
    nasaUrl: "https://science.nasa.gov/mission/insight/",
    imageUrl: "https://images-assets.nasa.gov/image/PIA22228/PIA22228~medium.jpg",
    relicType: "Stationary Geophysical Surface Observatory",
    notableArtifacts: ["SEIS Ultra-Sensitive Seismometer", "Wind and Thermal Shield (WTS)", "Heat Flow and Physical Properties Package ('The Mole')", "7-Foot Robotic Arm", "Twin 7-Foot UltraFlex Solar Arrays"],
    story: `Touching down on the smooth, rock-free volcanic plains of Elysium Planitia on November 26, 2018, InSight (Interior Exploration using Seismic Investigations, Geodesy and Heat Transport) was the first outer-space mission designed to study the deep interior anatomy of Mars—its crust, mantle, and core.

Using its robotic arm, InSight lifted the French-built SEIS seismometer and set it directly onto the Martian bedrock, covering it with a domed aerodynamic shield to protect it from thermal expansion and howling desert winds. SEIS was so exquisitely sensitive it could detect ground movements smaller than the diameter of a hydrogen atom. Over four years, it recorded 1,319 marsquakes, including a colossal magnitude 5 tremor that reverberated through the entire planet for ten hours. InSight proved that Mars possesses a molten liquid iron-nickel core with a radius of approximately 1,140 miles.

Unlike nuclear-powered rovers, InSight relied on two circular solar panels. Over years on the open plain, fine Martian dust steadily coated the solar cells. By late 2022, power generation plummeted from 5,000 watt-hours per sol to under 300. On December 15, 2022, InSight beamed its final haunting transmission: 'My power’s really low, so this may be the last image I can send... Thanks for staying with me.'`
  },
  {
    id: "ingenuity-helicopter",
    name: "Ingenuity Mars Helicopter ('Ginny')",
    category: "mars",
    location: "Valinor Hills, Jezero Crater, Mars",
    coordinates: "18.4447° N, 77.4508° E",
    launchYear: "July 30, 2020",
    status: "Rotor Damaged January 2024; Resting Telemetry Unit",
    tagline: "The Wright Brothers moment that proved powered, controlled flight in another planet's thin air.",
    nasaUrl: "https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/",
    imageUrl: "https://images-assets.nasa.gov/image/PIA24653/PIA24653~medium.jpg",
    relicType: "Autonomous Aerial Rotorcraft",
    notableArtifacts: ["Dual Counter-Rotating Carbon Rotor Blades", "Wright Flyer Wing Fabric Swatch", "Qualcomm Snapdragon Flight Processor", "Solar Panel Winglet", "Laser Altimeter"],
    story: `Flying in the atmosphere of Mars is extraordinarily difficult: the atmospheric density at the surface is equivalent to Earth's atmosphere at 100,000 feet, far higher than any commercial helicopter can fly. To generate lift, Ingenuity was designed as a featherweight 4-pound marvel with twin four-foot counter-rotating carbon-fiber blades spinning at an astonishing 2,500 revolutions per minute. Tucked underneath its solar panel was an unheralded piece of history: a tiny postage-stamp-sized swatch of muslin fabric from the original 1903 Wright Brothers flyer.

On April 19, 2021, Ingenuity took off, climbed to ten feet, hovered, and touched down—achieving humanity's first powered, controlled aerodynamic flight on another world. Designed as an experimental technology demo expected to make at most five brief flights, Ingenuity shattered every projection. It flew 72 times across nearly three Earth years, logging over two hours of total flight time and traversing 10.5 miles while serving as an advance aerial scout for the Perseverance rover.

On January 18, 2024, during Flight 72, an emergency landing in featureless, sandy terrain caused the tip of one of its carbon-fiber blades to impact the surface, shearing off blade fragments. Although grounded forever, its flight computer and battery remain completely functional. NASA engineers uploaded final software patches turning 'Ginny' into a stationary weather and avionics beacon in Jezero Crater.`
  },

  // ==================== ASTEROIDS & DEEP SPACE ====================
  {
    id: "dawn-spacecraft",
    name: "Dawn Asteroid Orbiter",
    category: "deep-space",
    location: "Perpetual Gravitational Orbit around Ceres",
    coordinates: "Stable Gravitational Resonance at Dwarf Planet Ceres",
    launchYear: "September 27, 2007",
    status: "Hydrazine Expended October 2018; Silent Ghost Ship",
    tagline: "The ion-propelled voyager that orbited two separate extraterrestrial worlds.",
    nasaUrl: "https://science.nasa.gov/mission/dawn/",
    imageUrl: "https://images-assets.nasa.gov/image/PIA21920/PIA21920~medium.jpg",
    relicType: "Deep Space Xenon Ion Propulsion Orbiter",
    notableArtifacts: ["NSTAR Xenon Ion Thrusters", "Framing Optical Cameras", "Visible and Infrared Spectrometer", "Gamma Ray and Neutron Detector", "65-Foot Solar Array Wings"],
    story: `Powered by hyper-efficient xenon ion thrusters that glowed with a faint blue emission, Dawn achieved an astronautical milestone never attempted before: entering orbit around one celestial body, breaking orbit, cruising across the solar system, and entering orbit around a second body.

Dawn explored the two most massive residents of the asteroid belt: giant protoplanet Vesta (from 2011 to 2012) and dwarf planet Ceres (from 2015 to 2018). At Vesta, Dawn mapped a massive south polar impact crater exposing an iron-rich metallic core. At Ceres, Dawn captivated scientists by discovering radiant, glowing-white salt deposits composed of sodium carbonate inside Occator Crater, alongside water ice and cryovolcanic domes like Ahuna Mons.

On October 31, 2018, Dawn exhausted its remaining hydrazine propellant, rendering it unable to orient its antennas toward Earth or point its solar arrays at the Sun. In accordance with strict planetary protection guidelines to prevent potential contamination of Ceres' subterranean brines, mission controllers placed Dawn into a stable gravitational orbit where it will circle silently as an artificial moon of Ceres for at least a century.`
  },
  {
    id: "near-shoemaker",
    name: "NEAR Shoemaker Probe",
    category: "deep-space",
    location: "Surface of Asteroid 433 Eros",
    coordinates: "Southern Tip of Asteroid Eros",
    launchYear: "February 17, 1996",
    status: "Resting Intact on Asteroid Surface",
    tagline: "The probe never built to land that completed an asteroid touchdown.",
    nasaUrl: "https://science.nasa.gov/mission/near-shoemaker/",
    imageUrl: "https://images-assets.nasa.gov/image/PIA03112/PIA03112~medium.jpg",
    relicType: "Near-Earth Asteroid Rendezvous Orbiter & Lander",
    notableArtifacts: ["Multi-Spectral Imager", "Laser Rangefinder (NLR)", "X-Ray/Gamma-Ray Spectrometer", "Magnetometer Sensor", "Fixed Parabolic Antenna"],
    story: `The Near Earth Asteroid Rendezvous (NEAR) Shoemaker was the first spacecraft designed to orbit a small, irregular asteroid. On Valentine's Day 2000, NEAR entered orbit around 433 Eros, a tumbling, peanut-shaped asteroid measuring 21 miles long. For an entire year, it orbited as close as 15 miles, returning 160,000 photos and collecting comprehensive laser topography and gravity maps.

With its primary science mission accomplished and propellant nearly depleted, mission scientists conceived an audacious gamble: attempt to guide the box-shaped orbiter onto the asteroid's surface, despite NEAR having zero landing gear, shock absorbers, or landing thrusters. 

On February 12, 2001, NEAR fired its thrusters through five braking burns, descending at a gentle 4 miles per hour onto the southern tip of Eros. Miraculously, the spacecraft survived touchdown intact. Its solar panels continued capturing sunlight, and its gamma-ray spectrometer transmitted unprecedented close-up readings of the asteroid's mineral composition directly from the surface for another two weeks until cold temperatures silenced its circuits on February 28, 2001.`
  },
  {
    id: "pioneer-10",
    name: "Pioneer 10 & 11 Probes",
    category: "deep-space",
    location: "Interstellar Space Void",
    coordinates: ">125 Astronomical Units (AU) from the Sun",
    launchYear: "March 2, 1972 & April 5, 1973",
    status: "Ghost Ships of the Interstellar Deep",
    tagline: "Carrying gold-anodized plaques beyond the edge of our solar system.",
    nasaUrl: "https://science.nasa.gov/mission/pioneer-10/",
    imageUrl: "https://images-assets.nasa.gov/image/ARC-1972-AC72-1593/ARC-1972-AC72-1593~medium.jpg",
    relicType: "Interstellar Deep-Space Probes",
    notableArtifacts: ["Gold-Anodized Aluminum Plaque", "2.74-Meter High-Gain Dish Antenna", "SNAP-19 Nuclear RTG Generators", "Cosmic Ray Telescope", "Helium Vector Magnetometer"],
    story: `Pioneer 10 and 11 were humanity's true deep-space pathfinders. Pioneer 10 was the first spacecraft to navigate the treacherous asteroid belt, the first to fly past Jupiter in December 1973, and the first to achieve escape velocity from our solar system. Pioneer 11 followed, surviving Jupiter's radiation belts to make the first close-up reconnaissance of Saturn and its rings in 1979.

Bolted to each spacecraft's antenna strut is the celebrated Pioneer Plaque, co-designed by Carl Sagan and Frank Drake. Etched onto gold-anodized aluminum plates are diagrams of the neutral hydrogen atom, figures of a human man and woman, and a radial map of fourteen pulsars that acts as a galactic lighthouse chart pointing back to Earth and the exact epoch when the spacecraft launched.

Pioneer 10 broadcast signals across billions of miles for over thirty years until its plutonium power source degraded below operational thresholds; its final whisper was received on Earth on January 23, 2003 from a distance of 7.6 billion miles. Pioneer 10 is currently coasting toward the red star Aldebaran in the constellation Taurus, which it will reach in two million years, while Pioneer 11 heads toward the constellation Aquila.`
  },
  {
    id: "kepler-telescope",
    name: "Kepler Space Telescope",
    category: "deep-space",
    location: "Earth-Trailing Heliocentric Orbit",
    coordinates: "~94 Million Miles Behind Earth in Solar Orbit",
    launchYear: "March 7, 2009",
    status: "Decommissioned October 30, 2018",
    tagline: "The observatory that proved planets outnumber the stars in our galaxy.",
    nasaUrl: "https://science.nasa.gov/mission/kepler/",
    imageUrl: "https://images-assets.nasa.gov/image/PIA17070/PIA17070~medium.jpg",
    relicType: "Exoplanet Hunting Space Observatory",
    notableArtifacts: ["0.95-Meter Schmidt Optical Telescope", "42-CCD Photometer Detector Array", "Four Reaction Wheels", "Solar Array Shield", "Graphite-Epoxy Metering Tube"],
    story: `Launched in 2009, the Kepler Space Telescope revolutionized humanity's understanding of our place in the universe. Trailing Earth in its orbit around the Sun to avoid light contamination from our planet and Moon, Kepler stared unblinkingly at 150,000 stars in the constellations Cygnus and Lyra. It looked for minuscule dips in starlight caused when an orbiting planet crossed the face of its parent star.

Kepler confirmed 2,662 exoplanets and identified thousands more candidates, discovering rocky super-Earths, gas giants, and worlds orbiting within their stars' habitable zones where liquid water could exist. Kepler's demographic survey yielded one of the most profound revelations in the history of science: our Milky Way galaxy contains more planets than stars, meaning hundreds of billions of worlds populate our cosmic neighborhood.

Even when two of its four reaction wheels failed in 2013, engineers salvaged the mission by utilizing solar radiation pressure from sunlight photons balancing against its solar panels to steady the telescope (the K2 mission). In October 2018, having drained its final drops of thruster fuel, NASA transmitted goodnight commands on the 388th anniversary of Johannes Kepler's death, shutting down its transmitters and leaving Kepler to drift silently in Earth's orbital wake for eternity.`
  }
];