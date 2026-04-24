import { FileText, Download, CheckCircle, Clock, AlertCircle, Search, LogOut } from 'lucide-react'

interface PortalDashboardProps {
  onLogout: () => void
}

const mockOrders = [
  { id: 'VAL-2026-089', address: '1234 Willow Tree Lane, Los Angeles, CA', type: 'Broker Price Opinion', status: 'Completed', date: 'Oct 15, 2026' },
  { id: 'VAL-2026-092', address: '8855 Sunset Blvd, West Hollywood, CA', type: 'Portfolio Valuation', status: 'In Progress', date: 'Oct 20, 2026' },
  { id: 'VAL-2026-094', address: '4500 Ocean Front Walk, Venice, CA', type: 'Retrospective Valuation', status: 'Pending Review', date: 'Oct 22, 2026' },
]

export default function PortalDashboard({ onLogout }: PortalDashboardProps) {
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
        {/* Table Header/Toolbar */}
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/50">
          <h3 className="text-lg font-bold text-white">Recent Orders</h3>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by address or ID..." 
              className="w-full sm:w-64 bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/80 text-xs uppercase tracking-wider text-slate-500 font-bold border-b border-slate-800">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Property Address</th>
                <th className="px-6 py-4">Service Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Documents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className="font-mono text-xs text-brand-400 bg-brand-500/10 px-2 py-1 rounded">{order.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-medium text-white">{order.address}</div>
                    <div className="text-xs text-slate-500 mt-1">Requested {order.date}</div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-300">
                    {order.type}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    {order.status === 'Completed' ? (
                      <button className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-500/10 text-brand-400 hover:bg-brand-500 hover:text-white transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-slate-600 text-xs italic">Not ready</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
