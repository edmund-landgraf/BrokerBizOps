import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, Phone, ArrowRight, FileText, Scale, ShieldCheck, CreditCard } from 'lucide-react'

const valuationRates = [
  { service: 'Residential BPO', rate: '$50 – $150', unit: 'Per Report', description: 'Standard broker price opinion for loan monitoring and probate.' },
  { service: 'Commercial BPO', rate: '$250 – $500', unit: 'Per Report', description: 'Detailed financial analysis for multi-family and retail assets.' },
  { service: 'Retrospective Valuations', rate: '$250 – $600', unit: 'Per Report', description: 'Historical date-of-death valuations for tax and estate planning.' },
  { service: 'Rush Service (72hr)', rate: '+25%', unit: 'Premium', description: 'Priority turnaround for time-sensitive legal deadlines.' },
]

const legalRates = [
  { service: 'Expert Witness Testimony', rate: '$300 – $600', unit: 'Hourly', description: 'Professional testimony for depositions and trial appearances.' },
  { service: 'Litigation Consultation', rate: '$200 – $450', unit: 'Hourly', description: 'Comprehensive case review, research, and document preparation.' },
  { service: 'Court-Appointed Receiver', rate: '$250 – $450', unit: 'Hourly', description: 'Neutral oversight of businesses or distressed assets.' },
  { service: 'Partition Referee', rate: '$300 – $450', unit: 'Hourly', description: 'Independent management of court-ordered property sales.' },
]

export default function RatesPage() {
  return (
    <div className="pt-24 min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gold-radial opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-bold uppercase tracking-widest mb-8"
          >
            <Scale className="w-4 h-4" />
            Fee Schedule
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Transparent Professional <span className="text-brand-500">Rates</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto"
          >
            We provide standardized pricing for high-stakes legal and financial real estate services. 
            No hidden costs—just defensible, professional expertise.
          </motion.p>
        </div>
      </section>

      {/* Rates Tables */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          
          {/* Valuation Services */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
                <FileText className="w-6 h-6 text-brand-500" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white">Valuation Services</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/5">
                    <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Service</th>
                    <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Standard Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {valuationRates.map((item, idx) => (
                    <tr key={idx} className="group">
                      <td className="py-6 pr-4">
                        <div className="font-bold text-white mb-1 group-hover:text-brand-400 transition-colors">{item.service}</div>
                        <div className="text-sm text-slate-500">{item.description}</div>
                      </td>
                      <td className="py-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="text-xl font-serif font-bold text-brand-500">{item.rate}</div>
                            <div className="text-xs text-slate-600">{item.unit}</div>
                          </div>
                          {item.service !== 'Rush Service (72hr)' && (
                            <Link 
                              to="/checkout" 
                              className="px-6 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-widest hover:bg-brand-500 hover:text-slate-950 transition-all flex items-center gap-2 whitespace-nowrap"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              Order Report
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Legal & Court Services */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
                <ShieldCheck className="w-6 h-6 text-brand-500" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-white">Legal & Court Services</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-white/5">
                    <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Service</th>
                    <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Standard Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {legalRates.map((item, idx) => (
                    <tr key={idx} className="group">
                      <td className="py-6 pr-4">
                        <div className="font-bold text-white mb-1 group-hover:text-brand-400 transition-colors">{item.service}</div>
                        <div className="text-sm text-slate-500">{item.description}</div>
                      </td>
                      <td className="py-6">
                        <div className="text-xl font-serif font-bold text-brand-500">{item.rate}</div>
                        <div className="text-xs text-slate-600">{item.unit}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-slate-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-12">Why Our Rates are Non-Standard</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { title: 'Court Defensible', text: 'All valuations meet CA Probate Code and court-mandated standards.' },
              { title: 'B2B Optimized', text: 'Tailored for attorneys, banks, and trustees—not retail hobbyists.' },
              { title: 'No Hidden Fees', text: 'Clear up-front pricing. Retainers and rush fees are transparently disclosed.' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-950 border border-white/5 shadow-xl">
                <CheckCircle2 className="w-6 h-6 text-brand-500 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-brand-500 to-brand-600 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-brand-500/20"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-950 mb-8 relative z-10">
            Need a Custom Portfolio Quote?
          </h2>
          <p className="text-xl text-slate-950/70 mb-12 max-w-2xl mx-auto relative z-10">
            For bulk BPO orders, complex receiverships, or specialized litigation, contact us for a detailed engagement letter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a href="/contact" className="bg-slate-950 text-white px-10 py-5 rounded-full font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-2 group">
              Get a Custom Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="tel:+13105550123" className="bg-transparent border-2 border-slate-950/20 text-slate-950 px-10 py-5 rounded-full font-bold hover:bg-slate-950/10 transition-all flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call (310) 555-0123
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
