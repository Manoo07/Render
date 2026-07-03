import Header from '../components/Header'
import SplitView from '../components/SplitView'
import MarkdownPreview from '../components/MarkdownPreview'
import { useEditor } from '../context/EditorContext'

export default function EditorPage() {
  const { isReadMode } = useEditor()

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <Header />

      {isReadMode ? (
        <ReadModeView />
      ) : (
        <main className="flex-1 overflow-hidden">
          <SplitView />
        </main>
      )}
    </div>
  )
}

function ReadModeView() {
  const { setViewMode } = useEditor()

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Read Mode</span>
          <button
            onClick={() => setViewMode('split')}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M15.232 5.232l3.536 3.536M9 11l6.768-6.768a2 2 0 0 1 2.828 2.828L11.828 13.828A4 4 0 0 1 9 15H7v-2a4 4 0 0 1 2.172-2.828z" />
            </svg>
            Edit (E)
          </button>
        </div>

        <MarkdownPreview scrollable={false} />
      </div>
    </main>
  )
}
