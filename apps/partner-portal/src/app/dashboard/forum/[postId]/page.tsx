import { auth } from "../../../../../auth";
import { getForumPostDetails } from "@/app/actions/forum";
import { CommentForm } from "@/components/comment-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PostDetailsPage({ params }: { params: Promise<{ postId: string }> }) {
  const resolvedParams = await params;
  const session = await auth();
  const userId = session?.user?.id;
  
  if (!userId) redirect('/');

  const post = await getForumPostDetails(resolvedParams.postId);

  if (!post) {
    return <div className="p-8 text-center text-zinc-500">Postagem não encontrada.</div>;
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50 shrink-0">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
             <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
               <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs tracking-tighter">LS</span>
              </div>
              <span className="font-bold text-lg tracking-tight">Área do Parceiro</span>
             </Link>
             <div className="h-6 w-px bg-zinc-800"></div>
             <Link href="/dashboard/forum" className="font-medium text-zinc-400 hover:text-amber-500 transition-colors">
               Fórum da Comunidade
             </Link>
             <span className="text-zinc-600">/</span>
             <span className="text-zinc-300 text-sm truncate max-w-[200px]">{post.title}</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-12">
          
          <Link href="/dashboard/forum" className="text-zinc-500 hover:text-amber-500 transition-colors flex items-center gap-2 text-sm font-medium mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Voltar para as Discussões
          </Link>

          {/* Original Post */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mb-8 shadow-sm">
            <h1 className="text-3xl font-extrabold text-white mb-6">{post.title}</h1>
            
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-zinc-800">
               <Avatar className="h-10 w-10 border border-zinc-700 shrink-0">
                <AvatarFallback className="bg-zinc-800 text-amber-500 uppercase">
                  {post.author.name?.substring(0, 2) || 'AN'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-zinc-300">{post.author.name}</p>
                <p className="text-xs text-zinc-500">{formatTime(post.createdAt)}</p>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          <h3 className="font-bold text-xl text-zinc-100 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-amber-500 inline-block"></span>
            Respostas ({post.comments.length})
          </h3>

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments.map((comment) => (
              <div key={comment.id} className="bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                   <Avatar className="h-8 w-8 border border-zinc-700 shrink-0">
                    <AvatarFallback className="bg-zinc-800 text-amber-500 text-xs uppercase">
                      {comment.author.name?.substring(0, 2) || 'AN'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-zinc-300">{comment.author.name}</p>
                    <p className="text-xs text-zinc-500">{formatTime(comment.createdAt)}</p>
                  </div>
                </div>
                <div className="text-zinc-300 text-sm whitespace-pre-wrap pl-11">
                  {comment.content}
                </div>
              </div>
            ))}

            {post.comments.length === 0 && (
              <p className="text-zinc-500 italic text-center py-4">Nenhuma resposta ainda. Seja o primeiro a responder!</p>
            )}
          </div>

          {/* Add Comment Form */}
          <CommentForm userId={userId} postId={post.id} />
        </div>
      </div>
    </main>
  );
}