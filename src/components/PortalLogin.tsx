import { Lock, Mail, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface PortalLoginProps {
  onLogin: () => void
}

export default function PortalLogin({ onLogin }: PortalLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login
    if (email && password) {
      onLogin()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">Client Portal</h2>
          <p className="text-slate-400">Log in to view valuation status and download documents.</p>
        </div>

        <div className="card-glass p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="relative space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white transition-colors">
                <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-brand-500 focus:ring-brand-500 focus:ring-offset-slate-950" />
                Remember me
              </label>
              <a href="#" className="text-brand-400 hover:text-brand-300 transition-colors">Forgot password?</a>
            </div>

            <div className="space-y-3">
              <button type="submit" className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 group">
                Log In to Portal
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                type="button" 
                onClick={onLogin}
                className="w-full btn-outline py-3.5 flex items-center justify-center text-sm"
              >
                Log In as Test User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
