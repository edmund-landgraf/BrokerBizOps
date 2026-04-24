import { useState, useEffect } from 'react'
import { FileText, Lock, BookOpen, Search, Loader2 } from 'lucide-react'
import MarkdownWidget from '../components/MarkdownWidget'

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
  const [loading, setLoading] = useState(true)

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

  const handleSave = async (id: string, newContent: string) => {
    const doc = docs.find(d => d.id === id)
    if (!doc) return

    try {
      const res = await fetch('/api/docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: doc.name, content: newContent })
      })
      if (res.ok) {
        // Update local state
        setDocs(prev => prev.map(d => d.id === id ? { ...d, content: newContent } : d))
      } else {
        const err = await res.text()
        alert(`Error saving: ${err}`)
      }
    } catch (err) {
      alert(`Network error: ${err}`)
    }
  }

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

      {/* Content Area - Using the Widget */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {selectedDoc ? (
          <MarkdownWidget doc={selectedDoc} onSave={handleSave} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-700">
            <BookOpen className="w-16 h-16 mb-6 opacity-5" />
            <p className="font-serif text-lg opacity-20 italic">Select a record from the archives...</p>
          </div>
        )}
      </div>
    </div>
  )
}
