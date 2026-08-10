"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { className?: string };

/**
 * /automation hero: four named agents (outreach, brains, research, audit)
 * arranged in a diamond, passing data packets to each other through a
 * scripted lead-outreach task sequence. A caption sprite cycles through the
 * task each hop represents. Static frame under prefers-reduced-motion;
 * pauses offscreen.
 */
export default function AgentNetwork({ className = "" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 2.4, 10.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const SIGNAL = new THREE.Color("#46e5b7");
    const CYAN = new THREE.Color("#6ad9f5");
    const AMBER = new THREE.Color("#f2b950");

    const makeLabel = (text: string, color: string, scale = 1) => {
      const c = document.createElement("canvas");
      c.width = 256;
      c.height = 48;
      const g = c.getContext("2d")!;
      g.font = "500 22px ui-monospace, monospace";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = color;
      g.fillText(text, 128, 26);
      const tex = new THREE.CanvasTexture(c);
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.9 }),
      );
      sprite.scale.set(3.1 * scale, 0.58 * scale, 1);
      return sprite;
    };

    // ---- Agents: diamond layout ----
    type AgentDef = { name: string; pos: THREE.Vector3; color: THREE.Color; geo: THREE.BufferGeometry };
    const defs: AgentDef[] = [
      { name: "outreach-agent", pos: new THREE.Vector3(-3.6, 0, 0), color: SIGNAL, geo: new THREE.OctahedronGeometry(0.55) },
      { name: "brains-agent", pos: new THREE.Vector3(0, 1.9, 0), color: AMBER, geo: new THREE.IcosahedronGeometry(0.6) },
      { name: "research-agent", pos: new THREE.Vector3(3.6, 0, 0), color: CYAN, geo: new THREE.DodecahedronGeometry(0.55) },
      { name: "audit-agent", pos: new THREE.Vector3(0, -1.9, 0), color: new THREE.Color("#93aca6"), geo: new THREE.TetrahedronGeometry(0.6) },
    ];
    const agents = defs.map((d) => {
      const mat = new THREE.MeshBasicMaterial({
        color: d.color,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
      });
      const mesh = new THREE.Mesh(d.geo, mat);
      mesh.position.copy(d.pos);
      scene.add(mesh);
      const label = makeLabel(d.name, `#${d.color.getHexString()}`, 0.8);
      label.position.copy(d.pos).add(new THREE.Vector3(0, -0.95, 0));
      scene.add(label);
      return { ...d, mesh, mat };
    });

    // Faint mesh of links between every agent pair
    const linkMat = new THREE.LineBasicMaterial({ color: SIGNAL, transparent: true, opacity: 0.12 });
    for (let i = 0; i < agents.length; i++) {
      for (let j = i + 1; j < agents.length; j++) {
        const geo = new THREE.BufferGeometry().setFromPoints([agents[i].pos, agents[j].pos]);
        scene.add(new THREE.Line(geo, linkMat));
      }
    }

    // ---- Scripted task slideshow: each step is one packet hop ----
    // indices: 0 outreach, 1 brains, 2 research, 3 audit
    const script = [
      { from: 2, to: 1, task: "research: prospect list compiled" },
      { from: 1, to: 0, task: "brains: outreach draft approved" },
      { from: 0, to: 3, task: "outreach: messages sent → audit" },
      { from: 3, to: 1, task: "audit: delivery report filed" },
      { from: 1, to: 2, task: "brains: next segment requested" },
      { from: 2, to: 0, task: "research: contact data enriched" },
    ];
    const STEP = 3.2; // seconds per hop

    const packet = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 10, 8),
      new THREE.MeshBasicMaterial({ color: AMBER, transparent: true, opacity: 0.95 }),
    );
    scene.add(packet);
    // Short trail behind the packet
    const trail = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 8, 6),
      new THREE.MeshBasicMaterial({ color: AMBER, transparent: true, opacity: 0.35 }),
    );
    scene.add(trail);

    // Task caption, swapped per step
    let captionStep = -1;
    let caption: THREE.Sprite | null = null;
    const setCaption = (text: string) => {
      if (caption) {
        caption.parent?.remove(caption);
        caption.material.map?.dispose();
        caption.material.dispose();
      }
      caption = makeLabel(text, "#dcebe5", 1.15);
      caption.position.set(0, -3.1, 0);
      scene.add(caption);
    };

    const group = new THREE.Group();
    scene.children.slice().forEach((c) => group.add(c));
    scene.add(group);

    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const draw = (animate: boolean) => {
      const t = animate ? clock.getElapsedTime() : 1.2;

      agents.forEach((a, i) => {
        a.mesh.rotation.y = t * 0.5 + i;
        a.mesh.rotation.x = t * 0.23 + i;
      });

      const total = script.length * STEP;
      const local = ((t % total) + total) % total;
      const step = Math.floor(local / STEP);
      const p = (local % STEP) / STEP;
      const { from, to, task } = script[step];

      if (step !== captionStep) {
        captionStep = step;
        setCaption(task);
        group.add(caption!);
      }
      if (caption) caption.material.opacity = Math.min(1, Math.sin(p * Math.PI) * 1.6) * 0.85;

      // Packet travels the first 70% of the step, sender pulses on launch,
      // receiver pulses on arrival.
      const flight = Math.min(p / 0.7, 1);
      const ease = flight * flight * (3 - 2 * flight);
      const a = agents[from].pos;
      const b = agents[to].pos;
      packet.position.lerpVectors(a, b, ease);
      packet.position.z += Math.sin(flight * Math.PI) * 0.7;
      (packet.material as THREE.MeshBasicMaterial).opacity = flight < 1 ? 0.95 : 0;
      trail.position.lerpVectors(a, b, Math.max(ease - 0.07, 0));
      trail.position.z += Math.sin(Math.max(flight - 0.07, 0) * Math.PI) * 0.7;
      (trail.material as THREE.MeshBasicMaterial).opacity = flight < 1 ? 0.3 : 0;

      const senderPulse = 1 + Math.max(0, 1 - flight * 4) * 0.35;
      const receiverPulse = 1 + Math.max(0, (flight - 0.85) / 0.15) * 0.4;
      agents[from].mesh.scale.setScalar(senderPulse);
      agents[to].mesh.scale.setScalar(receiverPulse);
      agents.forEach((ag, i) => {
        if (i !== from && i !== to) ag.mesh.scale.setScalar(1);
        ag.mat.opacity = i === from || i === to ? 0.95 : 0.55;
      });

      group.rotation.y = Math.sin(t * 0.1) * 0.16;
      renderer.render(scene, camera);
    };

    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced) return;
      running = true;
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
