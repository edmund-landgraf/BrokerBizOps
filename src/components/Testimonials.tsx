const testimonials = [
  {
    initials: 'SL',
    name: 'Sandra L.',
    role: 'Probate Attorney, Los Angeles',
    quote: 'We manage estates with 3–8 properties on a regular basis. Sams Valuations is the only firm I trust to turn around a coordinated portfolio BPO in time for our court hearings. Accurate, defensible, and always on schedule.',
  },
  {
    initials: 'MK',
    name: 'Michael K.',
    role: 'Chapter 7 Bankruptcy Trustee',
    quote: 'The level of documentation they provide is exactly what I need to present to the court. Their reports are thorough, clearly written, and the broker is available to answer questions from creditor counsel. Highly recommended.',
  },
  {
    initials: 'JR',
    name: 'Jennifer R.',
    role: 'Family Law Attorney, Orange County',
    quote: 'In a contested divorce involving five properties in two counties, Sams produced clear, neutral valuations that both sides ultimately accepted. That saved my client enormous time and legal fees.',
  },
  {
    initials: 'DP',
    name: 'David P., CPA',
    role: 'Estate Tax Specialist, San Francisco',
    quote: 'I needed a retrospective date-of-death BPO for a complex estate with both residential and commercial properties. The report was well-organized, historically grounded, and stood up to IRS review without issue.',
  },
  {
    initials: 'TC',
    name: 'Thomas C.',
    role: 'VP Loss Mitigation, Regional Bank',
    quote: 'We\'ve used Sams for bulk REO and pre-foreclosure BPOs across multiple California markets. Their consistency and response time is unmatched. They understand the financial institution side of the business.',
  },
  {
    initials: 'RN',
    name: 'Rachel N.',
    role: 'Professional Conservator, Sacramento',
    quote: 'My conservatorship clients often hold real property that needs to be carefully valued before any court action. Sams gives me the independent, documented opinions I need to satisfy the court and protect my clients.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="section-label">Client Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Trusted by <span className="gradient-text">California's Legal Community</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl">
            From solo estate attorneys to large financial institutions — here's what our clients say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name}
              className="group card-glass rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300 hover:shadow-gold flex flex-col">
              <div className="text-brand-400 text-xl tracking-widest mb-5">★★★★★</div>
              <blockquote className="text-slate-300 text-sm leading-relaxed italic flex-1 mb-6">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
