import React, { useState } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { MotionValue, useTransform } from 'motion/react';
import { Earth } from './Earth';
import { Starfield } from './Starfield';
import { Environment } from './Environment';

interface SceneProps {
  progress: MotionValue<number>;
}

export function Scene({ progress }: SceneProps) {
  const [currentProgress, setCurrentProgress] = useState(0);
  useFrame(() => {
    setCurrentProgress(progress.get());
  });
  const x = useTransform(progress, [0, 1], [0, 8.5]).get();
  const z = useTransform(progress, [0, 1], [0, -2]).get();
  const s = useTransform(progress, [0, 1], [1, 0.85]).get();
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
      <Starfield />
      <Environment />
      <group position={[x, 0, z]} scale={s}>
        <Earth radius={2.5} progress={currentProgress} />
      </group>
    </>
  );
}
