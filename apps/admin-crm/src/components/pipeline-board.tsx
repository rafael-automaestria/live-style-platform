'use client';

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { moveProspect } from "@/app/actions/pipeline";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

type Prospect = {
  id: string;
  name: string;
  platform: string;
  stageId: string;
  status: string;
};

type PipelineStage = {
  id: string;
  name: string;
  order: number;
  prospects: Prospect[];
};

export function PipelineBoard({ initialStages }: { initialStages: PipelineStage[] }) {
  const [isPending, startTransition] = useTransition();

  const handleMove = (prospectId: string, currentOrder: number, direction: 'next' | 'prev') => {
    const currentIndex = initialStages.findIndex(s => s.order === currentOrder);
    const targetStage = direction === 'next' ? initialStages[currentIndex + 1] : initialStages[currentIndex - 1];

    if (!targetStage) return;

    startTransition(() => {
      moveProspect(prospectId, targetStage.id);
    });
  };

  const getStageColor = (order: number) => {
    const colors = ['bg-zinc-500', 'bg-blue-500', 'bg-amber-500', 'bg-emerald-500', 'bg-violet-500'];
    return colors[Math.min(order - 1, colors.length - 1)];
  };

  return (
    <div className="flex-1 overflow-x-auto p-8 opacity-100 transition-opacity" style={{ opacity: isPending ? 0.7 : 1 }}>
      <div className="flex gap-6 h-full min-w-max pb-4">
        {initialStages.map((stage) => (
          <div key={stage.id} className="w-80 flex flex-col h-full bg-zinc-900/30 rounded-xl border border-zinc-800/50">
            {/* Column Header */}
            <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${getStageColor(stage.order)}`}></span>
                <h3 className="font-semibold text-zinc-100">{stage.name}</h3>
              </div>
              <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                {stage.prospects.length}
              </Badge>
            </div>

            {/* Column Body / Cards */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {stage.prospects.map(prospect => (
                <div key={prospect.id} className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 p-4 rounded-lg shadow-sm transition-all hover:shadow-md">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-zinc-800 text-zinc-300 text-xs uppercase">
                          {prospect.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-zinc-100">{prospect.name}</p>
                        <p className="text-xs text-zinc-500">{prospect.platform}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-zinc-800 text-zinc-400">
                      {prospect.status}
                    </Badge>
                    
                    <div className="flex gap-1">
                      {stage.order > 1 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-6 px-2 py-0 text-xs border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                          onClick={() => handleMove(prospect.id, stage.order, 'prev')}
                        >
                          &larr;
                        </Button>
                      )}
                      {stage.order < initialStages.length && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-6 px-2 py-0 text-xs border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                          onClick={() => handleMove(prospect.id, stage.order, 'next')}
                        >
                          &rarr;
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {stage.prospects.length === 0 && (
                <div className="h-24 border-2 border-dashed border-zinc-800/50 rounded-lg flex items-center justify-center text-zinc-600 text-sm">
                  No prospects
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
