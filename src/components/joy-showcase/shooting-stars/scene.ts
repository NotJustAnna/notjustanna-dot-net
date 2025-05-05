import { Particle } from "@/components/joy-showcase/shooting-stars/scene/particle.ts";
import { AnimatedImage } from "@/components/joy-showcase/shooting-stars/scene/animated-image.ts";

export class ShootingStarsScene {
  /**
   * Array of particles that are currently alive in the scene.
   */
  particles: Particle[] = [];

  /**
   * The current animated image, if any.
   */
  image?: AnimatedImage;

  /**
   * Accumulated delta time. Used by setup() to determine how much time has passed.
   * WARNING: setup() WILL subtract from this value and as such,
   *          this field should not be relied upon by other methods.
   */
  deltaAcc: number = 0;

  /**
   * Renders the entire scene on canvas.
   * This consists of rendering a "resulting image", if any, and then all alive particles.
   *
   * After finishing, this method will queue a setup for the next frame.
   */
  draw(ctx: CanvasRenderingContext2D, time: number) {
    const { canvas: { width, height } } = ctx;
    ctx.clearRect(0, 0, width, height);

    // render the image if it exists. disposes the image if no longer alive.
    if (this.image !== undefined && !this.image.draw(ctx, time, width, height)) {
      this.image = undefined;
    }

    // render all alive particles. disposes any particle no longer alive.
    this.particles = this.particles.filter(p => p.draw(ctx, time, width, height));
    queueMicrotask(() => this.setup(time));
  }

  /**
   * Sets up part of the scene for the next frame.
   * In this method, delta time is accumulated, new particles are created depending on it,
   * Particles which depend on the image are also queued for rendering here.
   */
  private setup(time: number) {
    this.deltaAcc += time;


  }
}