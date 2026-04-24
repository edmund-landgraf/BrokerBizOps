import { useState } from 'react'
import PortalLogin from '../components/PortalLogin'
import PortalDashboard from '../components/PortalDashboard'

export default function PortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="pt-20 min-h-screen bg-slate-950 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
      
      <div className="relative z-10">
        {!isLoggedIn ? (
          <PortalLogin onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <PortalDashboard onLogout={() => setIsLoggedIn(false)} />
        )}
      </div>
    </div>
  )
}
