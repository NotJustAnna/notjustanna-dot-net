import { AnimatedImage, Pixel } from "@/components/joy-showcase/shooting-stars/scene/animated-image.ts";

export async function createAnimatedImage(source: OffscreenCanvas): Promise<AnimatedImage> {
  const width = source.width;
  const height = source.height;

  const worker = new Worker(new URL('./workers/animated-image.ts', import.meta.url), { type: 'module' });

  const pixels: Pixel[] = await new Promise((resolve) => {
    const result: Pixel[] = [];

    worker.onmessage = (event) => {
      const { pixels: partial, done } = event.data;
      result.push(...partial);
      if (done) {
        resolve(result);
      }
    };

    worker.postMessage({ canvas: source, width, height }, [source]);
  });

  return new AnimatedImage(width, height, pixels);
}