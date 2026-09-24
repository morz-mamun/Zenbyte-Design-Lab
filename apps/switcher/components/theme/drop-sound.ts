// Copied from apps/motion/components/theme/drop-sound.ts (the apps share no code).

/**
 * Water-drop sound for the theme transition. Nothing is created or fetched
 * until the first toggle click (a user gesture, so the context may start);
 * after that the one context and decoded buffer are reused. Every failure is
 * silent: the theme switch never depends on audio.
 */

// This app has no basePath, so the sound is served from the root.
const SRC = '/sounds/water-drop.m4a';
const GAIN = 0.6;

let context: AudioContext | null = null;
let buffer: AudioBuffer | null = null;
let loading: Promise<void> | null = null;

/** Call from the click handler: creates the context and loads the sound once. */
export function primeDropSound() {
  try {
    context ??= new AudioContext();
  } catch {
    return;
  }
  const ctx = context;
  loading ??= fetch(SRC)
    .then((response) => {
      if (!response.ok) throw new Error(`${response.status}`);
      return response.arrayBuffer();
    })
    .then((data) => ctx.decodeAudioData(data))
    .then((decoded) => {
      buffer = decoded;
    })
    .catch(() => {
      // Allow a later click to retry.
      loading = null;
    });
}

/** Plays the drop once, if it has loaded. */
export function playDropSound() {
  try {
    if (!context || !buffer) return;
    if (context.state === 'suspended') context.resume().catch(() => {});
    const source = context.createBufferSource();
    source.buffer = buffer;
    const gain = context.createGain();
    gain.gain.value = GAIN;
    source.connect(gain).connect(context.destination);
    source.start();
  } catch {
    // Audio unavailable: stay silent.
  }
}
