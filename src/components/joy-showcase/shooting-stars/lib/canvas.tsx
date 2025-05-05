import { type CanvasHTMLAttributes, useEffect, useRef } from 'react';

type BuiltInCanvasProps = CanvasHTMLAttributes<HTMLCanvasElement>;

type CanvasProps = BuiltInCanvasProps & {
  draw: (ctx: CanvasRenderingContext2D, time: number) => void;
};

export default function RenderCanvas(props: CanvasProps) {
  const { draw, ...childProps } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d', { alpha: false })!;
    let animationFrameId: number;

    const render: FrameRequestCallback = (time: number) => {
      if (canvas.width !== canvas.clientWidth) {
        canvas.width = canvas.clientWidth;
      }
      if (canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
      }
      draw(context, time);
      animationFrameId = window.requestAnimationFrame(render);
    };
    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} {...childProps} />;
}
