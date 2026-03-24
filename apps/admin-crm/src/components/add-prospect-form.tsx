'use client';

import { useState } from 'react';
import { addProspect } from '@/app/actions/pipeline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AddProspectForm({ firstStageId }: { firstStageId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
      >
        Adicionar Prospect
      </button>
    );
  }

  return (
    <div className="absolute right-8 top-16 mt-2 w-80 bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-2xl z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-zinc-100">Novo Prospect</h3>
        <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">&times;</button>
      </div>
      <form action={async (formData) => {
        await addProspect(formData);
        setIsOpen(false);
      }} className="space-y-3">
        <input type="hidden" name="stageId" value={firstStageId} />
        <Input name="name" placeholder="Nome do Prospect (ex: Lia Singer)" required className="bg-zinc-950 border-zinc-800" />
        <Input name="platform" placeholder="Plataforma (ex: TikTok)" required className="bg-zinc-950 border-zinc-800" />
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white">Salvar Prospect</Button>
      </form>
    </div>
  );
}