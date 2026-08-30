import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { profile } from "../data";

const NAV_LINKS = [
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Education", to: "/education" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
        {profile.initials || "SR."}
      </Link>

      <ul className={`nav-links${open ? " open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({ color: isActive ? "var(--text)" : undefined })}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <Link
        to="/contact"
        className="nav-cta"
        onClick={() => setOpen(false)}
      >
        Hire Me ↗
      </Link>

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
