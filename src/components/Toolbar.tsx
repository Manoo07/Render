import React from 'react'
import { useEditor } from '../context/EditorContext'

interface ToolAction {
  label: string
  title: string
  icon: React.ReactNode
  wrap?: [string, string]
  line?: string
}

const ACTIONS: ToolAction[] = [
  {
    label: 'H',
    title: 'Heading (##)',
    icon: <span className="font-bold text-xs">H</span>,
    line: '## ',
  },
  {
    label: 'B',
    title: 'Bold (**text**)',
    icon: <span className="font-bold text-xs">B</span>,
    wrap: ['**', '**'],
  },
  {
    label: 'I',
    title: 'Italic (*text*)',
    icon: <span className="italic text-xs">I</span>,
    wrap: ['*', '*'],
  },
  {
    label: '~~',
    title: 'Strikethrough',
    icon: <span className="line-through text-xs">S</span>,
    wrap: ['~~', '~~'],
  },
  {
    label: '`',
    title: 'Inline code',
    icon: <span className="font-mono text-xs">`</span>,
    wrap: ['`', '`'],
  },
  {
    label: '```',
    title: 'Code block',
    icon: <span className="font-mono text-xs">{'<>'}</span>,
    wrap: ['```\n', '\n```'],
  },
  {
    label: '>',
    title: 'Blockquote',
    icon: <span className="text-xs font-bold">❝</span>,
    line: '> ',
  },
  {
    label: '-',
    title: 'Unordered list',
    icon: <span className="text-xs">—</span>,
    line: '- ',
  },
  {
    label: '1.',
    title: 'Ordered list',
    icon: <span className="text-xs font-mono">1.</span>,
    line: '1. ',
  },
  {
    label: '[]',
    title: 'Task item',
    icon: <span className="text-xs">☐</span>,
    line: '- [ ] ',
  },
  {
    label: 'link',
    title: 'Link',
    icon: <LinkIcon />,
    wrap: ['[', '](url)'],
  },
  {
    label: 'img',
    title: 'Image',
    icon: <ImageIcon />,
    wrap: ['![', '](url)'],
  },
  {
    label: '---',
    title: 'Horizontal rule',
    icon: <span className="text-xs font-bold">─</span>,
    line: '\n---\n',
  },
]

export default function Toolbar({ textareaRef }: { textareaRef: React.RefObject<HTMLTextAreaElement | null> }) {
  const { content, setContent } = useEditor()

  const applyAction = (action: ToolAction) => {
    const el = textareaRef.current
    if (!el) return

    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = content.slice(start, end)

    let newContent: string
    let newCursor: number

    if (action.line) {
      const lineStart = content.lastIndexOf('\n', start - 1) + 1
      newContent = content.slice(0, lineStart) + action.line + content.slice(lineStart)
      newCursor = start + action.line.length
    } else if (action.wrap) {
      const [before, after] = action.wrap
      const replacement = selected || 'text'
      newContent = content.slice(0, start) + before + replacement + after + content.slice(end)
      newCursor = selected
        ? start + before.length + selected.length + after.length
        : start + before.length + replacement.length
    } else {
      return
    }

    setContent(newContent)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(newCursor, newCursor)
    })
  }

  return (
    <div className="flex items-center gap-0.5 px-3 py-1.5 bg-gray-50 border-b border-gray-200 flex-wrap">
      {ACTIONS.map((action, i) => (
        <button
          key={i}
          title={action.title}
          onMouseDown={(e) => { e.preventDefault(); applyAction(action) }}
          className="w-8 h-7 flex items-center justify-center rounded text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors text-sm"
        >
          {action.icon}
        </button>
      ))}
    </div>
  )
}

function LinkIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
    </svg>
  )
}

function ImageIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}
