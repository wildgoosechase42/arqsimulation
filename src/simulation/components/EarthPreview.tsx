import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function EarthPreview() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x223355, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 3.2);
    sunLight.position.set(5, 3, 4);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    const earthCanvas = document.createElement('canvas');
    earthCanvas.width = 1024;
    earthCanvas.height = 512;
    const ctx = earthCanvas.getContext('2d');

    if (ctx) {
      ctx.fillStyle = '#0b2545';
      ctx.fillRect(0, 0, 1024, 512);

      ctx.fillStyle = '#134074';
      ctx.fillRect(0, 80, 1024, 350);

      ctx.fillStyle = '#22c55e';
      const drawLand = (x: number, y: number, w: number, h: number, r: number) => {
        ctx.beginPath();
        ctx.ellipse(x, y, w, h, r, 0, Math.PI * 2);
        ctx.fill();
      };

      drawLand(260, 180, 110, 80, -0.2);
      drawLand(230, 220, 80, 60, 0.4);
      drawLand(310, 320, 65, 110, 0.3);
      drawLand(330, 370, 45, 70, 0.1);
      drawLand(530, 170, 75, 55, 0.1);
      drawLand(540, 280, 95, 100, 0.1);
      drawLand(520, 370, 60, 80, -0.1);
      drawLand(750, 190, 170, 90, 0.15);
      drawLand(790, 260, 130, 80, -0.1);
      drawLand(710, 240, 60, 50, 0);
      drawLand(830, 370, 70, 50, 0.2);
      drawLand(130, 200, 70, 60, 0.3);

      ctx.fillStyle = '#15803d';
      drawLand(260, 190, 80, 55, -0.2);
      drawLand(315, 330, 50, 80, 0.3);
      drawLand(540, 285, 70, 75, 0.1);
      drawLand(760, 200, 120, 60, 0.15);

      ctx.fillStyle = '#f8fafc';
      drawLand(512, 20, 420, 35, 0);
      drawLand(512, 495, 420, 35, 0);

      ctx.fillStyle = 'rgba(255, 230, 150, 0.35)';
      for (let i = 0; i < 90; i++) {
        const lx = 200 + Math.random() * 650;
        const ly = 120 + Math.random() * 280;
        ctx.fillRect(lx, ly, 2, 2);
      }
    }

    const earthTexture = new THREE.CanvasTexture(earthCanvas);
    earthTexture.colorSpace = THREE.SRGBColorSpace;

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const earthGeo = new THREE.SphereGeometry(1.35, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.7,
      metalness: 0.1,
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    const cloudCanvas = document.createElement('canvas');
    cloudCanvas.width = 1024;
    cloudCanvas.height = 512;
    const cloudCtx = cloudCanvas.getContext('2d');
    if (cloudCtx) {
      cloudCtx.clearRect(0, 0, 1024, 512);
      cloudCtx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      for (let i = 0; i < 70; i++) {
        const cx = Math.random() * 1024;
        const cy = 60 + Math.random() * 380;
        const cw = 40 + Math.random() * 90;
        const ch = 15 + Math.random() * 35;
        cloudCtx.beginPath();
        cloudCtx.ellipse(cx, cy, cw, ch, Math.random() * 0.4 - 0.2, 0, Math.PI * 2);
        cloudCtx.fill();
      }
    }
    const cloudTexture = new THREE.CanvasTexture(cloudCanvas);
    const cloudGeo = new THREE.SphereGeometry(1.38, 48, 48);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
    earthGroup.add(cloudMesh);

    const atmosphereGeo = new THREE.SphereGeometry(1.5, 48, 48);
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
          float intensity = pow(max(0.0, 0.65 - d), 2.2);
          gl_FragColor = vec4(0.2, 0.65, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphereMesh);

    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = 0.55;
    orbitGroup.rotation.z = -0.3;
    scene.add(orbitGroup);

    const ringGeo = new THREE.RingGeometry(1.85, 1.87, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    orbitGroup.add(ringMesh);

    const satGroup = new THREE.Group();
    const satBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.08, 0.08),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.2 })
    );
    const satPanel = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.02, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.6, roughness: 0.3 })
    );
    satGroup.add(satBody);
    satGroup.add(satPanel);
    satGroup.position.set(1.86, 0, 0);
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
        cloudMesh.rotation.y += 0.0048;
      }
      orbitGroup.rotation.y += 0.015;
      satGroup.rotation.y += 0.02;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
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
      renderer.dispose();
      if (dom.parentElement) {
        dom.parentElement.removeChild(dom);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full" />

      <div className="absolute top-3 left-4 flex items-center gap-2 pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="font-mono text-[10px] md:text-xs font-bold text-emerald-400 tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          TARGET: TERRA // SECTOR-01
        </span>
      </div>

      <div className="absolute top-3 right-4 flex items-center gap-2 pointer-events-none">
        <span className="font-mono text-[10px] md:text-xs font-bold text-cyan-300 tracking-widest bg-black/60 px-2.5 py-1 rounded border border-cyan-500/30 shadow-lg">
          RTT: 2.56s • LINK ACTIVE
        </span>
      </div>

      <div className="absolute bottom-3 left-4 flex items-center gap-2 pointer-events-none">
        <span className="font-mono text-[9px] md:text-[10px] text-white/60 tracking-wider">
          ORBITAL POSITION: 420 KM // INCLINATION: 51.6°
        </span>
      </div>

      <div className="absolute bottom-3 right-4 flex items-center gap-2 pointer-events-none">
        <span className="font-mono text-[9px] md:text-[10px] text-yellow-400/90 tracking-wider">
          DRAG TO ROTATE
        </span>
      </div>
    </div>
  );
}
