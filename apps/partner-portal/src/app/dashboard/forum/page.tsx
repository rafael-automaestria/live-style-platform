import { auth } from "../../../../auth";
import { getForumPosts } from "@/app/actions/forum";
import { CreatePostForm } from "@/components/forum-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function ForumPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const posts = await getForumPosts();

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
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
              <span className="font-bold text-lg tracking-tight">Partner Area</span>
             </Link>
             <div className="h-6 w-px bg-zinc-800"></div>
             <span className="font-medium text-amber-500">Community Forum</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-12">
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-white">Creator Community</h1>
              <p className="text-zinc-400 mt-2">Connect, share tips, and network with other Live Style partners.</p>
            </div>
            {userId && <CreatePostForm userId={userId} />}
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Link href={`/dashboard/forum/${post.id}`} key={post.id} className="block bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/30 transition-colors group cursor-pointer">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10 border border-zinc-700 shrink-0">
                    <AvatarFallback className="bg-zinc-800 text-amber-500 uppercase">
                      {post.author.name?.substring(0, 2) || 'AN'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h3 className="font-bold text-lg text-zinc-100 truncate group-hover:text-amber-500 transition-colors">
                        {post.title}
                      </h3>
                      <span className="text-xs text-zinc-500 shrink-0 whitespace-nowrap">
                        {formatTime(post.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3 flex items-center gap-2">
                      <span className="font-medium text-zinc-300">{post.author.name}</span>
                    </p>
                    <p className="text-zinc-300 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {post.content}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                      <span className="flex items-center gap-1.5 hover:text-amber-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        {post._count.comments} Comments
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {posts.length === 0 && (
              <div className="text-center py-20 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl">
                <div className="h-16 w-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                   <svg className="w-8 h-8 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-zinc-300">No discussions yet</h3>
                <p className="text-zinc-500 mt-2">Be the first to start a conversation in the community!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}