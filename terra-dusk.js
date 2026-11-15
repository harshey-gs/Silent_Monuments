/* Terra Dusk WebGL Interactive Background — Vanilla JS Edition */

(function initTerraDusk() {
  const container = document.getElementById("terra-dusk-bg");
  if (!container) return;

  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  canvas.style.pointerEvents = "none";
  container.appendChild(canvas);

  const ASSETS = "https://unpkg.com/three-globe@2.31.0/example/";
  const DAY_SRC = ASSETS + "img/earth-blue-marble.jpg";
  const NIGHT_SRC = ASSETS + "img/earth-night.jpg";
  const WATER_SRC = ASSETS + "img/earth-water.png";
  const TOPO_SRC = ASSETS + "img/earth-topology.png";
  const CLOUD_SRC = ASSETS + "clouds/clouds.png";

  const TEX_W = 2048, TEX_H = 1024, NIGHT_W = 4096;
  const AXIAL_TILT = (23.44 * Math.PI) / 180;
  const PERIOD_S = 60;
  const CLOUD_DRIFT = 0.012;
  const MAX_PITCH = 1.1;
  const INERTIA_S = 0.9;
  const PITCH_RETURN_S = 1.6;
  const HOVER_TURN = 0.2;
  const HOVER_SOFT = 1.4;
  const HOVER_LIFT = 0.025;
  const HOVER_K = 60;
  const HOVER_C = 11;
  const STAR_PARALLAX = 0.35;
  const FADE_S = 0.6;
  const TAU = Math.PI * 2;

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

  const PIX_CACHE = new Map();
  function loadPix(src, channel, width = TEX_W) {
    const key = src + "#" + channel + "@" + width;
    if (PIX_CACHE.has(key)) return PIX_CACHE.get(key);
    const entry = { state: "loading", canvas: null, chan: null };
    PIX_CACHE.set(key, entry);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const cv = document.createElement("canvas");
        cv.width = width;
        cv.height = width / 2;
        const cx = cv.getContext("2d");
        if (!cx) return;
        cx.imageSmoothingQuality = "high";
        cx.drawImage(img, 0, 0, width, width / 2);
        const data = cx.getImageData(0, 0, channel < 0 ? 1 : TEX_W, channel < 0 ? 1 : TEX_H).data;
        if (channel < 0) entry.canvas = cv;
        else {
          const out = new Uint8Array(TEX_W * TEX_H);
          for (let i = 0; i < out.length; i++) out[i] = data[i * 4 + channel];
          entry.chan = out;
        }
        entry.state = "ready";
      } catch (e) {
        entry.state = "failed";
      }
    };
    img.onerror = () => { entry.state = "failed"; };
    img.src = src;
    return entry;
  }

  const rotX = (a) => [[1, 0, 0], [0, Math.cos(a), -Math.sin(a)], [0, Math.sin(a), Math.cos(a)]];
  const rotY = (a) => [[Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)]];
  const rotZ = (a) => [[Math.cos(a), -Math.sin(a), 0], [Math.sin(a), Math.cos(a), 0], [0, 0, 1]];
  const mul3 = (a, b) => a.map((row) => [0, 1, 2].map((j) => row[0] * b[0][j] + row[1] * b[1][j] + row[2] * b[2][j]));
  const apply3 = (m, v) => [0, 1, 2].map((r) => m[r][0] * v[0] + m[r][1] * v[1] + m[r][2] * v[2]);
  const orbit = (hx, hy) => mul3(rotY(hx), rotX(-hy));

  function globeFromView(yaw, pitch, view, out) {
    const worldFromView = view[0].map((_, c) => view.map((row) => row[c]));
    const m = mul3(mul3(mul3(rotY(-yaw), rotX(-pitch)), rotZ(-AXIAL_TILT)), worldFromView);
    for (let c = 0; c < 3; c++) for (let r = 0; r < 3; r++) out[c * 3 + r] = m[r][c];
  }

  const VERT = `attribute vec2 aPos; void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;
  const FRAG = `
    #ifdef GL_OES_standard_derivatives
    #extension GL_OES_standard_derivatives : enable
    #endif
    precision highp float;
    uniform vec2 uCenter; uniform float uRadius; uniform float uDpr; uniform mat3 uRot;
    uniform float uCloudRot; uniform vec3 uLight; uniform vec3 uAtmo; uniform float uClouds;
    uniform float uLights; uniform float uStars; uniform float uTime; uniform vec2 uStarShift;
    uniform vec4 uHave; uniform sampler2D uDay; uniform sampler2D uNight; uniform sampler2D uAux;

    const float PI = 3.14159265; const float TAU = 6.28318531; const float GLOW = 0.07;
    const float BUMP = 2.2; const float SHADOW_REACH = 0.012; const float EXPOSURE = 1.7;
    const vec3 MOON = vec3(0.008, 0.012, 0.024); const float STAR_CELL = 7.0; const float STAR_SHARE = 0.16;

    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

    vec2 equi(vec3 q, float shift) {
      float u1 = fract(atan(q.x, q.z) / TAU + 0.5 + shift);
      float u2 = fract(u1 + 0.5) - 0.5;
      #ifdef GL_OES_standard_derivatives
      float u = fwidth(u1) < fwidth(u2) - 0.001 ? u1 : u2;
      #else
      float u = u1;
      #endif
      return vec2(u, acos(clamp(q.y, -1.0, 1.0)) / PI);
    }

    void main() {
      vec2 frag = gl_FragCoord.xy;
      vec2 p = (frag - uCenter) / uRadius;
      float r = length(p);
      vec2 s = r > 0.999 ? p / r * 0.999 : p;
      vec3 n = vec3(s, sqrt(max(0.0, 1.0 - dot(s, s))));
      vec3 q = uRot * n;
      vec3 L = uRot * uLight;
      vec3 H = uRot * normalize(uLight + vec3(0.0, 0.0, 1.0));
      float cl = max(length(q.xz), 1e-4);
      vec3 east = vec3(q.z, 0.0, -q.x) / cl;
      vec3 north = cross(q, east);

      vec2 uv = equi(q, 0.0);
      vec2 uvc = equi(q, -uCloudRot / TAU);
      vec3 day = texture2D(uDay, uv).rgb;
      vec3 night = texture2D(uNight, uv).rgb;
      float nightGlow = texture2D(uNight, uv, 3.0).r;
      vec4 aux = texture2D(uAux, uv);
      float hE = texture2D(uAux, uv + vec2(1.5 / 2048.0, 0.0)).g;
      float hN = texture2D(uAux, uv - vec2(0.0, 1.5 / 1024.0)).g;
      vec2 toSun = vec2(dot(L, east) / (TAU * cl), -dot(L, north) / PI) * SHADOW_REACH;
      float cloud = texture2D(uAux, uvc).b;
      float shadow = texture2D(uAux, uvc + toSun).b;

      float water = aux.r * uHave.z;
      float dry = 1.0 - water;
      vec3 nb = normalize(q - BUMP * uHave.z * dry * ((hE - aux.g) * east + (hN - aux.g) * north));
      float ndlS = dot(q, L);
      float ndl = dot(nb, L);
      float mu = n.z;
      vec3 sun = mix(vec3(1.0, 0.45, 0.22), vec3(1.0), smoothstep(0.0, 0.3, ndlS));

      vec3 alb = mix(vec3(0.010, 0.016, 0.030), pow(day, vec3(2.2)), uHave.x);
      float diff = max(ndl, 0.0) * smoothstep(-0.08, 0.12, ndlS);
      vec3 col = alb * sun * diff;

      float nh = max(dot(q, H), 0.0);
      col += sun * water * (pow(nh, 240.0) * 0.22 + pow(nh, 24.0) * 0.025) * smoothstep(0.0, 0.25, ndlS);

      float cov = clamp(cloud * uClouds, 0.0, 1.0) * uHave.w;
      float shade = clamp(shadow * uClouds, 0.0, 1.0) * uHave.w;
      col *= 1.0 - 0.55 * shade;

      float dark = 1.0 - smoothstep(-0.16, 0.06, ndlS);
      col += alb * MOON * dark;

      float li = clamp((night.r - 0.035) / 0.40, 0.0, 1.0);
      float lg = clamp((nightGlow - 0.035) / 0.40, 0.0, 1.0);
      vec3 lamp = mix(vec3(1.0, 0.46, 0.13), vec3(1.0, 0.84, 0.62), smoothstep(0.35, 0.9, li));
      vec3 city = lamp * li * li * 2.4 + vec3(1.0, 0.42, 0.12) * lg * 0.45;
      col += city * uLights * dark * (1.0 - 0.85 * cov) * (0.35 + 0.65 * mu) * uHave.y;

      float cdiff = smoothstep(-0.12, 0.25, ndlS) * (0.2 + 0.8 * max(ndlS, 0.0));
      col = mix(col, vec3(0.92, 0.94, 0.97) * (sun * cdiff + MOON * dark), cov);

      float lit = smoothstep(-0.35, 0.5, ndlS);
      float rim = 1.0 - mu;
      col = mix(col, uAtmo * 0.35 * lit, pow(rim, 3.0) * 0.55);
      col += uAtmo * (pow(rim, 1.6) * 0.05 + pow(rim, 6.0) * 0.8) * lit;
      col += vec3(1.0, 0.38, 0.12) * pow(rim, 3.0) * exp(-ndlS * ndlS / 0.012) * 0.22;

      float ia = clamp((1.0 - r) * uRadius + 0.5, 0.0, 1.0);
      float t = max(r - 1.0, 0.0) / GLOW;
      float halo = exp(-t * 3.5) * (1.0 - smoothstep(0.0, 1.0, t));
      float hl = smoothstep(-0.5, 0.7, dot(vec3(p / max(r, 1e-4), 0.0), uLight));
      vec3 lin = col * ia + uAtmo * halo * hl * 0.9 * (1.0 - ia);

      vec3 x = lin * EXPOSURE;
      vec3 rgb = pow(clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0), vec3(1.0 / 2.2));

      if (uStars > 0.0) {
        vec2 sp = (frag + uStarShift) / (STAR_CELL * uDpr);
        vec2 id = floor(sp);
        float h0 = hash(id);
        if (h0 < uStars * STAR_SHARE) {
          vec2 pos = vec2(hash(id + 17.3), hash(id + 41.9)) * 0.7 + 0.15;
          float d = length(fract(sp) - pos) * STAR_CELL;
          float mag = pow(hash(id + 7.1), 5.0);
          float tw = 0.7 + 0.3 * sin(uTime * (0.6 + 2.0 * hash(id + 3.3)) + h0 * 80.0);
          float star = exp(-d * d / (0.25 + 0.6 * mag)) * (0.15 + 0.85 * mag) * tw;
          rgb += vec3(star) * (1.0 - ia) * (1.0 - clamp(halo * 1.5, 0.0, 1.0));
        }
      }
      gl_FragColor = vec4(rgb, max(ia, max(rgb.r, max(rgb.g, rgb.b))));
    }
  `;

  const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true });
  if (!gl) return;
  gl.getExtension("OES_standard_derivatives");

  function createShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, createShader(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(prog, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = {};
  [
    "uCenter", "uRadius", "uDpr", "uRot", "uCloudRot", "uLight", "uAtmo", "uClouds", "uLights",
    "uStars", "uTime", "uStarShift", "uHave", "uDay", "uNight", "uAux"
  ].forEach(n => u[n] = gl.getUniformLocation(prog, n));

  const tex = [];
  for (let i = 0; i < 3; i++) {
    const t = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + i);
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    tex.push(t);
  }
  gl.uniform1i(u.uDay, 0);
  gl.uniform1i(u.uNight, 1);
  gl.uniform1i(u.uAux, 2);

  function upload(slot, src) {
    gl.activeTexture(gl.TEXTURE0 + slot);
    gl.bindTexture(gl.TEXTURE_2D, tex[slot]);
    if (src instanceof Uint8Array) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, TEX_W, TEX_H, 0, gl.RGBA, gl.UNSIGNED_BYTE, src);
    else gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
    gl.generateMipmap(gl.TEXTURE_2D);
  }

  const AUX_CACHE = new Map();
  function auxFor(water, topo, cloud, key) {
    if (AUX_CACHE.has(key)) return AUX_CACHE.get(key);
    const out = new Uint8Array(TEX_W * TEX_H * 4);
    for (let i = 0, k = 0; i < TEX_W * TEX_H; i++, k += 4) {
      out[k] = water ? water[i] : 0;
      out[k + 1] = topo ? topo[i] : 0;
      out[k + 2] = cloud ? cloud[i] : 0;
      out[k + 3] = 255;
    }
    AUX_CACHE.set(key, out);
    return out;
  }

  let W = 0, H = 0, dpr = 1;
  function resize() {
    W = container.offsetWidth;
    H = container.offsetHeight;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(W * dpr));
    canvas.height = Math.max(1, Math.round(H * dpr));
  }
  resize();
  window.addEventListener("resize", resize);

  let px = 0, py = 0, over = false, R = 180;
  let dragging = false, lastX = 0, lastY = 0, lastT = 0;
  let yaw = 0, pitch = 0, vYaw = 0, vPitch = 0;

  window.addEventListener("pointermove", (e) => {
    const b = container.getBoundingClientRect();
    px = e.clientX - b.left;
    py = e.clientY - b.top;
    over = true;
    if (dragging) {
      const now = performance.now();
      const dts = Math.max(0.001, (now - lastT) / 1000);
      const dYaw = (px - lastX) / R, dPitch = (py - lastY) / R;
      yaw += dYaw;
      pitch = clamp(pitch + dPitch, -MAX_PITCH, MAX_PITCH);
      vYaw += (dYaw / dts - vYaw) * 0.4;
      vPitch += (dPitch / dts - vPitch) * 0.4;
      lastX = px;
      lastY = py;
      lastT = now;
    }
  });

  container.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = px;
    lastY = py;
    lastT = performance.now();
    vYaw = 0;
    vPitch = 0;
  });
  window.addEventListener("pointerup", () => { dragging = false; });

  const rot = new Float32Array(9);
  const have = [0, 0, 0, 0];
  let last = -1, time = 0, cloudRot = 0;
  const hov = { x: 0, vx: 0, y: 0, vy: 0, lift: 0, vl: 0 };
  let auxKey = "";

  function frame(now) {
    requestAnimationFrame(frame);
    const dt = last < 0 ? 0 : Math.min(0.05, (now - last) / 1000);
    last = now;
    if (W < 2 || H < 2) return;
    time += dt;

    const day = loadPix(DAY_SRC, -1);
    const night = loadPix(NIGHT_SRC, -1, NIGHT_W);
    if (day.state === "ready" && day.canvas && !have[0]) { upload(0, day.canvas); have[0] = 1; }
    if (night.state === "ready" && night.canvas && !have[1]) { upload(1, night.canvas); have[1] = 1; }

    const water = loadPix(WATER_SRC, 0), topo = loadPix(TOPO_SRC, 0), cloud = loadPix(CLOUD_SRC, 3);
    const key = [water, topo, cloud].map(x => x.state === "ready" ? 1 : 0).join("");
    if (key !== auxKey && key !== "000") {
      upload(2, auxFor(water.chan, topo.chan, cloud.chan, key));
      auxKey = key;
      have[2] = 1;
      have[3] = 1;
    }

    const spd = 9.4 / 5;
    const omega = (TAU * spd) / PERIOD_S;
    if (!dragging) {
      const decay = Math.exp(-dt / INERTIA_S);
      yaw += (omega + vYaw) * dt;
      pitch = clamp(pitch + vPitch * dt, -MAX_PITCH, MAX_PITCH);
      vYaw *= decay;
      vPitch *= decay;
      pitch *= Math.exp(-dt / PITCH_RETURN_S);
    }
    cloudRot += dt * spd * CLOUD_DRIFT;

    const cx = W / 2, cy = H / 2;
    R = Math.min(W, H) * 0.38;

    const soft = (v) => Math.tanh(HOVER_SOFT * clamp(v, -1.5, 1.5)) / Math.tanh(HOVER_SOFT);
    let gx = over ? soft((px - cx) / Math.max(1, cx)) * HOVER_TURN : 0;
    let gy = over ? -soft((py - cy) / Math.max(1, cy)) * HOVER_TURN : 0;

    hov.vx += (HOVER_K * (gx - hov.x) - HOVER_C * hov.vx) * dt;
    hov.x += hov.vx * dt;
    hov.vy += (HOVER_K * (gy - hov.y) - HOVER_C * hov.vy) * dt;
    hov.y += hov.vy * dt;

    const view = orbit(hov.x, hov.y);
    globeFromView(yaw, pitch, view, rot);

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform2f(u.uCenter, canvas.width / 2, canvas.height / 2);
    gl.uniform1f(u.uRadius, R * dpr);
    gl.uniform1f(u.uDpr, dpr);
    gl.uniformMatrix3fv(u.uRot, false, rot);
    gl.uniform1f(u.uCloudRot, cloudRot);
    gl.uniform3f(u.uLight, -0.6, 0.4, 0.7);
    gl.uniform3f(u.uAtmo, 0.08, 0.28, 0.85);
    gl.uniform1f(u.uClouds, 1.0);
    gl.uniform1f(u.uLights, 1.2);
    gl.uniform1f(u.uStars, 0.6);
    gl.uniform1f(u.uTime, time);
    gl.uniform2f(u.uStarShift, hov.x * R * dpr * STAR_PARALLAX, hov.y * R * dpr * STAR_PARALLAX);
    gl.uniform4f(u.uHave, have[0], have[1], have[2], have[3]);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  requestAnimationFrame(frame);
})();