# Vinothraj P — Developer Portfolio

A premium, interactive developer portfolio built with Next.js 16, React 19, TypeScript,
Three.js (React Three Fiber), GSAP and Lenis.

## Stack

| Area         | Technology                                   |
| ------------ | -------------------------------------------- |
| Framework    | Next.js 16 (App Router, Turbopack)           |
| UI           | React 19, TypeScript, CSS Modules            |
| 3D           | three, @react-three/fiber, @react-three/drei |
| Animation    | gsap + ScrollTrigger, lenis                  |
| Icons        | lucide-react                                 |
| Data         | Local TypeScript data files                  |
| Integrations | GitHub REST API, contact form API route      |
| Deploy       | Vercel                                       |

No Tailwind. Styling is authored with CSS custom properties and CSS Modules.

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit values
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run format     # prettier
```

## Where to edit content

All portfolio content is separated from UI components:

| File                 | Contains                                               |
| -------------------- | ------------------------------------------------------ |
| `data/profile.ts`    | Name, title, bio, email, GitHub, LinkedIn, resume path |
| `data/projects.ts`   | Projects, problems, solutions, architecture, links     |
| `data/experience.ts` | Experience, education, certifications, achievements    |
| `data/skills.ts`     | Skills, categories, stats, process, AI flow            |
| `data/tokens.ts`     | Design tokens (colors, spacing, type scale)            |

Types live in `types/index.ts`, so every edit is type-checked.

### Important: no invented data

The site intentionally avoids fabricated statistics (no fake user counts, revenue,
percentages or accuracy claims). Anything not supplied is either omitted or shown as a
placeholder. Update the data files with real information as it becomes available.

## Assets

Drop files at these exact paths and they are picked up automatically:

```
public/
  images/
    profile.png                      # portrait (square works best)
    projects/                        # project cover images (see naming below)
    certificates/
    gallery/
    og/portfolio-og.png              # 1200x630 social share image
  resume/Vinothraj-P-Resume.pdf      # resume PDF
```

Project covers are referenced from `data/projects.ts` via `coverImage`. If an image is
missing or fails to load, a designed architecture diagram is rendered instead — never a
broken image.

The resume section checks for the PDF at runtime; if it is absent it shows a graceful
placeholder telling you where to put the file.

## Environment variables

See `.env.example`. The public values control contact links and the resume path.

- `CONTACT_FORM_ENDPOINT` — when set, the contact API route forwards submissions to it.
  When unset, the form tells visitors to email directly instead of pretending to send.
- `GITHUB_TOKEN` — optional, raises GitHub API rate limits (server-side).

## Architecture

```
app/
  layout.tsx            # metadata, providers
  page.tsx              # section composition
  providers.tsx         # theme, loading, smooth scroll, cursor, command palette
  api/github/route.ts   # GitHub proxy (revalidated hourly)
  api/contact/route.ts  # contact form handler
  robots.ts sitemap.ts manifest.ts icon.svg
components/
  navigation/ hero/ about/ skills/ projects/ experience/
  research/ github/ resume/ contact/
  ui/          # Button, Container, SectionHeading, Reveal, Icon, ProfileImage
  layout/      # Footer
  cursor/ loader/ command/ a11y/ 3d/
data/                  # content
lib/                   # gsap, github, utils, hooks
styles/globals.css     # design tokens + base
```

## Features

- Interactive hero with a lazy-loaded 3D neural core and a static SVG fallback
- Command palette (`Ctrl`/`Cmd` + `K`) with an easter egg
- Custom cursor on pointer devices only
- Scroll-driven reveals, parallax and an AI/automation pipeline visualization
- Full-screen project case studies with focus trapping
- Live GitHub section with loading, error and offline fallbacks
- Accessible contact form (validation, loading, success, error, not-configured states)
- Dark-first theme with optional light mode
- `prefers-reduced-motion` respected throughout; 3D degrades gracefully on low-power devices

## License

MIT
