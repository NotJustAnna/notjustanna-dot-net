export class Particle {
  /**
   * Random number used for the particle's initial spawn position.
   */
  private spawnRegion: number = (Math.random() - 0.25) * 1.25;

  constructor(
    readonly bitmap: ImageBitmap,
    readonly birthTime: number,
    readonly size: number,
    readonly speed: number,
  ) {}

  /**
   * Renders the particle on the canvas.
   * This function returns false if the image is no longer alive.
   */
  draw(ctx: CanvasRenderingContext2D, time: number, width: number, height: number): boolean {
    const spawnEdge = Math.floor((width + height) * this.spawnRegion);
    const lifetime = (time - this.birthTime) * this.speed - 10;

    let x: number;
    let y: number;
    if (spawnEdge < height) {
      x = lifetime;
      y = height - spawnEdge + lifetime;
    } else {
      x = spawnEdge - height + lifetime;
      y = lifetime;
    }

    if (x > width + this.size || y > height + this.size) {
      return false;
    }

    ctx.drawImage(this.bitmap!, Math.round(x), Math.round(y));
    return true;
  }
}

