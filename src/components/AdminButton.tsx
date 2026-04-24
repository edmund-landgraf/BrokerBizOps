import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, Inbox, FileText, X } from 'lucide-react'

export default function AdminButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="bg-slate-900 border border-brand-500/30 rounded-2xl p-2 shadow-gold flex items-center gap-2 animate-fade-up">
          <Link 
            to="/admin/inbox" 
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-brand-500/10 text-slate-300 hover:text-white rounded-xl transition-all text-xs font-bold uppercase tracking-widest"
          >
            <Inbox className="w-4 h-4 text-brand-400" />
            Inbox
          </Link>
          <div className="w-px h-6 bg-white/5" />
          <Link 
            to="/admin/docs" 
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-brand-500/10 text-slate-300 hover:text-white rounded-xl transition-all text-xs font-bold uppercase tracking-widest"
          >
            <FileText className="w-4 h-4 text-brand-400" />
            Docs
          </Link>
          <div className="w-px h-6 bg-white/5" />
          <button 
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-white/5 text-slate-500 hover:text-white rounded-xl transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button 
          onClick={() => setOpen(true)}
          className="w-12 h-12 rounded-full bg-slate-900 border border-brand-500/30 shadow-gold flex items-center justify-center hover:scale-110 transition-transform group"
        >
          <Shield className="w-5 h-5 text-brand-400 group-hover:text-brand-300 transition-colors" />
        </button>
      )}
    </div>
  )
}
