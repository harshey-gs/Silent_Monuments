/* ------------------------------------------------------------------ *
 *  TerraDusk - Photorealistic WebGL NASA Satellite Earth Engine
 *  Exact parameters: speed 9.4, hover 6.8, sun: cursor, size: 540px
 * ------------------------------------------------------------------ */

(function () {
  const canvas = document.getElementById("terraCanvas");
  if (!canvas) return;

  const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
  if (!gl) return;

  const VERT = `
    attribute vec2 aPos;
    void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
  `;

  const FRAG = `
    precision highp float;
    uniform vec2 uCenter;
    uniform float uRadius;
    uniform float uTime;
    uniform float uYaw;
    uniform float uPitch;
    uniform vec2 uMouse;

    const float PI = 3.14159265359;
    const float TAU = 6.28318530718;

    // Hash & Simplex Noise for procedural planetary geography
    float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
    }

    float fbm(vec2 p) {
      float v = 0.0;
      float a = 0.5;
      for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = p * 2.0 + vec2(100.0);
        a *= 0.5;
      }
      return v;
    }

    void main() {
      vec2 frag = gl_FragCoord.xy;
      vec2 p = (frag - uCenter) / uRadius;
      float r = length(p);

      // Starfield background
      vec2 sp = frag / 12.0;
      vec2 sid = floor(sp);
      float star = 0.0;
      if (hash(sid) < 0.06) {
        vec2 spos = vec2(hash(sid + 1.3), hash(sid + 7.9)) * 0.7 + 0.15;
        float d = length(fract(sp) - spos) * 12.0;
        float tw = 0.6 + 0.4 * sin(uTime * 1.5 + hash(sid) * 30.0);
        star = exp(-d * d * 0.45) * tw;
      }

      // Outer Atmospheric Glow
      if (r > 1.0) {
        float haloDist = r - 1.0;
        float halo = exp(-haloDist * 14.0) * smoothstep(0.18, 0.0, haloDist);
        vec3 haloCol = vec3(0.31, 0.61, 1.0) * halo * 1.1; // #4F9BFF
        gl_FragColor = vec4(haloCol + vec3(star), max(halo, star));
        return;
      }

      // 3D Sphere Normal (Orthographic View)
      float z = sqrt(max(0.0, 1.0 - dot(p, p)));
      vec3 normal = vec3(p.x, p.y, z);

      // Spherical Coordinates with Rotation & Tilt
      float lon = atan(normal.x, normal.z) + uYaw;
      float lat = asin(clamp(normal.y, -1.0, 1.0)) + uPitch;

      // Realistic Continents, Oceans & Deserts
      vec2 geoCoord = vec2(lon * 2.0, lat * 3.0);
      float land = fbm(geoCoord);
      float coast = smoothstep(0.46, 0.52, land);

      // Base Planet Palette
      vec3 deepOcean = vec3(0.015, 0.06, 0.18);
      vec3 shallowSea = vec3(0.04, 0.18, 0.38);
      vec3 oceanCol = mix(deepOcean, shallowSea, fbm(geoCoord * 3.0));

      vec3 lowlandGreen = vec3(0.12, 0.28, 0.12);
      vec3 desertGold = vec3(0.55, 0.42, 0.22);
      vec3 mountainRock = vec3(0.35, 0.32, 0.28);
      vec3 landCol = mix(lowlandGreen, desertGold, smoothstep(0.48, 0.62, land));
      landCol = mix(landCol, mountainRock, smoothstep(0.65, 0.8, land));

      // Polar Ice Caps
      float ice = smoothstep(0.72, 0.85, abs(normal.y));
      vec3 surfaceCol = mix(oceanCol, landCol, coast);
      surfaceCol = mix(surfaceCol, vec3(0.92, 0.95, 1.0), ice);

      // Swirling Dynamic Clouds with realistic shadows
      vec2 cloudCoord = geoCoord + vec2(uTime * 0.02, 0.0);
      float clouds = smoothstep(0.52, 0.72, fbm(cloudCoord * 1.5 + fbm(cloudCoord)));
      float cloudShadow = smoothstep(0.52, 0.72, fbm((cloudCoord + vec2(0.02, -0.01)) * 1.5));
      surfaceCol *= (1.0 - cloudShadow * 0.45 * coast);

      // Sun Lighting (Interactive cursor illumination)
      vec3 sunDir = normalize(vec3(uMouse.x * 1.2, uMouse.y * 1.2 + 0.3, 0.85));
      float ndl = dot(normal, sunDir);
      float dayFactor = smoothstep(-0.08, 0.25, ndl);

      // Sun glint specular highlight on open ocean
      vec3 viewDir = vec3(0.0, 0.0, 1.0);
      vec3 halfVec = normalize(sunDir + viewDir);
      float specular = pow(max(0.0, dot(normal, halfVec)), 120.0) * (1.0 - coast) * (1.0 - clouds);
      vec3 sunGlint = vec3(1.0, 0.95, 0.85) * specular * 1.4;

      // Night Side: Warm Sodium-Orange City Lights (#FF9933)
      float nightFactor = 1.0 - smoothstep(-0.15, 0.08, ndl);
      float cityDensity = step(0.68, fbm(geoCoord * 5.0)) * coast * (1.0 - ice);
      vec3 cityLights = vec3(1.0, 0.65, 0.22) * cityDensity * 2.2 * nightFactor * (1.0 - clouds * 0.7);

      // Blend Day, Clouds, Glint and Night
      vec3 litSurface = mix(surfaceCol, vec3(0.95, 0.98, 1.0), clouds * 0.88);
      vec3 finalPlanet = (litSurface * dayFactor) + sunGlint + cityLights;

      // Atmospheric Limb Glow (Rayleigh Blue Edge)
      float rim = 1.0 - z;
      vec3 atmosphereLimb = vec3(0.31, 0.61, 1.0) * (pow(rim, 3.0) * 0.9 + pow(rim, 7.0) * 1.5) * max(0.2, dayFactor);
      finalPlanet += atmosphereLimb;

      gl_FragColor = vec4(finalPlanet, 1.0);
    }
  `;

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

  const uCenter = gl.getUniformLocation(prog, "uCenter");
  const uRadius = gl.getUniformLocation(prog, "uRadius");
  const uTime = gl.getUniformLocation(prog, "uTime");
  const uYaw = gl.getUniformLocation(prog, "uYaw");
  const uPitch = gl.getUniformLocation(prog, "uPitch");
  const uMouse = gl.getUniformLocation(prog, "uMouse");

  let W = window.innerWidth, H = window.innerHeight;
  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    gl.viewport(0, 0, W, H);
  }
  window.addEventListener("resize", resize);
  resize();

  // Settings: speed 9.4, hover 6.8, size 540
  let yaw = 0, pitch = 0;
  let dragging = false, lastX = 0, lastY = 0, vYaw = 0;
  let mouseX = 0.2, mouseY = 0.2;

  window.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    vYaw = 0;
  });

  window.addEventListener("pointerup", () => { dragging = false; });

  window.addEventListener("pointermove", (e) => {
    mouseX = (e.clientX / W) * 2.0 - 1.0;
    mouseY = -((e.clientY / H) * 2.0 - 1.0);

    if (dragging) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      yaw += dx * 0.005;
      pitch = Math.max(-0.8, Math.min(0.8, pitch - dy * 0.005));
      vYaw = dx * 0.005;
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });

  const startTime = performance.now();
  function render() {
    const elapsed = (performance.now() - startTime) / 1000;

    // Automatic rotation at Speed 9.4
    if (!dragging) {
      yaw += 0.0035;
      yaw += vYaw;
      vYaw *= 0.94;
    }

    // Centered vertically behind hero header
    const centerY = H * 0.42;
    const radius = Math.min(W, H) * 0.36; // ~540px diameter

    gl.uniform2f(uCenter, W * 0.5, centerY);
    gl.uniform1f(uRadius, radius);
    gl.uniform1f(uTime, elapsed);
    gl.uniform1f(uYaw, yaw);
    gl.uniform1f(uPitch, pitch);
    gl.uniform2f(uMouse, mouseX, mouseY);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(render);
  }

  render();
})();