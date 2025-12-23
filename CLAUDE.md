# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro blog template built with Astro 5.x, featuring dark mode support, MDX integration, and Svelte components. The site is statically generated with SEO-friendly features including canonical URLs, OpenGraph metadata, RSS feeds, and sitemaps.

## Commands

All commands are run from the root of the project:

- `npm install` - Install dependencies
- `npm run dev` - Start development server at `localhost:4321` (default Astro port)
- `npm run build` - Build production site to `./dist/`
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands directly

Note: The README mentions `localhost:3030` but Astro's default port is `4321`. Check `astro.config.mjs` for custom port configuration.

## Architecture

### Content Management

The project uses Astro's Content Collections API (v5 with loaders):

- **Content Definition**: `src/content.config.js` defines the `posts` collection using the `glob()` loader
- **Blog Posts**: Stored in `src/data/blog-posts/` as Markdown (`.md`) or MDX (`.mdx`) files
- **Schema**: Posts require `title`, `slug`, `publishDate`, and `description` frontmatter fields
- **Rendering**: Blog posts are rendered dynamically using `getCollection()` and `render()` from `astro:content`

Key content flow:
1. Posts are loaded from `src/data/blog-posts/` via the glob loader pattern `**/*.{md,mdx}`
2. Collection schema validates frontmatter using Zod
3. `src/pages/blog/index.astro` lists all posts sorted by `publishDate` (newest first)
4. `src/pages/blog/[slug].astro` renders individual posts using dynamic routing with `getStaticPaths()`
5. Reading time is calculated using the `reading-time` package on `post.body`

### Component Structure

- **Layouts**: `src/layouts/BaseLayout.astro` is the main layout wrapper providing consistent header/footer and page structure
- **Components**: Reusable UI components in `src/components/`
  - `BaseHead.astro` - SEO metadata, OpenGraph tags, and theme initialization
  - `Header.astro`, `Footer.astro`, `Nav.astro` - Navigation and layout structure
  - `Bio.astro` - Author bio component
  - `ThemeToggleButton.svelte` - Dark mode toggle (uses Svelte for reactivity)
- **Pages**: `src/pages/` defines routes via file-based routing
  - `index.astro` - Homepage
  - `about.astro` - About page
  - `blog/index.astro` - Blog listing
  - `blog/[slug].astro` - Individual blog post template

### Styling

- Global styles in `src/styles/global.css` with CSS custom properties for theming
- Font definitions in `src/styles/fonts.css`
- Component-scoped styles using Astro's scoped `<style>` blocks
- Dark mode implemented via `.theme-dark` class on `<html>` root element
- Theme preference persists in localStorage and respects system preferences

### Dark Mode Implementation

Theme switching logic:
1. Inline script in `BaseHead.astro` prevents FOUC by checking localStorage and system preferences before page render
2. `ThemeToggleButton.svelte` component handles user interaction and updates both DOM class and localStorage
3. CSS custom properties in `global.css` define light/dark color values

### Configuration

- **Astro Config**: `astro.config.mjs` configures integrations (MDX, Svelte), markdown processing, and site metadata
- **Markdown Plugins**:
  - `remark-gfm` - GitHub Flavored Markdown support
  - `remark-smartypants` - Smart typography (curly quotes, dashes)
  - `rehype-external-links` - Opens external links in new tabs
- **Syntax Highlighting**: Shiki with Nord theme
- **Site URL**: Configured in `astro.config.mjs` as `site` property (used for canonical URLs and RSS)

### TypeScript

- Configuration in `tsconfig.json` uses modern ESM settings
- `src/env.d.ts` provides Astro type definitions
- No build/transpilation step - Astro runs TypeScript directly

## Adding New Blog Posts

1. Create a new `.md` or `.mdx` file in `src/data/blog-posts/`
2. Add required frontmatter:
   ```yaml
   ---
   title: "Post Title"
   slug: "url-friendly-slug"
   publishDate: "2025-03-14"
   description: "Brief description for SEO and listing pages"
   ---
   ```
3. Write content in Markdown (GFM and MDX supported)
4. Posts automatically appear on `/blog` sorted by date
5. Individual post route is `/blog/{slug}`
