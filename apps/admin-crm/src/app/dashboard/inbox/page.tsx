import { getInboxData } from "@/app/actions/inbox";
import { InboxClient } from "@/components/inbox-client";

export const dynamic = 'force-dynamic';

export default async function InboxPage() {
  const prospects = await getInboxData();

  // Convert dates to strings for passing to Client Component safely
  const safeProspects = prospects.map((p: any) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    contactInfo: p.contactInfo ? JSON.stringify(p.contactInfo) : null,
    messages: p.messages.map((m: any) => ({
      ...m,
      createdAt: m.createdAt.toISOString(),
    }))
  }));

  return (
    <div className="flex flex-col h-full bg-zinc-950">
      <header className="h-16 flex items-center justify-between px-8 border-b border-zinc-800 shrink-0 bg-zinc-900/50">
        <div>
          <h1 className="text-2xl font-bold text-white">Omnichannel Inbox</h1>
          <p className="text-sm text-zinc-400">WhatsApp, Instagram, and TikTok Centralized</p>
        </div>
      </header>

      {/* Interactive Client Component */}
      <InboxClient initialProspects={safeProspects} />
    </div>
  );
}