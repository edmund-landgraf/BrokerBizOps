import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../assets/sams.png'

const links = [
  { label: 'Services',    href: '/services'    },
  { label: 'Who We Serve',href: '/clients'     },
  { label: 'Why a Broker',href: '/why-broker'  },
  { label: 'Process',     href: '/process'     },
  { label: 'Testimonials',href: '/testimonials'},
  { label: 'Client Portal',href: '/portal'     },
  { label: 'Knowledge Base',href: '/admin/docs'},
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-slate-950/95 backdrop-blur-md shadow-glass py-3' : 'py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Sams Valuations" className="w-12 h-12 object-contain" />
          <span className="font-serif text-2xl font-bold text-white">
            Sams<span className="text-brand-400"> Valuations</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <Link to={l.href}
                className="text-sm font-medium text-slate-400 hover:text-brand-400 transition-colors duration-200 relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link to="/contact" className="btn-primary text-sm py-3 px-6">
            Get a Free Consultation
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.href} to={l.href} onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-brand-400 font-medium transition-colors">
              {l.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary text-sm py-3 text-center mt-2">
            Get a Free Consultation
          </Link>
        </div>
      )}
    </nav>
  )
}
