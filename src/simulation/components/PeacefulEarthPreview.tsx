import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export function PeacefulEarthPreview() {
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
    renderer.toneMappingExposure = 1.25;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFailed(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const ambientLight = new THREE.AmbientLight(0x064e3b, 2.0);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.4);
    sunLight.position.set(5, 3, 4);
    scene.add(sunLight);

    const atmosphereLight = new THREE.DirectionalLight(0x34d399, 1.8);
    atmosphereLight.position.set(-4, -2, -3);
    scene.add(atmosphereLight);

    const earthCanvas = document.createElement('canvas');
    earthCanvas.width = 512;
    earthCanvas.height = 256;
    const ctx = earthCanvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#034078';
      ctx.fillRect(0, 0, 512, 256);

      ctx.fillStyle = '#00509d';
      ctx.fillRect(0, 40, 512, 175);

      const drawLand = (x: number, y: number, w: number, h: number, r: number) => {
        ctx.beginPath();
        ctx.ellipse(x, y, w, h, r, 0, Math.PI * 2);
        ctx.fill();
      };

      ctx.fillStyle = '#10b981';
      drawLand(130, 90, 55, 40, -0.2);
      drawLand(115, 110, 40, 30, 0.4);
      drawLand(155, 160, 32, 55, 0.3);
      drawLand(165, 185, 22, 35, 0.1);
      drawLand(265, 85, 37, 27, 0.1);
      drawLand(270, 140, 47, 50, 0.1);
      drawLand(260, 185, 30, 40, -0.1);
      drawLand(375, 95, 85, 45, 0.15);
      drawLand(395, 130, 65, 40, -0.1);
      drawLand(355, 120, 30, 25, 0);
      drawLand(415, 185, 35, 25, 0.2);
      drawLand(65, 100, 35, 30, 0.3);

      ctx.fillStyle = '#059669';
      drawLand(130, 95, 40, 27, -0.2);
      drawLand(157, 165, 25, 40, 0.3);
      drawLand(270, 142, 35, 37, 0.1);
      drawLand(380, 100, 60, 30, 0.15);

      ctx.fillStyle = '#f8fafc';
      drawLand(256, 9, 210, 16, 0);
      drawLand(256, 248, 210, 16, 0);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 40; i++) {
        const lx = 100 + Math.random() * 325;
        const ly = 60 + Math.random() * 140;
        ctx.fillRect(lx, ly, 2, 2);
      }
    }

    const earthTexture = new THREE.CanvasTexture(earthCanvas);
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const earthGeo = new THREE.SphereGeometry(1.25, 36, 36);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.6,
      metalness: 0.15
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 512;
    cloudCanvas.height = 256;
    const cCtx = cloudCanvas.getContext('2d');
    if (cCtx) {
      cCtx.clearRect(0, 0, 512, 256);
      cCtx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      for (let i = 0; i < 35; i++) {
        const cx = Math.random() * 512;
        const cy = 30 + Math.random() * 190;
        const cw = 20 + Math.random() * 45;
        const ch = 7 + Math.random() * 18;
        cCtx.beginPath();
        cCtx.ellipse(cx, cy, cw, ch, Math.random() * 0.4 - 0.2, 0, Math.PI * 2);
        cCtx.fill();
      }
    }
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    const cloudGeo = new THREE.SphereGeometry(1.28, 28, 28);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(cloudMesh);

    const atmosphereGeo = new THREE.SphereGeometry(1.42, 28, 28);
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
          float intensity = pow(max(0.0, 0.65 - d), 2.0);
          gl_FragColor = vec4(0.2, 0.9, 0.6, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = 0.4;
    orbitGroup.rotation.z = -0.25;
    scene.add(orbitGroup);

    const ringGeo = new THREE.RingGeometry(1.7, 1.72, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    orbitGroup.add(ringMesh);

    const satGroup = new THREE.Group();
    const satBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.07, 0.07),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.2 })
    );
    const satPanel = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.02, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x059669, metalness: 0.6, roughness: 0.3 })
    );
    satGroup.add(satBody);
    satGroup.add(satPanel);
    satGroup.position.set(1.71, 0, 0);
    orbitGroup.add(satGroup);

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
        earthGroup.rotation.y += 0.0035;
        cloudMesh.rotation.y += 0.005;
      }
      orbitGroup.rotation.y += 0.012;
      satGroup.rotation.y += 0.02;
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
      cloudGeo.dispose();
      cloudMat.dispose();
      cloudTexture.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      satBody.geometry.dispose();
      satPanel.geometry.dispose();
      renderer.dispose();
      if (dom.parentElement) {
        dom.parentElement.removeChild(dom);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/90 p-4 text-center select-none">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 via-sky-600 to-blue-900 border-2 border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.5)] flex items-center justify-center mb-2 animate-pulse">
          <span className="material-symbols-outlined text-white text-2xl">public</span>
        </div>
        <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
          STATUS // PLANET SECURED
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full" />

      <div className="absolute top-2 left-3 flex items-center gap-1.5 pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
        <span className="font-mono text-[9px] md:text-[10px] font-bold text-emerald-400 tracking-wider">
          STATUS // PLANET SECURED
        </span>
      </div>

      <div className="absolute top-2 right-3 flex items-center gap-1.5 pointer-events-none">
        <span className="font-mono text-[9px] md:text-[10px] font-bold text-emerald-200 tracking-wider bg-black/60 px-2 py-0.5 rounded border border-emerald-500/40 shadow">
          TELEMETRY: OPTIMAL
        </span>
      </div>

      <div className="absolute bottom-2 left-3 flex items-center gap-1.5 pointer-events-none">
        <span className="font-mono text-[8px] md:text-[9px] text-emerald-300/80 tracking-wider">
          STABLE GEOSTATIONARY LINK // 100% ARQ
        </span>
      </div>

      <div className="absolute bottom-2 right-3 flex items-center gap-1.5 pointer-events-none">
        <span className="font-mono text-[8px] md:text-[9px] text-yellow-400/90 tracking-wider">
          DRAG TO ROTATE
        </span>
      </div>
    </div>
  );
}
