/*
 * This file contain code related to color manipulation.
 * - HSL2RGB is adapted from Java code.
 * - Darken is adapted from Bootstrap & Sass.
 */

export type HSL = [number, number, number];
export type RGB = [number, number, number];

// internal function used by hslToRgb
function hue2rgb(p: number, q: number, t: number) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export function hslToRgb([h, s, l]: HSL): RGB {
  if (s === 0) {
    return [l, l, l]; // achromatic
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    /* r: */ hue2rgb(p, q, h + 1 / 3),
    /* g: */ hue2rgb(p, q, h),
    /* b: */ hue2rgb(p, q, h - 1 / 3)
  ];
}

export function darken([r, g, b]: RGB, amount: number): RGB {
  const m = 1 - amount / 10;
  return [r * m, g * m, b * m];
}

export function rgbToHex([r, g, b]: RGB): string {
  return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}