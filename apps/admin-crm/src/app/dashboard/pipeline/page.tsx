import { Badge } from "@/components/ui/badge";
import { getPipelineData, getFunnels } from "@/app/actions/pipeline";
import { PipelineBoard } from "@/components/pipeline-board";
import { AddProspectForm } from "@/components/add-prospect-form";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function PipelinePage({ searchParams }: { searchParams: Promise<{ funnelId?: string }> }) {
  const { funnelId } = await searchParams;
  const funnels = await getFunnels();
  const currentFunnelId = funnelId || (funnels.length > 0 ? funnels[0].id : undefined);

  const stages = await getPipelineData(currentFunnelId);
  const firstStageId = stages.length > 0 ? stages[0].id : '';

  // We convert dates to strings to pass them safely from Server to Client component
  const safeStages = stages.map((stage: any) => ({
    ...stage,
    createdAt: stage.createdAt.toISOString(),
    updatedAt: stage.updatedAt.toISOString(),
    prospects: stage.leads.map((p: any) => ({
      ...p,
      contactInfo: p.properties ? JSON.stringify(p.properties) : null,
      utms: p.utms ? JSON.stringify(p.utms) : null,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }))
  }));

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950">
      <header className="h-16 flex items-center justify-between px-8 border-b border-zinc-800 shrink-0 bg-zinc-900/50 relative">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Pipeline de Vendas</h1>
            <p className="text-sm text-zinc-400">Gerencie e automatize o recrutamento de artistas</p>
          </div>
          
          <nav className="flex items-center gap-2 bg-zinc-900 p-1 rounded-lg border border-zinc-800 ml-4">
             {funnels.map(f => (
                <Link 
                  key={f.id} 
                  href={`/dashboard/pipeline?funnelId=${f.id}`}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    currentFunnelId === f.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  {f.name}
                </Link>
             ))}
          </nav>
        </div>
        <div className="flex gap-3 items-center">
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800 text-zinc-300 gap-2 h-7">
             <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
             Workers Ativos
          </Badge>
          <AddProspectForm firstStageId={firstStageId} />
        </div>
      </header>

      {/* Kanban Board Client Component */}
      <PipelineBoard initialStages={safeStages} />
    </div>
  );
}