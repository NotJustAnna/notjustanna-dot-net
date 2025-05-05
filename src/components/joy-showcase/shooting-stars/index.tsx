import { type CanvasHTMLAttributes, useRef } from "react";
import RenderCanvas from "@/components/joy-showcase/shooting-stars/lib/canvas.tsx";
import { ShootingStarsScene } from "@/components/joy-showcase/shooting-stars/scene.ts";

type BuiltInCanvasProps = CanvasHTMLAttributes<HTMLCanvasElement>;

type ShootingStarsProps = BuiltInCanvasProps & {};

export default function ShootingStarsCanvas({ ...canvasProps }: ShootingStarsProps) {
  const sceneRef = useRef<ShootingStarsScene>(undefined);

  if (sceneRef.current === undefined) {
    sceneRef.current = new ShootingStarsScene();
  }

  const drawFn = (ctx: CanvasRenderingContext2D, time: number) => {
    const scene = sceneRef.current;
    if (scene === undefined) {
      return;
    }
    scene.draw(ctx, time);
  };

  return <RenderCanvas draw={drawFn} {...canvasProps}/>;
}
