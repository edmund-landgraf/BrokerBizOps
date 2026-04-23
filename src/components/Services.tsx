import { FileSearch, Briefcase, Scale, Home, TrendingUp, Users, ShieldCheck, Landmark, Key, BookOpen, AlertCircle } from 'lucide-react'

const serviceVerticals = [
  {
    category: "Financial Institutions & Servicers",
    icon: Landmark,
    description: "Specialized services to help lenders, banks, and asset managers value and liquidate non-performing assets.",
    services: [
      {
        icon: Briefcase,
        title: 'REO Disposition & Liquidation',
        subtitle: 'Asset Marketing & Sales',
        desc: 'We handle the entire disposition lifecycle for bank-owned properties. From initially securing the asset to post-eviction stabilization, repair management, and aggressive market syndication to maximize the lender\'s capital recovery.',
        example: 'Example: We successfully negotiated a "cash-for-keys" exit with holdover tenants in a distressed multi-family property, coordinated a full trash-out, managed essential repairs, and sold the property 15% above the bank\'s reserve price.',
        tags: ['REO', 'Evictions', 'Asset Recovery']
      },
      {
        icon: FileSearch,
        title: 'Broker Price Opinions (BPOs)',
        subtitle: 'High-Volume Valuation Reporting',
        desc: 'Fast, flat-fee, and highly accurate opinions of market value utilized for loan workouts, pre-foreclosure assessments, and short-sale approvals by major servicing companies.',
        example: 'Example: A regional credit union needed 12 drive-by BPOs on defaulting loans across two counties. We performed documented, exterior inspections and delivered compliant market data within 48 hours to inform their loss mitigation strategy.',
        tags: ['BPOs', 'Short Sales', 'Pre-Foreclosure']
      },
      {
        icon: Key,
        title: 'Property Preservation',
        subtitle: 'Asset Security & Maintenance',
        desc: 'Immediate stabilization of abandoned or foreclosed properties to prevent municipal code violations, vandalism, or environmental decay during prolonged legal proceedings.',
        example: null,
        tags: ['Winterization', 'Re-keying', 'Code Compliance']
      }
    ]
  },
  {
    category: "Attorneys & Litigators",
    icon: Scale,
    description: "Support for Divorce, Probate, and Corporate litigation requiring an authoritative real estate professional.",
    services: [
      {
        icon: BookOpen,
        title: 'Expert Witness Testimony',
        subtitle: 'Defensible Market Analysis',
        desc: 'Court-ready opinions of value and expert testimony regarding local market conditions, historical valuations, and real estate broker standards of care.',
        example: 'Example: In a highly contested divorce, opposing counsel challenged the valuation of the couple\'s primary residence. As a retained expert witness, we testified to the court using historical MLS data and complex localized comps to prove our accurate market analysis, prevailing in the judge\'s final ruling.',
        tags: ['Depositions', 'Trial Testimony', 'Malpractice Suits']
      },
      {
        icon: ShieldCheck,
        title: 'Court-Appointed Receiverships',
        subtitle: 'Neutral Third-Party Management',
        desc: 'Stepping in as a court-sanctioned, neutral party to physically protect, manage, and optionally liquidate real estate assets during bankruptcies, messy partnership dissolutions, or severe landlord-tenant disputes.',
        example: 'Example: A bitter partnership dissolution left a commercial strip mall unmanaged. Appointed by the civil court as Receiver, we immediately took control of rent collection, cured deferred maintenance, and maintained tenant retention until the court ordered the asset sold.',
        tags: ['Receivership', 'Asset Control', 'Partnership Disputes']
      },
      {
        icon: AlertCircle,
        title: 'Partition Action Sales',
        subtitle: 'Court-Ordered Liquidation',
        desc: 'When co-owners, divorcées, or feuding heirs cannot agree on the disposition of a jointly owned property, the court orders a "partition by sale." We serve as the neutral broker handling the transaction.',
        example: 'Example: Two siblings inherited a home but refused to communicate. Appointed to the partition sale, we managed all necessary property improvements and coordinated the listing and closing entirely through their respective attorneys, maximizing value while shielding the siblings from direct conflict.',
        tags: ['Partition Sales', 'Feuding Heirs', 'Divorce Division']
      }
    ]
  },
  {
    category: "CPAs, Trustees & Fiduciaries",
    icon: Users,
    description: "Impartial analysis to fulfill duty of care, calculate taxation baselines, and manage trustee obligations.",
    services: [
      {
        icon: TrendingUp,
        title: 'Retrospective Valuations',
        subtitle: 'Date-of-Death & Historical Value',
        desc: 'Reconstructing market conditions as of a specific past date. This is critical for IRS Form 706, determining estate tax liabilities, and establishing a stepped-up cost basis for heirs.',
        example: 'Example: An heir decided to sell an inherited property 14 months after their parent\'s passing. We produced a legally defensible Date-of-Death valuation proving the property was worth $850,000 at the time of death, saving the heir significant capital gains taxes upon selling for $900,000.',
        tags: ['Date-of-Death', 'Stepped-Up Basis', 'IRS 706']
      },
      {
        icon: Home,
        title: 'Conservatorship & Guardianship',
        subtitle: 'Mandatory Court Reporting',
        desc: 'When a conservator or guardian must account for real property assets, we provide the independent market analysis required by the court to demonstrate that the fiduciary is meeting their duty of care.',
        example: null,
        tags: ['Probate Code 2540', 'Guardianship', 'Fiduciary Duty']
      },
      {
        icon: FileSearch,
        title: 'Portfolio-Wide Valuations',
        subtitle: 'Multi-Property Estate Analysis',
        desc: 'Unified and consistent valuation reporting across complex estates containing multiple residential, multi-family, or commercial properties, giving trustees a single point of contact.',
        example: null,
        tags: ['Estate Portfolios', 'Asset Inventories']
      }
    ]
  }
]

export default function Services() {
  return (
    <section id="services" className="py-28 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="section-label">Expanded Broker Services</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Transactional Services for <span className="gradient-text">B2B Professionals</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl">
            We provide much more than residential sales. Our practice is built on supporting litigators, financial institutions, and fiduciaries through complex, high-stakes real estate transactions, court proceedings, and asset liquidations.
          </p>
        </div>

        <div className="space-y-20">
          {serviceVerticals.map((vertical, vIndex) => {
            const VerticalIcon = vertical.icon
            return (
              <div key={vIndex} className="relative">
                {/* Vertical Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shadow-lg">
                    <VerticalIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white group-hover:text-brand-400 transition-colors">
                      {vertical.category}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">{vertical.description}</p>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {vertical.services.map((service, sIndex) => {
                    const ServiceIcon = service.icon
                    return (
                      <div key={sIndex} className="card-glass p-8 rounded-2xl flex flex-col hover:-translate-y-1 transition-all duration-300 hover:shadow-orange border border-white/5">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                            <ServiceIcon className="w-5 h-5 text-brand-400" />
                          </div>
                          <div>
                            <div className="text-brand-400 text-[10px] font-bold uppercase tracking-widest leading-tight">{service.subtitle}</div>
                            <h4 className="text-white font-serif text-lg leading-tight mt-1">{service.title}</h4>
                          </div>
                        </div>
                        
                        <p className="text-slate-300 text-sm leading-relaxed mb-6">
                          {service.desc}
                        </p>

                        {service.example && (
                          <div className="mb-6 bg-slate-950/50 rounded-xl p-4 border border-slate-800/50 flex-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">Real-World Application</span>
                            <p className="text-slate-400 text-sm italic leading-relaxed">
                              "{service.example.replace('Example: ', '')}"
                            </p>
                          </div>
                        )}
                        {!service.example && <div className="flex-1" />}

                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                          {service.tags.map(t => (
                            <span key={t} className="text-[11px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-1 rounded-md">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
