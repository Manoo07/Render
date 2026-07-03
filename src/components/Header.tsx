import { useEditor, type ViewMode } from '../context/EditorContext'

export default function Header() {
  const { viewMode, setViewMode, isReadMode } = useEditor()

  const modeBtn = (mode: ViewMode, label: string, title: string) => (
    <button
      title={title}
      onClick={() => setViewMode(mode)}
      className={[
        'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
        viewMode === mode
          ? 'bg-blue-600 text-white shadow-sm'
          : 'text-gray-600 hover:bg-gray-100',
      ].join(' ')}
    >
      {label}
    </button>
  )

  return (
    <header className="h-14 flex items-center justify-between px-4 bg-white border-b border-gray-200 shrink-0 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.56 3.34A1 1 0 0 0 19.7 3H4.3a1 1 0 0 0-.86.34A1 1 0 0 0 3.21 4.2l7.7 15.4a1.18 1.18 0 0 0 2.18 0l7.7-15.4a1 1 0 0 0-.23-.86z" />
        </svg>
        <span className="font-semibold text-gray-900 text-sm hidden sm:block">Markdown Editor</span>
      </div>

      {/* View mode toggles */}
      <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1">
        {modeBtn('split', 'Split', 'Split view (E)')}
        {modeBtn('editor', 'Editor', 'Editor only')}
        {modeBtn('preview', 'Preview', 'Preview only')}
        {modeBtn('read', 'Read', 'Read mode (R)')}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {isReadMode ? (
          <button
            onClick={() => setViewMode('split')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            <PencilIcon />
            Edit
          </button>
        ) : (
          <button
            onClick={() => setViewMode('read')}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          >
            <EyeIcon />
            <span className="hidden sm:inline">Read mode</span>
          </button>
        )}
        <ExportButton />
      </div>
    </header>
  )
}

function ExportButton() {
  const { content } = useEditor()

  const download = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={download}
      title="Export as .md"
      className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
    >
      <DownloadIcon />
      <span className="hidden sm:inline">Export</span>
    </button>
  )
}

function PencilIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6.768-6.768a2 2 0 0 1 2.828 2.828L11.828 13.828A4 4 0 0 1 9 15H7v-2a4 4 0 0 1 2.172-2.828z" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5 5 5-5M12 15V3" />
    </svg>
  )
}
