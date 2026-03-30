"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, type Group, type Mesh } from "three";

function SatelliteCluster() {
  const rootRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);
  const satelliteARef = useRef<Group>(null);
  const satelliteBRef = useRef<Group>(null);
  const satelliteCRef = useRef<Group>(null);
  const haloRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (rootRef.current) {
      rootRef.current.rotation.y += delta * 0.08;
      rootRef.current.rotation.x = Math.sin(t * 0.28) * 0.04;
      rootRef.current.position.y = Math.sin(t * 0.46) * 0.04;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12;
    }

    if (satelliteARef.current) {
      satelliteARef.current.rotation.z += delta * 0.38;
    }

    if (satelliteBRef.current) {
      satelliteBRef.current.rotation.z -= delta * 0.28;
    }

    if (satelliteCRef.current) {
      satelliteCRef.current.rotation.z += delta * 0.18;
    }

    if (haloRef.current) {
      const pulse = 1 + Math.sin(t * 1.3) * 0.035;
      haloRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={rootRef}>
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.9, 40, 40]} />
        <meshBasicMaterial
          color="#7dd3fc"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>

      <Float speed={1.1} rotationIntensity={0.04} floatIntensity={0.18}>
        <mesh>
          <sphereGeometry args={[0.58, 48, 48]} />
          <meshPhysicalMaterial
            color="#fbfdff"
            emissive="#dbeafe"
            emissiveIntensity={0.16}
            roughness={0.08}
            metalness={0.08}
            transmission={0.34}
            thickness={0.4}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef} rotation={[0.92, 0.16, 0.08]}>
        <torusGeometry args={[1.55, 0.025, 20, 220]} />
        <meshStandardMaterial
          color="#93c5fd"
          emissive="#93c5fd"
          emissiveIntensity={0.08}
          transparent
          opacity={0.68}
          roughness={0.24}
          metalness={0.6}
        />
      </mesh>

      <group ref={satelliteARef} rotation={[0.2, 0.1, 0.8]}>
        <group position={[1.55, 0, 0]}>
          <mesh scale={1.8}>
            <sphereGeometry args={[0.11, 16, 16]} />
            <meshBasicMaterial
              color="#38bdf8"
              transparent
              opacity={0.14}
              depthWrite={false}
              blending={AdditiveBlending}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.07, 28, 28]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.18}
              roughness={0.18}
              metalness={0.35}
            />
          </mesh>
        </group>
      </group>

      <group ref={satelliteBRef} rotation={[-0.28, -0.3, 2.3]}>
        <group position={[2.05, 0, 0]}>
          <mesh rotation={[0.36, 0.2, 0.12]}>
            <boxGeometry args={[0.24, 0.24, 0.24]} />
            <meshPhysicalMaterial
              color="#f5f3ff"
              transparent
              opacity={0.72}
              roughness={0.14}
              metalness={0.08}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>
        </group>
      </group>

      <group ref={satelliteCRef} rotation={[0.9, 0.24, -0.7]}>
        <group position={[1.18, 0, 0]}>
          <mesh rotation={[0.2, 0.32, 0.18]}>
            <torusGeometry args={[0.24, 0.02, 16, 100]} />
            <meshStandardMaterial
              color="#86efac"
              transparent
              opacity={0.56}
              roughness={0.24}
              metalness={0.62}
            />
          </mesh>
        </group>
      </group>

      <Sparkles
        count={10}
        scale={[5.8, 4.6, 4]}
        size={2.6}
        speed={0.12}
        opacity={0.16}
        color="#bae6fd"
      />
    </group>
  );
}

export function HeroOrbScene() {
  return (
    <div className="relative h-[26rem] w-full overflow-hidden rounded-[2.25rem] border border-white/80 bg-[radial-gradient(circle_at_50%_28%,rgba(191,219,254,0.42),transparent_26%),radial-gradient(circle_at_50%_96%,rgba(224,242,254,0.68),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(243,249,255,0.95))] shadow-[0_35px_100px_rgba(148,163,184,0.14)] backdrop-blur-sm sm:h-[32rem] lg:h-[40rem]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <div className="absolute left-6 top-6 rounded-full border border-slate-200/80 bg-white/82 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-slate-500 backdrop-blur">
        Satellite object
      </div>

      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 7], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        className="h-full w-full"
      >
        <color attach="background" args={["#f8fbff"]} />
        <fog attach="fog" args={["#f4faff", 7, 12]} />
        <ambientLight intensity={1.18} />
        <directionalLight position={[4, 5, 3]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-4, -1, 4]} intensity={8} distance={10} color="#7dd3fc" />
        <pointLight position={[4, 1, 3]} intensity={5.5} distance={9} color="#c4b5fd" />
        <pointLight position={[0, 3, 2]} intensity={4.2} distance={8} color="#ffffff" />
        <SatelliteCluster />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/78 to-transparent" />
    </div>
  );
}
