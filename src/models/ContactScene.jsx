import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// ─── Central Iridescent Crystal Core ───
function CrystalCore() {
  const meshRef = useRef();
  const innerRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.35;
      meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.25;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
      innerRef.current.rotation.z = t * 0.3;
      const s = 1 + Math.sin(t * 2) * 0.08;
      innerRef.current.scale.set(s, s, s);
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.2;
      wireRef.current.rotation.z = -t * 0.15;
    }
  });

  return (
    <group>
      {/* Intense Glowing Core Point Light */}
      <pointLight color="#06b6d4" intensity={4} distance={12} />
      <pointLight color="#ec4899" intensity={3} distance={10} position={[0, -1, 1]} />

      {/* Inner Pulsing Star */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#67e8f9"
          emissiveIntensity={1.8}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Holographic Glass Crystal Sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.2, 3]} />
        <meshPhysicalMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={0.4}
          roughness={0.08}
          metalness={0.1}
          transmission={0.88}
          thickness={1.8}
          ior={1.55}
          reflectivity={0.9}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Outer Glowing Wireframe Shield */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

// ─── Gyroscopic Neon Rings with Energy Pulses ───
function GyroRings() {
  const r1 = useRef();
  const r2 = useRef();
  const r3 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (r1.current) r1.current.rotation.z = t * 0.45;
    if (r2.current) r2.current.rotation.x = t * 0.35;
    if (r3.current) r3.current.rotation.y = t * 0.5;
  });

  return (
    <group>
      {/* Ring 1 - Cyan */}
      <mesh ref={r1}>
        <torusGeometry args={[3.4, 0.035, 16, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>

      {/* Ring 2 - Violet */}
      <mesh ref={r2} rotation={[1.1, 0, 0]}>
        <torusGeometry args={[4.2, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#8b5cf6"
          emissiveIntensity={1.0}
          roughness={0.2}
        />
      </mesh>

      {/* Ring 3 - Pink / Amber */}
      <mesh ref={r3} rotation={[0, 1.2, 0.7]}>
        <torusGeometry args={[4.9, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#f43f5e"
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// ─── Orbiting Satellite Nodes ───
function OrbitingSatellite({ angleOffset, radius, speed, icon, label, color }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + angleOffset;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = Math.sin(t * 1.5) * 0.8;
    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Mini Glowing Orb */}
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>

      {/* Holographic Badge */}
      <Html distanceFactor={16} center style={{ pointerEvents: "none" }}>
        <div
          style={{
            background: "rgba(4,6,16,0.85)",
            border: `1px solid ${color}`,
            boxShadow: `0 0 16px ${color}88`,
            borderRadius: "100px",
            padding: "0.25rem 0.65rem",
            color: "#ffffff",
            fontSize: "0.75rem",
            fontWeight: 600,
            whiteSpace: "nowrap",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          <span>{icon}</span>
          <span>{label}</span>
        </div>
      </Html>
    </group>
  );
}

// ─── Main Contact 3D Cyber Planet Scene ───
const ContactScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 48, near: 0.1, far: 100 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1.2} color="#06b6d4" />
      <pointLight position={[10, -10, 10]} intensity={1.2} color="#ec4899" />

      {/* Ambient Neon Sparkles */}
      <Sparkles count={80} scale={10} size={3} speed={0.6} color="#67e8f9" />
      <Sparkles count={50} scale={12} size={2.5} speed={0.4} color="#f472b6" />

      {/* Floating Center Assembly */}
      <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.8}>
        <CrystalCore />
        <GyroRings />

        {/* Orbiting Contact Satellites */}
        <OrbitingSatellite
          angleOffset={0}
          radius={3.8}
          speed={0.45}
          icon="✉️"
          label="Email"
          color="#06b6d4"
        />
        <OrbitingSatellite
          angleOffset={(Math.PI * 2) / 3}
          radius={4.4}
          speed={0.38}
          icon="💼"
          label="LinkedIn"
          color="#a78bfa"
        />
        <OrbitingSatellite
          angleOffset={(Math.PI * 4) / 3}
          radius={4.8}
          speed={0.32}
          icon="🐙"
          label="GitHub"
          color="#ec4899"
        />
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate={false}
      />
    </Canvas>
  );
};

export default ContactScene;
