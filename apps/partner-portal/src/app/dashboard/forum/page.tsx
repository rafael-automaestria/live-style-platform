import { auth } from "../../../../auth";
import { getForumPosts } from "@/app/actions/forum";
import { CreatePostForm } from "@/components/forum-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";

export default async function ForumPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const posts = await getForumPosts();

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  };

  return (
    <main className="min-h-screen bg-[#050507] text-zinc-100 flex flex-col font-sans">
      {/* Barra de Navegação Superior */}
      <header className="border-b border-zinc-800/50 bg-[#08080a]/80 backdrop-blur-xl sticky top-0 z-50 shrink-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
             <Link href="/dashboard" className="flex items-center gap-3 group">
               <div className="relative">
                 <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-amber-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                 <Image 
                   src="/logo.png" 
                   alt="Live Style" 
                   width={40} 
                   height={40} 
                   className="relative rounded-full shadow-xl border border-white/5"
                 />
               </div>
               <div className="flex flex-col">
                 <span className="font-black text-sm tracking-[0.15em] uppercase italic bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">Partner Hub</span>
                 <span className="text-[10px] font-bold text-blue-500 tracking-[0.3em] uppercase -mt-1">Área do Criador</span>
               </div>
             </Link>
             <div className="h-6 w-px bg-zinc-800/50"></div>
             <span className="font-black text-xs uppercase tracking-[0.2em] text-amber-500 italic">Fórum da Comunidade</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/dashboard" className="px-4 py-2 text-sm font-bold text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-all">
              Academia
            </Link>
            <Link href="/dashboard/forum" className="px-4 py-2 text-sm font-bold text-white bg-white/5 rounded-full border border-white/10 transition-all">
              Comunidade
            </Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.03),transparent_50%)]">
        <div className="max-w-5xl mx-auto px-6 py-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">Networking & Suporte</span>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Comunidade de <span className="italic text-zinc-600 font-light">Criadores</span></h1>
              <p className="text-zinc-400 font-medium max-w-xl">Conecte-se, compartilhe dicas e faça networking com outros parceiros da Live Style.</p>
            </div>
            {userId && <CreatePostForm userId={userId} />}
          </div>

          <div className="grid gap-4">
            {posts.map((post) => (
              <Link href={`/dashboard/forum/${post.id}`} key={post.id} className="block group relative overflow-hidden rounded-[2rem] bg-[#0c0c0e] border border-zinc-800/50 p-8 transition-all duration-500 hover:border-amber-500/40 hover:translate-y-[-4px] shadow-xl hover:shadow-amber-500/5">
                <div className="flex gap-6">
                  <div className="relative shrink-0">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500 to-amber-200 rounded-full blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
                    <Avatar className="h-14 w-14 border border-white/5 relative bg-[#1a1a1c]">
                      <AvatarFallback className="bg-transparent text-amber-500 font-black text-xs uppercase">
                        {post.author.name?.substring(0, 2) || 'AN'}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="font-black text-xl text-zinc-100 truncate group-hover:text-amber-400 transition-colors tracking-tight">
                        {post.title}
                      </h3>
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest shrink-0 whitespace-nowrap">
                        {formatTime(post.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{post.author.name}</span>
                      <span className="h-1 w-1 rounded-full bg-zinc-800"></span>
                      <span className="text-[10px] font-black text-blue-500/70 uppercase tracking-widest">Parceiro Verificado</span>
                    </div>
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-6 leading-relaxed font-medium">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover:bg-amber-500/10 group-hover:text-amber-400 group-hover:border-amber-500/20 transition-all">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        {post._count.comments} Comentários
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {posts.length === 0 && (
              <div className="text-center py-32 bg-zinc-950/50 border-2 border-dashed border-zinc-900 rounded-[2.5rem] space-y-6">
                <div className="h-20 w-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto text-zinc-700">
                   <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-zinc-300">Nenhuma discussão ainda</h3>
                  <p className="text-zinc-500 font-medium">Seja o primeiro a iniciar uma conversa na comunidade!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
