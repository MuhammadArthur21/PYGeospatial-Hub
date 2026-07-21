import { useRef } from 'react'
import Editor, { loader } from '@monaco-editor/react'

// Configure Monaco to use CDN
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/min/vs',
  },
})

export default function CodeEditor({ value, onChange, language = 'python', height = '100%' }) {
  const editorRef = useRef(null)

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor
    // Set tab size for Python
    editor.getModel()?.updateOptions({ tabSize: 4, insertSpaces: true })
  }

  return (
    <Editor
      height={height}
      language={language}
      value={value}
      onChange={(val) => onChange(val || '')}
      onMount={handleEditorDidMount}
      theme="vs-dark"
      options={{
        fontSize: 13,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        minimap: { enabled: false },
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: 'on',
        tabSize: 4,
        renderWhitespace: 'selection',
        bracketPairColorization: { enabled: true },
        padding: { top: 12, bottom: 12 },
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        formatOnPaste: true,
      }}
    />
  )
}
