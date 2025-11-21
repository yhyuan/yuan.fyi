# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Contentlayer. It's based on the Tailwind Next.js Starter Blog template and is deployed at https://yuan.fyi. The blog focuses on technical content including JavaScript, TypeScript, React, LeetCode patterns, and web development topics.

## Important: Node.js Version Compatibility

**This project requires Node.js 20.x LTS.** Contentlayer2 0.4.6 generates import statements using the deprecated `assert { type: 'json' }` syntax, which is not supported in Node.js 24+. The newer `with { type: 'json' }` syntax is required for Node 24+, but contentlayer2 hasn't been updated yet.

**If you must use Node.js 24+:**
1. A patch script (`scripts/patch-contentlayer.sh`) is included that runs after build
2. However, this doesn't fully resolve the issue as contentlayer imports files during build
3. Recommended: Use nvm to switch to Node 20.x: `nvm use 20`

**Check your Node version:**
```bash
node --version  # Should be v20.x.x
```

## Development Commands

### Setup
```bash
yarn                    # Install dependencies
```

### Development
```bash
yarn dev               # Start dev server at http://localhost:3000
yarn start             # Alternative command to start dev server
```

### Build & Production
```bash
yarn build             # Build for production (includes post-build script)
yarn serve             # Start production server
yarn analyze           # Build with bundle analyzer
```

### Quality Checks
```bash
yarn lint              # Run ESLint with auto-fix on pages, app, components, lib, layouts, scripts
```

### Static Export (GitHub Pages/S3)
```bash
EXPORT=1 UNOPTIMIZED=1 yarn build              # Build static export
EXPORT=1 UNOPTIMIZED=1 BASE_PATH=/myblog yarn build  # Build with base path
```

## Architecture

### Content Management
- **Contentlayer** (`contentlayer.config.ts`): Defines content schema and processes MDX files
  - `Blog` type: Blog posts in `data/blog/**/*.mdx`
  - `Authors` type: Author profiles in `data/authors/**/*.mdx`
  - Computed fields: reading time, slug, path, TOC
  - Generates `tag-data.json` and search index on build

### MDX Processing Pipeline
- **Remark plugins**: GFM, math, code titles, frontmatter extraction, JSX images, GitHub alerts
- **Rehype plugins**: Slug generation, autolink headings, KaTeX math, citations, Prism+ syntax highlighting, minification

### Key Directories
- `app/`: Next.js 14 App Router pages and layouts
- `components/`: Reusable React components (Header, Footer, MDXComponents, etc.)
- `layouts/`: Blog post layouts (PostLayout, PostSimple, PostBanner) and list layouts (ListLayout, ListLayoutWithTags)
- `data/`: Content and configuration
  - `data/blog/`: All blog posts in MDX format (supports nested routing)
  - `data/authors/`: Author profiles
  - `data/siteMetadata.js`: Site configuration (title, social links, analytics, comments, search)
  - `data/headerNavLinks.ts`: Navigation menu items
  - `data/projectsData.ts`: Projects page data
- `public/static/`: Static assets (images, favicons)

### Configuration Files
- `next.config.js`: Next.js config with Contentlayer, bundle analyzer, CSP headers, SVG handling
- `contentlayer.config.ts`: Content schema and MDX plugin configuration
- `siteMetadata.js`: Site-wide settings (analytics, comments, search, social links)
- `tailwind.config.js`: Tailwind customization
- `tsconfig.json`: TypeScript configuration

### Blog Post Structure
Posts are MDX files with frontmatter:
- Required: `title`, `date`
- Optional: `tags`, `lastmod`, `draft`, `summary`, `images`, `authors`, `layout`, `canonicalUrl`, `bibliography`
- Supports nested routing (e.g., `blog/nested-route/post.mdx`)
- Three layouts available: PostLayout (default 2-column), PostSimple (simplified), PostBanner (with banner image)

### Integrations
- **Analytics**: Umami (configured via env vars)
- **Comments**: Giscus (configured via env vars)
- **Newsletter**: Buttondown (via pliny)
- **Search**: Kbar with local search index

### Pre-commit Hooks
- Husky configured with lint-staged
- Auto-runs ESLint and Prettier on staged files

## Environment Variables
Create `.env` file (see `.env.example`):
- `NEXT_UMAMI_ID`: Umami analytics website ID
- `NEXT_PUBLIC_GISCUS_REPO`: GitHub repo for Giscus comments
- `NEXT_PUBLIC_GISCUS_REPOSITORY_ID`: Giscus repository ID
- `NEXT_PUBLIC_GISCUS_CATEGORY`: Giscus discussion category
- `NEXT_PUBLIC_GISCUS_CATEGORY_ID`: Giscus category ID
- `BASE_PATH`: Optional base path for deployment (e.g., `/myblog`)

## Customization Points
- `data/siteMetadata.js`: Update site title, author, social links, domain
- `data/authors/default.mdx`: Update author information
- `data/projectsData.ts`: Add/modify projects
- `data/headerNavLinks.ts`: Modify navigation menu
- `data/logo.svg`: Replace site logo
- `public/static/`: Replace favicons and images
- `tailwind.config.js` + `css/tailwind.css`: Customize styling
- `css/prism.css`: Customize code block themes
- `components/MDXComponents.tsx`: Add custom MDX components

## Security
- CSP headers configured in `next.config.js` for giscus.app and analytics.umami.is
- Additional security headers: Referrer-Policy, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security
- Update CSP if adding new external services

## Deployment
- Primary: Vercel (automatic with git push)
- Alternative: GitHub Pages via `.github/workflows/pages.yml`
- Static hosting: Use `EXPORT=1` build command
