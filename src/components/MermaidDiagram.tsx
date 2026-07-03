import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { useEditor } from '../context/EditorContext'

let idCounter = 0

export default function MermaidDiagram({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = useEditor()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!ref.current) return
    setError(null)
    mermaid.initialize({
      startOnLoad: false,
      theme: theme === 'dark' ? 'dark' : 'default',
      darkMode: theme === 'dark',
      themeVariables: theme === 'dark' ? { background: '#1e1e1e' } : undefined,
    })
    const id = `mermaid-${++idCounter}`
    mermaid
      .render(id, code)
      .then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg
      })
      .catch(err => setError(String(err)))
  }, [code, theme])

  if (error) {
    return (
      <pre className="text-red-500 text-sm p-3 bg-red-50 dark:bg-red-950/40 rounded border border-red-200 dark:border-red-900">
        Mermaid error: {error}
      </pre>
    )
  }

  return <div ref={ref} className="my-4 overflow-x-auto flex justify-center" />
}
