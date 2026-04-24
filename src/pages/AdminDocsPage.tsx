import { useState, useMemo, useEffect } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import "easymde/dist/easymde.min.css"
import { FileText, Save, Lock, ChevronRight, BookOpen, Search, Edit3, Eye, Loader2 } from 'lucide-react'

interface Doc {
  id: string
  name: string
  title: string
  content: string
  isReadOnly?: boolean
}

export default function AdminDocsPage() {
  const [docs, setDocs] = useState<Doc[]>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // Fetch docs from filesystem via our Vite middleware
  const fetchDocs = async () => {
    try {
      const res = await fetch('/api/docs')
      const data = await res.json()
      setDocs(data)
      if (data.length > 0 && !selectedId) {
        setSelectedId(data[0].id)
      }
    } catch (err) {
      console.error('Failed to fetch docs:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDocs()
  }, [])

  const selectedDoc = docs.find(d => d.id === selectedId)

  const filteredDocs = docs.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleContentChange = (value: string) => {
    if (!selectedDoc || selectedDoc.isReadOnly) return
    setDocs(prev => prev.map(d => d.id === selectedId ? { ...d, content: value } : d))
  }

  const handleSave = async () => {
    if (!selectedDoc || selectedDoc.isReadOnly) return
    setSaving(true)
    try {
      const res = await fetch('/api/docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: selectedDoc.name, content: selectedDoc.content })
      })
      if (res.ok) {
        setIsEditing(false)
        // Re-fetch to ensure sync
        await fetchDocs()
      } else {
        const err = await res.text()
        alert(`Error saving: ${err}`)
      }
    } catch (err) {
      alert(`Network error: ${err}`)
    } finally {
      setSaving(false)
    }
  }

  const mdeOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      placeholder: "Write your documentation here...",
      status: ["lines", "words", "cursor"],
      toolbar: [
        "bold", "italic", "heading", "|", 
        "quote", "unordered-list", "ordered-list", "|", 
        "link", "image", "table", "|", 
        "preview", "side-by-side", "fullscreen", "|", 
        "guide"
      ]
    }
  }, [])

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
          <span className="text-slate-500 font-medium">Loading Knowledge Base...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-80 bg-slate-900/50 border-r border-white/5 flex flex-col shrink-0 overflow-y-auto">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-brand-400" />
            <h1 className="text-xl font-serif font-bold text-white">Internal Docs</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="flex-1 py-4">
          {filteredDocs.map(doc => (
            <button
              key={doc.id}
              onClick={() => {
                setSelectedId(doc.id)
                setIsEditing(false)
              }}
              className={`w-full flex items-center justify-between px-6 py-3 transition-colors ${
                selectedId === doc.id ? 'bg-brand-500/10 border-r-2 border-brand-500' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <FileText className={`w-4 h-4 shrink-0 ${selectedId === doc.id ? 'text-brand-400' : 'text-slate-500'}`} />
                <div className="text-left overflow-hidden">
                  <div className={`text-sm font-medium truncate ${selectedId === doc.id ? 'text-white' : 'text-slate-400'}`}>
                    {doc.title}
                  </div>
                  <div className="text-[10px] text-slate-600 truncate">{doc.name}</div>
                </div>
              </div>
              {doc.isReadOnly && <Lock className="w-3 h-3 text-slate-700" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {selectedDoc ? (
          <>
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/40">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
                  <BookOpen className="w-3 h-3 text-brand-500/50" />
                  <span>Knowledge Base</span>
                  <ChevronRight className="w-2.5 h-2.5 opacity-30" />
                  <span className="text-brand-400/80">{selectedDoc.name}</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-white truncate">{selectedDoc.title}</h2>
              </div>
              
              <div className="flex items-center gap-4 ml-6">
                {!selectedDoc.isReadOnly && (
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 shadow-inner">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        !isEditing 
                          ? 'bg-brand-500 text-slate-950 shadow-gold' 
                          : 'text-slate-500 hover:text-white'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        isEditing 
                          ? 'bg-brand-500 text-slate-950 shadow-gold' 
                          : 'text-slate-500 hover:text-white'
                      }`}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                  </div>
                )}

                {isEditing && (
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary py-2.5 px-6 text-sm flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                )}

                {selectedDoc.isReadOnly && (
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 rounded-xl text-xs font-bold text-slate-500 border border-white/5 uppercase tracking-widest">
                    <Lock className="w-3.5 h-3.5" />
                    Archive Locked
                  </div>
                )}
              </div>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-8 md:p-16 bg-slate-950/40">
              <div className="max-w-4xl mx-auto">
                {isEditing ? (
                  <div className="custom-mde h-full">
                    <SimpleMDE 
                      value={selectedDoc.content} 
                      onChange={handleContentChange} 
                      options={mdeOptions}
                    />
                  </div>
                ) : (
                  <article className="prose prose-invert prose-brand max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedDoc.content}
                    </ReactMarkdown>
                  </article>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-700">
            <BookOpen className="w-16 h-16 mb-6 opacity-5" />
            <p className="font-serif text-lg opacity-20 italic">Select a record from the archives...</p>
          </div>
        )}
      </div>

      <style>{`
        .custom-mde .editor-toolbar {
          border-color: rgba(255, 255, 255, 0.05);
          background: rgba(15, 23, 42, 0.8);
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          padding: 12px;
          backdrop-blur-md;
        }
        .custom-mde .editor-toolbar button {
          color: #94a3b8;
          border-radius: 4px;
        }
        .custom-mde .editor-toolbar button.active,
        .custom-mde .editor-toolbar button:hover {
          background: rgba(197, 160, 89, 0.15);
          color: #c5a059;
        }
        .custom-mde .CodeMirror {
          border-color: rgba(255, 255, 255, 0.05);
          background: rgba(15, 23, 42, 0.3);
          color: #cbd5e1;
          font-family: 'Inter', sans-serif;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          min-height: 550px;
          font-size: 15px;
          padding: 20px;
        }
        .custom-mde .CodeMirror-cursor {
          border-left: 2px solid #c5a059;
        }

        /* Antigravity Research Artifact Aesthetic */
        .artifact-viewer {
          background-color: #0b1e24; /* Specific Dark Teal from Screenshot */
          color: #e2e8f0;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .prose { 
          font-size: 0.9375rem; 
          line-height: 1.6; 
          color: #ccd5df;
        }
        .prose h1 { 
          @apply text-xl font-bold text-white mt-0 mb-8;
          font-family: 'Inter', sans-serif;
        }
        .prose h2 { 
          @apply text-base font-bold text-white mt-10 mb-5; 
        }
        .prose h3 { 
          @apply text-sm font-bold text-white mt-8 mb-4; 
        }
        .prose p { 
          @apply mb-4; 
        }
        .prose strong { 
          @apply text-white font-bold; 
        }
        .prose code {
          @apply bg-white/10 text-brand-300 px-1.5 py-0.5 rounded text-[0.8em] font-mono;
        }
        .prose ul { 
          @apply list-disc list-outside mb-6 ml-6 space-y-2; 
        }
        .prose ol { 
          @apply list-decimal list-outside mb-6 ml-6 space-y-2; 
        }
        .prose li { 
          @apply pl-1; 
        }
        .prose blockquote { 
          @apply border-l-2 border-slate-700 pl-6 py-1 italic text-slate-400 my-8; 
        }
        .prose table { 
          @apply w-full border-collapse mb-8 text-xs; 
        }
        .prose th { 
          @apply text-left bg-white/5 p-3 border border-white/10 text-slate-200 font-bold; 
        }
        .prose td { 
          @apply p-3 border border-white/10 text-slate-400; 
        }
        .prose a { 
          @apply text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/20 underline-offset-4; 
        }
        .prose hr { 
          @apply border-white/5 my-12; 
        }
      `}</style>
    </div>
  )
}
