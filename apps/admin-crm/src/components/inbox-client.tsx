'use client';

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { sendMessage } from "@/app/actions/inbox";
import { useTransition } from "react";

type Message = {
  id: string;
  content: string;
  direction: string;
  channel: string;
  createdAt: string;
};

type Prospect = {
  id: string;
  name: string;
  platform: string;
  status: string;
  stage: { name: string };
  messages: Message[];
};

export function InboxClient({ initialProspects }: { initialProspects: Prospect[] }) {
  const [prospects, setProspects] = useState<Prospect[]>(initialProspects);
  const [selectedId, setSelectedId] = useState<string | null>(prospects.length > 0 ? prospects[0].id : null);
  const [messageText, setMessageText] = useState("");
  const [isPending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedId, prospects]);

  // Update state if initial props change (e.g. via server action revalidation)
  useEffect(() => {
    setProspects(initialProspects);
  }, [initialProspects]);

  const selectedProspect = prospects.find(p => p.id === selectedId);

  const handleSend = () => {
    if (!selectedId || !messageText.trim()) return;
    
    const textToSend = messageText;
    setMessageText(""); // Optimistic clear

    startTransition(() => {
      sendMessage(selectedId, textToSend);
    });
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r border-zinc-800 flex flex-col bg-zinc-900/30">
        <div className="p-4 border-b border-zinc-800">
          <Input 
            placeholder="Pesquisar conversas..." 
            className="bg-zinc-950 border-zinc-800 text-sm h-9"
          />
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {prospects.map((prospect) => {
              const lastMessage = prospect.messages[prospect.messages.length - 1];
              return (
                <div key={prospect.id}>
                  <button 
                    onClick={() => setSelectedId(prospect.id)}
                    className={`w-full p-4 flex gap-3 text-left hover:bg-zinc-800/50 transition-colors ${selectedId === prospect.id ? 'bg-zinc-800/50' : ''}`}
                  >
                    <div className="relative shrink-0">
                      <Avatar>
                        <AvatarFallback className="bg-zinc-800 text-zinc-300 uppercase">
                          {prospect.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {/* Platform Icon Badge */}
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border border-zinc-900 flex items-center justify-center text-[8px] bg-zinc-800 font-bold uppercase">
                        {prospect.platform ? prospect.platform[0] : '?'}
                      </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-semibold text-sm text-zinc-100 truncate">{prospect.name}</span>
                        {lastMessage && (
                          <span className="text-xs text-zinc-500 shrink-0 ml-2">{formatTime(lastMessage.createdAt)}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-zinc-400 truncate pr-2">
                          {lastMessage ? lastMessage.content : 'Sem mensagens ainda'}
                        </span>
                      </div>
                    </div>
                  </button>
                  <Separator className="bg-zinc-800/50" />
                </div>
              );
            })}
            {prospects.length === 0 && (
              <div className="p-8 text-center text-zinc-500 text-sm">
                Nenhum prospect encontrado.
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Window */}
      {selectedProspect ? (
        <div className="flex-1 flex flex-col bg-zinc-950 relative">
          {/* Chat Header */}
          <div className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-900/50 shrink-0">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-blue-600/20 text-blue-500 uppercase">
                  {selectedProspect.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-zinc-100">{selectedProspect.name}</h3>
                <p className="text-xs text-zinc-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Online via {selectedProspect.platform}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="border-blue-900 text-blue-400 bg-blue-950/30">
                Estágio: {selectedProspect.stage.name}
              </Badge>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6" ref={scrollRef}>
            <div className="space-y-6">
              {selectedProspect.messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-zinc-500 text-sm">
                  Inicie a conversa!
                </div>
              ) : (
                selectedProspect.messages.map((msg) => {
                  const isOutbound = msg.direction === 'OUTBOUND';
                  return (
                    <div key={msg.id} className={`flex gap-3 ${isOutbound ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="h-8 w-8 mt-1 shrink-0">
                        {isOutbound ? (
                           <AvatarFallback className="bg-violet-600 text-white text-xs">VOCÊ</AvatarFallback>
                        ) : (
                           <AvatarFallback className="bg-blue-600/20 text-blue-500 text-xs uppercase">{selectedProspect.name.substring(0, 2)}</AvatarFallback>
                        )}
                      </Avatar>
                      <div className={`max-w-[70%] ${isOutbound ? 'text-right' : 'text-left'}`}>
                        <span className={`text-xs text-zinc-500 mb-1 block ${isOutbound ? 'mr-1' : 'ml-1'}`}>
                          {isOutbound ? 'Você' : selectedProspect.name} • {formatTime(msg.createdAt)}
                        </span>
                        <div className={`p-3 rounded-2xl text-sm ${
                          isOutbound 
                            ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/10' 
                            : 'bg-zinc-900 border border-zinc-800 rounded-tl-none text-zinc-300'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-900/30 shrink-0">
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl p-2 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all opacity-100" style={{ opacity: isPending ? 0.7 : 1 }}>
              <input 
                type="text" 
                placeholder={`Mensagem para ${selectedProspect.name}...`}
                className="flex-1 bg-transparent border-none focus:outline-none text-zinc-100 text-sm px-2"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                disabled={isPending}
              />
              <button 
                onClick={handleSend}
                disabled={isPending || !messageText.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-2 text-center">
              Enviando como mensagem de WhatsApp.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-zinc-950">
          <p className="text-zinc-500">Selecione uma conversa para começar a enviar mensagens</p>
        </div>
      )}
    </div>
  );
}