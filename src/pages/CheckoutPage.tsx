import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, CreditCard, CheckCircle2, AlertCircle, ArrowLeft, FileText, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const ELIGIBLE_SERVICES = [
  { id: 'res-bpo', name: 'Residential BPO', price: 150, description: 'Standard broker price opinion report' },
  { id: 'com-bpo', name: 'Commercial BPO', price: 450, description: 'Detailed financial analysis report' },
  { id: 'retro-val', name: 'Retrospective Valuation', price: 550, description: 'Historical date-of-death valuation' },
]

export default function CheckoutPage() {
  const [selectedServiceId, setSelectedServiceId] = useState(ELIGIBLE_SERVICES[0].id)
  const [isRush, setIsRush] = useState(false)
  const [step, setStep] = useState(1) // 1: Details, 2: Payment, 3: Success
  const [form, setForm] = useState({
    name: '',
    email: '',
    matter: '',
    address: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    zip: '',
  })

  const selectedService = useMemo(() => 
    ELIGIBLE_SERVICES.find(s => s.id === selectedServiceId)!, 
    [selectedServiceId]
  )

  const basePrice = selectedService.price
  const rushFee = isRush ? Math.round(basePrice * 0.25) : 0
  const total = basePrice + rushFee

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) setStep(2)
    else if (step === 2) setStep(3)
  }

  if (step === 3) {
    return (
      <div className="pt-32 min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-slate-900 border border-brand-500/20 rounded-3xl p-12 text-center shadow-gold"
        >
          <div className="w-20 h-20 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-brand-400" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Payment Successful</h2>
          <p className="text-slate-400 mb-8">
            Your order for <strong>{selectedService.name}</strong> has been received. 
            A confirmation and receipt have been sent to <strong>{form.email}</strong>.
          </p>
          <Link to="/" className="btn-primary w-full justify-center">
            Return to Dashboard
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-950 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/rates" className="text-slate-500 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-serif font-bold text-white">Secure Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Order Details */}
          <div className="lg:col-span-3 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 1 ? (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm"
                >
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-brand-500" />
                    Order Details
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-slate-500 text-xs uppercase tracking-widest mb-3">Select Report Type</label>
                      <select 
                        name="serviceId" 
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                        className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-brand-500 appearance-none transition-colors"
                      >
                        {ELIGIBLE_SERVICES.map(s => (
                          <option key={s.id} value={s.id}>{s.name} — ${s.price}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-3">Full Name *</label>
                        <input 
                          required name="name" value={form.name} onChange={handleInputChange}
                          className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-3">Email Address *</label>
                        <input 
                          required type="email" name="email" value={form.email} onChange={handleInputChange}
                          className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                          placeholder="jane@firm.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-500 text-xs uppercase tracking-widest mb-3">Subject Property Address *</label>
                      <input 
                        required name="address" value={form.address} onChange={handleInputChange}
                        className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="123 Legal Way, Los Angeles, CA 90001"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 text-xs uppercase tracking-widest mb-3">Matter / Case Number (Optional)</label>
                      <input 
                        name="matter" value={form.matter} onChange={handleInputChange}
                        className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="Estate of John Smith / BP123456"
                      />
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-brand-500/5 border border-brand-500/10">
                      <input 
                        type="checkbox" id="rush" checked={isRush} onChange={(e) => setIsRush(e.target.checked)}
                        className="w-5 h-5 accent-brand-500"
                      />
                      <label htmlFor="rush" className="text-slate-300 text-sm font-medium cursor-pointer">
                        Add Rush Service (72-hour turnaround) — <span className="text-brand-400">+$ {rushFee}</span>
                      </label>
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center py-5 text-lg">
                      Continue to Payment
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-sm"
                >
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-brand-500" />
                    Payment Information
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-slate-500 text-xs uppercase tracking-widest mb-3">Cardholder Name</label>
                      <input 
                        required name="cardName" value={form.cardName} onChange={handleInputChange}
                        className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                        placeholder="JANE DOE"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-500 text-xs uppercase tracking-widest mb-3">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                        <input 
                          required name="cardNumber" value={form.cardNumber} onChange={handleInputChange}
                          className="w-full bg-slate-800/60 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-1">
                        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-3">Expiry</label>
                        <input 
                          required name="expiry" value={form.expiry} onChange={handleInputChange}
                          className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors text-center"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-3">CVC</label>
                        <input 
                          required name="cvc" value={form.cvc} onChange={handleInputChange}
                          className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors text-center"
                          placeholder="123"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-slate-500 text-xs uppercase tracking-widest mb-3">ZIP Code</label>
                        <input 
                          required name="zip" value={form.zip} onChange={handleInputChange}
                          className="w-full bg-slate-800/60 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors text-center"
                          placeholder="90210"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        type="button" 
                        onClick={() => setStep(1)}
                        className="flex-1 px-8 py-5 rounded-full border border-white/10 text-slate-400 font-bold hover:bg-white/5 transition-all"
                      >
                        Back
                      </button>
                      <button type="submit" className="flex-[2] btn-primary justify-center py-5 text-lg">
                        <Lock className="w-5 h-5" />
                        Pay ${total} Securely
                      </button>
                    </div>

                    <p className="text-center text-slate-600 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                      <ShieldCheck className="w-3 h-3" />
                      Encrypted 256-bit SSL Connection
                    </p>
                  </div>
                </motion.div>
              )}
            </form>
          </div>

          {/* Right: Order Summary & Ineligible Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Summary */}
            <div className="bg-slate-900 border border-brand-500/20 rounded-3xl p-8 shadow-xl">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8 pb-8 border-b border-white/5">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-white font-bold">{selectedService.name}</div>
                    <div className="text-xs text-slate-500">{selectedService.description}</div>
                  </div>
                  <div className="text-white font-bold">${basePrice}</div>
                </div>
                {isRush && (
                  <div className="flex justify-between items-center text-brand-400 text-sm">
                    <div>Rush Service Premium</div>
                    <div className="font-bold">+${rushFee}</div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-8">
                <div className="text-slate-400 font-medium">Total Amount Due</div>
                <div className="text-3xl font-serif font-bold text-white">${total}</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-[11px] text-slate-500 leading-relaxed">
                <div className="flex items-center gap-2 text-brand-500 font-bold uppercase tracking-widest mb-2">
                  <Lock className="w-3 h-3" />
                  Secure Transaction
                </div>
                Your payment is processed through a secure PCI-compliant gateway. Sams Valuations never stores your credit card details.
              </div>
            </div>

            {/* Ineligible Warning */}
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-brand-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-white font-bold mb-2">Complex Services</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    <strong>Expert Witness</strong>, <strong>Receivership</strong>, and <strong>Partition Referee</strong> services 
                    cannot be paid via this screen. These require signed engagement letters and separate invoicing.
                  </p>
                  <Link to="/contact" className="inline-block mt-4 text-[10px] font-bold text-brand-400 uppercase tracking-widest hover:text-brand-300 transition-colors">
                    Request Custom Quote →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
