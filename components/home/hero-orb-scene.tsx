"use client";

import { Float, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, type Group, type Mesh } from "three";

type OrbitProps = {
  radius: number;
  rotation: [number, number, number];
  speed: number;
  color: string;
  opacity: number;
};

function OrbitRing({ radius, rotation, speed, color, opacity }: OrbitProps) {
  const ref = useRef<Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * speed;
    }
  });

  return (
    <group ref={ref} rotation={rotation}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.026, 20, 220]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.12}
          transparent
          opacity={opacity}
          roughness={0.24}
          metalness={0.65}
        />
      </mesh>
    </group>
  );
}

function OrbitingNode({
  radius,
  speed,
  phase,
  size,
  color,
  tilt,
}: {
  radius: number;
  speed: number;
  phase: number;
  size: number;
  color: string;
  tilt: [number, number, number];
}) {
  const pivotRef = useRef<Group>(null);
  const glowRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (pivotRef.current) {
      pivotRef.current.rotation.z += delta * speed;
    }

    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.1 + phase) * 0.08;
    glowRef.current?.scale.setScalar(pulse);
  });

  return (
    <group rotation={tilt}>
      <group ref={pivotRef} rotation={[0, 0, phase]}>
        <group position={[radius, 0, 0]}>
          <mesh ref={glowRef} scale={1.9}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.16}
              depthWrite={false}
              blending={AdditiveBlending}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[size, 28, 28]} />
            <meshPhysicalMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.22}
              roughness={0.22}
              metalness={0.3}
              clearcoat={0.7}
              clearcoatRoughness={0.16}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function OrbitScene() {
  const rootRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const accentRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (rootRef.current) {
      rootRef.current.rotation.y += delta * 0.045;
      rootRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.52) * 0.035;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.1;
    }

    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.03;
      glowRef.current.scale.setScalar(pulse);
    }

    if (accentRef.current) {
      accentRef.current.rotation.z -= delta * 0.08;
    }
  });

  return (
    <group ref={rootRef} position={[0, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.28}>
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.82, 36, 36]} />
          <meshBasicMaterial
            color="#7dd3fc"
            transparent
            opacity={0.08}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0.04} floatIntensity={0.2}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.52, 48, 48]} />
          <meshPhysicalMaterial
            color="#f8fbff"
            emissive="#bfdbfe"
            emissiveIntensity={0.14}
            roughness={0.08}
            metalness={0.08}
            transmission={0.38}
            thickness={0.42}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
      </Float>

      <OrbitRing
        radius={1.42}
        rotation={[0.92, 0.08, 0.04]}
        speed={0.12}
        color="#7dd3fc"
        opacity={0.78}
      />
      <OrbitRing
        radius={1.92}
        rotation={[0.24, -0.32, 0.12]}
        speed={-0.07}
        color="#c4b5fd"
        opacity={0.42}
      />

      <OrbitingNode
        radius={1.42}
        speed={0.5}
        phase={0.9}
        size={0.066}
        color="#38bdf8"
        tilt={[0.92, 0.08, 0.04]}
      />
      <OrbitingNode
        radius={1.92}
        speed={0.18}
        phase={2.4}
        size={0.05}
        color="#8b5cf6"
        tilt={[0.24, -0.32, 0.12]}
      />

      <mesh ref={accentRef} rotation={[0.16, 0.04, -0.26]} position={[0.62, 0.52, -0.16]}>
        <torusGeometry args={[0.34, 0.016, 20, 180]} />
        <meshStandardMaterial
          color="#86efac"
          transparent
          opacity={0.45}
          roughness={0.24}
          metalness={0.62}
        />
      </mesh>

      <Sparkles
        count={12}
        scale={[5.4, 4.6, 4]}
        size={2.8}
        speed={0.14}
        opacity={0.18}
        color="#93c5fd"
      />
    </group>
  );
}

export function HeroOrbScene() {
  return (
    <div className="relative h-[26rem] w-full overflow-hidden rounded-[2.25rem] border border-white/80 bg-[radial-gradient(circle_at_50%_30%,rgba(191,219,254,0.45),transparent_25%),radial-gradient(circle_at_50%_95%,rgba(224,242,254,0.72),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(243,249,255,0.95))] shadow-[0_35px_100px_rgba(148,163,184,0.14)] backdrop-blur-sm sm:h-[32rem] lg:h-[40rem]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
      <div className="absolute left-6 top-6 rounded-full border border-slate-200/80 bg-white/82 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-slate-500 backdrop-blur">
        Orbit object
      </div>

      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 7.1], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        className="h-full w-full"
      >
        <color attach="background" args={["#f7fbff"]} />
        <fog attach="fog" args={["#f4faff", 7, 12]} />
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 5, 3]} intensity={1.75} color="#ffffff" />
        <pointLight position={[-4, -1, 4]} intensity={8} distance={10} color="#7dd3fc" />
        <pointLight position={[4, 1, 3]} intensity={6} distance={9} color="#c4b5fd" />
        <pointLight position={[0, 3, 2]} intensity={4.5} distance={8} color="#ffffff" />
        <OrbitScene />
      </Canvas>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/78 to-transparent" />
    </div>
  );
}
