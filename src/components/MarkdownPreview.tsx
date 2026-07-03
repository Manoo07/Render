import { useRef, useState, type HTMLAttributes, type ReactElement } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { useEditor } from '../context/EditorContext'
import type { Components } from 'react-markdown'
import MermaidDiagram from './MermaidDiagram'

interface Props {
  scrollable?: boolean
}

// Standalone component so hooks work correctly inside react-markdown's renderer
function CopyableCode({ children, ...props }: HTMLAttributes<HTMLPreElement>) {
  const ref = useRef<HTMLPreElement>(null)

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = ref.current?.textContent ?? ''
    navigator.clipboard.writeText(text.trimEnd()).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {})
  }

  return (
    <div className="relative">
      <pre ref={ref} {...props}>{children}</pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-3 py-1 text-xs font-medium bg-[#2d3748] hover:bg-[#3d4f68] text-[#a8b3c4] hover:text-white rounded-md transition-colors border border-[#3d4f68]"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  )
}

function PreBlock({ children, ...props }: HTMLAttributes<HTMLPreElement>) {
  const codeChild = children as ReactElement<{ className?: string; children?: string }>
  if (codeChild?.props?.className?.includes('language-mermaid')) {
    const code = String(codeChild.props.children ?? '').trimEnd()
    return <MermaidDiagram code={code} />
  }
  return <CopyableCode {...props}>{children}</CopyableCode>
}

const MD_COMPONENTS: Components = {
  pre: PreBlock as Components['pre'],
}

export default function MarkdownPreview({ scrollable = true }: Props) {
  const { content } = useEditor()

  return (
    <div className={`bg-white h-full ${scrollable ? 'overflow-y-auto' : ''}`}>
      <article className="prose px-6 py-5 max-w-none">
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
          components={MD_COMPONENTS}
        >
          {content}
        </Markdown>
      </article>
    </div>
  )
}
