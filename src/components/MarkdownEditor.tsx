import { useRef, useCallback, type ChangeEvent, type KeyboardEvent } from 'react'
import { useEditor } from '../context/EditorContext'
import Toolbar from './Toolbar'

export default function MarkdownEditor() {
  const { content, setContent } = useEditor()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value),
    [setContent],
  )

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget
    const start = el.selectionStart
    const end = el.selectionEnd

    // Tab → insert 2 spaces
    if (e.key === 'Tab') {
      e.preventDefault()
      const next = content.slice(0, start) + '  ' + content.slice(end)
      setContent(next)
      requestAnimationFrame(() => el.setSelectionRange(start + 2, start + 2))
      return
    }

    // Enter → auto-continue list items
    if (e.key === 'Enter') {
      const lineStart = content.lastIndexOf('\n', start - 1) + 1
      const line = content.slice(lineStart, start)
      const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(\[[ x]\]\s+)?/)
      if (listMatch) {
        e.preventDefault()
        const prefix = listMatch[0]
        // blank line after empty list item → end the list
        const isEmptyItem = line.trim() === listMatch[0].trimEnd()
        if (isEmptyItem) {
          const next = content.slice(0, lineStart) + '\n' + content.slice(end)
          setContent(next)
          requestAnimationFrame(() => el.setSelectionRange(lineStart + 1, lineStart + 1))
        } else {
          const next = content.slice(0, start) + '\n' + prefix + content.slice(end)
          setContent(next)
          requestAnimationFrame(() => el.setSelectionRange(start + 1 + prefix.length, start + 1 + prefix.length))
        }
      }
    }
  }, [content, setContent])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Toolbar textareaRef={textareaRef} />
      <div className="flex-1 overflow-hidden relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck
          className="editor-textarea w-full h-full p-5 bg-white text-gray-800 border-0"
          placeholder="Start writing Markdown…"
          aria-label="Markdown editor"
        />
        <SaveIndicator />
      </div>
    </div>
  )
}

function SaveIndicator() {
  return (
    <span className="absolute bottom-3 right-4 text-xs text-gray-400 select-none pointer-events-none">
      Auto-saved
    </span>
  )
}
