import { useState, useMemo } from 'react'
import SimpleMDE from 'react-simplemde-editor'
import "easymde/dist/easymde.min.css"
import { FileText, Save, Lock, ChevronRight, BookOpen, Search } from 'lucide-react'

// Mock initial data - In a real app, this would come from a backend or Vite ?raw imports
const initialDocs = [
  { 
    id: 'competitor_research', 
    name: 'competitor_research.md', 
    title: 'Competitor Research',
    content: `# Deep Research: B2B Real Estate Broker Competitor Analysis & Client Roleplay\n\n## 1. Competitor Analysis & Market Landscape...`
  },
  { 
    id: 'expanded_services', 
    name: 'expanded_services.md', 
    title: 'Strategic Service Expansion',
    content: `# Strategic Service Expansion: B2B Transactional Verticals\n\nTo transition from a simple residential probate broker...`
  },
  { 
    id: 'rebrand_walkthrough', 
    name: 'rebrand_walkthrough.md', 
    title: 'Rebrand Walkthrough',
    content: `# Rebrand Walkthrough: Sams Valuations\n\nI have completed the full rebranding from **Meridian Valuations** to **Sams Valuations**...`
  },
  { 
    id: 'client_portal_walkthrough', 
    name: 'client_portal_walkthrough.md', 
    title: 'Client Portal Feature',
    content: `# Feature Walkthrough: Client Portal\n\nI have implemented a secure-looking Client Portal...`
  },
  { 
    id: 'readme', 
    name: 'README.md', 
    title: 'Documentation Index',
    isReadOnly: true,
    content: `# Internal Documentation\n\nThis directory contains research, walkthroughs, and strategic documentation...`
  }
]

export default function AdminDocsPage() {
  const [docs, setDocs] = useState(initialDocs)
  const [selectedId, setSelectedId] = useState('competitor_research')
  const [search, setSearch] = useState('')
  const [saving, setSaving] = useState(false)

  const selectedDoc = docs.find(d => d.id === selectedId) || docs[0]

  const filteredDocs = docs.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleContentChange = (value: string) => {
    if (selectedDoc.isReadOnly) return
    setDocs(prev => prev.map(d => d.id === selectedId ? { ...d, content: value } : d))
  }

  const handleSave = () => {
    if (selectedDoc.isReadOnly) return
    setSaving(true)
    // Simulate save
    setTimeout(() => {
      setSaving(false)
      alert(`Success: Changes to ${selectedDoc.name} have been simulated. In a production environment, this would commit to Git via the backend.`)
    }, 800)
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
      ],
      readOnly: selectedDoc.isReadOnly
    }
  }, [selectedDoc.isReadOnly])

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
              onClick={() => setSelectedId(doc.id)}
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

      {/* Editor Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {/* Editor Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/20">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Internal Docs</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-400">{selectedDoc.name}</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">{selectedDoc.title}</h2>
          </div>
          
          <div className="flex items-center gap-3">
            {selectedDoc.isReadOnly ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-xs font-semibold text-slate-400 border border-white/5 cursor-not-allowed">
                <Lock className="w-4 h-4" />
                Read Only
              </div>
            ) : (
              <button 
                onClick={handleSave}
                disabled={saving}
                className="btn-primary py-2 px-5 text-sm flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>

        {/* Editor Wrapper */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-mde">
          <SimpleMDE 
            value={selectedDoc.content} 
            onChange={handleContentChange} 
            options={mdeOptions}
          />
        </div>
      </div>

      <style>{`
        .custom-mde .editor-toolbar {
          border-color: rgba(255, 255, 255, 0.05);
          background: rgba(15, 23, 42, 0.5);
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
        }
        .custom-mde .editor-toolbar button {
          color: #94a3b8;
        }
        .custom-mde .editor-toolbar button.active,
        .custom-mde .editor-toolbar button:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }
        .custom-mde .CodeMirror {
          border-color: rgba(255, 255, 255, 0.05);
          background: transparent;
          color: #cbd5e1;
          font-family: 'Inter', sans-serif;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          min-height: 400px;
        }
        .custom-mde .editor-preview-side {
          background: #0b1220;
          border-left-color: rgba(255, 255, 255, 0.05);
          color: #cbd5e1;
        }
        .custom-mde .editor-preview {
          background: #0b1220;
          color: #cbd5e1;
        }
        .custom-mde .CodeMirror-cursor {
          border-left: 2px solid #c5a059;
        }
      `}</style>
    </div>
  )
}
