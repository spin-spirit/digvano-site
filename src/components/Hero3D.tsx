// src/components/Hero3D.tsx
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function SpinningTorus() {
  const ref = useRef<any>();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.005;
      ref.current.rotation.y += 0.007;
    }
  });
  return (
    <mesh ref={ref} scale={1.5}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color='#4F46E5' metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

export default function Hero3D() {
  return (
    <section className='relative h-screen w-full'>
      {/* 3D Canvas Background */}
      <Canvas className='absolute inset-0'>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <SpinningTorus />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.3} />
      </Canvas>

      {/* Text Overlay */}
      <div className='relative z-20 flex flex-col items-center justify-center h-full text-center px-6'>
        <h1 className='text-white text-4xl md:text-6xl font-extrabold'>
          We Build Digital Experiences That Drive Growth.
        </h1>
        <p className='text-gray-200 mt-4 max-w-xl'>
          Product-grade engineering, beautiful UX, and secure cloud infrastructure — delivered on time.
        </p>
        <div className='mt-6 flex gap-4'>
          <a href='/book' className='px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition'>
            Start Your Project
          </a>
          <a
            href='/work'
            className='px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition'>
            See Our Work
          </a>
        </div>
      </div>
    </section>
  );
}
