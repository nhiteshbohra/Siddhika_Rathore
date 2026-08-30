import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data";
import CTA from "../components/CTA";

const About = () => {
  const observeRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addRef = (el) => { if (el && !observeRefs.current.includes(el)) observeRefs.current.push(el); };

  return (
    <section className="page-pad max-container">
      {/* ── About Header ── */}
      <div ref={addRef} className="observe">
        <p className="section-label">About Me</p>
        <h1 className="section-title">
          {profile.aboutTitlePrefix || "Turning ideas into"}{" "}
          <span className="gradient-text">{profile.aboutTitleGradient || "real-world impact"}</span>
        </h1>
      </div>

      {/* ── About Grid ── */}
      <div className="about-grid" style={{ marginTop: "3rem" }}>
        <div ref={addRef} className="observe">
          {profile.bio && profile.bio.map((paragraph, idx) => (
            <p key={idx} className="about-desc">
              {paragraph}
            </p>
          ))}

          <div className="about-highlights">
            {profile.location && (
              <div className="highlight-item">
                <div className="hi-icon">📍</div>
                {profile.location} {profile.relocation && `— ${profile.relocation}`}
              </div>
            )}
            {profile.email && (
              <div className="highlight-item">
                <div className="hi-icon">✉️</div>
                <a href={`mailto:${profile.email}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {profile.email}
                </a>
              </div>
            )}
            {profile.phone && (
              <div className="highlight-item">
                <div className="hi-icon">📞</div>
                <a href={`tel:${profile.phone}`} style={{ color: "inherit", textDecoration: "none" }}>
                  {profile.phone}
                </a>
              </div>
            )}
            {profile.degree && (
              <div className="highlight-item">
                <div className="hi-icon">🎓</div>
                {profile.degree}
              </div>
            )}
          </div>

          {/* Quick exploration navigation */}
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginTop: "2rem" }}>
            <Link to="/skills" className="btn-primary" style={{ fontSize: "0.82rem", padding: "0.6rem 1.4rem" }}>
              Explore 3D Skills →
            </Link>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download="Siddhika_Rathore_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ fontSize: "0.82rem", padding: "0.6rem 1.4rem", textDecoration: "none" }}
              >
                Download Resume 📄
              </a>
            )}
            <Link to="/experience" className="btn-outline" style={{ fontSize: "0.82rem", padding: "0.6rem 1.4rem" }}>
              View Experience →
            </Link>
            <Link to="/education" className="btn-outline" style={{ fontSize: "0.82rem", padding: "0.6rem 1.4rem" }}>
              Education & Certs →
            </Link>
          </div>
        </div>

        {/* Dynamic Quick Info Card */}
        {profile.quickInfo && (
          <div ref={addRef} className="observe" style={{ transitionDelay: "0.15s" }}>
            <div className="about-card">
              <div className="cgpa-row">
                <div className="cgpa-num">{profile.quickInfo.cgpa}</div>
                <div className="cgpa-sub">{profile.quickInfo.cgpaScale}</div>
              </div>
              <div className="info-rows">
                {profile.quickInfo.university && (
                  <div className="info-row"><span className="key">University</span><span className="val">{profile.quickInfo.university}</span></div>
                )}
                {profile.quickInfo.degree && (
                  <div className="info-row"><span className="key">Degree</span><span className="val">{profile.quickInfo.degree}</span></div>
                )}
                {profile.quickInfo.internship && (
                  <div className="info-row"><span className="key">Internship</span><span className="val">{profile.quickInfo.internship}</span></div>
                )}
                {profile.quickInfo.specialization && (
                  <div className="info-row"><span className="key">Specialization</span><span className="val">{profile.quickInfo.specialization}</span></div>
                )}
                {profile.quickInfo.status && (
                  <div className="info-row"><span className="key">Status</span><span className="val" style={{ color: "var(--secondary)" }}>{profile.quickInfo.status}</span></div>
                )}
                {profile.quickInfo.target && (
                  <div className="info-row"><span className="key">Target</span><span className="val">{profile.quickInfo.target}</span></div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: "5rem" }}>
        <CTA />
      </div>
    </section>
  );
};

export default About;
