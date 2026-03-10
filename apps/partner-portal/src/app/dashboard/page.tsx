import { signOut, auth } from "../../../auth";
import { Button } from "@/components/ui/button";
import { getPartnerCourses } from "@/app/actions/courses";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user?.id;
  
  let courses: any[] = [];
  if (userId) {
    courses = await getPartnerCourses(userId);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50 shrink-0">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs tracking-tighter">LS</span>
            </div>
            <span className="font-bold text-lg tracking-tight mr-6">Partner Area</span>
            <Link href="/dashboard/forum" className="text-sm font-medium text-zinc-400 hover:text-amber-500 transition-colors flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
              Community Forum
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">Welcome back, {session?.user?.name || 'Partner'}!</span>
            <form action={async () => { 'use server'; await signOut(); }}>
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
          {/* Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 p-8 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-4">
              <h1 className="text-4xl font-extrabold text-white">Scale Your TikTok Lives.</h1>
              <p className="text-amber-100 text-lg">Watch our latest masterclass on retaining viewers and doubling your gifts during prime time hours.</p>
              <Button className="bg-white text-orange-600 hover:bg-zinc-100 font-bold px-8 mt-2">
                Watch Now
              </Button>
            </div>
            <div className="absolute right-0 top-0 w-1/3 h-full bg-white/10 blur-3xl transform skew-x-12 translate-x-12"></div>
          </div>

          {/* Courses Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-2 h-6 rounded-full bg-amber-500 inline-block"></span>
              Your Training Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course) => {
                const totalLessons = course.modules.reduce((acc: number, mod: any) => acc + mod.lessons.length, 0);
                return (
                  <Link href={`/dashboard/courses/${course.id}`} key={course.id} className="group cursor-pointer rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-colors block">
                    <div className={`h-32 bg-gradient-to-br ${course.thumbnail || 'from-zinc-700 to-zinc-900'} flex items-center justify-center`}>
                      <div className="h-12 w-12 rounded-full bg-black/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z" /></svg>
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="font-bold text-lg">{course.title}</h3>
                      <p className="text-zinc-500 text-sm">{totalLessons} Lessons • 0% Complete</p>
                    </div>
                  </Link>
                );
              })}
              {courses.length === 0 && (
                <div className="col-span-3 text-center py-12 text-zinc-500 border border-dashed border-zinc-800 rounded-xl">
                  No courses assigned to your account yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
