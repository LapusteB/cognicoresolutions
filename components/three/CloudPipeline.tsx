"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { className?: string };

/**
 * /engineering hero: a moving wireframe of a CloudFormation stack. Requests
 * enter through an API Gateway slab, fan out to a grid of Lambda boxes, and
 * a Step Functions track marches a token through sequential states, each one
 * kicking off a Glue/Spark job (a wireframe gear that spins up while its
 * state is active). Static frame under prefers-reduced-motion; pauses
 * offscreen.
 */
export default function CloudPipeline({ className = "" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(6.5, 5.5, 11);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const SIGNAL = new THREE.Color("#46e5b7");
    const CYAN = new THREE.Color("#6ad9f5");
    const AMBER = new THREE.Color("#f2b950");
    const DIM = new THREE.Color("#5d7671");

    const wire = (color: THREE.Color, opacity = 0.7) =>
      new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });

    const makeLabel = (text: string, color: string) => {
      const c = document.createElement("canvas");
      c.width = 256;
      c.height = 40;
      const g = c.getContext("2d")!;
      g.font = "500 20px ui-monospace, monospace";
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillStyle = color;
      g.fillText(text, 128, 22);
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: new THREE.CanvasTexture(c),
          transparent: true,
          opacity: 0.85,
        }),
      );
      sprite.scale.set(2.6, 0.4, 1);
      return sprite;
    };

    const stack = new THREE.Group();
    scene.add(stack);

    // ---- API Gateway: tall slab at the front ----
    const gateway = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.6, 3.4, 1, 5, 6), wire(CYAN, 0.85));
    gateway.position.set(-5, 0.6, 0);
    stack.add(gateway);
    const gwLabel = makeLabel("api-gateway", "#6ad9f5");
    gwLabel.position.set(-5, 2.35, 0);
    stack.add(gwLabel);

    // ---- Lambda grid: 3x2 wireframe boxes behind the gateway ----
    const lambdas: THREE.Mesh[] = [];
    for (let i = 0; i < 6; i++) {
      const box = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.8, 2, 2, 2), wire(SIGNAL, 0.6));
      box.position.set(-1.6, (i % 2) * 1.5 - 0.15, (Math.floor(i / 2) - 1) * 1.7);
      lambdas.push(box);
      stack.add(box);
    }
    const lamLabel = makeLabel("lambda ×6", "#46e5b7");
    lamLabel.position.set(-1.6, 2.35, 0);
    stack.add(lamLabel);

    // Request particles: gateway -> a lambda
    const REQS = 7;
    const reqMat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.9 });
    const requests = Array.from({ length: REQS }, (_, i) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), reqMat);
      stack.add(m);
      return { mesh: m, lambda: i % 6, offset: i * 0.55 };
    });

    // ---- Step Functions track: chain of state nodes across the back ----
    const STATES = 5;
    const stateNodes: THREE.Mesh[] = [];
    for (let i = 0; i < STATES; i++) {
      const n = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5, 2, 2, 2), wire(DIM, 0.55));
      n.position.set(1.2 + i * 1.35, -1.4, 2.6);
      stateNodes.push(n);
      stack.add(n);
    }
    const sfPoints = stateNodes.map((n) => n.position.clone());
    const sfLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(sfPoints),
      new THREE.LineBasicMaterial({ color: DIM, transparent: true, opacity: 0.4 }),
    );
    stack.add(sfLine);
    const sfLabel = makeLabel("step-functions", "#93aca6");
    sfLabel.position.set(3.9, -2.2, 2.6);
    stack.add(sfLabel);

    // Token that marches through states
    const token = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.16),
      new THREE.MeshBasicMaterial({ color: AMBER, transparent: true, opacity: 0.95 }),
    );
    stack.add(token);

    // ---- Glue/Spark jobs: one gear per state, spins up when its state runs ----
    const gears: THREE.Mesh[] = [];
    for (let i = 0; i < STATES; i++) {
      const gear = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.13, 6, 9), wire(AMBER, 0.25));
      gear.position.set(1.2 + i * 1.35, 0.6, 2.6);
      gear.rotation.x = Math.PI / 2.4;
      gears.push(gear);
      stack.add(gear);
    }
    const glueLabel = makeLabel("glue / spark jobs", "#f2b950");
    glueLabel.position.set(3.9, 1.7, 2.6);
    stack.add(glueLabel);

    // Kickoff lines from each state up to its gear
    stateNodes.forEach((n, i) => {
      const geo = new THREE.BufferGeometry().setFromPoints([n.position, gears[i].position]);
      stack.add(new THREE.Line(geo, new THREE.LineBasicMaterial({ color: AMBER, transparent: true, opacity: 0.12 })));
    });

    // Feed line: lambdas -> step functions entry
    const feed = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1.6, -0.15, 0),
        new THREE.Vector3(1.2, -1.4, 2.6),
      ]),
      new THREE.LineBasicMaterial({ color: SIGNAL, transparent: true, opacity: 0.2 }),
    );
    stack.add(feed);

    const clock = new THREE.Clock();
    let raf = 0;
    let running = false;

    const draw = (animate: boolean) => {
      const t = animate ? clock.getElapsedTime() : 3.1;

      // Requests: 2.2s flight gateway -> assigned lambda, staggered
      requests.forEach((r) => {
        const cycle = 3.85;
        const local = ((t - r.offset) % cycle + cycle) % cycle;
        const p = local / 2.2;
        if (p >= 1) {
          (r.mesh.material as THREE.MeshBasicMaterial).opacity = 0;
          return;
        }
        const from = new THREE.Vector3(-4.8, 0.6, 0);
        const to = lambdas[r.lambda].position;
        const ease = p * p * (3 - 2 * p);
        r.mesh.position.lerpVectors(from, to, ease);
        reqMat.opacity = 0.9;
        // Lambda flashes on arrival
        const mat = lambdas[r.lambda].material as THREE.MeshBasicMaterial;
        if (p > 0.92) mat.opacity = 1;
      });
      lambdas.forEach((l, i) => {
        const mat = l.material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0.55, mat.opacity - 0.02);
        l.rotation.y = t * 0.3 + i;
      });

      // Step Functions: token spends 2s per state, glides between them
      const stepT = (t / 2) % STATES;
      const idx = Math.floor(stepT);
      const frac = stepT - idx;
      const cur = sfPoints[idx];
      const next = sfPoints[(idx + 1) % STATES];
      const glide = frac < 0.75 ? 0 : (frac - 0.75) / 0.25;
      if (idx === STATES - 1 && glide > 0) {
        // wrap: fade out instead of gliding backwards
        token.position.copy(cur);
        (token.material as THREE.MeshBasicMaterial).opacity = 1 - glide;
      } else {
        token.position.lerpVectors(cur, next, glide * glide * (3 - 2 * glide));
        (token.material as THREE.MeshBasicMaterial).opacity = 0.95;
      }
      token.position.y = -1.1;
      token.rotation.y = t * 2;

      // Active state glows; its gear spins up, others wind down
      stateNodes.forEach((n, i) => {
        const active = i === idx;
        (n.material as THREE.MeshBasicMaterial).color.copy(active ? AMBER : DIM);
        (n.material as THREE.MeshBasicMaterial).opacity = active ? 0.95 : 0.5;
        n.rotation.y = active ? t * 1.2 : 0;
        const gm = gears[i].material as THREE.MeshBasicMaterial;
        if (active) {
          gears[i].rotation.z += 0.09;
          gm.opacity = Math.min(0.95, gm.opacity + 0.04);
        } else {
          gears[i].rotation.z += Math.max(0.004, gm.opacity * 0.05);
          gm.opacity = Math.max(0.18, gm.opacity - 0.015);
        }
      });

      stack.rotation.y = Math.sin(t * 0.08) * 0.22 - 0.1;
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
