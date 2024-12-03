'use client';

import React, { useEffect, useRef } from 'react';

export const Meteors = ({
  color = 'rgba(255, 255, 255, 0.1)',
  count = 20,
}: {
  color?: string;
  count?: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to match the parent element's dimensions
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resizeCanvas();

    // Create meteors
    const meteors: { x: number; y: number; length: number; speed: number }[] =
      [];
    for (let i = 0; i < count; i++) {
      meteors.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 100 + 50,
        speed: Math.random() * 3 + 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const meteor of meteors) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(meteor.x - meteor.length, meteor.y + meteor.length);
        ctx.stroke();

        meteor.x += meteor.speed;
        meteor.y -= meteor.speed;

        if (meteor.y < -100 || meteor.x > canvas.width + 100) {
          meteor.x = Math.random() * canvas.width;
          meteor.y = canvas.height + Math.random() * 100;
        }
      }
      requestAnimationFrame(draw);
    };

    draw();
    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);

    return () => observer.disconnect();
  }, [color, count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none rounded-lg"
    />
  );
};
