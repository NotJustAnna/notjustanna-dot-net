import { RGB, rgbToHex } from "@/components/joy-showcase/shooting-stars/lib/color.ts";

export interface Pixel {
  x: number;
  y: number;
  color: RGB;
}

export class AnimatedImage {
  private readonly imageCanvas: OffscreenCanvas;
  private imageCtx: OffscreenCanvasRenderingContext2D;
  private donePixels: Pixel[] = [];
  x0: number = 0;
  y0: number = 0;
  scale: number = 1;

  /**
   * Use createAnimatedImage to create an AnimatedImage.
   */
  constructor(
    readonly width: number,
    readonly height: number,
    private readonly pixels: Pixel[],
  ) {
    this.imageCanvas = new OffscreenCanvas(width, height);
    this.imageCtx = this.imageCanvas.getContext('2d')!;
  }

  /**
   * Renders the static part of the image on the canvas.
   * This function returns false if the image is no longer alive.
   */
  draw(ctx: CanvasRenderingContext2D, time: number, width: number, height: number): boolean {
    // Recalculate scale.
    this.scale = Math.min(1, Math.floor(Math.min(
      (width - 10) / this.width,
      (height - 10) / this.height
    )));

    // Recalculate x0 and y0.
    this.x0 = Math.floor((width - this.width * this.scale) / 2);
    this.y0 = Math.floor((height - this.height * this.scale) / 2);

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.imageCanvas, this.x0, this.y0, this.width * this.scale, this.height * this.scale);
    return true;
  }

  queueFinishedPixel(pixel: Pixel): void {
    // This function is called when a pixel is finished rendering.
    // It'll be queued at render time to be rendered on setup().
    this.donePixels.push(pixel);
  }

  setup(): void {
    // This function is called when the image is finished rendering.
    // It'll render all the pixels that are queued in donePixels.
    for (const pixel of this.donePixels) {
      this.imageCtx.fillStyle = rgbToHex(pixel.color);
      this.imageCtx.fillRect(pixel.x, pixel.y, 1, 1);
    }
    this.donePixels = [];
  }
}