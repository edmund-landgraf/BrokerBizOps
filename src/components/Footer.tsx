import { Scale } from 'lucide-react'
import { Link } from 'react-router-dom'

const links = {
  Services: [
    { name: 'Broker Price Opinion', path: '/services' },
    { name: 'Portfolio Valuation', path: '/services' },
    { name: 'Litigation Support', path: '/services' },
    { name: 'Retrospective Valuation', path: '/services' },
    { name: 'REO Analysis', path: '/services' },
  ],
  'Who We Serve': [
    { name: 'Probate Attorneys', path: '/clients' },
    { name: 'Divorce Attorneys', path: '/clients' },
    { name: 'Bankruptcy Trustees', path: '/clients' },
    { name: 'Banks & Lenders', path: '/clients' },
    { name: 'CPAs & Tax Advisors', path: '/clients' },
    { name: 'Conservators', path: '/clients' },
  ],
  Company: [
    { name: 'About Us', path: '/why-broker' },
    { name: 'Our Process', path: '/process' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact Us', path: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl font-bold text-white">
                Meridian<span className="text-brand-400"> Valuations</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              California-licensed real estate broker specializing in Broker Price Opinions
              for legal, fiduciary, and financial professionals.
            </p>
            <div className="text-xs text-slate-600">CA DRE License #01234567</div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-slate-500 hover:text-brand-400 text-sm transition-colors">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} Meridian Valuations. All rights reserved.</span>
          <span className="text-center">
            BPOs are not appraisals. Not for use in federally related transactions.
            CA Business & Professions Code §11302.
          </span>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-brand-400 transition-colors">Privacy</Link>
            <Link to="/" className="hover:text-brand-400 transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
