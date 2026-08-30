import { Suspense, useEffect, useRef } from "react";
import HeroCanvas from "../models/HeroScene";
import SkillSphere from "../models/SkillSphere";
import ContactScene from "../models/ContactScene";
import useAlert from "../hooks/useAlert";
import {
  profile,
  skills,
  skillCategories,
  experiences,
  projects,
  education,
  certifications,
} from "../data";
import { sendContactMessage } from "../utils/sendEmail";

const Home = () => {
  const { alert, showAlert, hideAlert } = useAlert();
  const formRef = useRef(null);
  const observeRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("vis");
        }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observeRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !observeRefs.current.includes(el)) observeRefs.current.push(el);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      name: formData.get("name") || "",
      email: formData.get("email") || "",
      message: formData.get("message") || "",
    };
    try {
      const res = await sendContactMessage(payload);
      showAlert({ text: res.message || "Message sent! I'll get back to you soon 🚀", type: "success" });
      if (formRef.current) formRef.current.reset();
    } catch (err) {
      console.error(err);
      showAlert({ text: err.message || "Could not send message. Please email me directly!", type: "danger" });
    } finally {
      setTimeout(hideAlert, 5000);
    }
  };

  return (
    <div>
      {/* ══════════════════════════════════════════
          1. HERO SECTION
      ══════════════════════════════════════════ */}
      <div id="hero" className="hero-section">
        {/* 3D Particle Canvas */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>

        {/* Hero Text Overlay */}
        <div className="hero-info-overlay">
          {profile.statusBadge && (
            <div className="hero-badge">
              <div className="badge-dot"></div>
              {profile.statusBadge}
            </div>
          )}
          <p className="hero-greeting">{profile.greeting}</p>
          <h1 className="hero-name">
            <span className="line1">{profile.firstName}</span>
            <span className="line2">{profile.lastName}</span>
          </h1>
          <p className="hero-sub">
            <strong>{profile.heroRoleBold}</strong> &nbsp;·&nbsp; {profile.heroRoleSuffix}
            <br />
            {profile.heroHighlightPrefix} <strong>{profile.heroHighlight}</strong> &nbsp;|&nbsp;{" "}
            {profile.heroHighlightSuffix}
          </p>
          <div className="hero-btns">
            <button
              onClick={() => scrollToSection("projects")}
              className="btn-primary"
              style={{ cursor: "pointer" }}
            >
              View My Work ↓
            </button>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download="Siddhika_Rathore_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ cursor: "pointer", textDecoration: "none" }}
              >
                Download CV 📥
              </a>
            )}
            <button
              onClick={() => scrollToSection("contact")}
              className="btn-outline"
              style={{ cursor: "pointer" }}
            >
              Get In Touch →
            </button>
          </div>
        </div>

        {/* Dynamic Stats */}
        {profile.stats && profile.stats.length > 0 && (
          <div className="hero-stats">
            {profile.stats.map((stat, i) => (
              <div key={i} className="hero-stat">
                <div className="num">{stat.num}</div>
                <div className="label">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive Scroll Down Button */}
        <div
          className="hero-scroll"
          onClick={() => scrollToSection("about")}
          style={{ cursor: "pointer", pointerEvents: "auto" }}
        >
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          2. ABOUT SECTION
      ══════════════════════════════════════════ */}
      <div className="section-divider"></div>
      <section id="about" className="section-pad max-container">
        <div ref={addRef} className="observe">
          <p className="section-label">About Me</p>
          <h2 className="section-title">
            {profile.aboutTitlePrefix || "Turning ideas into"}{" "}
            <span className="gradient-text">
              {profile.aboutTitleGradient || "real-world impact"}
            </span>
          </h2>
        </div>

        <div className="about-grid" style={{ marginTop: "3rem" }}>
          <div ref={addRef} className="observe">
            {profile.bio &&
              profile.bio.map((paragraph, idx) => (
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
                  <a
                    href={`mailto:${profile.email}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {profile.email}
                  </a>
                </div>
              )}
              {profile.phone && (
                <div className="highlight-item">
                  <div className="hi-icon">📞</div>
                  <a
                    href={`tel:${profile.phone}`}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
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
          </div>

          {/* Quick Info Card */}
          {profile.quickInfo && (
            <div ref={addRef} className="observe" style={{ transitionDelay: "0.15s" }}>
              <div className="about-card">
                <div className="cgpa-row">
                  <div className="cgpa-num">{profile.quickInfo.cgpa}</div>
                  <div className="cgpa-sub">{profile.quickInfo.cgpaScale}</div>
                </div>
                <div className="info-rows">
                  {profile.quickInfo.university && (
                    <div className="info-row">
                      <span className="key">University</span>
                      <span className="val">{profile.quickInfo.university}</span>
                    </div>
                  )}
                  {profile.quickInfo.degree && (
                    <div className="info-row">
                      <span className="key">Degree</span>
                      <span className="val">{profile.quickInfo.degree}</span>
                    </div>
                  )}
                  {profile.quickInfo.internship && (
                    <div className="info-row">
                      <span className="key">Internship</span>
                      <span className="val">{profile.quickInfo.internship}</span>
                    </div>
                  )}
                  {profile.quickInfo.specialization && (
                    <div className="info-row">
                      <span className="key">Specialization</span>
                      <span className="val">{profile.quickInfo.specialization}</span>
                    </div>
                  )}
                  {profile.quickInfo.status && (
                    <div className="info-row">
                      <span className="key">Status</span>
                      <span className="val" style={{ color: "var(--secondary)" }}>
                        {profile.quickInfo.status}
                      </span>
                    </div>
                  )}
                  {profile.quickInfo.target && (
                    <div className="info-row">
                      <span className="key">Target</span>
                      <span className="val">{profile.quickInfo.target}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. SKILLS SECTION (3D Sphere)
      ══════════════════════════════════════════ */}
      <div className="section-divider"></div>
      <section id="skills" className="section-pad max-container">
        <div ref={addRef} className="observe">
          <p className="section-label">Technical Expertise</p>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Drag the 3D sphere to explore — all skills configured dynamically from skills.json.
          </p>
        </div>

        {/* 3D Skill Sphere */}
        <div
          ref={addRef}
          className="observe skills-canvas-wrap"
          style={{ transitionDelay: "0.2s" }}
        >
          <Suspense
            fallback={
              <div className="loader-wrap">
                <div className="loader"></div>
              </div>
            }
          >
            <SkillSphere />
          </Suspense>
          <div className="canvas-hint">✦ Drag to rotate · Zoom with scroll</div>
        </div>

        {/* Skill Category Chips */}
        <div className="skill-cats" style={{ marginTop: "2.5rem" }}>
          {skillCategories &&
            skillCategories.map((cat, ci) => {
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
                  <div className="skill-cat-title" style={{ color: cat.color }}>
                    {cat.title}
                  </div>
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
      </section>

      {/* ══════════════════════════════════════════
          4. EXPERIENCE SECTION
      ══════════════════════════════════════════ */}
      <div className="section-divider"></div>
      <section id="experience" className="section-pad max-container">
        <div ref={addRef} className="observe">
          <p className="section-label">Work Experience</p>
          <h2 className="section-title">
            Internship & <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            Real-world exposure to cutting-edge blockchain research at India's premier cybersecurity lab.
          </p>
        </div>

        <div className="timeline">
          {experiences &&
            experiences.map((exp, idx) => (
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
                </div>
                {exp.responsibilities && (
                  <ul className="t-bullets">
                    {exp.responsibilities.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="tech-tags">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. PROJECTS SECTION
      ══════════════════════════════════════════ */}
      <div className="section-divider"></div>
      <section id="projects" className="section-pad max-container">
        <div ref={addRef} className="observe">
          <p className="section-label">Featured Work</p>
          <h2 className="section-title">
            Projects I've <span className="gradient-text">Built</span>
          </h2>
          <p className="section-subtitle">
            Real-world applications spanning blockchain, AI agents, and full-stack development — dynamically loaded from projects.json.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => {
            const color = project.color || "#06b6d4";
            return (
              <div
                key={project.id || project.name}
                ref={addRef}
                className="observe project-card"
                style={{ transitionDelay: `${i * 0.1}s` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                <div
                  className="p-icon"
                  style={{
                    background: `${color}1e`,
                    border: `1px solid ${color}44`,
                    color: color,
                  }}
                >
                  {project.icon || "💻"}
                </div>
                <h3 className="p-title">{project.name}</h3>
                <p className="p-desc">{project.description}</p>
                {project.stack && project.stack.length > 0 && (
                  <div className="p-stack">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="s-tag"
                        style={{
                          background: `${color}18`,
                          color: color,
                          border: `1px solid ${color}33`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. EDUCATION & CERTS SECTION
      ══════════════════════════════════════════ */}
      <div className="section-divider"></div>
      <section id="education" className="section-pad max-container">
        <div ref={addRef} className="observe">
          <p className="section-label">Academic Background</p>
          <h2 className="section-title">
            Education & <span className="gradient-text">Credentials</span>
          </h2>
        </div>

        <div className="edu-grid">
          {education &&
            education.map((edu, idx) => (
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
                    <strong style={{ color: "var(--text-muted)" }}>Coursework:</strong>
                    <br />
                    {edu.coursework}
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <>
            <div
              ref={addRef}
              className="observe"
              style={{ marginTop: "4rem", transitionDelay: "0.1s" }}
            >
              <p className="section-label">Credentials</p>
              <h3 className="section-title" style={{ fontSize: "1.8rem" }}>
                Certifications & <span className="gradient-text">Achievements</span>
              </h3>
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
          </>
        )}
      </section>

      {/* ══════════════════════════════════════════
          7. CONTACT SECTION
      ══════════════════════════════════════════ */}
      <div className="section-divider"></div>
      <section id="contact" className="section-pad max-container">
        {alert.show && <div className={`alert-box alert-${alert.type}`}>{alert.text}</div>}

        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="section-label" style={{ justifyContent: "center" }}>
            Let's Connect
          </p>
          <h2 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
            Ready to Build{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-light), var(--secondary), var(--accent2))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Something Great?
            </span>
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            Whether you have an opportunity, a project, or just want to say hello — my inbox is always open.
          </p>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <div>
            <form ref={formRef} className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder={profile.fullName || "Your Name"}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="hello@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Message</label>
                <textarea
                  name="message"
                  className="form-textarea"
                  placeholder="Let's collaborate on something amazing..."
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                Send Message →
              </button>
            </form>

            {/* Quick Links */}
            <div className="contact-links-alt">
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="contact-link-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                  {profile.email}
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn Profile
                </a>
              )}
              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  GitHub Profile
                </a>
              )}
              {profile.phone && (
                <a href={`tel:${profile.phone}`} className="contact-link-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
                  </svg>
                  {profile.phone}
                </a>
              )}
            </div>
          </div>

          {/* 3D Contact Scene */}
          <div className="contact-3d-wrap">
            <Suspense
              fallback={
                <div className="loader-wrap">
                  <div className="loader"></div>
                </div>
              }
            >
              <ContactScene currentAnimation="idle" />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
