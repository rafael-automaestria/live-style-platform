'use client';

import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Lesson = {
  id: string;
  title: string;
  videoUrl: string | null;
  content: string | null;
};

type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

type Course = {
  id: string;
  title: string;
  description: string | null;
  modules: Module[];
};

export function CoursePlayer({ course }: { course: Course }) {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(
    course.modules.length > 0 && course.modules[0].lessons.length > 0
      ? course.modules[0].lessons[0]
      : null
  );

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Video Player Area */}
      <div className="flex-1 flex flex-col bg-zinc-950 overflow-y-auto">
        <div className="w-full aspect-video bg-black flex items-center justify-center relative">
          {activeLesson?.videoUrl ? (
            <iframe 
              src={activeLesson.videoUrl} 
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
            />
          ) : (
            <p className="text-zinc-500">No video available</p>
          )}
        </div>
        <div className="p-8 max-w-4xl mx-auto w-full space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-zinc-100">{activeLesson?.title || 'Select a lesson'}</h1>
            <p className="text-zinc-400 mt-2">{course.title}</p>
          </div>
          <Separator className="bg-zinc-800" />
          <div className="prose prose-invert max-w-none text-zinc-300">
            {activeLesson?.content ? (
              <p>{activeLesson.content}</p>
            ) : (
              <p>Welcome to this lesson! Please watch the video above to master the contents of this module.</p>
            )}
          </div>
        </div>
      </div>

      {/* Course Outline Sidebar */}
      <div className="w-80 border-l border-zinc-800 bg-zinc-900/30 flex flex-col shrink-0">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="font-bold text-lg text-zinc-100 truncate">{course.title}</h2>
          <p className="text-xs text-zinc-500 mt-1">Course Content</p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {course.modules.map((mod, modIdx) => (
              <div key={mod.id} className="space-y-2">
                <h3 className="font-semibold text-zinc-300 text-sm uppercase tracking-wider">{mod.title}</h3>
                <div className="space-y-1">
                  {mod.lessons.map((lesson, lessonIdx) => {
                    const isActive = activeLesson?.id === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                          isActive 
                            ? 'bg-amber-500/10 text-amber-500' 
                            : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                        }`}
                      >
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 border text-xs ${
                          isActive ? 'border-amber-500 text-amber-500' : 'border-zinc-700 text-zinc-500'
                        }`}>
                          {lessonIdx + 1}
                        </div>
                        <span className="text-sm font-medium line-clamp-2">{lesson.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}