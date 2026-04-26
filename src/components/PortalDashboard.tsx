import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Download, CheckCircle, Clock, AlertCircle, Search, LogOut, Eye, X, Shield, BarChart3, FileSearch } from 'lucide-react'
import { generateSamplePDF } from '../utils/generateSamplePDF'

interface PortalDashboardProps {
  onLogout: () => void
}

const mockOrders = [
  {
    id: 'SAMS-SAMPLE-001',
    address: '742 Evergreen Terrace, Springfield, CA',
    type: 'Broker Price Opinion',
    status: 'Completed',
    date: 'Jan 01, 2026',
    isFree: true,
    summary: 'OFFICIAL SAMS VALUATIONS SAMPLE: This document demonstrates our proprietary BPO methodology. It includes high-fidelity data on subject property assets, neutral market positioning, and court-defensible comparative analysis.',
    keyFindings: ['Sample Valuation: $850,000', 'Marketing Time: < 30 Days', 'Proprietary B2B Logic Applied'],
    previewSnippet: 'SAMS VALUATIONS INTERNAL ANALYSIS: Subject property shows consistent maintenance history with 2024 roof certification. Comps 1-3 provide tight $15k variance, establishing a highly reliable price floor for probate inventory purposes...'
  },
  { 
    id: 'VAL-2026-089', 
    address: '1234 Willow Tree Lane, Los Angeles, CA', 
    type: 'Broker Price Opinion', 
    status: 'Completed', 
    date: 'Oct 15, 2026',
    summary: 'Comprehensive 14-page Broker Price Opinion. Includes comparative market analysis (CMA) of 6 nearby properties, local absorption rates, and suggested list price vs. quick-sale liquidation value.',
    keyFindings: ['Valuation Range: $1.2M - $1.35M', 'Recommended Repair Credit: $15k', 'Days on Market Projection: 22 Days'],
    previewSnippet: 'Subject property demonstrates superior curb appeal compared to 85% of active inventory in the 90049 zip code. Internal inspection reveals updated kitchen (2022) but original plumbing in secondary baths...'
  },
  { id: 'VAL-2026-092', address: '8855 Sunset Blvd, West Hollywood, CA', type: 'Portfolio Valuation', status: 'In Progress', date: 'Oct 20, 2026' },
  { id: 'VAL-2026-094', address: '4500 Ocean Front Walk, Venice, CA', type: 'Retrospective Valuation', status: 'Pending Review', date: 'Oct 22, 2026' },
]

export default function PortalDashboard({ onLogout }: PortalDashboardProps) {
  const [search, setSearch] = useState('')
  const [previewOrder, setPreviewOrder] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Completed':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle className="w-3.5 h-3.5" /> Completed</span>
      case 'In Progress':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20"><Clock className="w-3.5 h-3.5" /> In Progress</span>
      case 'Pending Review':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20"><AlertCircle className="w-3.5 h-3.5" /> Pending Review</span>
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">{status}</span>
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">Client Dashboard</h2>
          <p className="text-slate-400">Welcome back, Sarah. Here is the status of your current valuations.</p>
        </div>
        <button onClick={onLogout} className="btn-outline flex items-center gap-2 self-start md:self-auto text-sm py-2.5">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card-glass p-6 rounded-2xl border border-white/5">
          <div className="text-slate-400 text-sm font-medium mb-2">Total Orders (YTD)</div>
          <div className="text-4xl font-bold text-white">24</div>
        </div>
        <div className="card-glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl" />
          <div className="text-slate-400 text-sm font-medium mb-2">Active Valuations</div>
          <div className="text-4xl font-bold text-brand-400">2</div>
        </div>
        <div className="card-glass p-6 rounded-2xl border border-white/5">
          <div className="text-slate-400 text-sm font-medium mb-2">Completed This Month</div>
          <div className="text-4xl font-bold text-white">5</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="card-glass rounded-3xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/50">
          <h3 className="text-lg font-bold text-white">Recent Orders</h3>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by address or ID..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-xs uppercase tracking-wider text-slate-500 font-bold border-b border-slate-800">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Property Address</th>
                <th className="px-6 py-4">Service Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockOrders.filter(o => o.address.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())).map((order) => (
                <tr key={order.id} className={`hover:bg-slate-800/20 transition-colors group ${order.isFree ? 'bg-brand-500/5' : ''}`}>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`font-mono text-xs px-2 py-1 rounded ${
                      order.isFree 
                        ? 'text-slate-950 bg-brand-500 shadow-gold font-bold animate-pulse' 
                        : 'text-brand-400 bg-brand-500/10'
                    }`}>
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-white">
                      {order.address}
                      {order.isFree && <span className="ml-2 text-[10px] text-brand-500 font-bold uppercase tracking-widest">Free Sample</span>}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Requested {order.date}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-300">
                    {order.type}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-3">
                      {order.status === 'Completed' ? (
                        <>
                          <button 
                            onClick={() => setPreviewOrder(order)}
                            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            title="Preview Summary"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {order.isFree ? (
                            <div className="flex items-center gap-2">
                              <button 
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-brand-400 transition-all"
                                title="Open PDF Viewer"
                                onClick={() => generateSamplePDF(order, 'view')}
                              >
                                <FileSearch className="w-4 h-4" />
                              </button>
                              <button 
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                                title="Download Official Report"
                                onClick={() => generateSamplePDF(order, 'save')}
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <Link 
                              to="/checkout" 
                              state={{ address: order.address, type: order.type, id: order.id }}
                              className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/10 text-brand-400 hover:bg-brand-500 hover:text-slate-950 transition-all shadow-lg hover:shadow-brand-500/20"
                              title="Pay & Download"
                            >
                              <Download className="w-4 h-4" />
                            </Link>
                          )}
                        </>
                      ) : (
                        <span className="text-slate-600 text-xs italic">Not ready</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {previewOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-slate-950/60">
          <div className="max-w-2xl w-full bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-fade-up">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-brand-500" />
                <h4 className="text-xl font-serif font-bold text-white">Document Executive Summary</h4>
              </div>
              <button onClick={() => setPreviewOrder(null)} className="text-slate-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Report Summary</div>
                <p className="text-slate-300 leading-relaxed">{previewOrder.summary}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart3 className="w-4 h-4 text-brand-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Key Deliverables</span>
                  </div>
                  <ul className="space-y-2">
                    {previewOrder.keyFindings?.map((f: string, i: number) => (
                      <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-emerald-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/5 -rotate-12 scale-150">CONFIDENTIAL</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileSearch className="w-4 h-4 text-brand-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Content Snippet</span>
                  </div>
                  <p className="text-[10px] leading-relaxed text-slate-500 italic blur-[0.5px]">
                    {previewOrder.previewSnippet}
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/checkout" 
                  state={{ address: previewOrder.address, type: previewOrder.type, id: previewOrder.id }}
                  className="flex-1 btn-primary justify-center py-4"
                >
                  Pay & Download Report
                </Link>
                <button onClick={() => setPreviewOrder(null)} className="btn-outline justify-center py-4">
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

