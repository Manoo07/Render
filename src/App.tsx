import { EditorProvider } from './context/EditorContext'
import EditorPage from './pages/EditorPage'

export default function App() {
  return (
    <EditorProvider>
      <EditorPage />
    </EditorProvider>
  )
}
