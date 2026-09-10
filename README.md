# Heath Thapa Portfolio

This repository contains the source for the personal portfolio website of Heath Thapa, a professional focused on AI/ML, quantitative finance, investment research, and advanced analytics. The site presents his background, expertise, work experience, projects, education, publications, and certifications in a modern, responsive single-page format.

## Overview

The portfolio is a static website built with:

- HTML5 for structure
- CSS3 for styling and responsive behavior
- Vanilla JavaScript for interactivity, theme switching, animations, and JSON-driven content loading

The site is designed to be lightweight and easy to host on GitHub Pages, Netlify, or any static web server.

## What the site includes

- Hero section with animated name reveal and profile image
- About section with professional summary and key profile details
- Expertise / capabilities overview
- Professional journey timeline loaded from JSON
- Featured projects section with tags and links
- Education timeline
- Publications and certifications directory
- Contact links to LinkedIn, GitHub, and email
- Dark/light theme toggle
- Responsive navigation for smaller screens

## Repository structure

```text
.
├── index.html                # Main page structure and content sections
├── styles.css                # All visual styling, layout, responsiveness, and theme rules
├── script.js                 # UI logic, animation, theme handling, and JSON rendering
├── README.md                 # Project documentation
├── data/
│   ├── professional-journey.json
│   ├── projects.json
│   ├── education.json
│   └── publications-certifications.json
├── files/
│   └── certifications/       # PDF/image certificate files
├── images/
│   └── profile.jpg           # Main profile image
└── .git/                     # Git metadata
```

## Data-driven content

The site loads several content blocks from JSON files instead of hardcoding everything in the HTML:

- `data/professional-journey.json` — work history and role summaries
- `data/projects.json` — featured project descriptions, technologies, and links
- `data/education.json` — academic background
- `data/publications-certifications.json` — publications and credentials

This makes it straightforward to update the portfolio content without rewriting the page layout.

## Content profile reflected in the repo

The portfolio content reflects the following professional profile:

- AI/ML and quantitative finance specialist
- Focus on investment research, portfolio optimization, time-series forecasting, and decision-support analytics
- Experience across financial services and analytics consulting
- Work includes strategy, risk analysis, optimization, macro forecasting, and portfolio construction
- Educational background in Industrial Engineering / Operations Research and Mechanical Engineering
- Published books on AI/ML in financial advisory, digital media, and SQL/data science fundamentals
- Certifications including AWS Big Data Specialty, CFA Level 1, SAS Base Programmer, and others

## Local development

Because this is a static site, there is no install step or build process required.

### Option 1: Open directly

Open `index.html` in a browser.

### Option 2: Run a local web server

From the project root:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Customization

To update the portfolio content:

1. Edit the relevant JSON file in `data/`
2. Replace images in `images/` as needed
3. Update contact links, profile image, and metadata in `index.html`
4. Adjust styles and color palette in `styles.css`

## Deployment

This site is suitable for deployment on:

- GitHub Pages
- Netlify
- Vercel
- Any static hosting platform

## Notes

- The site includes Google Analytics configuration in `index.html`.
- External assets such as Google Fonts and Font Awesome are loaded from CDN.
- The portfolio is intentionally static and lightweight for reliable hosting and easy maintenance.

## License

This project is a personal portfolio website and is intended for personal use and presentation of professional work.
