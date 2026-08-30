import { profile } from "../data";

const Footer = () => (
  <footer className="footer">
    <p>
      Crafted with ♥ by <span>{profile.fullName || "Siddhika Rathore"}</span>
      &nbsp;·&nbsp; {profile.heroRoleBold || "CS Engineering"}
      {profile.heroHighlight && <>&nbsp;·&nbsp; {profile.heroHighlight} Intern</>}
      &nbsp;·&nbsp; Blockchain & Salesforce Enthusiast
    </p>
  </footer>
);

export default Footer;
