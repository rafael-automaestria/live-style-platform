'use client';

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Instagram, 
  Music, 
  TrendingUp, 
  Calendar, 
  Heart, 
  Star, 
  CreditCard, 
  MapPin, 
  Tag, 
  MessageSquare, 
  ExternalLink 
} from "lucide-react";
import { useEffect, useState } from "react";

type LeadDetailsProps = {
  lead: any;
  onClose: () => void;
  isOpen: boolean;
};

export function LeadDetailsSheet({ lead, onClose, isOpen }: LeadDetailsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  // Safe parse for properties and UTMs if they are passed as strings or objects
  const properties = typeof lead.contactInfo === 'string' ? JSON.parse(lead.contactInfo) : (lead.properties || {});
  const utms = typeof lead.utms === 'string' ? JSON.parse(lead.utms) : (lead.utms || {});

  const InfoRow = ({ label, value, icon: Icon }: { label: string, value: any, icon?: any }) => (
    <div className="group flex flex-col space-y-1.5 py-3 border-b border-zinc-800/30 last:border-0">
      <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-widest font-bold">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </div>
      <div className="text-sm text-zinc-100 font-medium pl-5 group-hover:text-blue-400 transition-colors break-words">
        {value || <span className="text-zinc-700 italic">Não informado</span>}
      </div>
    </div>
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4 mt-8 flex items-center gap-2">
      <span className="h-1 w-4 bg-blue-600 rounded-full"></span>
      {title}
    </h3>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Side Panel */}
      <div className="relative w-full max-w-xl bg-zinc-950 border-l border-zinc-800 shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-500">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-900/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 ring-2 ring-blue-500/20">
              <AvatarFallback className="bg-blue-600/10 text-blue-500 text-xl font-bold">
                {lead.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold text-zinc-100">{lead.name}</h2>
              <div className="flex gap-2 mt-1.5">
                <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 hover:bg-blue-500/20">
                  {lead.status}
                </Badge>
                <Badge variant="outline" className="border-zinc-800 text-zinc-400">
                  {lead.platform}
                </Badge>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-all"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 px-8 pb-12">
          {/* CRM Workflow Section */}
          <SectionTitle title="Fluxo de Trabalho CRM" />
          <div className="grid grid-cols-2 gap-x-8">
             <InfoRow label="Funil" value={lead.funnel?.name || 'Funil Padrão'} icon={TrendingUp} />
             <InfoRow label="Estágio Atual" value={lead.stage?.name || 'Novo Lead'} icon={Tag} />
             <InfoRow label="Responsável" value={lead.responsible?.name || 'Não atribuído'} icon={User} />
             <InfoRow label="Tags de Automação" value={properties.tags_automacao} icon={Star} />
          </div>

          {/* Socials & Contact Section */}
          <SectionTitle title="Sociais & Contato" />
          <div className="grid grid-cols-2 gap-x-8">
             <InfoRow label="E-mail" value={lead.email} icon={Mail} />
             <InfoRow label="WhatsApp" value={lead.whatsapp} icon={Phone} />
             <InfoRow label="TikTok" value={properties.user_tiktok || properties.arroba_tiktok} icon={Music} />
             <InfoRow label="Seguidores" value={properties.seguidores_tiktok} icon={TrendingUp} />
             <InfoRow label="Gênero" value={properties.sexo} icon={User} />
             <InfoRow label="Indicação por" value={properties.indicacao_por} icon={MessageSquare} />
          </div>

          {/* Artist Profile Section (Long Texts) */}
          <SectionTitle title="Perfil do Artista" />
          <div className="space-y-4">
             <InfoRow label="História na Música & Desafios" value={properties.maior_desafio || properties.historia_musica} icon={Music} />
             <InfoRow label="Sonhos & Objetivos" value={properties.maior_sonho} icon={Heart} />
             <InfoRow label="Principais Características" value={properties.caracteristicas} icon={Star} />
             <InfoRow label="Disponibilidade" value={properties.disponibilidade_lives} icon={Calendar} />
             <InfoRow label="Tipo de Artista" value={properties.tipo_artista} icon={User} />
          </div>

          {/* Backstage & IDs Section */}
          <SectionTitle title="Integração Backstage" />
          <div className="grid grid-cols-2 gap-x-8">
             <InfoRow label="ID Backstage" value={properties.id_backstage} icon={Tag} />
             <InfoRow label="Código de Convite" value={properties.codigo_convite} icon={Star} />
             <InfoRow label="CM Responsável" value={properties.cm_responsavel} icon={User} />
             <div className="py-3 flex flex-col space-y-1.5">
                <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
                  <ExternalLink className="h-3 w-3" />
                  Link do Perfil
                </span>
                {properties.link_perfil_backstage ? (
                   <a href={properties.link_perfil_backstage} target="_blank" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
                     Abrir Perfil <ExternalLink className="h-3 w-3" />
                   </a>
                ) : <span className="text-sm text-zinc-700 italic">Sem link</span>}
             </div>
          </div>

          {/* Sales & Billing Section */}
          <SectionTitle title="Vendas & Faturamento" />
          <div className="grid grid-cols-2 gap-x-8">
             <InfoRow label="Data de Compra" value={properties.data_compra} icon={Calendar} />
             <InfoRow label="Produto" value={properties.nome_produto} icon={Tag} />
             <InfoRow label="ID da Transação" value={properties.id_transacao_hotmart} icon={CreditCard} />
             <InfoRow label="Valor" value={properties.valor_em_reais ? `R$ ${properties.valor_em_reais}` : null} icon={CreditCard} />
          </div>

          {/* UTM Tracking Section */}
          <SectionTitle title="Marketing (UTMs)" />
          <div className="bg-zinc-900/30 rounded-lg p-4 grid grid-cols-2 gap-x-6 gap-y-4 border border-zinc-800/50">
             <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase text-zinc-500 font-bold">Origem</span>
                <span className="text-xs text-blue-400 font-mono">{utms.source || 'direto'}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase text-zinc-500 font-bold">Campanha</span>
                <span className="text-xs text-zinc-300 font-mono">{utms.campaign || 'nenhuma'}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase text-zinc-500 font-bold">Mídia</span>
                <span className="text-xs text-zinc-300 font-mono">{utms.medium || 'nenhuma'}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase text-zinc-500 font-bold">Conteúdo</span>
                <span className="text-xs text-zinc-300 font-mono">{utms.content || 'nenhuma'}</span>
             </div>
          </div>

          <SectionTitle title="Informações do Sistema" />
          <div className="grid grid-cols-2 text-[10px] text-zinc-600 gap-4">
             <div>ID: {lead.id}</div>
             <div>Criado em: {new Date(lead.createdAt).toLocaleString()}</div>
             <div>Atualizado em: {new Date(lead.updatedAt).toLocaleString()}</div>
          </div>
        </ScrollArea>
        
        {/* Footer Actions */}
        <div className="p-6 border-t border-zinc-800 bg-zinc-900/60 shrink-0 flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-lg shadow-blue-600/10">
             Aprovar Artista
          </button>
          <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold py-3 rounded-lg text-sm transition-all">
             Enviar WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
