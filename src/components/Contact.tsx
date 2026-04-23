import { useState } from 'react'
import { Send, Phone, Mail, MapPin } from 'lucide-react'

const matters = [
  'Probate / Estate Administration',
  'Divorce / Property Division',
  'Bankruptcy / Trustee',
  'Bank / Lender / Servicer',
  'Conservatorship / Guardianship',
  'CPA / Tax Planning',
  'Litigation Support / Expert Witness',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', firm: '', email: '', phone: '', matter: '', notes: '' })
  const [sent, setSent] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = e => { e.preventDefault(); setSent(true) }

  return (
    <section id="contact" className="py-28 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left */}
          <div className="lg:col-span-2">
            <span className="section-label">Get Started</span>
            <h2 className="text-4xl font-serif font-bold text-white mb-4">
              Request a <span className="gradient-text">Free Consultation</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              Tell us about your matter and we'll respond within one business hour.
              No obligation — just a straight conversation about how we can help.
            </p>

            <div className="space-y-5">
              {[
                { icon: Phone, label: 'Phone', value: '(310) 555-0192' },
                { icon: Mail,  label: 'Email', value: 'valuations@meridianre.com' },
                { icon: MapPin,label: 'Service Area', value: 'All California Counties' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs uppercase tracking-widest">{label}</div>
                    <div className="text-white font-medium text-sm">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 bg-brand-500/10 border border-brand-500/20 rounded-xl">
              <div className="text-brand-300 font-semibold text-sm mb-1">CA DRE License #01234567</div>
              <div className="text-slate-500 text-xs leading-relaxed">
                Meridian Valuations is a California Department of Real Estate licensed broker,
                in good standing since 2004. All BPOs are prepared and signed by the broker of record.
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="card-glass rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-5">
                  <Send className="w-8 h-8 text-brand-400" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Thank You!</h3>
                <p className="text-slate-400">We've received your request and will be in touch within one business hour.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="card-glass rounded-2xl p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: 'name',  label: 'Your Name *',   placeholder: 'Jane Smith', required: true },
                    { name: 'firm',  label: 'Firm / Company', placeholder: 'Smith & Associates', required: false },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">{f.label}</label>
                      <input name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder}
                        required={f.required}
                        className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { name: 'email', label: 'Email *', placeholder: 'jane@firm.com', type: 'email', required: true },
                    { name: 'phone', label: 'Phone',   placeholder: '(213) 555-0100', type: 'tel',   required: false },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">{f.label}</label>
                      <input name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder} type={f.type}
                        required={f.required}
                        className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">Type of Matter *</label>
                  <select name="matter" value={form.matter} onChange={handle} required
                    className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors appearance-none">
                    <option value="">Select one…</option>
                    {matters.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 text-xs uppercase tracking-widest mb-2">Property / Matter Details</label>
                  <textarea name="notes" value={form.notes} onChange={handle} rows={4}
                    placeholder="E.g. 3-property probate estate in Los Angeles County, need BPO within 2 weeks for court filing…"
                    className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors resize-none" />
                </div>
                <button type="submit" className="btn-primary w-full justify-center text-base py-4">
                  <Send className="w-5 h-5" />
                  Send Consultation Request
                </button>
                <p className="text-slate-600 text-xs text-center">
                  We respond within 1 business hour. Your information is strictly confidential.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
