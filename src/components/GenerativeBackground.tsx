'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

interface GenerativeBackgroundProps {
  variant?: 'matrix' | 'particles' | 'waves' | 'grid';
}

export default function GenerativeBackground({ variant = 'matrix' }: GenerativeBackgroundProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !isClient) return;

    // Dynamically import p5 only on client side
    import('p5').then((p5Module) => {
      const p5 = p5Module.default;

    const sketch = (p: any) => {
      let time = 0;
      let particles: Array<{ x: number; y: number; vx: number; vy: number; life: number }> = [];
      let chars = '01♦◊◦•▫▪';
      
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.style('position', 'fixed');
        canvas.style('top', '0');
        canvas.style('left', '0');
        canvas.style('z-index', '-1');
        canvas.style('pointer-events', 'none');
        
        // Initialize particles for particle variant
        if (variant === 'particles') {
          for (let i = 0; i < 50; i++) {
            particles.push({
              x: p.random(p.width),
              y: p.random(p.height),
              vx: p.random(-0.5, 0.5),
              vy: p.random(-0.5, 0.5),
              life: p.random(100, 300)
            });
          }
        }
      };

      p.draw = () => {
        p.clear();
        time += 0.01;

        switch (variant) {
          case 'matrix':
            drawMatrix(p);
            break;
          case 'particles':
            drawParticles(p);
            break;
          case 'waves':
            drawWaves(p);
            break;
          case 'grid':
            drawGrid(p);
            break;
        }
      };

      const drawMatrix = (p: any) => {
        p.fill(0, 255, 0, 30);
        p.textSize(10);
        p.textFont('monospace');
        
        for (let x = 0; x < p.width; x += 20) {
          for (let y = 0; y < p.height; y += 20) {
            if (p.random() < 0.005) {
              let char = chars[Math.floor(p.random(chars.length))];
              let alpha = 150 * p.noise(x * 0.01, y * 0.01, time);
              p.fill(0, 255, 0, alpha);
              p.text(char, x, y);
            }
          }
        }
      };

      const drawParticles = (p: any) => {
        // Update and draw particles
        particles.forEach((particle, index) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.life--;

          // Wrap around screen
          if (particle.x < 0) particle.x = p.width;
          if (particle.x > p.width) particle.x = 0;
          if (particle.y < 0) particle.y = p.height;
          if (particle.y > p.height) particle.y = 0;

          // Reset particle if life is over
          if (particle.life <= 0) {
            particle.x = p.random(p.width);
            particle.y = p.random(p.height);
            particle.life = p.random(100, 300);
          }

          // Draw particle
          let alpha = p.map(particle.life, 0, 300, 0, 50);
          p.fill(0, 255, 0, alpha);
          p.noStroke();
          p.circle(particle.x, particle.y, 2);

          // Connect nearby particles
          particles.forEach((other, otherIndex) => {
            if (index !== otherIndex) {
              let distance = p.dist(particle.x, particle.y, other.x, other.y);
              if (distance < 100) {
                let alpha = p.map(distance, 0, 100, 20, 0);
                p.stroke(0, 255, 0, alpha);
                p.strokeWeight(0.5);
                p.line(particle.x, particle.y, other.x, other.y);
              }
            }
          });
        });
      };

      const drawWaves = (p: any) => {
        p.stroke(0, 255, 0, 30);
        p.strokeWeight(1);
        p.noFill();

        for (let i = 0; i < 5; i++) {
          p.beginShape();
          for (let x = 0; x <= p.width; x += 5) {
            let y = p.height / 2 + 
                   p.sin(x * 0.01 + time + i * 2) * 50 * (i + 1) * 0.3 +
                   p.sin(x * 0.005 + time * 0.5 + i) * 30;
            p.vertex(x, y);
          }
          p.endShape();
        }
      };

      const drawGrid = (p: any) => {
        p.stroke(0, 255, 0, 20);
        p.strokeWeight(0.5);
        
        let gridSize = 40;
        
        // Vertical lines
        for (let x = 0; x < p.width; x += gridSize) {
          let offset = p.sin(time + x * 0.01) * 10;
          p.line(x + offset, 0, x + offset, p.height);
        }
        
        // Horizontal lines
        for (let y = 0; y < p.height; y += gridSize) {
          let offset = p.cos(time + y * 0.01) * 10;
          p.line(0, y + offset, p.width, y + offset);
        }

        // Add some glowing dots at intersections
        for (let x = 0; x < p.width; x += gridSize) {
          for (let y = 0; y < p.height; y += gridSize) {
            if (p.random() < 0.1) {
              let alpha = 100 * p.noise(x * 0.01, y * 0.01, time);
              p.fill(0, 255, 0, alpha);
              p.noStroke();
              p.circle(x, y, 3);
            }
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
    };

      sketchRef.current = new p5(sketch, canvasRef.current);
    }).catch((error) => {
      console.error('Failed to load p5.js:', error);
    });

    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, [variant, isClient]);

  return <div ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }} />;
}