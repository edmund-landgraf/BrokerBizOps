import { useState, useEffect } from 'react'
import { Inbox, Clock, User, Mail, Phone, MessageSquare, ChevronRight, Search, Loader2 } from 'lucide-react'

interface Submission {
  id: string
  timestamp: string
  name: string
  firm: string
  email: string
  phone: string
  matter: string
  notes: string
}

export default function AdminInboxPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/contact/submissions')
      const data = await res.json()
      setSubmissions(data)
      if (data.length > 0) setSelectedId(data[0].id)
    } catch (err) {
      console.error('Failed to fetch submissions:', err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = submissions.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.matter.toLowerCase().includes(search.toLowerCase())
  )

  const selected = submissions.find(s => s.id === selectedId)

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-950 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-96 bg-slate-900/50 border-r border-white/5 flex flex-col shrink-0 overflow-y-auto">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-2 mb-6">
            <Inbox className="w-5 h-5 text-brand-400" />
            <h1 className="text-xl font-serif font-bold text-white">Contact Inbox</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="flex-1 py-2">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-slate-600 italic text-sm">No submissions found</div>
          ) : (
            filtered.map(s => (
              <button
                key={s.id}
                onClick={() => setSelectedId(s.id)}
                className={`w-full flex flex-col p-6 text-left transition-colors border-b border-white/5 ${
                  selectedId === s.id ? 'bg-brand-500/10 border-r-2 border-brand-500' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className={`text-sm font-bold ${selectedId === s.id ? 'text-white' : 'text-slate-300'}`}>
                    {s.name}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-tighter">
                    {new Date(s.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-xs text-brand-400/80 font-medium mb-2">{s.matter}</div>
                <div className="text-[11px] text-slate-500 truncate w-full">{s.notes}</div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-slate-950 overflow-y-auto">
        {selected ? (
          <div className="p-8 md:p-16 max-w-4xl">
            <div className="mb-12">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4">
                <Clock className="w-3 h-3 text-brand-500/50" />
                <span>Submitted {new Date(selected.timestamp).toLocaleString()}</span>
              </div>
              <h2 className="text-4xl font-serif font-bold text-white mb-2">{selected.name}</h2>
              {selected.firm && (
                <div className="text-brand-400 font-medium">{selected.firm}</div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                { icon: Mail, label: 'Email Address', value: selected.email, href: `mailto:${selected.email}` },
                { icon: Phone, label: 'Phone Number', value: selected.phone || 'Not provided', href: selected.phone ? `tel:${selected.phone}` : undefined },
                { icon: Inbox, label: 'Matter Type', value: selected.matter },
                { icon: User, label: 'Submission ID', value: selected.id },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-slate-900/40 border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon className="w-4 h-4 text-brand-500/50" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.label}</span>
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-white font-medium hover:text-brand-400 transition-colors">{item.value}</a>
                  ) : (
                    <div className="text-white font-medium">{item.value}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-4 h-4 text-brand-500/50" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Property / Matter Details</span>
              </div>
              <div className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                {selected.notes || <span className="italic text-slate-600">No additional notes provided.</span>}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-700">
            <Inbox className="w-16 h-16 mb-6 opacity-5" />
            <p className="font-serif text-lg opacity-20 italic">Select a message to view details...</p>
          </div>
        )}
      </div>
    </div>
  )
}
