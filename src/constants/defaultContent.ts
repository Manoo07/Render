export const DEFAULT_CONTENT = `# Welcome to Markdown Editor

> A **live** Markdown editor with GitHub Flavored Markdown support.
> Edit on the left, see the rendered output on the right — or switch to **Read Mode** for a distraction-free view.

---

## Getting Started

Click anywhere in the editor panel and start writing. Your work is **automatically saved** to your browser's local storage every 2 seconds.

Use the toolbar above to insert formatting, or type Markdown directly — it's instantly rendered on the right.

---

## Text Formatting

You can write **bold**, *italic*, ~~strikethrough~~, and \`inline code\` inline.

Combine them: **_bold italic_**, or \`**bold code**\`.

---

## Code Blocks

\`\`\`typescript
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
\`\`\`

\`\`\`bash
npm run dev
npm run build
npm run deploy
\`\`\`

---

## Tables

| Feature               | Status  | Notes                     |
|-----------------------|---------|---------------------------|
| Live Preview          | ✅ Done | Instant, no refresh       |
| GFM Support           | ✅ Done | Tables, task lists, etc.  |
| Syntax Highlighting   | ✅ Done | 190+ languages             |
| Auto-save             | ✅ Done | Every 2 seconds            |
| Read Mode             | ✅ Done | Centered, distraction-free |
| Export Markdown       | ✅ Done | Downloads .md file         |

---

## Task Lists

- [x] Create the split-pane editor
- [x] Add live Markdown preview
- [x] Implement auto-save to localStorage
- [x] Syntax highlighting for code blocks
- [x] Export Markdown as file
- [ ] Add Mermaid diagram support
- [ ] Dark mode
- [ ] Export to PDF

---

## Blockquotes

> "The best documentation is the one that writes itself."
> — Anonymous Developer

Nested blockquote:

> Outer quote
>> Inner quote — goes deeper

---

## Links & Images

Visit [GitHub](https://github.com) to explore open-source projects.

Inline image syntax: \`![alt text](url)\`

---

## Keyboard Shortcuts

| Shortcut       | Action              |
|----------------|---------------------|
| \`Ctrl + B\`     | Bold                |
| \`Ctrl + I\`     | Italic              |
| \`Ctrl + K\`     | Insert link         |
| \`Tab\`          | Indent (2 spaces)   |
| \`E\` (global)  | Toggle Read Mode    |

---

## Horizontal Rules

Use \`---\` or \`***\` to create a horizontal divider:

***

Happy writing! ✍️
`;
