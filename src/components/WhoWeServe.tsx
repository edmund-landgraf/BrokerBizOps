import { Scale, Heart, Building2, Landmark, Calculator, ShieldCheck } from 'lucide-react'

const clients = [
  {
    icon: Scale,
    title: 'Probate & Trust Attorneys',
    desc: 'You need accurate, timely property valuations to inventory estate assets, prepare court filings, and advise executors on sale strategy.',
    needs: [
      'Inventory & Appraisal support (DE-160)',
      'Current market value for listing decisions',
      'Portfolio valuation across multiple counties',
      'Coordination with Probate Referee timelines',
    ],
  },
  {
    icon: Heart,
    title: 'Divorce & Family Law Attorneys',
    desc: 'Property division requires a neutral, defensible valuation both parties and the court can rely on — without the cost or delay of a full appraisal.',
    needs: [
      'Neutral third-party BPO for equitable distribution',
      'Court-compliant documentation',
      'As-is vs. as-improved value opinions',
      'Fast turnaround to meet hearing deadlines',
    ],
  },
  {
    icon: Building2,
    title: 'Bankruptcy Trustees & Counsel',
    desc: 'Chapter 7 and Chapter 13 cases require accurate asset valuations to determine exemptions, liquidation value, and creditor recovery.',
    needs: [
      'Liquidation vs. fair market value analysis',
      'Rapid asset inventory for multiple properties',
      'Defensible reports for trustee filings',
      'Coordination with U.S. Trustee requirements',
    ],
  },
  {
    icon: Landmark,
    title: 'Banks, Lenders & Servicers',
    desc: 'Financial institutions rely on BPOs for a cost-effective, fast alternative to appraisals for non-federally-related decisions.',
    needs: [
      'Pre-foreclosure & REO valuations',
      'Short sale BPOs for loss mitigation',
      'Loan modification support',
      'Bulk portfolio pricing for note sales',
    ],
  },
  {
    icon: Calculator,
    title: 'CPAs & Tax Advisors',
    desc: 'Estate tax filings, stepped-up basis calculations, and 1031 exchange planning all benefit from a broker\'s documented, retrospective market opinion.',
    needs: [
      'Date-of-death retrospective valuations',
      'Stepped-up cost basis documentation',
      'IRS Form 706 support materials',
      'Alternative valuation date analysis',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Conservators & Guardians',
    desc: 'Court-appointed fiduciaries must account for every real property asset with documented, independent market analysis to satisfy their duty of care.',
    needs: [
      'Independent valuations for court reporting',
      'Ongoing monitoring of property value',
      'Sale price opinions for court-approved sales',
      'CA Probate Code §2540 compliance support',
    ],
  },
]

export default function WhoWeServe() {
  return (
    <section id="clients" className="py-28 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="section-label">Who We Serve</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Built for the Professionals <span className="gradient-text">Who Can't Afford to Get It Wrong</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Our clients face legal deadlines, fiduciary obligations, and court scrutiny. We understand
            what's at stake and deliver valuations that hold up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {clients.map((c) => {
            const Icon = c.icon
            return (
              <div key={c.title}
                id={c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}
                className="group relative bg-gradient-to-br from-slate-900 to-slate-800/60 border border-white/8 rounded-2xl p-8 hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-orange overflow-hidden scroll-mt-24">
                {/* Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-all" />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/15 border border-brand-500/25 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-brand-400" />
                  </div>
                  <h3 className="text-white font-serif text-xl mb-3">{c.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">{c.desc}</p>
                  <ul className="space-y-2">
                    {c.needs.map(n => (
                      <li key={n} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-brand-400 mt-0.5 shrink-0">→</span>
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
