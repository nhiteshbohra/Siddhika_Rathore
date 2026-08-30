import { Suspense } from "react";
import HeroCanvas from "../models/HeroScene";
import { Link } from "react-router-dom";
import { profile } from "../data";

const Home = () => {
  return (
    <div className="hero-section">
      {/* 3D Canvas */}
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
          {profile.heroHighlightPrefix} <strong>{profile.heroHighlight}</strong> &nbsp;|&nbsp; {profile.heroHighlightSuffix}
        </p>
        <div className="hero-btns">
          <Link to="/projects" className="btn-primary">View My Work ↓</Link>
          <Link to="/contact" className="btn-outline">Get In Touch →</Link>
        </div>
      </div>

      {/* Dynamic Stats from JSON */}
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

      {/* Scroll Hint */}
      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </div>
  );
};

export default Home;
