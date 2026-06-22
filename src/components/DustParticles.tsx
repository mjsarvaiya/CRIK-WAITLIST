"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
  hue: number;
  /** Phase + amplitude drive the gentle levitation (render-only offset). */
  phase: number;
  amp: number;
}

/** Canvas-based dust particles for subtle 3D depth in the background. */
export default function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const context = canvasEl.getContext("2d");
    if (!context) return;

    // Non-null bindings used by all closures below (no narrowing required).
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    let animationId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Scale particle count to viewport so phones stay light (denser than before)
    function particleCount() {
      const base = Math.round((window.innerWidth * window.innerHeight) / 8000);
      return Math.max(80, Math.min(220, base));
    }

    function createParticle(): Particle {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.18,
        vz: (Math.random() - 0.5) * 0.0025,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() > 0.6 ? 185 : Math.random() > 0.5 ? 145 : 0,
        phase: Math.random() * Math.PI * 2,
        amp: Math.random() * 6 + 2,
      };
    }

    function initParticles() {
      particles = Array.from({ length: particleCount() }, createParticle);
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      // Cap DPR at 2 for crisp dots without over-rendering on hi-dpi screens
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const t = performance.now() / 1000;

      for (const p of particles) {
        p.x += p.vx * (0.5 + p.z);
        p.y += p.vy * (0.5 + p.z);
        p.z += p.vz;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.z < 0 || p.z > 1) p.vz *= -1;

        const depth = 0.3 + p.z * 0.7;
        const radius = p.size * depth;
        const alpha = p.opacity * depth * 0.6;

        // Gentle levitation: render-only sine offset so dots bob without drifting away
        const drawX = p.x + Math.cos(t * 0.6 + p.phase) * p.amp * 0.4;
        const drawY = p.y + Math.sin(t * 0.8 + p.phase) * p.amp;

        if (p.hue === 185) {
          ctx.fillStyle = `rgba(0, 212, 238, ${alpha})`;
        } else if (p.hue === 145) {
          ctx.fillStyle = `rgba(48, 209, 88, ${alpha * 0.7})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Soft glow on larger near particles
        if (p.z > 0.7 && p.hue !== 0) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle =
            p.hue === 185
              ? `rgba(0, 212, 238, ${alpha * 0.08})`
              : `rgba(48, 209, 88, ${alpha * 0.06})`;
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    function start() {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(draw);
    }

    function stop() {
      cancelAnimationFrame(animationId);
    }

    // Pause the loop when the tab is hidden to save CPU/battery
    function handleVisibility() {
      if (document.hidden) stop();
      else if (!prefersReducedMotion) start();
    }

    resize();

    if (prefersReducedMotion) {
      // Render a single static frame, no continuous animation
      draw();
      stop();
    } else {
      start();
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
    />
  );
}
