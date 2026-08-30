import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "../data";

// ─── Skill Label Sprite ───
function SkillSprite({ position, name, color }) {
  const spriteMat = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 80;
    const ctx = canvas.getContext("2d");

    // Background pill
    const hex = color || "#7c3aed";
    const r = parseInt(hex.slice(1, 3), 16) || 124;
    const g = parseInt(hex.slice(3, 5), 16) || 58;
    const b = parseInt(hex.slice(5, 7), 16) || 237;
    ctx.fillStyle = `rgba(${r},${g},${b},0.22)`;
    ctx.beginPath();
    ctx.roundRect(4, 10, 292, 60, 30);
    ctx.fill();

    // Border
    ctx.strokeStyle = `rgba(${r},${g},${b},0.6)`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Text color matching category
    ctx.fillStyle = color === "#06b6d4" ? "#67e8f9"
      : color === "#f59e0b" ? "#fcd34d"
      : color === "#ec4899" ? "#f9a8d4"
      : color === "#34d399" ? "#6ee7b7"
      : color === "#f97316" ? "#fdba74"
      : "#c4b5fd";
    ctx.font = "bold 26px 'Space Grotesk', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, 150, 42);

    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  }, [name, color]);

  const spriteRef = useRef();
  return (
    <sprite ref={spriteRef} material={spriteMat} position={position} scale={[4, 1.1, 1]} />
  );
}

// ─── Skill Sphere Scene ───
function SphereScene() {
  const groupRef = useRef();

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.rotation.x += delta * 0.08;
  });

  // Fibonacci sphere distribution for dynamic skill list
  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const r = 8;
      const v = new THREE.Vector3();
      v.setFromSphericalCoords(r, phi, theta);
      return v;
    });
  }, []);

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#a78bfa" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />

      {/* Wire sphere */}
      <mesh>
        <sphereGeometry args={[6.5, 20, 20]} />
        <meshPhongMaterial color="#a78bfa" wireframe transparent opacity={0.06} />
      </mesh>
      <mesh>
        <sphereGeometry args={[6.5, 8, 8]} />
        <meshPhongMaterial color="#7c3aed" transparent opacity={0.03} />
      </mesh>

      {/* Dynamic Skill labels */}
      <group ref={groupRef}>
        {skills.map((skill, i) => (
          <SkillSprite
            key={skill.name}
            name={skill.name}
            color={skill.color}
            position={[positions[i].x, positions[i].y, positions[i].z]}
          />
        ))}
      </group>
    </>
  );
}

const SkillSphere = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 50, near: 0.1, far: 200 }}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <SphereScene />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate={false}
      />
    </Canvas>
  );
};

export default SkillSphere;
