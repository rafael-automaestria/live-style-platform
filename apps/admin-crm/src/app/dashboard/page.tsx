import { getDashboardStats } from "@/app/actions/stats";
import { DashboardCharts } from "@/components/dashboard-charts";

export default async function Dashboard() {
  const stats = await getDashboardStats();

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8 flex-1 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="border-b border-zinc-800 pb-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-zinc-500 mt-1">Real-time overview of the Live Style operation.</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-zinc-400 text-sm font-medium mb-1 uppercase tracking-wider">Total Prospects</h3>
            <p className="text-4xl font-bold text-blue-500">{stats.totalProspects}</p>
            <p className="text-xs text-zinc-600 mt-4">Artists in the recruitment funnel</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-zinc-400 text-sm font-medium mb-1 uppercase tracking-wider">Active Partners</h3>
            <p className="text-4xl font-bold text-amber-500">{stats.activePartners}</p>
            <p className="text-xs text-zinc-600 mt-4">Approved artists with portal access</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-zinc-400 text-sm font-medium mb-1 uppercase tracking-wider">System Messages</h3>
            <p className="text-4xl font-bold text-violet-500">{stats.totalMessages}</p>
            <p className="text-xs text-zinc-600 mt-4">Total WhatsApp/DM interactions</p>
          </div>
        </div>

        {/* Real Recharts Implementation */}
        <DashboardCharts funnelData={stats.funnelData} growthData={stats.growthData} />
      </div>
    </main>
  );
}