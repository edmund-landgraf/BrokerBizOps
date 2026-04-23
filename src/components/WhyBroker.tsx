import { CheckCircle, XCircle } from 'lucide-react'

const rows = [
  { feature: 'Legally perform property valuations in CA',            broker: true,  appraiser: true,  both: false },
  { feature: 'Provide a Broker Price Opinion (BPO)',                 broker: true,  appraiser: false, both: false },
  { feature: 'Call report an "Appraisal"',                          broker: false, appraiser: true,  both: false },
  { feature: 'List & market property for sale',                     broker: true,  appraiser: false, both: false },
  { feature: 'Negotiate sale on behalf of estate',                  broker: true,  appraiser: false, both: false },
  { feature: 'Provide retrospective date-of-death opinion',         broker: true,  appraiser: true,  both: false },
  { feature: 'Testify as expert witness on market conditions',      broker: true,  appraiser: true,  both: false },
  { feature: 'Required for federally related transactions (FIRREA)', broker: false, appraiser: true,  both: false },
  { feature: 'Turnaround: 48–72 hours',                             broker: true,  appraiser: false, both: false },
  { feature: 'Cost-effective for portfolios (2+ properties)',        broker: true,  appraiser: false, both: false },
  { feature: 'USPAP compliance required',                           broker: false, appraiser: true,  both: false },
]

const Tick = ({ v }) => v
  ? <CheckCircle className="w-5 h-5 text-brand-400 mx-auto" />
  : <XCircle    className="w-5 h-5 text-slate-700   mx-auto" />

export default function WhyBroker() {
  return (
    <section id="why-broker" className="py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <span className="section-label">Broker vs. Appraiser</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            What Only a <span className="gradient-text">Licensed Broker</span> Can Do
          </h2>
          <p className="text-slate-400 text-lg">
            California law draws a clear line between a formal appraisal and a Broker Price Opinion.
            Understanding the difference tells you exactly when to call us — and why we're the right choice.
          </p>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-glass">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left px-6 py-5 bg-slate-800 text-slate-300 font-semibold w-1/2">Capability / Feature</th>
                <th className="px-6 py-5 bg-brand-600 text-white font-bold text-center">
                  <div>Licensed Broker</div>
                  <div className="text-xs font-normal text-brand-200 mt-0.5">(BPO / Market Opinion)</div>
                </th>
                <th className="px-6 py-5 bg-slate-800 text-slate-300 font-semibold text-center">
                  <div>Certified Appraiser</div>
                  <div className="text-xs font-normal text-slate-500 mt-0.5">(USPAP / Full Appraisal)</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.feature} className={i % 2 === 0 ? 'bg-slate-900/60' : 'bg-slate-900/30'}>
                  <td className="px-6 py-4 text-slate-300">{r.feature}</td>
                  <td className="px-6 py-4 bg-brand-500/5"><Tick v={r.broker} /></td>
                  <td className="px-6 py-4"><Tick v={r.appraiser} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key insight callout */}
        <div className="mt-8 bg-brand-500/10 border border-brand-500/30 rounded-2xl p-6 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center shrink-0">
            <CheckCircle className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <h4 className="text-white font-semibold mb-1">The Bottom Line for Legal Professionals</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              For non-federally-related transactions — probate, divorce, bankruptcy, conservatorship,
              litigation support — a <strong className="text-white">California-licensed broker's BPO</strong> is
              legally recognized, faster, and significantly more cost-effective than a formal appraisal.
              We deliver the same market expertise in a fraction of the time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
