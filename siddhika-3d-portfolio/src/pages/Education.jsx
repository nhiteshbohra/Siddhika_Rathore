import { useEffect, useRef } from "react";
import { education, certifications } from "../data";
import CTA from "../components/CTA";

const Education = () => {
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
    <section className="section-pad max-container">
      {/* ── Education Header ── */}
      <div ref={addRef} className="observe">
        <p className="section-label">Academic Credentials</p>
        <h1 className="section-title">
          Education & <span className="gradient-text">Certifications</span>
        </h1>
        <p className="section-subtitle">
          Academic degrees, relevant CS coursework, and industry-recognized certifications — dynamically loaded from education.json and certifications.json.
        </p>
      </div>

      {/* ── Degrees Grid ── */}
      <div className="edu-grid" style={{ marginTop: "3rem" }}>
        {education && education.map((edu, idx) => (
          <div
            key={edu.id || idx}
            ref={addRef}
            className="observe edu-card"
            style={{ transitionDelay: `${idx * 0.1}s` }}
          >
            <div className="edu-degree">{edu.degree}</div>
            <div className="edu-school">{edu.institution}</div>
            {edu.period && <div className="edu-period">{edu.period}</div>}
            {edu.grade && <div className="edu-grade">{edu.grade}</div>}
            {edu.coursework && (
              <div className="coursework">
                <strong style={{ color: "var(--text-muted)" }}>Core Coursework:</strong><br />
                {edu.coursework}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Certifications Section ── */}
      {certifications && certifications.length > 0 && (
        <div style={{ marginTop: "4.5rem" }}>
          <div ref={addRef} className="observe">
            <p className="section-label">Verified Badges</p>
            <h2 className="section-title" style={{ fontSize: "1.8rem" }}>
              Certifications & <span className="gradient-text">Achievements</span>
            </h2>
          </div>

          <div className="certs-grid">
            {certifications.map((c, i) => (
              <div
                key={c.id || c.name}
                ref={addRef}
                className="observe cert-card"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="cert-icon">{c.icon || "📜"}</div>
                <div>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-issuer">
                    {c.issuer} {c.detail && `· ${c.detail}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: "5rem" }}>
        <CTA />
      </div>
    </section>
  );
};

export default Education;
