// Copied from apps/motion/components/theme/water-shader.ts (the apps share no code).

/**
 * WebGL water surface drawn over the theme ripple: a swell on the ellipse
 * front, a train of rings behind it and glinting highlights, lit like water.
 * The front grows on the same curve and radius as the CSS clip-path reveal,
 * so the two stay locked together.
 */

/** Vertical squash of the ripple ellipse (ry = rx · FLATTEN). */
export const FLATTEN = 0.55;
/** Reveal duration; must match `theme-ripple-reveal` in app/globals.css. */
export const REVEAL_MS = 2200;
/** The glints fade out between REVEAL_MS and this. */
const WATER_MS = 4200;
/** The reveal easing, cubic-bezier(0.12, 0.72, 0.28, 1). */
const CURVE = { x1: 0.12, y1: 0.72, x2: 0.28, y2: 1 };

const VERTEX = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAGMENT = `
precision highp float;
uniform vec2 u_res;
uniform vec2 u_center;
uniform float u_front;
uniform float u_spread;
uniform float u_flatten;
uniform float u_time;
uniform float u_fade;

float wave(float r) {
  float d = r - u_front;
  float amp = exp(-u_front / (u_spread * 0.7));
  // The splash hits hard, then the surface calms.
  float punch = 1.0 + 1.6 * exp(-u_time * 3.5);
  // Wavelength stretches as the rings expand.
  float lambda = 40.0 + u_front * 0.12;

  // Leading swell: steep ahead of the front, long slope behind it.
  float sigma = d > 0.0 ? 18.0 + u_front * 0.02 : 40.0 + u_front * 0.05;
  float lead = 1.15 * exp(-d * d / (2.0 * sigma * sigma));

  // Ring train behind the front, windowed to an annulus ending at the front.
  float rings = sin(6.2832 * r / lambda - u_time * 5.5);
  float win = smoothstep(u_front * 0.12, u_front * 0.4, r)
    * (1.0 - smoothstep(u_front - lambda * 0.35, u_front, r));
  // Crests near the front carry more energy than older ones inside.
  float fall = exp(-(u_front - r) / (u_front * 0.55 + 1.0));

  return (lead + rings * win * fall * 1.1) * amp * punch;
}

void main() {
  vec2 p = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);
  vec2 q = p - u_center;
  q.y /= u_flatten;
  float r = length(q);
  // Organic rim: angular harmonics wobble the radius so crests undulate.
  float ang = atan(q.y, q.x);
  float wob = sin(ang * 5.0 + u_time * 1.6)
    + 0.6 * sin(ang * 8.0 - u_time * 2.3)
    + 0.4 * sin(ang * 13.0 + u_time * 3.1);
  float rw = r + wob * (3.5 + u_front * 0.012);
  vec2 dir = r > 0.5 ? q / r : vec2(0.0);
  vec2 grad = dir * (wave(rw + 1.5) - wave(rw)) * 24.0;
  vec3 N = normalize(vec3(-grad.x, grad.y, 1.0));
  vec3 L = normalize(vec3(-0.25, 0.55, 0.8));
  vec3 R = reflect(-L, N);
  float spec = pow(max(R.z, 0.0), 80.0);
  float tilt = dot(N, L) - L.z;
  float s = spec * 0.85 + tilt * 0.85;
  float born = smoothstep(2.0, 46.0, r);
  // Shadow is quieter than sparkle so the page stays readable under it.
  float a = clamp(abs(s), 0.0, 1.0) * (s > 0.0 ? 1.0 : 0.7) * born * u_fade;
  gl_FragColor = vec4(s > 0.0 ? vec3(1.0) : vec3(0.0), a);
}`;

/** Progress (0–1) of the reveal easing at time fraction `t`, by bisection. */
export function revealProgress(t: number) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  const bezier = (u: number, a: number, b: number) =>
    3 * (1 - u) * (1 - u) * u * a + 3 * (1 - u) * u * u * b + u * u * u;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (bezier(mid, CURVE.x1, CURVE.x2) < t) lo = mid;
    else hi = mid;
  }
  return bezier((lo + hi) / 2, CURVE.y1, CURVE.y2);
}

/**
 * Animates the water on `canvas` around (cx, cy) for WATER_MS. Resolves when
 * done, immediately if WebGL is unavailable, or early once `signal` aborts.
 */
export function renderWater(
  canvas: HTMLCanvasElement,
  cx: number,
  cy: number,
  spread: number,
  { lowRes, signal }: { lowRes: boolean; signal: AbortSignal },
) {
  return new Promise<void>((resolve) => {
    if (signal.aborted) return resolve();
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return resolve();

    const scale = Math.min(window.devicePixelRatio || 1, lowRes ? 1 : 1.5);
    canvas.width = Math.round(window.innerWidth * scale);
    canvas.height = Math.round(window.innerHeight * scale);

    const shader = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, shader(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    // Free the drawing buffer and let the detached canvas be collected. Not
    // `WEBGL_lose_context`: forcing a context loss can drop a compositor frame,
    // which paints the whole page blank for a moment as the transition ends.
    const release = () => {
      canvas.remove();
      canvas.width = canvas.height = 1;
    };
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      release();
      return resolve();
    }
    gl.useProgram(program);

    // One triangle that covers the viewport.
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'p');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    gl.uniform2f(uniform('u_res'), canvas.width, canvas.height);
    gl.uniform2f(uniform('u_center'), cx * scale, cy * scale);
    gl.uniform1f(uniform('u_spread'), spread * scale);
    gl.uniform1f(uniform('u_flatten'), FLATTEN);
    const uFront = uniform('u_front');
    const uTime = uniform('u_time');
    const uFade = uniform('u_fade');

    const start = performance.now();
    let frame = 0;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(frame);
      signal.removeEventListener('abort', finish);
      release();
      resolve();
    };
    signal.addEventListener('abort', finish, { once: true });

    const draw = (now: number) => {
      const t = now - start;
      gl.uniform1f(uFront, revealProgress(t / REVEAL_MS) * spread * scale);
      gl.uniform1f(uTime, t / 1000);
      const fade = t < REVEAL_MS ? 1 : Math.max(0, 1 - (t - REVEAL_MS) / (WATER_MS - REVEAL_MS));
      gl.uniform1f(uFade, fade * fade);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (t < WATER_MS) frame = requestAnimationFrame(draw);
      else finish();
    };
    frame = requestAnimationFrame(draw);
  });
}
