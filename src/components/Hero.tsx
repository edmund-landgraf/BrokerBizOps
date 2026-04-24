import { TrendingUp, Clock, Shield, Users, Award, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { value: '500+', label: 'Properties Valued' },
  { value: '20+',  label: 'Years Experience'  },
  { value: '98%',  label: 'Client Satisfaction'},
  { value: '72hr', label: 'Avg. Turnaround'   },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      {/* Orange glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(249,115,22,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/30 rounded-full px-4 py-2 mb-8">
            <Award className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-brand-300 text-xs font-semibold tracking-widest uppercase">
              California DRE Licensed Broker · BRE #01234567
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6 text-white">
            Expert Property Valuations for{' '}
            <span className="gradient-text">Legal &amp; Financial</span>{' '}
            Professionals
          </h1>

          <p className="text-slate-400 text-xl leading-relaxed max-w-2xl mb-10">
            When the stakes are high — in probate, divorce, bankruptcy, or litigation —
            you need a <strong className="text-white font-semibold">California-licensed broker</strong> who delivers
            defensible, market-grounded Broker Price Opinions on every property in the portfolio.
            Fast. Accurate. Court-ready.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Link to="/contact" className="btn-primary text-base">
              <FileText className="w-5 h-5" />
              Request a BPO Today
            </Link>
            <Link to="/services" className="btn-outline text-base">
              Explore Our Services
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mb-16">
            {[
              { icon: Shield,  text: 'CA DRE Licensed' },
              { icon: Clock,   text: '72-Hour Turnaround' },
              { icon: TrendingUp, text: 'Portfolio Specialists' },
              { icon: Users,   text: 'Attorney-Preferred' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-slate-400 text-sm">
                <Icon className="w-4 h-4 text-brand-400" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-3xl font-bold font-sans text-brand-400 mb-1">{s.value}</div>
                <div className="text-slate-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
