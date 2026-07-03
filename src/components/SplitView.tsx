import { useState, useRef, useCallback, useEffect } from 'react'
import MarkdownEditor from './MarkdownEditor'
import MarkdownPreview from './MarkdownPreview'
import { useEditor } from '../context/EditorContext'

export default function SplitView() {
  const { viewMode } = useEditor()
  const [splitRatio, setSplitRatio] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const onMouseDown = useCallback(() => { dragging.current = true }, [])

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = ((e.clientX - rect.left) / rect.width) * 100
    setSplitRatio(Math.min(80, Math.max(20, pct)))
  }, [])

  const onMouseUp = useCallback(() => { dragging.current = false }, [])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [onMouseMove, onMouseUp])

  if (viewMode === 'editor') {
    return (
      <div className="h-full overflow-hidden">
        <MarkdownEditor />
      </div>
    )
  }

  if (viewMode === 'preview') {
    return (
      <div className="h-full overflow-hidden">
        <MarkdownPreview />
      </div>
    )
  }

  // split
  return (
    <div ref={containerRef} className="flex h-full overflow-hidden select-none">
      {/* Editor pane */}
      <div style={{ width: `${splitRatio}%` }} className="flex flex-col overflow-hidden border-r border-gray-200 dark:border-[#333333]">
        <PaneLabel label="Editor" />
        <div className="flex-1 overflow-hidden">
          <MarkdownEditor />
        </div>
      </div>

      {/* Drag handle */}
      <div
        onMouseDown={onMouseDown}
        className="w-1 bg-gray-200 dark:bg-[#333333] hover:bg-blue-400 dark:hover:bg-blue-500 cursor-col-resize transition-colors shrink-0 active:bg-blue-500"
        role="separator"
        aria-label="Resize editor and preview"
      />

      {/* Preview pane */}
      <div style={{ width: `${100 - splitRatio}%` }} className="flex flex-col overflow-hidden">
        <PaneLabel label="Preview" />
        <div className="flex-1 overflow-hidden">
          <MarkdownPreview />
        </div>
      </div>
    </div>
  )
}

function PaneLabel({ label }: { label: string }) {
  return (
    <div className="h-8 flex items-center px-4 bg-gray-50 dark:bg-[#252526] border-b border-gray-200 dark:border-[#333333] shrink-0">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
    </div>
  )
}
