# 🚀 Siddhika Rathore — 3D Portfolio

A modern, high-performance 3D portfolio built with **React**, **Vite**, and **Three.js / React Three Fiber**.

---

## 📂 100% Dynamic Content (Edit JSON Files)

All content across the entire website is stored in modular JSON files located in [`src/data/`](./src/data/).  
Whenever you want to add, edit, or remove any information, **just update the corresponding JSON file** and the website updates automatically — no need to touch any code!

| Section | JSON File Path | What You Can Edit |
| :--- | :--- | :--- |
| **Profile & Hero** | [`src/data/profile.json`](./src/data/profile.json) | Name, bio, email, phone, location, LinkedIn/GitHub links, CGPA, target roles |
| **Skills** | [`src/data/skills.json`](./src/data/skills.json) | Skill items, category grouping, 3D sphere colors, category tags |
| **Experience** | [`src/data/experience.json`](./src/data/experience.json) | Internships, job titles, companies, dates, bullet points, tech stack tags |
| **Projects** | [`src/data/projects.json`](./src/data/projects.json) | Project titles, descriptions, icons, tech tags, GitHub/Live links |
| **Education** | [`src/data/education.json`](./src/data/education.json) | Degrees, colleges, CGPA/marks, coursework details |
| **Certifications** | [`src/data/certifications.json`](./src/data/certifications.json) | Certifications, issuing authorities, icons, credentials |

---

## 🛠 Local Development

```bash
# 1. Navigate to portfolio folder
cd siddhika-3d-portfolio

# 2. Install dependencies (already installed)
npm install

# 3. Start the dev server
npm run dev
```

Visit **http://localhost:5173/** in your browser.

---

## 🌐 Deploying to GitHub / Vercel / Netlify

1. Commit and push this project to your GitHub repository.
2. Connect the repository to **Vercel** or **Netlify**.
3. Build Command: `npm run build`
4. Output Directory: `dist`
