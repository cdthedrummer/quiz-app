import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  duration?: number;
  pieces?: number;
}

export function Confetti({ duration = 3000, pieces = 50 }: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Create confetti pieces
    Array.from({ length: pieces }).forEach(() => {
      const piece = document.createElement('div');
      const hue = Math.random() * 360;
      
      piece.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: hsl(${hue}, 70%, 50%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
      `;

      // Random starting position at the bottom
      const x = Math.random() * containerWidth;
      piece.style.left = `${x}px`;
      piece.style.top = `${containerHeight}px`;

      // Random animation
      const angle = (Math.random() * 60 - 30) * (Math.PI / 180);
      const velocity = 300 + Math.random() * 200;
      const vx = Math.sin(angle) * velocity;
      const vy = Math.cos(angle) * velocity;

      piece.animate([
        { transform: 'translate(-50%, -50%) rotate(0deg)' },
        { 
          transform: `translate(
            calc(-50% + ${vx}px),
            calc(-50% - ${vy}px)
          ) rotate(${Math.random() * 360}deg)`,
          opacity: 0
        }
      ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });

      container.appendChild(piece);
      setTimeout(() => piece.remove(), duration);
    });
  }, [pieces, duration]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: '1000px' }}
    />
  );
}
