import { useEffect, useRef } from "react";
import { experiences } from "../data";
import CTA from "../components/CTA";

const Experience = () => {
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
      {/* ── Experience Header ── */}
      <div ref={addRef} className="observe">
        <p className="section-label">Career Journey</p>
        <h1 className="section-title">
          Internship & <span className="gradient-text">Experience</span>
        </h1>
        <p className="section-subtitle">
          Real-world exposure to cutting-edge blockchain research and enterprise engineering — dynamically loaded from experience.json.
        </p>
      </div>

      {/* ── Timeline ── */}
      <div className="timeline" style={{ marginTop: "3.5rem" }}>
        {experiences && experiences.map((exp, idx) => (
          <div
            key={exp.id || idx}
            ref={addRef}
            className="observe timeline-item"
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            <div className="timeline-dot"></div>
            <div className="t-period">
              {exp.startDate} {exp.endDate && `— ${exp.endDate}`}
            </div>
            <div className="t-title">{exp.title}</div>
            <div className="t-company">
              {exp.company}
              {exp.mode && <span className="t-badge">{exp.mode}</span>}
              {exp.location && <span style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginLeft: "0.5rem" }}>· {exp.location}</span>}
            </div>
            {exp.description && (
              <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "1rem", lineHeight: "1.7" }}>
                {exp.description}
              </p>
            )}
            {exp.responsibilities && (
              <ul className="t-bullets">
                {exp.responsibilities.map((bullet, bIdx) => (
                  <li key={bIdx}>{bullet}</li>
                ))}
              </ul>
            )}
            {exp.techStack && exp.techStack.length > 0 && (
              <div className="tech-tags" style={{ marginTop: "1.2rem" }}>
                {exp.techStack.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "5rem" }}>
        <CTA />
      </div>
    </section>
  );
};

export default Experience;
