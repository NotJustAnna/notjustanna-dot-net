import { Pixel } from "@/components/joy-showcase/shooting-stars/scene/animated-image.ts";

self.onmessage = (event: MessageEvent) => {
  const { canvas, width, height } = event.data;
  const ctx = (canvas as OffscreenCanvas).getContext('2d')!;
  const data = ctx.getImageData(0, 0, width, height).data;

  let pixels: Pixel[] = [];
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 0) {
      pixels.push({
        x: (i / 4) % width,
        y: Math.floor((i / 4) / width),
        color: [data[i], data[i + 1], data[i + 2]],
      });
    }
    if (pixels.length === 1000) {
      self.postMessage({ pixels: pixels });
      pixels = [];
    }
  }

  self.postMessage({ pixels: pixels, done: true });
};