import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const SKILL_COLORS = [
  "#06b6d4", "#a78bfa", "#f59e0b", "#ec4899",
  "#34d399", "#f97316", "#7c3aed", "#06b6d4",
];

function Ball({ position, color, scale = 1 }) {
  const ref = useRef();
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.2,
        roughness: 0.4,
        clearcoat: 0.5,
        clearcoatRoughness: 0.2,
        emissive: color,
        emissiveIntensity: 0.15,
      }),
    [color]
  );

  useFrame((state) => {
    if (ref.current) {
      // Gentle center attraction
      const pos = ref.current.translation();
      ref.current.applyImpulse(
        { x: -pos.x * 0.5 * scale, y: -pos.y * 0.5 * scale, z: -pos.z * 0.3 * scale },
        true
      );
    }
  });

  return (
    <RigidBody
      ref={ref}
      position={position}
      colliders={false}
      linearDamping={2}
      angularDamping={1}
    >
      <BallCollider args={[scale]} />
      <mesh castShadow scale={scale} material={material}>
        <sphereGeometry args={[1, 32, 32]} />
      </mesh>
    </RigidBody>
  );
}

function Pointer() {
  const ref = useRef();
  useFrame(({ pointer, viewport }) => {
    if (ref.current) {
      ref.current.setNextKinematicTranslation({
        x: (pointer.x * viewport.width) / 2,
        y: (pointer.y * viewport.height) / 2,
        z: 0,
      });
    }
  });
  return (
    <RigidBody position={[100, 100, 100]} type="kinematicPosition" colliders={false} ref={ref}>
      <BallCollider args={[3]} />
    </RigidBody>
  );
}

const PhysicsBalls = ({ count = 28 }) => {
  const balls = useMemo(() =>
    [...Array(count)].map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5,
      ],
      color: SKILL_COLORS[i % SKILL_COLORS.length],
      scale: [0.7, 0.8, 1, 0.9, 1.1][Math.floor(Math.random() * 5)],
    })), [count]
  );

  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 40, near: 0.1, far: 100 }}
      gl={{ alpha: true, antialias: true, depth: true }}
      shadows
    >
      <ambientLight intensity={0.8} />
      <spotLight position={[15, 15, 15]} angle={0.2} penumbra={1} intensity={2} castShadow color="#a78bfa" />
      <directionalLight position={[0, 5, -5]} intensity={1.5} />
      <pointLight position={[-10, -10, 0]} intensity={0.5} color="#06b6d4" />

      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        {balls.map((b, i) => (
          <Ball key={i} position={b.position} color={b.color} scale={b.scale} />
        ))}
      </Physics>

      <Environment preset="studio" backgroundIntensity={0} />
    </Canvas>
  );
};

export default PhysicsBalls;
