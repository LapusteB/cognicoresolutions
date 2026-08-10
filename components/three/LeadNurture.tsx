"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { className?: string };

/**
 * /business-solutions hero: a cold lead at center warms up as automated
 * nurture messages and emotes fly in from orbiting sender nodes. The lead's
 * color and glow ramp from cold cyan to warm amber, then slowly cool again,
 * looping. Static frame under prefers-reduced-motion; pauses offscreen.
 */
export default function LeadNurture({ className = "" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 1.2, 9);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const COLD = new THREE.Color("#6ad9f5");
    const WARM = new THREE.Color("#f2b950");
    const SIGNAL = new THREE.Color("#46e5b7");

    // ---- Lead icon: wireframe head + shoulders ----
    const lead = new THREE.Group();
    const leadMat = new THREE.MeshBasicMaterial({
      color: COLD.clone(),
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 10), leadMat);
    head.position.y = 0.95;
    const body = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2),
      leadMat,
    );
    body.position.y = -0.15;
    lead.add(head, body);
    scene.add(lead);

    // Warmth halo: expanding rings pulse when the lead is warm
    const ringMat = new THREE.MeshBasicMaterial({
      color: WARM.clone(),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.98, 1.02, 48), ringMat.clone());
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = -1.05;
      rings.push(ring);
      scene.add(ring);
    }

    // ---- Sender nodes orbiting the lead ----
    const SENDERS = 5;
    const senders: THREE.Mesh[] = [];
    const senderMat = new THREE.MeshBasicMaterial({
      color: SIGNAL,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    for (let i = 0; i < SENDERS; i++) {
      const s = new THREE.Mesh(new THREE.OctahedronGeometry(0.22), senderMat);
      senders.push(s);
      scene.add(s);
    }

    // ---- Emote/message sprites drawn onto canvas textures ----
    const makeSprite = (glyph: string, color: string) => {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d")!;
      g.font = "44px serif";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = color;
      g.fillText(glyph, 32, 36);
      const tex = new THREE.CanvasTexture(c);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0 });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.setScalar(0.55);
      scene.add(sprite);
      return sprite;
    };
    const glyphs = ["✉", "💬", "❤", "👋", "✉", "★"];
    type Flyer = { sprite: THREE.Sprite; t: number; from: THREE.Vector3; delay: number };
    const flyers: Flyer[] = glyphs.map((g, i) => {
      const a = ((i % SENDERS) / SENDERS) * Math.PI * 2;
      return {
        sprite: makeSprite(g, i % 3 === 2 ? "#f2b950" : "#46e5b7"),
        t: 0,
        from: new THREE.Vector3(Math.cos(a) * 3.4, 0, Math.sin(a) * 1.6),
        delay: i * 1.15,
      };
    });

    // Faint link lines from senders to lead
    const lineMat = new THREE.LineBasicMaterial({
      color: SIGNAL,
      transparent: true,
      opacity: 0.14,
    });
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    const lines = senders.map(() => {
      const l = new THREE.Line(lineGeo.clone(), lineMat);
      scene.add(l);
      return l;
    });

    const target = new THREE.Vector3(0, 0.4, 0);
    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const draw = (animate: boolean) => {
      const t = animate ? clock.getElapsedTime() : 2.5;

      // Warmth cycle: 0 (cold) -> 1 (fully nurtured), ~12s loop
      const warmth = 0.5 - 0.5 * Math.cos((t / 12) * Math.PI * 2);
      leadMat.color.copy(COLD).lerp(WARM, warmth);
      leadMat.opacity = 0.6 + warmth * 0.35;
      lead.rotation.y = t * 0.25;
      const breathe = 1 + Math.sin(t * 2.2) * 0.02 * (0.3 + warmth);
      lead.scale.setScalar(breathe);

      // Halo rings ride the warmth
      rings.forEach((ring, i) => {
        const phase = ((t * 0.45 + i / 3) % 1 + 1) % 1;
        ring.scale.setScalar(0.6 + phase * 2.4);
        (ring.material as THREE.MeshBasicMaterial).opacity =
          warmth * 0.35 * (1 - phase);
      });

      // Senders orbit slowly
      senders.forEach((s, i) => {
        const a = (i / SENDERS) * Math.PI * 2 + t * 0.18;
        s.position.set(Math.cos(a) * 3.4, Math.sin(a * 1.3 + i) * 1.1, Math.sin(a) * 1.6);
        s.rotation.y = t * 0.8 + i;
        const pos = lines[i].geometry.attributes.position as THREE.BufferAttribute;
        pos.setXYZ(0, s.position.x, s.position.y, s.position.z);
        pos.setXYZ(1, target.x, target.y, target.z);
        pos.needsUpdate = true;
      });

      // Messages fly along arcs from a sender to the lead, fade at arrival
      flyers.forEach((f, i) => {
        const cycle = 6.9;
        const local = ((t - f.delay) % cycle + cycle) % cycle;
        const p = local / 2.4; // 2.4s flight, rest hidden
        if (p >= 1) {
          f.sprite.material.opacity = 0;
          f.from.copy(senders[i % SENDERS].position);
          return;
        }
        const ease = p * p * (3 - 2 * p);
        f.sprite.position.lerpVectors(f.from, target, ease);
        f.sprite.position.y += Math.sin(p * Math.PI) * 0.9; // arc
        f.sprite.material.opacity = Math.sin(p * Math.PI) * 0.95;
      });

      renderer.render(scene, camera);
    };

    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
      clock.start();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (reduced) draw(false);
    };
    resize();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(mount);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    if (reduced) draw(false);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.Line) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
        if (o instanceof THREE.Sprite) {
          o.material.map?.dispose();
          o.material.dispose();
        }
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
