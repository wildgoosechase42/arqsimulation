import React, { useMemo } from 'react';
import * as THREE from 'three';

const BufferAttributeElement = 'bufferAttribute' as any;

export function Starfield() {
  const stars = useMemo(() => {
    const count = 7500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const starTypes = [
      { color: new THREE.Color('#9bb2ff'), chance: 0.2 },
      { color: new THREE.Color('#fff4ea'), chance: 0.5 },
      { color: new THREE.Color('#ffd2a1'), chance: 0.2 },
      { color: new THREE.Color('#ffffff'), chance: 0.1 },
    ];
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 55 + Math.random() * 35;
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const typeRoll = Math.random();
      let cumulative = 0;
      let selectedColor = starTypes[0].color;
      for (const t of starTypes) {
        cumulative += t.chance;
        if (typeRoll < cumulative) {
          selectedColor = t.color;
          break;
        }
      }
      colors[i * 3] = selectedColor.r;
      colors[i * 3 + 1] = selectedColor.g;
      colors[i * 3 + 2] = selectedColor.b;
      sizes[i] = 0.05 + Math.random() * 0.15;
    }
    return { positions, colors, sizes };
  }, []);

  const nebulaClouds = useMemo(() => {
    const cloudCount = 12;
    const clouds = [];
    for (let i = 0; i < cloudCount; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 40 + Math.random() * 20;
      
      clouds.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        scale: 15 + Math.random() * 25,
        color: i % 2 === 0 ? '#0a0f24' : '#120924'
      });
    }
    return clouds;
  }, []);

  return (
    <group>
      <points>
        <bufferGeometry>
          <BufferAttributeElement attach="attributes-position" count={stars.positions.length / 3} array={stars.positions} itemSize={3} />
          <BufferAttributeElement attach="attributes-color" count={stars.colors.length / 3} array={stars.colors} itemSize={3} />
          <BufferAttributeElement attach="attributes-size" count={stars.sizes.length} array={stars.sizes} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.12} 
          vertexColors 
          transparent 
          opacity={0.8} 
          sizeAttenuation={true} 
          blending={THREE.AdditiveBlending}
        />
      </points>
      {nebulaClouds.map((cloud, i) => (
        <mesh key={i} position={cloud.position} rotation={cloud.rotation} scale={cloud.scale}>
          <planeGeometry />
          <meshBasicMaterial 
            color={cloud.color} 
            transparent 
            opacity={0.06} 
            blending={THREE.AdditiveBlending} 
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
