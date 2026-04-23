import { FileSearch, Briefcase, Scale, Home, TrendingUp, Users } from 'lucide-react'

const services = [
  {
    icon: FileSearch,
    title: 'Broker Price Opinion (BPO)',
    subtitle: 'Core Valuation Service',
    desc: 'A California-licensed broker's written opinion of a property's fair market value — faster and more cost-effective than a formal appraisal, and legally recognized for a wide range of non-federally-related transactions.',
    tags: ['Probate', 'Divorce', 'Bankruptcy', 'Trust Administration'],
    note: 'Only a licensed broker or agent may legally provide a BPO in CA.',
  },
  {
    icon: Home,
    title: 'Portfolio-Wide Valuation',
    subtitle: 'Multi-Property Estates',
    desc: 'When an estate or portfolio holds multiple properties — residential, commercial, vacant land — we deliver a unified, consistent valuation across every asset with a single point of contact and coordinated reporting.',
    tags: ['Estate Portfolios', 'Multi-Family', 'Mixed-Use', 'Land'],
    note: 'Ideal for complex estates with 2–50+ properties.',
  },
  {
    icon: Scale,
    title: 'Litigation Support & Expert Witness',
    subtitle: 'Court-Ready Opinions',
    desc: 'We provide defensible, documented opinions of value for use in depositions, arbitrations, and trials. As a licensed broker, we can testify as a qualified expert on market conditions, property value, and real estate standard of care.',
    tags: ['Depositions', 'Arbitration', 'Trial Testimony', 'Discovery'],
    note: 'Qualified under CA Evidence Code §720 as a real estate expert.',
  },
  {
    icon: TrendingUp,
    title: 'Retrospective Valuation',
    subtitle: 'Historical Date-of-Death / Event',
    desc: 'We reconstruct market conditions as of a specific past date — most commonly the date of death — using historical MLS data, comparable sales, and market trend analysis. Essential for tax filings, stepped-up basis calculations, and estate accounting.',
    tags: ['Date of Death', 'Stepped-Up Basis', 'IRS Support', 'Estate Tax'],
    note: 'Commonly requested by CPAs and estate attorneys for Form 706 support.',
  },
  {
    icon: Briefcase,
    title: 'REO & Distressed Asset Analysis',
    subtitle: 'Bank & Lender Services',
    desc: 'We help financial institutions, servicers, and private lenders assess the current and as-repaired value of non-performing or distressed assets. Our reports support loan workouts, short sale approvals, and asset disposition decisions.',
    tags: ['Short Sales', 'Loan Workouts', 'REO', 'Note Sales'],
    note: 'Banks and servicers rely on BPOs as a cost-effective alternative to full appraisals.',
  },
  {
    icon: Users,
    title: 'Conservatorship & Guardianship',
    subtitle: 'Court-Appointed Property Review',
    desc: 'When a conservator or guardian must account for real property assets, we provide the independent market analysis required by the court — helping fiduciaries meet their duty of care with documented, impartial valuations.',
    tags: ['Conservatorship', 'Guardianship', 'Fiduciary Duty', 'Court Reporting'],
    note: 'Assists conservators in satisfying CA Probate Code §2540 duties.',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="section-label">What We Do</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Services Only a Licensed <span className="gradient-text">Broker</span> Can Provide
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Under California law, certain real estate valuation services may only be performed by
            a licensed broker or agent. We specialize in exactly those services — for the clients
            who need them most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.title}
                className="group card-glass p-8 rounded-2xl hover:-translate-y-1 transition-all duration-300 hover:shadow-orange flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 border border-brand-500/20 flex items-center justify-center mb-5 group-hover:from-brand-500/30 group-hover:to-brand-700/30 transition-all">
                  <Icon className="w-6 h-6 text-brand-400" />
                </div>
                <div className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-1">{s.subtitle}</div>
                <h3 className="text-white font-serif text-xl mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {s.tags.map(t => (
                    <span key={t} className="text-xs bg-brand-500/10 text-brand-300 border border-brand-500/20 px-2.5 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/5 text-xs text-slate-500 italic">
                  {s.note}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
