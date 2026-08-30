import { Link } from "react-router-dom";
import { profile } from "../data";

const CTA = () => (
  <div
    style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "16px",
      padding: "2.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1.5rem",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute", top: "-50%", left: "-20%",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)",
        pointerEvents: "none",
      }}
    />
    <div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "0.4rem",
        }}
      >
        {profile.ctaTitle || "Interested in working together?"}
      </h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
        {profile.ctaSubtitle || "I'm open to internships, full-time roles, and exciting projects."}
      </p>
    </div>
    <Link to="/contact" className="btn-primary">
      Let's Talk →
    </Link>
  </div>
);

export default CTA;
