"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import gsap from "gsap";

// === Single 3D Service Node ===
interface ServiceNodeProps {
  position: [number, number, number];
  modelPath: string;
  name: string;
  onClick: (name: string) => void;
}

function ServiceNode({ position, modelPath, name, onClick }: ServiceNodeProps) {
  const ref = useRef<any>();
  const [hovered, setHovered] = useState(false);

  // Load the model
  const { scene } = useGLTF(modelPath);

  // Gentle rotation animation
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });

  // Hover effects using GSAP
  const handlePointerOver = () => {
    setHovered(true);
    gsap.to(ref.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 });
    gsap.to(ref.current.material?.emissive, { r: 0.3, g: 0.3, b: 0.8, duration: 0.3 });
  };

  const handlePointerOut = () => {
    setHovered(false);
    gsap.to(ref.current.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
    gsap.to(ref.current.material?.emissive, { r: 0, g: 0, b: 0, duration: 0.3 });
  };

  return (
    <group position={position}>
      <primitive
        ref={ref}
        object={scene}
        scale={1}
        onClick={() => onClick(name)}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      />
    </group>
  );
}

// === Main Services3D Section ===
export default function Services3D() {
  const handleClick = (name: string) => {
    alert(`You clicked on ${name}`);
  };

  return (
    <section className='relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center overflow-hidden'>
      <div className='z-10 text-center mb-8'>
        <h2 className='text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight'>Our Core Services</h2>
        <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
          Explore our interactive 3D service universe — crafted with cutting-edge web technology.
        </p>
      </div>

      <div className='w-full h-[70vh]'>
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Suspense fallback={null}>
            <ServiceNode
              position={[-2.5, 0, 0]}
              modelPath='/models/services/HORNET.glb'
              name='Web Development'
              onClick={handleClick}
            />
            <ServiceNode
              position={[0, 0, 0]}
              modelPath='/models/services/macbook.glb'
              name='Cloud Solutions'
              onClick={handleClick}
            />
            <ServiceNode
              position={[2.5, 0, 0]}
              modelPath='/models/services/ram.glb'
              name='Cybersecurity'
              onClick={handleClick}
            />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      <div className='absolute bottom-10 text-gray-400 text-sm'>Hover or click a service to explore.</div>
    </section>
  );
}

// Preload models to improve performance
useGLTF.preload("/models/services/HORNET.glb");
useGLTF.preload("/models/services/macbook.glb");
useGLTF.preload("/models/services/ram.glb");
