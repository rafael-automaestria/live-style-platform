import { getCourseDetails } from "@/app/actions/courses";
import { CoursePlayer } from "@/components/course-player";
import Link from "next/link";

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const resolvedParams = await params;
  const course = await getCourseDetails(resolvedParams.courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center">
        <p>Course not found.</p>
      </div>
    );
  }

  return (
    <main className="h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* Minimal Navbar for Player Mode */}
      <header className="h-14 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-md flex items-center px-4 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>
      </header>
      
      <CoursePlayer course={course} />
    </main>
  );
}