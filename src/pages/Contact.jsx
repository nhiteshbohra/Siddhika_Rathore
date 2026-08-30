import { Suspense } from "react";
import ContactScene from "../models/ContactScene";
import { profile } from "../data";

const Contact = () => {
  return (
    <section className="page-pad max-container">
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <p className="section-label" style={{ justifyContent: "center" }}>Let's Connect</p>
        <h1 className="section-title" style={{ fontSize: "clamp(2.2rem,4.5vw,3.6rem)" }}>
          Ready to Build{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--primary-light), var(--secondary), var(--accent2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Something Great?
          </span>
        </h1>
        <p className="section-subtitle" style={{ margin: "0 auto" }}>
          Feel free to reach out directly through any of the channels below — open for full-time roles, software engineering internships, and collaborations.
        </p>
      </div>

      <div className="contact-grid">
        {/* Direct Contact Cards */}
        <div>
          <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: "1.7", marginBottom: "2rem" }}>
            I am actively looking for software engineering roles, technical consulting, and blockchain opportunities. You can reach me directly anytime:
          </p>

          <div className="contact-links-alt" style={{ gap: "1rem" }}>
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="contact-link-item"
                style={{ padding: "1.1rem 1.3rem", fontSize: "0.95rem" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: "22px", height: "22px", color: "var(--secondary)" }}>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 7 10-7" />
                </svg>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Email Address</div>
                  <div style={{ fontWeight: 600, color: "var(--text)" }}>{profile.email}</div>
                </div>
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
                style={{ padding: "1.1rem 1.3rem", fontSize: "0.95rem" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "22px", height: "22px", color: "#0a66c2" }}>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>LinkedIn Profile</div>
                  <div style={{ fontWeight: 600, color: "var(--text)" }}>linkedin.com/in/siddhika-rathore ↗</div>
                </div>
              </a>
            )}

            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
                style={{ padding: "1.1rem 1.3rem", fontSize: "0.95rem" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "22px", height: "22px", color: "#f8fafc" }}>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>GitHub Profile</div>
                  <div style={{ fontWeight: 600, color: "var(--text)" }}>github.com/siddhika-rathore ↗</div>
                </div>
              </a>
            )}

            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="contact-link-item"
                style={{ padding: "1.1rem 1.3rem", fontSize: "0.95rem" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: "22px", height: "22px", color: "var(--green)" }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z" />
                </svg>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Phone / WhatsApp</div>
                  <div style={{ fontWeight: 600, color: "var(--text)" }}>{profile.phone}</div>
                </div>
              </a>
            )}
          </div>
        </div>

        {/* ── 3D Contact Scene ── */}
        <div className="contact-3d-wrap">
          <Suspense fallback={<div className="loader-wrap"><div className="loader"></div></div>}>
            <ContactScene currentAnimation="idle" />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Contact;
