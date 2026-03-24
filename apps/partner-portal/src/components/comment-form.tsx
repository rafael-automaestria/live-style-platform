'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createForumComment } from "@/app/actions/forum";

export function CommentForm({ userId, postId }: { userId: string, postId: string }) {
  const [isPending, setIsPending] = useState(false);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm mt-8">
      <h3 className="font-semibold text-zinc-100 mb-4">Deixe uma Resposta</h3>
      <form action={async (formData) => {
        setIsPending(true);
        await createForumComment(formData);
        setIsPending(false);
      }} className="space-y-4">
        <input type="hidden" name="authorId" value={userId} />
        <input type="hidden" name="postId" value={postId} />
        <textarea 
          name="content" 
          placeholder="Compartilhe seus pensamentos..." 
          required 
          rows={3}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 resize-none text-sm" 
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isPending}
            className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8"
          >
            {isPending ? 'Postando...' : 'Postar Resposta'}
          </Button>
        </div>
      </form>
    </div>
  );
}