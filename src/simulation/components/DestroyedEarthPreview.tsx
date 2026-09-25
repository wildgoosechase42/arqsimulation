import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export function DestroyedEarthPreview() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = Math.max(container.clientWidth || 0, 320);
    const height = Math.max(container.clientHeight || 0, 140);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
        failIfMajorPerformanceCaveat: false
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFailed(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const ambientLight = new THREE.AmbientLight(0x450a0a, 2.2);
    scene.add(ambientLight);

    const lavaLight = new THREE.PointLight(0xf97316, 4.5, 10);
    lavaLight.position.set(0, 0, 0);
    scene.add(lavaLight);

    const redSun = new THREE.DirectionalLight(0xff3322, 2.8);
    redSun.position.set(4, 2, 3);
    scene.add(redSun);

    const earthCanvas = document.createElement('canvas');
    earthCanvas.width = 512;
    earthCanvas.height = 256;
    const ctx = earthCanvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#0f0c0c';
      ctx.fillRect(0, 0, 512, 256);

      ctx.fillStyle = '#1c1917';
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 256;
        const r = 15 + Math.random() * 35;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const drawCrack = (x1: number, y1: number, x2: number, y2: number, color: string, w: number) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = w;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        let cx = x1;
        let cy = y1;
        const steps = 6;
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          const nx = x1 + (x2 - x1) * t + (Math.random() - 0.5) * 25;
          const ny = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 25;
          ctx.lineTo(nx, ny);
          cx = nx;
          cy = ny;
        }
        ctx.lineTo(x2, y2);
        ctx.stroke();
      };

      const cracks = [
        [100, 50, 250, 160],
        [240, 155, 400, 200],
        [125, 175, 300, 75],
        [325, 60, 450, 160],
        [75, 125, 200, 210],
        [350, 140, 425, 75]
      ];

      cracks.forEach(([x1, y1, x2, y2]) => {
        drawCrack(x1, y1, x2, y2, '#ef4444', 6);
        drawCrack(x1, y1, x2, y2, '#f97316', 3);
        drawCrack(x1, y1, x2, y2, '#fef08a', 1.5);
      });

      for (let i = 0; i < 50; i++) {
        const hx = Math.random() * 512;
        const hy = Math.random() * 256;
        ctx.fillStyle = '#f97316';
        ctx.fillRect(hx, hy, 2, 2);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(hx + 1, hy + 1, 1, 1);
      }
    }

    const earthTexture = new THREE.CanvasTexture(earthCanvas);
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const earthGeo = new THREE.SphereGeometry(1.2, 36, 36);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.9,
      metalness: 0.2,
      emissive: new THREE.Color(0x7f1d1d),
      emissiveIntensity: 0.6
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    const smokeCanvas = document.createElement('canvas');
    smokeCanvas.width = 512;
    smokeCanvas.height = 256;
    const sCtx = smokeCanvas.getContext('2d');
    if (sCtx) {
      sCtx.clearRect(0, 0, 512, 256);
      for (let i = 0; i < 35; i++) {
        const x = Math.random() * 512;
        const y = 40 + Math.random() * 175;
        const r = 12 + Math.random() * 25;
        const grad = sCtx.createRadialGradient(x, y, 0, x, y, r);
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.6)');
        grad.addColorStop(0.5, 'rgba(60, 20, 20, 0.4)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        sCtx.fillStyle = grad;
        sCtx.beginPath();
        sCtx.arc(x, y, r, 0, Math.PI * 2);
        sCtx.fill();
      }
    }
    const smokeTexture = new THREE.CanvasTexture(smokeCanvas);
    const smokeGeo = new THREE.SphereGeometry(1.24, 28, 28);
    const smokeMat = new THREE.MeshStandardMaterial({
      map: smokeTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const smokeMesh = new THREE.Mesh(smokeGeo, smokeMat);
    earthGroup.add(smokeMesh);

    const atmosphereGeo = new THREE.SphereGeometry(1.38, 28, 28);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float d = dot(vNormal, vec3(0.0, 0.0, 1.0));
          float intensity = pow(max(0.0, 0.6 - d), 2.0);
          gl_FragColor = vec4(1.0, 0.2, 0.05, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    const debrisGroup = new THREE.Group();
    scene.add(debrisGroup);

    const debrisMat = new THREE.MeshStandardMaterial({
      color: 0x44403c,
      roughness: 0.9,
      metalness: 0.1
    });

    const debrisCount = 10;
    const debrisList: THREE.Mesh[] = [];
    for (let i = 0; i < debrisCount; i++) {
      const size = 0.03 + Math.random() * 0.05;
      const dGeo = new THREE.DodecahedronGeometry(size, 0);
      const dMesh = new THREE.Mesh(dGeo, debrisMat);
      const angle = (i / debrisCount) * Math.PI * 2 + Math.random() * 0.3;
      const dist = 1.45 + Math.random() * 0.55;
      dMesh.position.set(Math.cos(angle) * dist, (Math.random() - 0.5) * 0.7, Math.sin(angle) * dist);
      dMesh.rotation.set(Math.random() * 5, Math.random() * 5, Math.random() * 5);
      debrisGroup.add(dMesh);
      debrisList.push(dMesh);
    }

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      earthGroup.rotation.y += deltaX * 0.007;
      earthGroup.rotation.x += deltaY * 0.007;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isDragging) {
        earthGroup.rotation.y += 0.004;
        smokeMesh.rotation.y += 0.006;
      }
      debrisGroup.rotation.y -= 0.008;
      debrisList.forEach((d) => {
        d.rotation.x += 0.015;
        d.rotation.y += 0.02;
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = Math.max(container.clientWidth || 0, 320);
      const nh = Math.max(container.clientHeight || 0, 140);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('webglcontextlost', handleContextLost);

      earthGeo.dispose();
      earthMat.dispose();
      earthTexture.dispose();
      smokeGeo.dispose();
      smokeMat.dispose();
      smokeTexture.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      debrisMat.dispose();
      debrisList.forEach(d => d.geometry.dispose());
      renderer.dispose();
      if (dom.parentElement) {
        dom.parentElement.removeChild(dom);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/90 p-4 text-center select-none">
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-600 via-amber-700 to-black border-2 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.5)] flex items-center justify-center mb-2 animate-pulse">
          <div className="w-12 h-1 bg-red-400 rotate-45 absolute" />
          <div className="w-10 h-1 bg-amber-400 -rotate-12 absolute" />
        </div>
        <span className="font-mono text-[10px] text-red-400 font-bold uppercase tracking-wider">
          CRITICAL // ATMOSPHERIC LOSS
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full" />

      <div className="absolute top-2 left-3 flex items-center gap-1.5 pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span className="font-mono text-[9px] md:text-[10px] font-bold text-red-400 tracking-wider">
          CRITICAL // ATMOSPHERIC LOSS
        </span>
      </div>

      <div className="absolute top-2 right-3 flex items-center gap-1.5 pointer-events-none">
        <span className="font-mono text-[9px] md:text-[10px] font-bold text-red-300 tracking-wider bg-black/60 px-2 py-0.5 rounded border border-red-500/40 shadow">
          PARITY FAILURE
        </span>
      </div>
    </div>
  );
}
