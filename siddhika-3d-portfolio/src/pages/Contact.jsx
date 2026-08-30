import { Suspense, useState } from "react";
import ContactScene from "../models/ContactScene";
import useAlert from "../hooks/useAlert";
import { profile } from "../data";

const Contact = () => {
  const { alert, showAlert, hideAlert } = useAlert();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [anim, setAnim] = useState("idle");

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleFocus = () => setAnim("walk");
  const handleBlur = () => setAnim("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnim("hit");

    // Simulate submission / Email service
    await new Promise((r) => setTimeout(r, 1500));

    setLoading(false);
    setAnim("idle");
    showAlert({ text: "Message sent! I'll get back to you soon 🚀", type: "success" });
    setForm({ name: "", email: "", message: "" });

    setTimeout(hideAlert, 4000);
  };

  return (
    <section className="section-pad max-container">
      {alert.show && (
        <div className={`alert-box alert-${alert.type}`}>{alert.text}</div>
      )}

      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <p className="section-label" style={{ justifyContent: "center" }}>Let's Connect</p>
        <h1 className="section-title" style={{ fontSize: "clamp(2rem,5vw,3.5rem)" }}>
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
          Whether you have an opportunity, a project, or just want to say hello — my inbox is always open.
        </p>
      </div>

      <div className="contact-grid">
        {/* ── Form ── */}
        <div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder={profile.fullName || "Your Name"}
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
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
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ alignSelf: "flex-start" }}
            >
              {loading ? "Sending..." : "Send Message →"}
            </button>
          </form>

          {/* Quick Contact Links from profile.json */}
          <div className="contact-links-alt">
            {profile.email && (
              <a href={`mailto:${profile.email}`} className="contact-link-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 7 10-7"/>
                </svg>
                {profile.email}
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                LinkedIn Profile
              </a>
            )}
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="contact-link-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                GitHub Profile
              </a>
            )}
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className="contact-link-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
                </svg>
                {profile.phone}
              </a>
            )}
          </div>
        </div>

        {/* ── 3D Contact Scene ── */}
        <div className="contact-3d-wrap">
          <Suspense fallback={<div className="loader-wrap"><div className="loader"></div></div>}>
            <ContactScene currentAnimation={anim} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Contact;
