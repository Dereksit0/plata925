'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  autoRotate: boolean;
}

function IngotModel({ autoRotate }: { autoRotate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/images/3dmodels/ingot.glb');

  // Apply a silver material to every mesh so the model is always visible
  // regardless of the original GLB materials or missing environment maps.
  useEffect(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#C8C8C8',
          metalness: 0.6,
          roughness: 0.2,
        });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={6.5} />
      </Center>
    </group>
  );
}

useGLTF.preload('/images/3dmodels/ingot.glb');

export default function ProductViewerCanvas({ autoRotate }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      shadows
      className="h-full w-full"
      aria-label="Visor 3D de joya"
    >
      {/* Bright multi-directional lighting — no CDN environment needed */}
      <ambientLight intensity={2.5} />
      <directionalLight position={[5, 5, 5]} intensity={3} castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={2} />
      <directionalLight position={[0, -4, 3]} intensity={1.5} />
      <pointLight position={[0, 0, 3]} intensity={1} />

      <IngotModel autoRotate={autoRotate} />

      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={7}
        autoRotate={false}
      />
    </Canvas>
  );
}
