import { getDashboardStats } from "@/app/actions/stats";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const stats = await getDashboardStats();
  
  // Calculate max for relative bar widths
  const maxFunnelValue = Math.max(...stats.funnelData.map((d: any) => d.value), 1);

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-zinc-100 p-10 flex-1 overflow-y-auto font-sans relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -ml-64 -mb-64"></div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800/50 pb-8">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.4em]">Visão Geral Operacional</span>
            <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">Dashboard <span className="text-zinc-600 font-light italic-none">Executivo</span></h1>
            <p className="text-zinc-500 font-medium tracking-wide">Métricas em tempo real da Live Style Agency.</p>
          </div>
          <div className="flex items-center gap-4 bg-[#0c0c0e] border border-zinc-800/50 p-2 rounded-2xl">
             <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center shadow-lg shadow-red-600/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <div className="pr-4">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">Última Atualização</p>
                <p className="text-xs font-bold text-white mt-1">Agora mesmo</p>
             </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative bg-[#0c0c0e] border border-zinc-800/50 rounded-[2rem] p-8 shadow-xl transition-all hover:border-blue-500/30">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
               <svg className="w-12 h-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Recrutamento (Leads)</h3>
            <p className="text-5xl font-black text-white tracking-tighter">{stats.totalProspects}</p>
            <div className="h-1.5 w-12 bg-blue-600 rounded-full mt-6"></div>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-4 leading-relaxed">Artistas ativos no funil de prospecção e análise.</p>
          </div>

          <div className="group relative bg-[#0c0c0e] border border-zinc-800/50 rounded-[2rem] p-8 shadow-xl transition-all hover:border-amber-500/30">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
               <svg className="w-12 h-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Parceiros Oficiais</h3>
            <p className="text-5xl font-black text-white tracking-tighter">{stats.activePartners}</p>
            <div className="h-1.5 w-12 bg-amber-500 rounded-full mt-6"></div>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-4 leading-relaxed">Criadores aprovados e com acesso total ao portal.</p>
          </div>

          <div className="group relative bg-[#0c0c0e] border border-zinc-800/50 rounded-[2rem] p-8 shadow-xl transition-all hover:border-red-600/30">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
               <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Interações Totais</h3>
            <p className="text-5xl font-black text-white tracking-tighter">{stats.totalMessages}</p>
            <div className="h-1.5 w-12 bg-red-600 rounded-full mt-6"></div>
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-4 leading-relaxed">Total de mensagens e tickets em todos os canais.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#0c0c0e] border border-zinc-800/50 rounded-[2.5rem] p-10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4">
               <span className="text-[8px] font-black text-zinc-800 uppercase tracking-[0.5em] rotate-90 origin-right">Live Style CRM</span>
            </div>
            <div className="mb-10">
              <h3 className="text-2xl font-black text-white tracking-tight uppercase italic">Distribuição do <span className="text-blue-500">Pipeline</span></h3>
              <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mt-2">Volume por estágio do funil</p>
            </div>
            <div className="space-y-6">
              {stats.funnelData.map((stage: any, i: number) => {
                const gradients = [
                  'from-zinc-800 to-zinc-900',
                  'from-blue-600 to-blue-400',
                  'from-amber-600 to-amber-400',
                  'from-emerald-600 to-emerald-400',
                  'from-red-600 to-red-400'
                ];
                const widthPercent = (stage.value / maxFunnelValue) * 100;
                return (
                  <div key={stage.name} className="group/item">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3 transition-colors group-hover/item:text-white text-zinc-500">
                      <span>{stage.name}</span>
                      <span className="text-white bg-zinc-800 px-2 py-0.5 rounded-md">{stage.value}</span>
                    </div>
                    <div className="w-full bg-[#050507] rounded-full h-3 overflow-hidden border border-white/5 shadow-inner">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${gradients[i % gradients.length]} transition-all duration-1000 ease-out`} 
                        style={{ width: `${Math.max(widthPercent, 2)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-[#0c0c0e] border border-zinc-800/50 rounded-[2.5rem] p-10 shadow-xl flex flex-col items-center justify-center text-center group">
             <div className="relative mb-8">
               <div className="absolute -inset-8 bg-blue-600 rounded-full blur-[80px] opacity-10 animate-pulse"></div>
               <div className="h-20 w-20 bg-[#050507] rounded-[2rem] border border-zinc-800 flex items-center justify-center shadow-2xl relative rotate-3 group-hover:rotate-0 transition-transform duration-500">
                 <svg className="w-10 h-10 text-zinc-500 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
               </div>
             </div>
             <h3 className="text-2xl font-black text-white tracking-tight uppercase italic mb-4">Tendência de <span className="text-red-600">Crescimento</span></h3>
             <p className="text-zinc-500 font-medium text-sm max-w-[320px] leading-relaxed">
               Os gráficos avançados estão temporariamente em manutenção enquanto migramos o motor de renderização para a nova arquitetura Turbopack.
             </p>
             <div className="mt-8 px-6 py-2 rounded-full border border-zinc-800 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                Próxima atualização: v3.2 (Maio 2026)
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
