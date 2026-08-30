import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

// ─── Floating geometry shapes ───
function FloatingShape({ position, geometry, color, rotSpeed }) {
  const mesh = useRef();
  useFrame((_, delta) => {
    mesh.current.rotation.x += delta * rotSpeed[0];
    mesh.current.rotation.y += delta * rotSpeed[1];
  });
  return (
    <mesh ref={mesh} position={position}>
      {geometry}
      <meshPhongMaterial
        color={color}
        wireframe
        transparent
        opacity={0.18}
      />
    </mesh>
  );
}

// ─── Glowing Core Sphere ───
function CoreSphere() {
  const mesh = useRef();
  useFrame((state) => {
    mesh.current.rotation.y = state.clock.elapsedTime * 0.08;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
  });
  return (
    <group ref={mesh}>
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshPhongMaterial
          color="#7c3aed"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.5, 20, 20]} />
        <meshPhongMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

// ─── Particle Field ───
function Particles() {
  const ref = useRef();
  const count = 2000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      [0.49, 0.23, 0.93],
      [0.02, 0.71, 0.84],
      [0.93, 0.39, 0.60],
      [0.96, 0.62, 0.04],
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.14} vertexColors transparent opacity={0.7} />
    </points>
  );
}

// ─── Hero 3D Scene ───
function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#a78bfa" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

      <Stars
        radius={80}
        depth={50}
        count={3000}
        factor={2.5}
        fade
        speed={0.5}
      />

      <Particles />
      <CoreSphere />

      {/* Floating wireframe shapes */}
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
        <FloatingShape
          position={[12, 4, -8]}
          geometry={<icosahedronGeometry args={[2.5, 0]} />}
          color="#7c3aed"
          rotSpeed={[0.3, 0.5]}
        />
      </Float>
      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={1}>
        <FloatingShape
          position={[-14, -3, -12]}
          geometry={<octahedronGeometry args={[2, 0]} />}
          color="#06b6d4"
          rotSpeed={[0.4, 0.3]}
        />
      </Float>
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.6}>
        <FloatingShape
          position={[8, -8, -5]}
          geometry={<tetrahedronGeometry args={[2, 0]} />}
          color="#ec4899"
          rotSpeed={[0.5, 0.4]}
        />
      </Float>
      <Float speed={0.9} rotationIntensity={0.3} floatIntensity={1.2}>
        <FloatingShape
          position={[-8, 8, -15]}
          geometry={<icosahedronGeometry args={[1.8, 0]} />}
          color="#f59e0b"
          rotSpeed={[0.2, 0.6]}
        />
      </Float>
      <Float speed={1.1} rotationIntensity={0.5} floatIntensity={0.9}>
        <FloatingShape
          position={[16, -2, -20]}
          geometry={<dodecahedronGeometry args={[2, 0]} />}
          color="#a78bfa"
          rotSpeed={[0.35, 0.45]}
        />
      </Float>
    </>
  );
}

const HeroCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 22], fov: 60, near: 0.1, far: 200 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <HeroScene />
    </Canvas>
  );
};

export default HeroCanvas;
