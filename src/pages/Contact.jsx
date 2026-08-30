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

      {/* Centered Direct Contact Cards */}
      <div className="contact-cards-grid">
        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            className="contact-direct-card"
          >
            <div className="card-top-row">
              <div className="card-icon-wrap" style={{ background: "rgba(6,182,212,0.12)", color: "var(--secondary)", border: "1px solid rgba(6,182,212,0.25)" }}>
                ✉️
              </div>
              <span className="card-action-btn">Send Email ↗</span>
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>Email Address</div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", wordBreak: "break-all" }}>{profile.email}</div>
            </div>
          </a>
        )}

        {profile.linkedin && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-direct-card"
          >
            <div className="card-top-row">
              <div className="card-icon-wrap" style={{ background: "rgba(10,102,194,0.15)", color: "#38bdf8", border: "1px solid rgba(10,102,194,0.3)" }}>
                💼
              </div>
              <span className="card-action-btn">Connect ↗</span>
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>LinkedIn Profile</div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)" }}>Siddhika Rathore</div>
            </div>
          </a>
        )}

        {profile.github && (
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-direct-card"
          >
            <div className="card-top-row">
              <div className="card-icon-wrap" style={{ background: "rgba(255,255,255,0.08)", color: "#f8fafc", border: "1px solid rgba(255,255,255,0.18)" }}>
                🐙
              </div>
              <span className="card-action-btn">View Code ↗</span>
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>GitHub Profile</div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)" }}>@siddhika-rathore</div>
            </div>
          </a>
        )}

        {profile.phone && (
          <a
            href={`tel:${profile.phone}`}
            className="contact-direct-card"
          >
            <div className="card-top-row">
              <div className="card-icon-wrap" style={{ background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" }}>
                📞
              </div>
              <span className="card-action-btn">Call / WhatsApp ↗</span>
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>Phone Number</div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)" }}>{profile.phone}</div>
            </div>
          </a>
        )}
      </div>
    </section>
  );
};

export default Contact;
