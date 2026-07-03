import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DEFAULT_CONTENT } from '../constants/defaultContent'

export type ViewMode = 'split' | 'editor' | 'preview' | 'read'
export type Theme = 'light' | 'dark'

interface EditorContextValue {
  content: string
  setContent: (value: string) => void
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  isReadMode: boolean
  theme: Theme
  toggleTheme: () => void
}

const EditorContext = createContext<EditorContextValue | null>(null)

export function EditorProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useLocalStorage('md-editor-draft', DEFAULT_CONTENT)
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>('md-editor-mode', 'split')
  const [theme, setTheme] = useLocalStorage<Theme>('md-editor-theme', 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Global keyboard shortcuts: E → edit (split), R → read
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'TEXTAREA' || tag === 'INPUT') return
      if (e.key === 'e' || e.key === 'E') setViewMode('split')
      if (e.key === 'r' || e.key === 'R') setViewMode('read')
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setViewMode])

  return (
    <EditorContext.Provider value={{
      content,
      setContent,
      viewMode,
      setViewMode,
      isReadMode: viewMode === 'read',
      theme,
      toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    }}>
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const ctx = useContext(EditorContext)
  if (!ctx) throw new Error('useEditor must be used inside EditorProvider')
  return ctx
}
