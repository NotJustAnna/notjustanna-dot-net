import {useRef} from 'react';
import Canvas from './canvas.tsx';
import {Scene} from './scene.ts';

export interface ShootingStarSceneProps {
  paused: boolean;
}

export default function ShootingStarScene({ paused }: ShootingStarSceneProps) {
  const sceneRef = useRef<Scene>(undefined);

  if (typeof window !== 'undefined') {
    if (!sceneRef.current) {
      sceneRef.current = new Scene();
    }
    sceneRef.current!.paused = paused;
  }

  return (
    <Canvas
      draw={(ctx) => sceneRef.current!.loop(ctx)}
      className="absolute top-0 left-0 bg-black h-screen z-[-1]"
    />
  );
}
