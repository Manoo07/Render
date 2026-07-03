import { useEditor, type ViewMode } from '../context/EditorContext'

const OUTLINE_BTN =
  'flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 dark:border-[#3c3c3c] text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-[#333333] transition-colors'

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
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-[#333333] dark:hover:text-gray-200',
      ].join(' ')}
    >
      {label}
    </button>
  )

  return (
    <header className="h-14 flex items-center justify-between px-4 bg-white dark:bg-[#252526] border-b border-gray-200 dark:border-[#333333] shrink-0 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.56 3.34A1 1 0 0 0 19.7 3H4.3a1 1 0 0 0-.86.34A1 1 0 0 0 3.21 4.2l7.7 15.4a1.18 1.18 0 0 0 2.18 0l7.7-15.4a1 1 0 0 0-.23-.86z" />
        </svg>
        <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm hidden sm:block">Markdown Editor</span>
      </div>

      {/* View mode toggles */}
      <div className="flex items-center gap-1 bg-gray-50 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333333] rounded-lg p-1">
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
            className={OUTLINE_BTN}
          >
            <EyeIcon />
            <span className="hidden sm:inline">Read mode</span>
          </button>
        )}
        <ThemeToggle />
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
    <button onClick={download} title="Export as .md" className={OUTLINE_BTN}>
      <DownloadIcon />
      <span className="hidden sm:inline">Export</span>
    </button>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useEditor()

  return (
    <button
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={OUTLINE_BTN}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
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
