'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createForumPost } from "@/app/actions/forum";

export function CreatePostForm({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black rounded-xl px-6 h-12 transition-all hover:scale-[1.05] active:scale-[0.95]"
      >
        Nova Discussão
      </Button>
    );
  }

  return (
    <div className="bg-[#0c0c0e] border border-zinc-800/50 rounded-[2rem] p-8 mb-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-200"></div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-white text-xl tracking-tight">Iniciar Nova Discussão</h3>
        <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      <form action={async (formData) => {
        await createForumPost(formData);
        setIsOpen(false);
      }} className="space-y-6">
        <input type="hidden" name="authorId" value={userId} />
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Título do Tópico</label>
          <Input 
            name="title" 
            placeholder="Ex: Melhores horários para live?" 
            required 
            className="bg-zinc-950/60 border-zinc-800 text-zinc-100 h-14 rounded-2xl focus-visible:ring-amber-500" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Conteúdo da Mensagem</label>
          <textarea 
            name="content" 
            placeholder="O que você tem em mente? Compartilhe dicas, faça perguntas..." 
            required 
            rows={4}
            className="w-full bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50 transition-all resize-none text-sm font-medium" 
          />
        </div>
        <div className="flex justify-end pt-2">
          <Button type="submit" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black px-10 h-14 rounded-2xl shadow-xl shadow-amber-500/10 transition-all hover:translate-y-[-2px]">
            Publicar Tópico
          </Button>
        </div>
      </form>
    </div>
  );
}
