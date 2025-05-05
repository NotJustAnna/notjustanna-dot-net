import { AnimatedImage, Pixel } from "@/components/joy-showcase/shooting-stars/scene/animated-image.ts";

export class PixelParticle {
  constructor(
    readonly bitmap: ImageBitmap,
    readonly birthTime: number,
    readonly parent: AnimatedImage,
    readonly pixel: Pixel,
    readonly speed: number = Math.floor(Math.random() * 5 + 5),
  ) {}

  /**
   * Renders the particle on the canvas.
   * This function returns false if the image is no longer alive.
   */
  draw(ctx: CanvasRenderingContext2D, time: number, width: number, height: number): boolean {
    const lifetime = (time - this.birthTime) * this.speed - 10;

    // TODO finish
    return true;
  }
}
