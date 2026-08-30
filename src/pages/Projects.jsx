import { useEffect, useRef } from "react";
import { projects } from "../data";
import CTA from "../components/CTA";

const Projects = () => {
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
      <div ref={addRef} className="observe">
        <p className="section-label">Featured Work</p>
        <h1 className="section-title">
          Projects I've <span className="gradient-text">Built</span>
        </h1>
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
              style={{
                transitionDelay: `${i * 0.1}s`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              {/* Dynamic Icon */}
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

              {/* Tech Stack Chips */}
              {project.stack && project.stack.length > 0 && (
                <div className="p-stack" style={{ marginBottom: (project.githubUrl || project.liveUrl) ? "1.2rem" : "0" }}>
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

              {/* Optional Project Links */}
              {(project.githubUrl || project.liveUrl) && (
                <div style={{ display: "flex", gap: "0.8rem", marginTop: "1rem", position: "relative", zIndex: 2 }}>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                      style={{ padding: "0.4rem 1rem", fontSize: "0.78rem" }}
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: "0.4rem 1rem", fontSize: "0.78rem" }}
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              )}
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

export default Projects;
