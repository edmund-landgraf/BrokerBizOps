import { Phone, FileText, MapPin, Clock, Search, Send } from 'lucide-react'

const steps = [
  {
    icon: Phone,
    title: 'Initial Consultation',
    desc: 'We discuss your matter — property type, location, intended use of the report, and any deadline constraints. No charge for the initial call.',
  },
  {
    icon: Search,
    title: 'Property Research & Inspection',
    desc: 'We pull current MLS data, verify title records, analyze comparable sales, and — when accessible — conduct a physical inspection of the subject property.',
  },
  {
    icon: FileText,
    title: 'Market Analysis & Drafting',
    desc: 'Our licensed broker develops a written opinion of value with supporting comparable sales analysis, market condition narrative, and property-specific adjustments.',
  },
  {
    icon: Send,
    title: 'Report Delivery (72 Hours)',
    desc: 'You receive a professionally formatted PDF report — ready for court filings, attorney review, tax documentation, or lender submission — typically within 72 hours of engagement.',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-28 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="section-label">How It Works</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            From Engagement to <span className="gradient-text">Delivered Report</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl">
            A clear, professional process designed around legal timelines and fiduciary accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.title} className="group relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-brand-500/40 to-transparent z-10" style={{width: 'calc(100% - 2rem)', left: 'calc(100% - 1rem)'}} />
                )}
                <div className="card-glass rounded-2xl p-7 h-full hover:-translate-y-1 transition-all duration-300 hover:shadow-gold">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-brand-400 font-bold text-2xl font-sans">0{i + 1}</span>
                  </div>
                  <h3 className="text-white font-serif text-lg mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Turnaround promise */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Clock, label: 'Standard BPO', value: '72 Hours', note: 'Single property, residential or commercial' },
            { icon: MapPin, label: 'Portfolio BPO', value: '5–7 Days', note: 'Multiple properties, coordinated reporting' },
            { icon: Phone, label: 'Rush BPO',     value: '24 Hours', note: 'Available upon request for urgent matters' },
          ].map(t => {
            const Icon = t.icon
            return (
              <div key={t.label} className="bg-gradient-to-br from-brand-600/20 to-brand-800/10 border border-brand-500/20 rounded-2xl p-6 flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-brand-400" />
                </div>
                <div>
                  <div className="text-xs text-brand-400 font-semibold uppercase tracking-widest mb-1">{t.label}</div>
                  <div className="text-white font-bold text-xl">{t.value}</div>
                  <div className="text-slate-500 text-xs mt-0.5">{t.note}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
