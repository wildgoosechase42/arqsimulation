import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface EarthProps {
  radius: number;
  progress: number;
}

const BufferAttributeElement = 'bufferAttribute' as any;

export function Earth({ radius, progress }: EarthProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const surfaceRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!);
  const cloudsRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>>(null!);
  const atmosphereRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>>(null!);
  const idleRotation = useRef(0);
  
  const textures = useTexture([
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r150/examples/textures/planets/earth_atmos_2048.jpg',
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r150/examples/textures/planets/earth_normal_2048.jpg',
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r150/examples/textures/planets/earth_specular_2048.jpg',
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r150/examples/textures/planets/earth_clouds_1024.png',
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r145/examples/textures/planets/earth_lights_2048.png',
  ]);
  const [colorMap, normalMap, specularMap, cloudsMap, nightMap] = textures;

  useEffect(() => {
    textures.forEach(t => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.needsUpdate = true;
    });
  }, [textures]);

  const sunDir = useMemo(() => new THREE.Vector3(14, 2, 7).normalize(), []);
  const baseOffset = -1.35;
  const axialTilt = 0.38;

  const routes = useMemo(() => {
    const latLongToVector3 = (lat: number, lon: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };
    const cablePoints = [
      { start: [35, 139], end: [34, -118] }, 
      { start: [-33, 151], end: [37, -122] }, 
      { start: [22, 114], end: [49, -123] }, 
      { start: [21, -157], end: [35, 139] }, 
      { start: [21, -157], end: [34, -118] },
      { start: [1.3, 103.8], end: [-33.8, 151.2] } 
    ];
    return cablePoints.map(p => {
      const v1 = latLongToVector3(p.start[0], p.start[1], radius * 1.004);
      const v2 = latLongToVector3(p.end[0], p.end[1], radius * 1.004);
      const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.04);
      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      return { curve, points: curve.getPoints(50) };
    });
  }, [radius]);

  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: colorMap },
        nightTexture: { value: nightMap },
        normalTexture: { value: normalMap },
        specularTexture: { value: specularMap },
        sunDirection: { value: sunDir },
        fade: { value: 1.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vUv = uv;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D dayTexture;
        uniform sampler2D nightTexture;
        uniform sampler2D normalTexture;
        uniform sampler2D specularTexture;
        uniform vec3 sunDirection;
        uniform float fade;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 normal = normalize(vNormal);
          vec3 viewDir = normalize(vViewPosition);
          vec3 rawDay = texture2D(dayTexture, vUv).rgb;
          vec3 nightColor = texture2D(nightTexture, vUv).rgb;
          float specMap = texture2D(specularTexture, vUv).r;
          vec3 landColor = rawDay * 0.8;
          float depthFactor = clamp(rawDay.b * 1.5 - length(rawDay.rg) * 0.5, 0.0, 1.0);
          vec3 deepOcean = vec3(0.007, 0.031, 0.078); 
          vec3 shallowOcean = vec3(0.0, 0.302, 0.38); 
          vec3 oceanColor = mix(shallowOcean, deepOcean, pow(1.0 - depthFactor, 2.0));
          vec3 dayColor = mix(landColor, oceanColor, specMap);
          float diffuse = max(dot(normal, sunDirection), 0.0);
          vec3 halfDir = normalize(sunDirection + viewDir);
          float specular = pow(max(dot(normal, halfDir), 0.0), 32.0) * specMap * 0.45;
          float terminator = smoothstep(-0.08, 0.15, dot(normal, sunDirection));
          vec3 finalDay = dayColor * (diffuse + 0.05) + specular;
          vec3 finalNight = nightColor * 1.8 * vec3(0.4, 0.6, 1.0);
          vec3 color = mix(finalNight, finalDay, terminator);
          gl_FragColor = vec4(color, fade);
        }
      `,
      transparent: true
    });
  }, [colorMap, nightMap, normalMap, specularMap, sunDir]);

  const Packet = ({ curve }: { curve: THREE.QuadraticBezierCurve3 }) => {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame(({ clock }) => {
      const t = (clock.getElapsedTime() * 0.2 + Math.random()) % 1;
      const pos = curve.getPoint(t);
      meshRef.current.position.copy(pos);
      meshRef.current.scale.setScalar(0.015 + Math.sin(clock.getElapsedTime() * 5) * 0.005);
    });
    return (
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.8} />
      </mesh>
    );
  };

  useFrame((_, delta) => {
    const driftSpeed = 0.05 + (progress * 0.4);
    idleRotation.current += delta * driftSpeed;
    
    const scrollSpin = progress * Math.PI * 3.5;
    const earthY = baseOffset + idleRotation.current + scrollSpin;
    
    groupRef.current.rotation.x = axialTilt;
    surfaceRef.current.rotation.y = earthY;
    
    const cloudY = baseOffset + (idleRotation.current * 1.15) + (scrollSpin * 1.1);
    cloudsRef.current.rotation.y = cloudY;
    const hazeOpacity = progress > 0.6 
      ? 0.18 * Math.max(0, 1 - (progress - 0.6) / 0.3) 
      : 0.18;
    
    atmosphereRef.current.material.uniforms.opacity.value = hazeOpacity;
    
    const earthFade = progress > 0.8 ? Math.max(0, 1.0 - (progress - 0.8) / 0.2) : 1.0;
    surfaceRef.current.material.uniforms.fade.value = earthFade;
    cloudsRef.current.material.opacity = 0.5 * earthFade;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={surfaceRef} material={earthMaterial}>
        <sphereGeometry args={[radius, 64, 64]} />
        {routes.map((route, i) => (
          <group key={i}>
            <line>
              <bufferGeometry>
                <BufferAttributeElement
                  attach="attributes-position"
                  count={route.points.length}
                  array={new Float32Array(route.points.flatMap(p => [p.x, p.y, p.z]))}
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial 
                color="#00f5ff" 
                transparent 
                opacity={0.22} 
                blending={THREE.AdditiveBlending}
              />
            </line>
            <Packet curve={route.curve} />
          </group>
        ))}
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[radius * 1.008, 64, 64]} />
        <meshStandardMaterial 
          map={cloudsMap} 
          transparent 
          opacity={0.5} 
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={atmosphereRef} material={atmosphericHazeMaterial}>
        <sphereGeometry args={[radius * 1.03, 64, 64]} />
      </mesh>
    </group>
  );
}

const atmosphericHazeMaterial = new THREE.ShaderMaterial({
  transparent: true,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  uniforms: {
    sunDirection: { value: new THREE.Vector3(14, 2, 7).normalize() },
    opacity: { value: 0.18 }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 sunDirection;
    uniform float opacity;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      float intensity = pow(0.7 - dot(normal, viewDir), 6.0);
      float sunMask = smoothstep(-0.1, 0.3, dot(normal, sunDirection));
      vec3 atmosphereColor = vec3(0.1, 0.3, 0.6);
      gl_FragColor = vec4(atmosphereColor, intensity * sunMask * opacity);
    }
  `
});
