import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "../../../auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0c] text-zinc-100 font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-zinc-800/50 bg-[#0c0c0e]/80 backdrop-blur-xl flex flex-col z-20">
        <div className="h-20 flex items-center px-8 border-b border-zinc-800/50">
          <Link href="/dashboard" className="flex items-center gap-3 group transition-all">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-red-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <Image 
                src="/logo.png" 
                alt="Live Style" 
                width={36} 
                height={36} 
                className="relative rounded-full shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-widest uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Live Style</span>
              <span className="text-[10px] font-bold text-red-600 tracking-[0.25em] uppercase -mt-1">Admin da Agência</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
          <div className="px-4 mb-4">
             <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Navegação</span>
          </div>
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/40 rounded-xl transition-all group">
            <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-blue-600/10 group-hover:text-blue-400 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
            <span className="font-semibold text-sm">Visão Geral</span>
          </Link>
          <Link href="/dashboard/pipeline" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/40 rounded-xl transition-all group">
            <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-red-600/10 group-hover:text-red-400 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
            </div>
            <span className="font-semibold text-sm">Pipeline de Vendas</span>
          </Link>
          <Link href="/dashboard/inbox" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/40 rounded-xl transition-all group">
            <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-amber-600/10 group-hover:text-amber-400 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <span className="font-semibold text-sm">Caixa de Entrada</span>
          </Link>
          <div className="pt-6 mt-6 border-t border-zinc-800/50">
            <div className="px-4 mb-4">
               <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Administração</span>
            </div>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/40 rounded-xl transition-all group">
              <div className="p-2 rounded-lg bg-zinc-900 group-hover:bg-white/10 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <span className="font-semibold text-sm">Gerenciamento de Equipe</span>
            </Link>
          </div>
        </nav>

        <div className="p-6 border-t border-zinc-800/50 bg-[#0c0c0e]">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <Avatar className="h-10 w-10 border border-white/5 relative">
                <AvatarFallback className="bg-[#1a1a1c] text-white text-[10px] font-black uppercase">AD</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight">Administrador</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Super Admin</span>
            </div>
          </div>
          <form action={async () => { 'use server'; await signOut(); }}>
            <Button variant="outline" className="w-full h-11 text-zinc-400 border-zinc-800/50 bg-zinc-900/20 hover:bg-red-600 hover:text-white hover:border-red-600 rounded-xl font-bold transition-all shadow-lg active:scale-[0.98]">
              Sair do Sistema
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.02),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.02),transparent_40%)]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>
        {children}
      </main>
    </div>
  );
}