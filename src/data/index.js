import profileData from "./profile.json";
import skillsData from "./skills.json";
import experienceData from "./experience.json";
import projectsData from "./projects.json";
import educationData from "./education.json";
import certificationsData from "./certifications.json";

export const profile = profileData;
export const skills = skillsData.items;
export const skillCategories = skillsData.categories;
export const experiences = experienceData;
export const projects = projectsData;
export const education = educationData;
export const certifications = certificationsData;

export default {
  profile,
  skills,
  skillCategories,
  experiences,
  projects,
  education,
  certifications,
};
