'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createForumPost } from "@/app/actions/forum";

export function CreatePostForm({ userId }: { userId: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold"
      >
        New Discussion
      </Button>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-zinc-100 text-lg">Start a New Discussion</h3>
        <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-300">&times;</button>
      </div>
      <form action={async (formData) => {
        await createForumPost(formData);
        setIsOpen(false);
      }} className="space-y-4">
        <input type="hidden" name="authorId" value={userId} />
        <Input 
          name="title" 
          placeholder="Topic Title (e.g., Best times to stream?)" 
          required 
          className="bg-zinc-950 border-zinc-800 text-zinc-100 h-12" 
        />
        <textarea 
          name="content" 
          placeholder="What's on your mind? Share tips, ask questions..." 
          required 
          rows={4}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 resize-none text-sm" 
        />
        <div className="flex justify-end">
          <Button type="submit" className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8">
            Post Topic
          </Button>
        </div>
      </form>
    </div>
  );
}