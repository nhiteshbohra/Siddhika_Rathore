import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import * as THREE from "three";
import { skills, skillCategories } from "../data";

// ─── Mobile Detection Hook ───
function useIsMobile(breakpoint = 600) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

// ─── Central Holographic Quantum Core ───
function QuantumCore() {
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.4;
      innerRef.current.rotation.x = t * 0.2;
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.x = t * 0.25;
    if (ring3Ref.current) ring3Ref.current.rotation.y = t * 0.35;
  });

  return (
    <group>
      {/* Glowing Inner Icosahedron */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#a78bfa"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Inner Pulsing Core Light */}
      <pointLight color="#a78bfa" intensity={3} distance={15} />

      {/* Orbital Holographic Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3.2, 0.03, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[1.1, 0, 0]}>
        <torusGeometry args={[4.2, 0.025, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[0, 1.2, 0.6]}>
        <torusGeometry args={[2.6, 0.025, 16, 100]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

// ─── 3D Skill Node with HTML Label on Hover / Active ───
function SkillNode({ skill, position, isHovered, onHover, onUnhover }) {
  const meshRef = useRef();
  const haloRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const scale = isHovered ? 1.45 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.15);
    }
  });

  const color = skill.color || "#06b6d4";

  return (
    <group position={position}>
      {/* 3D Glassmorphic Skill Orb */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(skill);
        }}
        onPointerOut={() => onUnhover()}
        style={{ cursor: "pointer" }}
      >
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 0.9 : 0.35}
          metalness={0.2}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Outer Glowing Halo Ring */}
      <mesh ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.65, 0.78, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isHovered ? 0.9 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating 3D Label */}
      <Html
        position={[0, 0.95, 0]}
        center
        distanceFactor={skill._isMobile ? 14 : 18}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div
          style={{
            background: isHovered
              ? "rgba(4, 6, 16, 0.92)"
              : "rgba(10, 15, 30, 0.75)",
            border: `1px solid ${isHovered ? color : "rgba(255,255,255,0.12)"}`,
            boxShadow: isHovered ? `0 0 20px ${color}88` : "none",
            borderRadius: "100px",
            padding: isHovered ? "0.3rem 0.7rem" : "0.2rem 0.5rem",
            color: isHovered ? "#ffffff" : "#e2e8f0",
            fontSize: skill._isMobile
              ? (isHovered ? "0.68rem" : "0.58rem")
              : (isHovered ? "0.85rem" : "0.72rem"),
            fontWeight: isHovered ? 700 : 500,
            whiteSpace: "nowrap",
            backdropFilter: "blur(8px)",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            transform: isHovered ? "scale(1.15)" : "scale(1)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: color,
              display: "inline-block",
              boxShadow: `0 0 6px ${color}`,
            }}
          />
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

// ─── Neural Connection Lines ───
function ConstellationLines({ positions }) {
  const lineGeometry = useMemo(() => {
    const points = [];
    positions.forEach((pos) => {
      // Connect each node to the center core
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [positions]);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial color="#a78bfa" transparent opacity={0.12} />
    </lineSegments>
  );
}

// ─── Main 3D Skill Constellation Scene ───
function ConstellationScene({ selectedCategory, hoveredSkill, setHoveredSkill, isMobile }) {
  const groupRef = useRef();

  const filteredSkills = useMemo(() => {
    if (!selectedCategory || selectedCategory === "all") return skills;
    return skills.filter((s) => s.category === selectedCategory);
  }, [selectedCategory]);

  // Spherical Fibonacci distribution
  const positions = useMemo(() => {
    const count = filteredSkills.length;
    return filteredSkills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / Math.max(count, 1));
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = isMobile ? 5.0 : 7.2;
      const v = new THREE.Vector3();
      v.setFromSphericalCoords(radius, phi, theta);
      return v;
    });
  }, [filteredSkills, isMobile]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Smooth subtle auto-orbit
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#06b6d4" />
      <pointLight position={[10, -10, 10]} intensity={0.8} color="#a78bfa" />

      {/* Subtle Starfield Background */}
      <Stars radius={40} depth={30} count={1200} factor={2} fade speed={0.4} />

      {/* Central Quantum Holographic Core */}
      <QuantumCore />

      {/* Rotating Galaxy Group */}
      <group ref={groupRef}>
        <ConstellationLines positions={positions} />

        {filteredSkills.map((skill, idx) => (
          <SkillNode
            key={skill.name}
            skill={{ ...skill, _isMobile: isMobile }}
            position={[positions[idx].x, positions[idx].y, positions[idx].z]}
            isHovered={hoveredSkill?.name === skill.name}
            onHover={(s) => setHoveredSkill(s)}
            onUnhover={() => setHoveredSkill(null)}
          />
        ))}
      </group>
    </>
  );
}

// ─── Container Component with Filter Badges & HUD ───
const SkillSphere = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const isMobile = useIsMobile();

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Category Filter Pills on Top of Canvas */}
      <div
        style={{
          position: "absolute",
          top: isMobile ? "0.6rem" : "1.2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 15,
          display: "flex",
          gap: isMobile ? "0.35rem" : "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          width: isMobile ? "95%" : "90%",
          maxWidth: "700px",
          background: isMobile ? "rgba(4,6,16,0.85)" : "transparent",
          padding: isMobile ? "0.5rem 0.4rem" : "0",
          borderRadius: isMobile ? "12px" : "0",
          backdropFilter: isMobile ? "blur(12px)" : "none",
          border: isMobile ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <button
          onClick={() => setSelectedCategory("all")}
          style={{
            padding: isMobile ? "0.3rem 0.7rem" : "0.4rem 1rem",
            borderRadius: "100px",
            fontSize: isMobile ? "0.65rem" : "0.78rem",
            fontWeight: 600,
            border: `1px solid ${selectedCategory === "all" ? "#a78bfa" : "rgba(255,255,255,0.12)"}`,
            background: selectedCategory === "all" ? "rgba(124,58,237,0.3)" : "rgba(4,6,16,0.7)",
            color: selectedCategory === "all" ? "#ffffff" : "#94a3b8",
            cursor: "pointer",
            backdropFilter: "blur(12px)",
            transition: "all 0.25s ease",
          }}
        >
          ✦ All Skills ({skills.length})
        </button>

        {skillCategories &&
          skillCategories.map((cat) => {
            const count = skills.filter((s) => s.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: isMobile ? "0.3rem 0.7rem" : "0.4rem 1rem",
                  borderRadius: "100px",
                  fontSize: isMobile ? "0.65rem" : "0.78rem",
                  fontWeight: 600,
                  border: `1px solid ${isSelected ? cat.color : "rgba(255,255,255,0.12)"}`,
                  background: isSelected ? `${cat.color}33` : "rgba(4,6,16,0.7)",
                  color: isSelected ? "#ffffff" : "#94a3b8",
                  cursor: "pointer",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.25s ease",
                }}
              >
                {cat.title.split(" ")[1] || cat.title} ({count})
              </button>
            );
          })}
      </div>

      {/* 3D WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, isMobile ? 16 : 19], fov: isMobile ? 52 : 48, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <ConstellationScene
            selectedCategory={selectedCategory}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
            isMobile={isMobile}
          />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          maxDistance={28}
          minDistance={10}
          enablePan={false}
          rotateSpeed={0.6}
          dampingFactor={0.08}
          enableDamping={true}
        />
      </Canvas>

      {/* Hovered Skill HUD / Tooltip */}
      {hoveredSkill && (
        <div
          style={{
            position: "absolute",
            bottom: "1.2rem",
            right: "1.5rem",
            zIndex: 15,
            padding: "0.8rem 1.4rem",
            background: "rgba(4,6,16,0.85)",
            border: `1px solid ${hoveredSkill.color || "#06b6d4"}`,
            borderRadius: "14px",
            backdropFilter: "blur(16px)",
            boxShadow: `0 0 25px ${hoveredSkill.color || "#06b6d4"}44`,
            animation: "fadeIn 0.2s ease both",
          }}
        >
          <div style={{ fontSize: "0.7rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Skill Highlight
          </div>
          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: hoveredSkill.color || "#ffffff" }}>
            {hoveredSkill.name}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillSphere;
