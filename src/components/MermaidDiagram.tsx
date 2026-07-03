import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({ startOnLoad: false, theme: 'default' })

let idCounter = 0

export default function MermaidDiagram({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!ref.current) return
    setError(null)
    const id = `mermaid-${++idCounter}`
    mermaid
      .render(id, code)
      .then(({ svg }) => {
        if (ref.current) ref.current.innerHTML = svg
      })
      .catch(err => setError(String(err)))
  }, [code])

  if (error) {
    return (
      <pre className="text-red-500 text-sm p-3 bg-red-50 rounded border border-red-200">
        Mermaid error: {error}
      </pre>
    )
  }

  return <div ref={ref} className="my-4 overflow-x-auto flex justify-center" />
}
