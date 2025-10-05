// src/components/Services3D.tsx
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";

interface ServiceNodeProps {
  position: [number, number, number];
  color: string;
  name: string;
  onClick: (name: string) => void;
}

function ServiceNode({ position, color, name, onClick }: ServiceNodeProps) {
  const ref = useRef<any>();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });

  // Hover animation
  const handlePointerOver = () => {
    setHovered(true);
    gsap.to(ref.current.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 0.3 });
  };
  const handlePointerOut = () => {
    setHovered(false);
    gsap.to(ref.current.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
  };

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={() => onClick(name)}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      castShadow
      receiveShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={hovered ? "yellow" : color} />
    </mesh>
  );
}

export default function Services3D() {
  const handleClick = (name: string) => {
    alert(`Clicked on ${name}`);
  };

  return (
    <section className='relative h-screen w-full bg-gray-900 flex flex-col items-center justify-center'>
      <h2 className='text-3xl md:text-5xl font-bold text-white mb-10'>Our Core Services</h2>
      <Canvas className='w-full h-2/3' camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <ServiceNode position={[-2, 0, 0]} color='#4F46E5' name='Web Development' onClick={handleClick} />
          <ServiceNode position={[0, 0, 0]} color='#16A34A' name='Cloud Solutions' onClick={handleClick} />
          <ServiceNode position={[2, 0, 0]} color='#F59E0B' name='Cybersecurity' onClick={handleClick} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </section>
  );
}
