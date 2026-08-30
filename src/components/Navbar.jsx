import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { profile } from "../data";

const NAV_LINKS = [
  { label: "About", id: "about", to: "/about" },
  { label: "Skills", id: "skills", to: "/skills" },
  { label: "Experience", id: "experience", to: "/experience" },
  { label: "Projects", id: "projects", to: "/projects" },
  { label: "Education", id: "education", to: "/education" },
  { label: "Contact", id: "contact", to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (link) => {
    setOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById(link.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    navigate(link.to);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <a href="/" className="nav-logo" onClick={handleLogoClick}>
        {profile.initials || "SR."}
      </a>

      <ul className={`nav-links${open ? " open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <li key={l.id}>
            <button
              onClick={() => handleNavClick(l)}
              className="nav-btn"
              style={{
                color: location.pathname === l.to ? "var(--text)" : undefined,
              }}
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>


      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span style={{ transform: open ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
        <span style={{ opacity: open ? 0 : 1 }} />
        <span style={{ transform: open ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
      </button>
    </nav>
  );
};

export default Navbar;
