import { signOut, auth } from "../../../auth";
import { Button } from "@/components/ui/button";
import { getPartnerCourses } from "@/app/actions/courses";
import Link from "next/link";
import Image from "next/image";

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user?.id;
  
  let courses: any[] = [];
  if (userId) {
    courses = await getPartnerCourses(userId);
  }

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
            
            <nav className="hidden md:flex items-center gap-1 ml-4">
              <Link href="/dashboard" className="px-4 py-2 text-sm font-bold text-white bg-white/5 rounded-full border border-white/10 transition-all">
                Academia
              </Link>
              <Link href="/dashboard/forum" className="px-4 py-2 text-sm font-bold text-zinc-500 hover:text-white hover:bg-white/5 rounded-full transition-all">
                Comunidade
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Parceiro Ativo</span>
              <span className="text-sm font-black text-white">{session?.user?.name || 'Top Creator'}</span>
            </div>
            <form action={async () => { 'use server'; await signOut(); }}>
              <Button variant="outline" size="sm" className="h-10 border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-red-400 hover:border-red-400/50 hover:bg-red-400/5 rounded-xl font-bold px-5 transition-all">
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>
      
      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.05),transparent_50%)]">
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
          {/* Banner Hero */}
          <div className="rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black p-1 bg-gradient-to-br from-blue-600/20 via-zinc-900 to-amber-500/20 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="bg-[#0c0c0e] rounded-[2.4rem] p-10 md:p-16 relative z-10 overflow-hidden flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Nova Masterclass Ao Vivo
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                  DOMINE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-amber-400">O ALGORITMO.</span>
                </h1>
                <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
                  Nossa última análise profunda revela como os top 1% criadores estão mantendo mais de 20 mil espectadores simultâneos em suas lives.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <Button className="w-full sm:w-auto h-14 bg-white text-black hover:bg-zinc-200 font-black px-10 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all">
                    ASSISTIR MASTERCLASS
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto h-14 border-zinc-800 bg-transparent text-white hover:bg-white/5 font-black px-10 rounded-2xl transition-all">
                    SAIBA MAIS
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/3 relative flex justify-center">
                 <div className="relative group">
                    <div className="absolute -inset-10 bg-blue-600 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                    <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-[3rem] bg-gradient-to-br from-blue-600 to-amber-500 p-1 rotate-6 group-hover:rotate-0 transition-transform duration-700">
                      <div className="h-full w-full rounded-[2.9rem] bg-zinc-900 flex items-center justify-center overflow-hidden">
                        <svg className="w-20 h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Seção de Cursos */}
          <div className="space-y-10">
            <div className="flex items-end justify-between px-2">
              <div className="space-y-2">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Educação Curada</span>
                <h2 className="text-4xl font-black text-white tracking-tight">Seus Módulos de <span className="italic text-zinc-600 font-light">Treinamento</span></h2>
              </div>
              <Link href="#" className="text-sm font-bold text-zinc-500 hover:text-white transition-colors">Ver todos os cursos →</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {courses.map((course) => {
                const totalLessons = course.modules.reduce((acc: number, mod: any) => acc + mod.lessons.length, 0);
                return (
                  <Link href={`/dashboard/courses/${course.id}`} key={course.id} className="group cursor-pointer rounded-[2rem] bg-[#0c0c0e] border border-zinc-800/50 overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:translate-y-[-8px] shadow-xl hover:shadow-blue-500/5">
                    <div className={`h-48 bg-gradient-to-br ${course.thumbnail || 'from-zinc-800 to-zinc-950'} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                      <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-500 z-10">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
                      </div>
                    </div>
                    <div className="p-8 space-y-4">
                      <div className="flex items-center gap-2">
                         <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest">Premium</span>
                         <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{totalLessons} Aulas</span>
                      </div>
                      <h3 className="font-black text-xl text-white group-hover:text-blue-400 transition-colors leading-tight">{course.title}</h3>
                      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full w-0 bg-gradient-to-r from-blue-600 to-blue-400 group-hover:w-[15%] transition-all duration-1000"></div>
                      </div>
                    </div>
                  </Link>
                );
              })}
              {courses.length === 0 && (
                <div className="col-span-3 text-center py-24 text-zinc-600 border-2 border-dashed border-zinc-900 rounded-[2.5rem] space-y-4 bg-zinc-950/50">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 text-zinc-700">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <p className="font-bold tracking-tight">Organizando seu currículo personalizado...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
