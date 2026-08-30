import { Suspense, useEffect, useRef } from "react";
import { skills, skillCategories } from "../data";
import SkillSphere from "../models/SkillSphere";
import CTA from "../components/CTA";

const Skills = () => {
  const observeRefs = useRef([]);
  const addRef = (el) => { if (el && !observeRefs.current.includes(el)) observeRefs.current.push(el); };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="page-pad max-container">
      {/* ── Skills Header ── */}
      <div ref={addRef} className="observe">
        <p className="section-label">Technical Expertise</p>
        <h1 className="section-title">
          Skills & <span className="gradient-text">Technologies</span>
        </h1>
        <p className="section-subtitle">
          Interactive 3D representation and categorized breakdown of my technical stack — dynamically loaded from skills.json.
        </p>
      </div>

      {/* ── 3D Interactive Skill Sphere ── */}
      <div ref={addRef} className="observe skills-canvas-wrap" style={{ transitionDelay: "0.2s" }}>
        <Suspense fallback={<div className="loader-wrap"><div className="loader"></div></div>}>
          <SkillSphere />
        </Suspense>
        <div className="canvas-hint">✦ Drag to rotate the 3D sphere · Zoom with scroll</div>
      </div>

      {/* ── Skill Categories Grid ── */}
      <div className="skill-cats" style={{ marginTop: "3rem" }}>
        {skillCategories && skillCategories.map((cat, ci) => {
          const catSkills = skills.filter((s) => s.category === cat.id);
          if (catSkills.length === 0) return null;
          return (
            <div
              key={cat.id || cat.title}
              ref={addRef}
              className="observe skill-cat"
              style={{
                borderColor: cat.border,
                background: cat.bg,
                transitionDelay: `${ci * 0.08}s`,
              }}
            >
              <div className="skill-cat-title" style={{ color: cat.color }}>{cat.title}</div>
              <div className="skill-chips">
                {catSkills.map((s) => (
                  <span
                    key={s.name}
                    className="skill-chip"
                    style={{
                      background: cat.chipColor,
                      color: cat.chipText,
                      border: `1px solid ${cat.chipBorder}`,
                    }}
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "5rem" }}>
        <CTA />
      </div>
    </section>
  );
};

export default Skills;
