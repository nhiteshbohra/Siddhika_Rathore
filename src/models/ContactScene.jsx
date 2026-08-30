import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";

// ─── Animated Contact Blob ───
function ContactBlob({ currentAnimation }) {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y = t * 0.3;
    mesh.current.rotation.x = Math.sin(t * 0.5) * 0.2;
  });

  const isTyping = currentAnimation === "walk";
  const isSubmitting = currentAnimation === "hit";

  const color = isSubmitting ? "#ec4899" : isTyping ? "#06b6d4" : "#7c3aed";
  const distort = isSubmitting ? 0.6 : isTyping ? 0.4 : 0.25;
  const speed = isSubmitting ? 4 : isTyping ? 3 : 1.5;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={mesh} args={[2.5, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={speed}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

// ─── Orbiting Rings ───
function OrbitRings() {
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ring1.current.rotation.z = t * 0.4;
    ring2.current.rotation.x = t * 0.3;
    ring3.current.rotation.y = t * 0.5;
  });

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[4, 0.04, 8, 80]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} />
      </mesh>
      <mesh ref={ring2} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[5.5, 0.03, 8, 80]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring3} rotation={[0, 0.8, 0.5]}>
        <torusGeometry args={[3.5, 0.035, 8, 80]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

const ContactScene = ({ currentAnimation = "idle" }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 50, near: 0.1, far: 100 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#a78bfa" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#06b6d4" />
      <spotLight position={[0, 10, 0]} intensity={1} color="white" />

      <ContactBlob currentAnimation={currentAnimation} />
      <OrbitRings />
    </Canvas>
  );
};

export default ContactScene;
