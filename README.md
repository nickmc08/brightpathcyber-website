# Bright Path Cyber Website

**Bright Path Cyber website — McMillon Co. cybersecurity education division**

A professional, fully responsive website for [Bright Path Cyber](https://brightpathcyber.com) — personal cybersecurity and privacy guidance for individuals and families, based in Kent, Washington.

---

## Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library
- **Wouter** for client-side routing
- **Framer Motion** for animations
- **Vite** for bundling and dev server

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, Who We Help, services overview, CTA |
| `/about` | About — founding story, mission/vision, team |
| `/bright-path-cyber` | Cyber Safety — services, value ladder, e-book |
| `/blog` | Blog — 4 articles on cybersecurity and privacy |
| `/contact` | Contact — form, email, location, booking |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Deployment

The production build outputs to `dist/public/`. For Cloudflare Pages deployment, include a `_redirects` file with:

```
/* /index.html 200
```

## Contact

**Email:** info@brightpathcyber.com  
**Location:** Kent, Washington
