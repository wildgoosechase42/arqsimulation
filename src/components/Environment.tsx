import React from 'react';

export function Environment() {
  return (
    <>
      <ambientLight intensity={0.05} color="#050814" />
      <directionalLight 
        position={[14, 2, 7]} 
        intensity={2.4} 
        color="#ffffff" 
        castShadow
      />
      <pointLight position={[-10, -5, -10]} intensity={0.3} color="#1e3a5f" />
    </>
  );
}
