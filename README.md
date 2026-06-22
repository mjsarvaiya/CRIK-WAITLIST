# CRIK

A production-ready landing page for **CRIK** — a futuristic social sports platform that helps users instantly find and join nearby cricket games.

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Theme, glass effects, animations
│   ├── layout.tsx       # Root layout + fonts + metadata
│   └── page.tsx         # Landing page
└── components/
    ├── AnimatedBackground.tsx
    ├── CTA.tsx
    ├── FadeIn.tsx
    ├── Features.tsx
    ├── Footer.tsx
    ├── Hero.tsx
    ├── HowItWorks.tsx
    ├── Navbar.tsx
    └── WaitlistButton.tsx
```

## Design

- **Background:** `#05060A`
- **Primary:** Neon cyan `#00E5FF`
- **Secondary:** Neon green `#00FF85`
- **Accent:** Amber `#FFB800`

Fonts: Orbitron (display/logo) + Inter (body) via Google Fonts.
