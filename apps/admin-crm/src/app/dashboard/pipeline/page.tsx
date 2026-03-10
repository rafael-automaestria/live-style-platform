import { Badge } from "@/components/ui/badge";
import { getPipelineData } from "@/app/actions/pipeline";
import { PipelineBoard } from "@/components/pipeline-board";
import { AddProspectForm } from "@/components/add-prospect-form";

export const dynamic = 'force-dynamic';

export default async function PipelinePage() {
  const stages = await getPipelineData();
  const firstStageId = stages.length > 0 ? stages[0].id : '';

  // We convert dates to strings to pass them safely from Server to Client component
  const safeStages = stages.map((stage: any) => ({
    ...stage,
    createdAt: stage.createdAt.toISOString(),
    updatedAt: stage.updatedAt.toISOString(),
    prospects: stage.prospects.map((p: any) => ({
      ...p,
      contactInfo: p.contactInfo ? JSON.stringify(p.contactInfo) : null,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }))
  }));

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950">
      <header className="h-16 flex items-center justify-between px-8 border-b border-zinc-800 shrink-0 bg-zinc-900/50 relative">
        <div>
          <h1 className="text-2xl font-bold text-white">CRM Pipeline</h1>
          <p className="text-sm text-zinc-400">Manage and automate artist recruitment</p>
        </div>
        <div className="flex gap-3 items-center">
          <Badge variant="outline" className="border-zinc-700 bg-zinc-800 text-zinc-300 gap-2 h-7">
             <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
             Workers Active
          </Badge>
          <AddProspectForm firstStageId={firstStageId} />
        </div>
      </header>

      {/* Kanban Board Client Component */}
      <PipelineBoard initialStages={safeStages} />
    </div>
  );
}