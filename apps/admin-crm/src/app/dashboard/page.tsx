import { getDashboardStats } from "@/app/actions/stats";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const stats = await getDashboardStats();
  
  // Calculate max for relative bar widths
  const maxFunnelValue = Math.max(...stats.funnelData.map((d: any) => d.value), 1);

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Native HTML/CSS Funnel Chart (React 19 Safe) */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-zinc-100 font-semibold mb-6">Pipeline Distribution</h3>
            <div className="space-y-4">
              {stats.funnelData.map((stage: any, i: number) => {
                const colors = ['bg-zinc-500', 'bg-blue-500', 'bg-amber-500', 'bg-emerald-500', 'bg-violet-500'];
                const widthPercent = (stage.value / maxFunnelValue) * 100;
                return (
                  <div key={stage.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-300">{stage.name}</span>
                      <span className="font-medium">{stage.value}</span>
                    </div>
                    <div className="w-full bg-zinc-950 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full ${colors[i % colors.length]}`} 
                        style={{ width: `${Math.max(widthPercent, 2)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
             <div className="h-16 w-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
               <svg className="w-8 h-8 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
             </div>
             <h3 className="text-zinc-100 font-semibold mb-2">Growth Trend (YTD)</h3>
             <p className="text-zinc-500 text-sm max-w-[250px]">Advanced charting is temporarily disabled while the dashboard system upgrades to Next.js 15 standards.</p>
          </div>
        </div>
      </div>
    </main>
  );
}