import React from 'react';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';

export function PostProcessing() {
  const Composer = EffectComposer as any;
  return (
    <Composer disableNormalPass>
      <Bloom 
        luminanceThreshold={1.1} 
        mipmapBlur 
        intensity={0.5} 
        radius={0.3} 
      />
      <Noise opacity={0.02} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </Composer>
  );
}
