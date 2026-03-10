import { ReactNode } from "react";
import Link from "next/link";
import { signOut } from "../../../auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-900/50 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">LS</span>
            </div>
            <span className="font-bold tracking-tight">Live Style</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Overview
          </Link>
          <Link href="/dashboard/pipeline" className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
            CRM Pipeline
          </Link>
          <Link href="/dashboard/inbox" className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            Omnichannel Inbox
          </Link>
          <div className="pt-4 mt-4 border-t border-zinc-800">
            <Link href="#" className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Team Management
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-9 w-9 border border-zinc-700">
              <AvatarFallback className="bg-blue-600 text-white text-xs">AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-zinc-500">admin@livestyle.com</span>
            </div>
          </div>
          <form action={async () => { 'use server'; await signOut(); }}>
            <Button variant="outline" className="w-full text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-white">
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {children}
      </main>
    </div>
  );
}