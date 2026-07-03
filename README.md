# Render — Live Markdown Editor

A fast, browser-based markdown editor with a live preview, built with React, TypeScript, and Vite.

**Live demo:** https://manoo07.github.io/Render/

## Features

- **Live split view** — write markdown on the left, see the rendered result instantly on the right, with a draggable divider to resize the panes
- **Four view modes** — Split, Editor only, Preview only, and a distraction-free Read mode
- **Keyboard shortcuts** — press `E` to jump into split/edit mode, `R` for read mode
- **Formatting toolbar** — one-click headings, bold, italic, strikethrough, inline code, code blocks, blockquotes, and lists
- **GitHub Flavored Markdown** — tables, task lists, strikethrough, and autolinks via `remark-gfm`
- **Syntax highlighting** — fenced code blocks highlighted with `rehype-highlight`
- **Mermaid diagrams** — render flowcharts, sequence diagrams, and more from ` ```mermaid ` code blocks
- **Sanitized output** — HTML is sanitized with `rehype-sanitize` before rendering
- **Auto-save** — your draft and view mode persist in `localStorage` across sessions

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 8](https://vite.dev/) with [Tailwind CSS 4](https://tailwindcss.com/)
- [react-markdown](https://github.com/remarkjs/react-markdown) with remark/rehype plugins
- [Mermaid](https://mermaid.js.org/) for diagrams

## Getting Started

Requires Node.js 20+.

```bash
npm ci        # install dependencies
npm run dev   # start the dev server at http://localhost:5173
```

### Available Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR           |
| `npm run build`   | Type-check and build for production (`dist`) |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Run ESLint                                   |

## Project Structure

```
src/
├── components/       # Header, Toolbar, SplitView, editor, preview, Mermaid renderer
├── context/          # EditorContext — content, view mode, keyboard shortcuts
├── hooks/            # useLocalStorage
├── constants/        # Default markdown content
└── pages/            # EditorPage
```

## Deployment

Every push to `main` triggers a GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) that builds the app and deploys it to GitHub Pages. The Vite `base` is set to `/Render/` to match the repository name.
